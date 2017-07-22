---
layout: post
title: Hello World - Vno
date: 2016-02-16 15:32:24.000000000 +09:00
---

# Writing At First
Because I find my Parser maybe use sql can make it work better and in Scala it don't have a good way to use sql without a MySQL or MariaDB or PGSQL. So I try to use Python with sqlite to make it . And I use sqlite3 and Python 3.5 and requests and BeautifulSoup4. This blog I will write something about requests.
# Requests: HTTP for Humans
Writing something about what requests think itself.
> Requests is the only Non-GMO HTTP library for Python, safe for human consumption.

> Warning: Recreational use of the Python standard library for HTTP may result in dangerous side-effects, including: security vulnerabilities, verbose code, reinventing the wheel, constantly reading documentation, depression, headaches, or even death.

I think it is because requests can use http in the easiest way. It's very Pythoner.
# How to use
## Send HTTP request
### HTTP GET
```
requests.get("https://www.github.com")
```
### HTTP POST
```
requests.post("http://httpbin.org/post")
```
### Others
```
requests.put("http://httpbin.org/put")
requests.delete("http://httpbin.org/delete")
requests.head("http://httpbin.org/get")
requests.options("http://httpbin.org/get")
```
### With parameters
```
payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
r = requests.get('http://httpbin.org/get', params=payload)
```
### Change Header
```
url = 'https://api.github.com/some/endpoint'
headers = {'user-agent': 'my-app/0.0.1'}
r = requests.get(url, headers=headers)
```
### In fact I just need
```
r = requests.get('https://www.github.com/')
r.text
```
