---
layout: post
title: how can requests changes user agent
date: 2017-06-15 12:00:00 +08:00
---

# Writing At First
The requests default UA is:
`python-requests/2.11.1`.
But it is east to be find it is a web spider. So I try to use something to change it in order to make it more likes a normal user.
# How to change UA in the requests
## Without Session
```
headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
}
print(requests.get("http://httpbin.org/get",headers=headers).text)
```
It will return:
```
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "close",
    "Host": "httpbin.org",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
  },
  "origin": "202.110.209.175",
  "url": "http://httpbin.org/get"
}
```
## With Session
```
sess = requests.Session()
sess.headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
}
print(sess.get("http://httpbin.org/get").text)
```
It will return:
```
{
  "args": {},
  "headers": {
    "Accept-Encoding": "identity",
    "Connection": "close",
    "Host": "httpbin.org",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
  },
  "origin": "202.110.209.175",
  "url": "http://httpbin.org/get"
}
```
# Writing In The End
It's very easy to use but difficult to be found.
