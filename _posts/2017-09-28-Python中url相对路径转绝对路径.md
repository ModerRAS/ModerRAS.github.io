---
layout: post
title: Python中URL相对路径转绝对路径
date: 2017-09-28 13:30:00 +08:00
tags: [Python]
---

# 写在开始
这个就是记一点小东西,然后就是做爬虫的时候经常见到的情况,那就是一个超链接用的是一个相对路径,然后就需要一点方法来把这个相对路径转化成一个直接的URL,不然的话没有办法直接发送HTTP请求,然后就是说一下在Python里面这个要怎么弄.

# 解决方法
`urlparse`这个包里面有一个`urljoin`函数,这个函数输入一个这个网站的链接,和一个这个相对路径,然后返回这个完整的URL

# 用法
```
import urlparse
print(urlparse.urljoin("http://www.baidu.com/1/s?a=1","/a/1"))
```
输出就是
```
"http://www.baidu.com/a/1"
```

# 但是
这个好像在Python3消失了,然后还有一个替代方法在`urllib.parse`里面,有一个同样叫`urljoin`的函数,这个函数功能和上面的那个相同,所以我应该用这个.

# 写在最后
这个函数经常用到,但是也经常忘记,所以记录一下比较好了.
