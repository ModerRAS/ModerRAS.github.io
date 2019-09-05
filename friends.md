---
layout: post
title: 友情链接
date: 2019-09-05 00:00:00.000000000 +08:00
tags: [友情链接, 友链]
---

emmmmmmmmmmmmmmmmm。。。。。。

<div>{% for friend in site.friends %}<a class="a-friend" style="display: flex;padding: 0 60px;margin-top:10px" target="_blank" href="{{friend.url}}"><img class="blog-avatar" src="{{friend.avatar}}"><div class="text-container"><div class="name">{{friend.name}}</div><div class="description">{{friend.desc}}</div></div></a>{% endfor %}</div>