---
layout: post
title: 友情链接
date: 2019-09-05 00:00:00.000000000 +08:00
tags: [友情链接, 友链]
---

emmmmmmmmmmmmmmmmm。。。。。。

| 头像 | 名称 | 简介 |
| ---- | ---- | ---- |
{% for friend in site.friends %}|![[{{friend.name}}]({{friend.url}})]({{friend.avatar}}) |[{{friend.name}}]({{friend.url}}) |{{friend.desc}} |{% endfor %}