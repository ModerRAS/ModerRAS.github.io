---
layout: post
title: virtualenv的使用
date: 2017-08-27 10:22:00 +08:00
tags: [Python]
---

# 写在开始
最近做一点东西,顺便又用到了virtualenv,所以顺便再记录一下使用方法,省得以后再搜.

# 安装
`sudo apt install virtualenv`就可以了,有人说安装pip之后直接`pip install virtualenv`也行,这个没试过.

# 创建一个虚拟环境
先`mkdir anenv`,然后创建一个虚拟环境`virtualenv anenv`或者手动指定Python版本`virtualenv -p /usr/bin/python3.5 anenv`

# 启动一个虚拟环境
`cd anenv`之后`source bin/activate`就行了

# 关闭一个虚拟环境
`deactivate`就行了,`exit`我比较常用,也可以.

# 生成可打包的环境
`virtualenv --relocatable anenv`

# 写在最后
这个整体来说还是比较简单的,但是里面有几个命令老是忘记,顺便记一下吧.
