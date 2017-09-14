---
layout: post
title: Linux上安装shadowsocksR
date: 2017-09-13 17:52:00 +08:00
tags: [Python]
---

# 写在开始
这个问题我之前弄了好久都没有解决的,今天突然就突发奇想就解决了,而且还很简单.这里说明一下.

# 安装过程
先添加一个ppa源：
`sudo add-apt-repository ppa:hzwhuang/ss-qt5`

然后更新一下：
`sudo apt update`

然后下载ss-qt5的版本：
`sudo apt-get install shadowsocks-qt5`

安装完之后打开,然后自己导入自己的代理服务器地址,设置一个开机自动连接就行了.
