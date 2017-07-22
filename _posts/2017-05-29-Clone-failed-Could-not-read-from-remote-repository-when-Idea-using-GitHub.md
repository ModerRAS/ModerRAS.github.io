---
layout: post
title: Clone failed: Could not read from remote repository when Idea using GitHub
date: 2017-05-29 12:00:00 +08:00
tags: [IDE,Git,GitHub]
---

# How to use GitHub in Idea

Today I try to use GitHub in Idea, and I Configure the option. But I find some error here.

> Clone failed: Could not read from remote repository.

So I try to search that on Google, and I find an answer in Stack Overflow.
> settings-->Version Control-->Git ,and then, In the SSH executable dropdown, choose Native
> ![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/05/2017.5.29-git-1024x700.png)

Another answer said that:
> We've recently updated from IntelliJ 12 to IntelliJ 14 Ultimate and we've encountered this problem too. Our solution was to disable the proxy in the settings. We also stopped remembering the passwords once, but might not sure if that helps. Proxy settings are under File-Settings-Apearance & Behavior-System settings-HTTP Proxy.

But the truth is that after I get that error, I think it is because I didn't open the proxy. Then I open it. And it did nothing.

The last I resolve the this question is just like this :
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/05/2017.5.29-github.png)
Then it will clone repository without using ssh. And I will not get that error. I don't know why I can't use ssh. Is it because I didn't deploy a public Key ? But I truly never use ssh to clone Git repository or push commits. I always use https.
