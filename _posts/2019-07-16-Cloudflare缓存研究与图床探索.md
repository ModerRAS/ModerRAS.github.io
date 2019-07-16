---
layout: post
title: Cloudflare缓存研究与图床探索
date: 2019-07-16 19:00:00 +08:00
tags: [Cloudflare,CDN,dotnet core,C#,图床]
---

## 写在开始

因为我之前用的图床`i.loli.net`有过几次502, 主要还是担心图床挂掉, 然后我存的图都没了, 我当时还到处找稳定的图床, 结果发现没有多少很稳定的还免费的还不限制容量的图床, 除了 [sm.ms](https://sm.ms) 之外还有个 [imgur.com](httos://imgur.com), 然后就是谷歌相册了, 也可能是我寻找的范围问题, 我只找到这么几个, 然后因为 [sm.ms](https://sm.ms) 是一个大佬个人的图床, 所以莫名有一种不稳定的感觉(其实应该是多虑了). 但是总之我还是想找个更靠谱点的图床来用. 不过我发现 imgur 和谷歌相册都属于一种被墙的状态, 所以直接拿来当图床那么我这个博客的大陆可访问性就会大大降低, 而且更别说谷歌相册分享出来的图片的链接长到个人感觉都有点影响文档体积了, 所以我打算写个东西来处理一下这两个图床的可访问性问题. 

## 关于Cloudflare

这个在境外建站的同志们应该都清楚, 这是一个国外非常大的一个CDN厂, 主业是CDN和抗DDos, 当然前几天来了一个大规模502把我要吓死. 不过据说Cloudflare炸了好多次了, 炸一下也不奇怪, 所以就随它去炸好了, 反正一会就能好, 生意还是要做的. 

Cloudflare可以给免费用户使用CDN, 这下子对我来说就比较方便了, 因为可以直接用它的CDN来给我做图床缓存和~~减速~~加速, 至少Cloudflare在大陆是可用的, 虽然可能某些运营商访问的速度慢了点.

关于CDN缓存, 官网上写的内容是:

![](https://lh3.googleusercontent.com/B-g1m0KlHtTWmuGO_-VdyJL2ITLZP8Is_icJnIwmdSyY03DqylBtxIJhlib9yHufGQ8clgFadQiP_rN1Opr4Q5mNqdWFA1-8RaflXGR3qTVT6gOwj0hLISQy8ElLMU1IFehjlOFXpuOxHKEVGcjYK1fA1KOAMc7Csm5tdhj4Vn62cZLzDjulRAzXaKL5Deh3k1sHhGJUAAL9xsK_ITfaLfB9dMgTtA6rgIJ-ICXOBA-xk9R5fMIbRfZEt22jBQO_1A4HmZB-hP8ZohwDzRdulA6KjIL2epAWjU6I_0SaBBsDkCoO0qTqmd8pCWxS83xvNMgCmt3tsB8JEJ7iJvfbVJeMGXpz_zU2-Jy6ZIgO8HWo0TXt4_FDBBBfdBCb4GHc0klRFA740hCgeUmH9aR1An6Hc6yy93HCgclJL3IvZTbgwGPebwJsd_qt6I0MckF0CJJEyZsX48TkU_q9azJifEqRYEsVEL4VomLyBv7L46ICJWCg-xISidmrFwl96B6RhwBhpQg4rHwpj1kwf1uQ8X6YDgugRnFtk1VeH3o8xHH-UKIqDaK8O1WH_P8JoQeEXJydrtQ3dquVhr1ndPpdgU93vYX39jEFWgWLQ1u-CqbiJcGZLIsVvY6bUoEfTuESPBlXgNBf2u5Nf4WD2OUp-gP9z8f-axA-G_q-VtA217f2avHQk9DOcr1aE1EJDBaA6tdQZd54goOhuFZ66K_LI4lLxQ=w1057-h813-no)

此处应有[官网链接](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-Cloudflare-cache-for-static-content-)

Cloudflare缓存不看你HTTP头, 只看你文件的扩展名, 所以不管什么图片只要你能换成Cloudflare支持的扩展名他就可以缓存了, 当然你可以说可以通过编写页面规则来缓存, 但是那个东西免费版只有3条规则的额度, 所以我并不舍得用.

所以知道了这些基础规则之后就可以直接编写一个反代程序来动态修改这些链接成一个可以被Cloudflare缓存的链接了, 因为我水平有限, 所以不知道怎么能直接用Apache或者Nginx或者Caddy来直接修改url满足要求, 所以我才想写个程序做这一部分

## 结构构思部分

接下来是基础架构. 一个get请求带着链接过来, 然后我301(302)跳转到反代服务器, 并把链接重写成Cloudflare支持的文件后缀. 在另一个反代服务器, 按照我的规则来请求对应的目标服务器, 请求完成之后返回数据给Cloudflare, 然后Cloudflare返回数据给前端, 整个过程就算结束了.

于是乎中间有一个跳转层, 反代服务器要知道请求过来的这个受支持的链接对应的是哪条目标链接. 这里如果不考虑持久化可以考虑用个内存数据库存一下映射关系, 然后一边往里面放, 另一边往外拿, 设置个超时时间防止内存溢出. 

然而事实上我并没有这么做. 我使用一个 RocksDB ( Facebook 家优化版 LevelDB ) 把这个关系存起来了, 然后一边写, 另一边读, 中间的映射关系使用哈希映射, 链接的哈希就是对应的Cloudflare缓存的链接, 当然结尾得是受支持的文件类型.

## 代码编写部分

构思完了, 接下来就是编写代码的部分了

语言就用我最近一直在玩的 C# .NET Core 吧. 感觉这个东西还是挺有趣的, 而且写起来也很舒服.

我用 RocksDB 而不是 LevelDB 的原因也仅仅只是因为在 .NET 系里 RocksDB 的库下载量比 LevelDB 要高, 看起来更稳定一点. 

那么使用的框架应该是 ASP.NET Core, 然后在里面使用 RESTful API 的工作方式.

两个关键的 Controller:

跳转用 Controller:

```c#
        // GET: <controller>
        [HttpGet]
        public IActionResult Get(string link) {
            var hash = HashHelper.Hash_SHA_256(link, false);
            db.Put(hash, link);
            return Redirect("https://此处应为你要反代的域名/"+hash+".jpg");
        }
```

反代用 Controller:

```c#
        // GET: <controller>
        [HttpGet("{url}")]
        public async Task<IActionResult> Get(string url) {
            var hash = url.Split(".")[0];
            var link = db.Get(hash); 
            return File(await Crawl(link), "image/jpeg");
        }
```

里面用到的 Crawl 函数:

```c#
        public async Task<byte[]> Crawl(string url) {
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
            request.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36");

            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);
            return await response.Content.ReadAsByteArrayAsync();
        }

```

这个函数是用来请求目标服务器用的.

接下来还有一个关于数据库的封装, 因为是 ASP.NET Core, 所以调数据库肯定是用 DI 了, 然而这个 RocksDB 在官方的用法里没找到怎么使用依赖注入使用, 所以我也没啥办法, 只能手写一个了.

于是乎先写一个接口

```c#
public interface IKVDB {
    void Put(string K, string V);
    void Put(byte[] K, byte[] V);
    string Get(string K);
    byte[] Get(byte[] K);
    void Remove(string K);
    void Remove(byte[] K);
}
```

这个接口包含了我需要的函数.

然后再把原来的类封装一下, 表示我真的觉得这事有点过度封装了.

```c#
public class RocksDBImpl : IKVDB {
    private DbOptions options;
    private string DBPath;
    private RocksDb db;
    public RocksDBImpl(string DBPath) {
        options = new DbOptions().SetCreateIfMissing(true);
        this.DBPath = DBPath;
        db = RocksDb.Open(options, DBPath);
    }
    public string Get(string K) {
        return db.Get(K);
    }
    public byte[] Get(byte[] K) {
        return db.Get(K);
    }
    public void Put(string K, string V) {
        db.Put(K, V);
    }
    public void Put(byte[] K, byte[] V) {
        db.Put(K, V);
    }
    public void Remove(string K) {
        db.Remove(K);
    }
    public void Remove(byte[] K) {
        db.Remove(K);
    }
}
```

这个数据库我查了一阵子并没有发现到底该怎么依赖注入进程序里, 而且我也不知道这个 `db` 实例到底应不应该在每次写入和读取的时候重新打开. 不仅如此, 我还发现这个`RocksDB`这个类里并没有`close()`方法, 所以我就直接开一个单例, 然后这个`db`实例就这么一直开着了, 事实证明我一直开着似乎也不会出现什么数据未写入之类的问题. 反正我也不在乎数据是否有问题, 基本上我用的时候都会重新跳转一次使用, 而且据官方或者非官方称 RocksDB 是有一层内存缓存的, 也就是说热数据其实访问的时候都在内存里的, 所以写入到硬盘里也不会影响到整个程序的响应速度(这里来一条[非官方链接](https://juejin.im/post/5c22e049e51d45206d12568e), 讲的是关于Redis和LevelDB的).

依赖注入最后不要忘记在`Startup.cs`里面写进去偶

```c#
services.Add(item: new ServiceDescriptor(typeof(IKVDB), new RocksDBImpl("Database")));
```

因为整个程序太过于简陋, 导致我都不好意思把它扔到Github上去开源, 所以此处没有Github链接

## 最终效果

![](https://lh3.googleusercontent.com/Posy1RYnRF0Q_2ooXKTopBZ-Pg1Y6zqqS5u4o7t-LgF7B8W4ZDcHN7WGAzQ5Q19bgXkMMT2qiZBjh4zMVG0vvGgukG4S4OCQSqkhRazAlJp2w-dUbgVSSS-cTt-yeFoTuWmhr7W9OShWNjorKHKJ0Mtdh_HZTOq53rppBMLWQGZJOEesAjFtbs0422TS3i-bo-Ae0FEgGkO2v19Dap20jOvArHAD9MbFH5YN8u0ZW-zcHjyobStzncL1fFcrWfb3FI4ziWeo8hPu1l2We40AZ4LZ-j2s6rTCWd5MtCHz8MD6NmtkKj92cMH8Q1rXPA_Kku2n9RoMu_69v1Zu5SMCQmDjxgEjrm8Yo-aRSKEbuR7-zfkCbVpxIzvfW9JDX0ByfR2ZSifjEbtrMZX5HjWXqJizsTjm-I-JZPntSp30oBNXp1wL8fQJNOJfPQ81IwXAJA60do_0uU_X9EybpIIgUqNheN3yzDdEwROuH0r-2kDiDy2MSZA9Ivv3xkWlnXefFbB6XUAXU8rkClf6RfcSWvgxbMnswzVVW2DZBRpNwFZwy_PuS5fYz4rP5zzKuU8wmDN-PEjQ7QiYfkod1GJo4hIdr2tLp1TXAr4aElNeN_HmY846pXHE6mJMntqzLILuTrHE-sF4ZCuivPC2ZTBqbMYkCZlX7N1edW0qUphRiOdKGL8i3poYK8Sh4iFEboroGHPDvmzNKxfwN5nQI1nqrG0-ug=w1800-h987-no)

当然这第一次请求`cf-cache-status`一般都会`MISS`, 但是当你尝试清除缓存并重新加载的时候, 它就会变成`HIT`, 如下图:

![](https://lh3.googleusercontent.com/QRCinI0719ZROPmOzSo_i1PhFbqVx6jZcB-lD9T3ehpfLKfr6yzNx2k4iZmxMDthDCNNl_c5wBWyKMQ80BBRC8Zzjv7mKkyZKRnGdIWpzqg8BP153f7xik8hE5sBiqrNyveNmSWij76Il-_Jgms2_iyVmmH5MBBSvK2sA7WnPxmnd0pgHwyYIuTvJKYBjAFkaKDr418gH7LNWY-FDgumm6HTnbAk_MhrNzcnNXQD7UZ9FqqbQw3bqp_73hZ3sREO6dwrGR9Id5xIT887KKEHYXa6pDs8N40ZnrldtrTWwJfSBMRHQWCcfDsMwlxIHJDMsdn3qr4xmC1eKYQGuSkywH-QUQIagi0TRxY-QZ7C0yQozp1qTyPYZX8yHAUlEss3CLuch0Wa2eaqvHRr88hAcfXzR08zuawZkIHfb4udrLyYfRaXfkZ4YqJeu4rPC_P_aVOwXK2BU3ggzX-A79R0-7B9Up74BXRPPCIzDmEGp86d9y4RVNyUGAQYxJ9_E0ONefZTUlq9iAV397nfnStCwluhRtp-CrAsyvKzYGTk_JzO3IQfPuL51rEmykX0cayVAjOIV3GyzPJxHbsh0r9YlwWssIaxCWZJxDmN7OwqlsooCyx7ovPLSnofJbOanr-kb6kKHCVTMxbewzUvWpxQcZFnrVZnMTc1QV7alP3BtwPp80XxedSP8yuLez1W4pzMORFjV4pxt6xd2hwfmKPwyJepxg=w1797-h991-no)

当然, 这个缓存只是被Cloudflare这个缓存服务器缓存了, 如果你连了一个其他的Cloudflare节点, 比如你的一个客户在中国IP下访问了之后, 另一个用户使用了美国IP访问, 这两个用户连接的Cloudflare机房不相同, 在这种情况下两边的机房都会重新缓存这个图片, 也就是两个机房都要回源一次. 当然, 其他的用户访问这个资源的时候如果连到了相同的机房, 那么他们会访问缓存的数据

## 前端修改

这一段其实我修改的很简单粗暴

```javascript
  var imgs = document.getElementsByTagName("img");
  for(var i = 0;i < imgs.length;i++) {
      imgs[i].src = "https://这里应填你做跳转的服务器域名/?="+imgs[i].src
  }
```

我直接在网站的主js里加了这么一条, 把网站的所有的图片的url前面加一个跳转, 这个问题就算解决了, 当然问题也很明显, 图片会加载两次, 一次是原图片, 一次是走了代理的图片, 不过考虑到接下来我的图片都是来自谷歌相册的, 所以也只是影响了海外用户的体验, 国内用户因为打不开谷歌相册所以并不会受太多影响.

## 写在最后

经过这一般奇特的操作之后我终于可以使用谷歌相册来当作一个稳定的图床了, 心情舒畅