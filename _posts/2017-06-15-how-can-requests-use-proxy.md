---
layout: post
title: Hello World - Vno
date: 2016-02-16 15:32:24.000000000 +09:00
---

# Writing At First
Because some website may ban ip if it do get very quickly or get big data flow for a long time. So mant times we will use proxy.
# How to use agent in the requests
## Without proxies
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
This is my IP now.
## Without Session
```
headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
}
proxies = {'http': 'http://rixcloud:rixcloud@127.0.0.1:1080',
               'https': 'http://rixcloud:rixcloud@127.0.0.1:1080'}
print(requests.get("http://httpbin.org/get",headers=headers,proxies=proxies).text)
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
  "origin": "52.28.158.91",
  "url": "http://httpbin.org/get"
}
```
## With Session
```
sess = requests.Session()
sess.headers = {
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
}
sess.proxies = {'http': 'http://user:passwd@127.0.0.1:1080',
               'https': 'http://user:passwd@127.0.0.1:1080'}
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
  "origin": "106.187.53.238",
  "url": "http://httpbin.org/get"
}
```
# Writing In The End
This is very easy to use. But I search on the Google for a long time because of the proxy with the password. In the end, I found that just use `http://user:password@proxy_server` is OK.
Another thing is that requests can only use http-proxy, socks5 cannot be use in requests.
