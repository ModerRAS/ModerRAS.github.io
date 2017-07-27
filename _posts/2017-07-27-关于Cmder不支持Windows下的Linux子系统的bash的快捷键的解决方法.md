---
layout: post
title: 关于Cmder不支持Windows下的Linux子系统的bash的快捷键的解决方法
date: 2017-07-27 17:14:00 +08:00
tags: [Software]
---

# 写在开始
最近发现一个很好用的Windows下的命令行软件:Cmder,然后这个软件可以自定义命令行的很多东西,当然我就是冲着这个能自定义字体来的,然后用这个软件打开bash的时候就出现一点小问题了,那就是除了主键盘区的那些数字和字母键能正常用之外,其他的功能键一概不能用,这就很纠结了,所以我就上网上找了一下这些的教程,看看有没有合适的,然而真的找到了.
# 解决方案
虽然不知道原因,但是确实很好用 `%windir%\system32\bash.exe ~ -cur_console:p:n` ,把这一段代码修改成默认启动命令就好了,但是并不知道原因是啥.接下来说一下操作步骤.

进入设置,找到 `startup` :

![](https://raw.githubusercontent.com/ModerRAS/MyBlogs/master/img/Cmder_1.png)

然后选择上面的那个 `command line` 然后把那一段神秘代码复制上就好了,现在的问题是每一次打开Cmder的时候都是打开的bash,其实这倒是无所谓了,反正我很少用Windows的命令行,用 `bash` 也没啥了.

# 写在最后
这一篇博客主要是为了防止以后再弄的时候忘记了怎么弄而扔在这里的,所以写的很简单.就是这样吧.