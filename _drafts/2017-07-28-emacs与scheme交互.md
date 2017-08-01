---
layout: post
title: emacs与Scheme交互
date: 2017-07-28 13:18:00 +08:00
tags: [Emacs]
---

# 写在开始
这次打算写一下关于emacs与Scheme交互的问题,主要解决的就是在emacs里面调用Scheme的解释器来运行Scheme.

# 操作过程
其实操作过程很简单,添加一段神秘代码就好了.
``` 
(global-font-lock-mode 1) ;;打开代码高亮
(setq show-paren-delay 0
    show-paren-style 'parentheses) 
(show-paren-mode 1) 
(setq scheme-program-name "/usr/bin/mit-scheme-x86-64") ;;设置scheme的启动位置
```
然后再添加一个`autopair`的插件,这里直接贴上[网址](https://raw.githubusercontent.com/capitaomorte/autopair/master/autopair.el)好了.

这是一个自动补全括号之类的东西的插件,至少可以保证括号啥的能别漏.

配置方法:
```
(autoload 'autopair "~/.emacs.d/autopair" t)
```

官方给的方法:

```
(add-to-list 'load-path "/path/to/autopair") ;; comment if autopair.el is in standard load path 
(require 'autopair) 
(autopair-global-mode) ;; enable autopair in all buffers
```
但是这个方法我自己却报错,然后无意间发现那一种设置很好用.
