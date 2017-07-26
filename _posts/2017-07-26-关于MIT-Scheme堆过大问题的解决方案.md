---
layout: post
title: 关于MIT-Scheme堆过大的解决方案
date: 2017-07-26 21:43:00 +08:00
tags: [Scheme]
---

# 写在开始
这一篇主要解决一下MIT-Scheme堆过大的错误
# 问题现象
启动时弹出这个错误
```
Requested allocation is too large, try again with a smaller arguement to '--heap'
```
# 问题搜索
谷歌之后发现32位的MIT-Scheme默认设置堆大小为4096,这个已经超出了Windows能够给32位程序的最大内存了,所以要直接手动指定堆内存大小,这样子就可以正常运行了.

# 解决方法
在启动命令上加上`--heap 512`就可以了,完整的启动命令为`"C:\Program Files (x86)\MIT-GNU Scheme\bin\mit-scheme.exe" --heap 512 --library "C:\Program Files (x86)\MIT-GNU Scheme\lib" --edit`.

# 写在最后
这个问题在我最初装MIT-Scheme的时候遇到过,然后感觉比较容易忘,所以顺便记一下.
