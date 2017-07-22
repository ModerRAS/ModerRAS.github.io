---
layout: post
title: Hello World - Vno
date: 2016-02-16 15:32:24.000000000 +09:00
---

# The easiest way to over the wall to surf Google I think

I just write an easiest way I think to over the wall to surf google or Facebook or Twitter or others website.
It's change hosts. This is because in China why we can't use google is that we can't get a right ip address to go. Chinese DNS server didn't give us a true ip address to make us to surf. But we can give us. Our computer surf the Internet using domain need to make it to ip address. The first is to find DNS Cache. If found , it will use this ip address. If not , it will find hosts in our computer. If it also don't find the ip address , it will find from DNS Server. So if we have the true ip address in our computer's hosts. We can surf Google without proxy.That's what I think and also the truth.

Firstly, I give you a [hosts](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/hosts.zip_.jpg) I found . Because this blog can't upload normal file. So I do something to upload it. This picture combines a picture and a zip file using cat command. So the first is to exact them. The first 7478 bytes is a jpg picture. Another is the zip file. So using dd command to get that zip file like this.
```
dd if=hosts.zip_.jpg bs=7478 count=60 skip=1 of=hosts.bk.zip
```
Then you will get a zip file here and use unzip command to get the hosts is ok. On Windows oh my god, I forget it. I will give you another [hosts](https://github.com/racaljk/hosts) on the GitHub. This hosts has less domains to ip addresses than before.

Secondly, I will say where hosts located.

Windows | C:\\Windows\\System32\\drivers\\etc |
--------|-------------------------------------|
Linux  | /etc/
MacOS | /private/etc/

copy hosts to there is OK

The last is to refresh DNS Cache

Windows | ipconfig /flushdns |
--------|-------------------------------------|
Linux old | /etc/rc.d/init.d/nscd restart
Linux newer | /etc/init.d/nscd restart
Mac OS X old | lookupd -flushcache
Mac OS X newer | type  dscacheutil -flushcache
OS X Mountain Lion or Lion | sudo killall -HUP mDNSResponder
