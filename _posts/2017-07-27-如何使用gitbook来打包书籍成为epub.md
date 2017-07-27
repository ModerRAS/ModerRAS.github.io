---
layout: post
title: 如何使用gitbook来打包书籍成为epub
date: 2017-07-27 17:40:00 +08:00
tags: [gitbook]
---

# 写在开始
最近找到了一些书的源码,准确的说是gitbook的书的源码,每一章都是用Markdown写的,然后如果直接用calibre的话只能转换成单章的那种,不能够整本书都转换了,所以去想了一下其他的方法来解决这个问题.于是就想到直接用gitbook编译一份就好了.

# 解决方法

## 安装gitbook

gitbook的本地环境是基于 nodejs 的,所以要想用 gitbook 就要先装一个 nodejs , 这个很简单,不说了. 然后在安装之前可以先换一下 npm 源 : `npm config set registry http://registry.npm.taobao.org` 这个是淘宝的 npm 镜像, 毕竟是国内的,而且还是阿里巴巴的,所以速度还是可以的.然后安装命令是: `npm install gitbook-cli -g` .

## 生成epub

命令格式 `gitbook epub input output.epub`

这个很简单,先打开终端,进入我 clone 下来的仓库, 然后执行命令 `gitbook epub ./ Scheme入门教程.epub` 就可以了,然后静静的等着他生成完epub就可以了.

# 其他的API

```
gitbook init //初始化目录文件
gitbook help //列出gitbook所有的命令
gitbook --help //输出
gitbook-cli的帮助信息
gitbook build //生成静态网页
gitbook serve //生成静态网页并运行服务器
gitbook build --gitbook=2.0.1 //生成时指定gitbook的版本, 本地没有会先下载
gitbook ls //列出本地所有的gitbook版本
gitbook ls-remote //列出远程可用的gitbook版本
gitbook fetch 标签/版本号 //安装对应的gitbook版本
gitbook update //更新到gitbook的最新版本
gitbook uninstall 2.0.1 //卸载对应的gitbook版本
gitbook build --log=debug //指定log的级别
gitbook builid --debug //输出错误信息

gitbook epub //制作ePub 电子书
gitbook mobi //制作Kindle 电子书
gitbook pdf //制作PDF电子书
```

# 写在最后
这个生成整体来说还是很简单的,准备一份博客备忘吧.毕竟这些API并不常用,忘了还得继续到处谷歌.