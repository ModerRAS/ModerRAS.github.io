---
layout: post
title: 友情链接
date: 2019-09-05 00:00:00.000000000 +08:00
tags: [友情链接, 友链]
---

emmmmmmmmmmmmmmmmm。。。。。。

{% for friend in site.friends %}| 人家的小脸脸 |[![]({{friend.avatar}})]({{friend.url}})|
|---|---|
| 人家的名字 |[{{friend.name}}]({{friend.url}})|
| 人家的话话 |{{friend.desc}} |{% endfor %}
