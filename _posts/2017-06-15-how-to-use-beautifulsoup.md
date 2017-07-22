---
layout: post
title: how to use beautifulsoup
date: 2017-06-15 12:00:00 +08:00
---

# Writing At First
I think BeautifulSoup is easy to be used. And I will just say a little things about it.
# Install
```
pip install beautifulsoup4
```
# Using
## Initial
```
soup = BeautifulSoup(html) # input a html and its type is string.
```
or
```
soup = BeautifulSoup(open(file))
```
is OK.
## Some APIs
Then `soup.prettify()` can get a pretty string

Then `soup.title` can get its `title` tag.

`soup.head` can get its `head` tag.

`soup.a` can get its `a` tags.

`soup.p` can get its `p` tags.

Both of them are Tag class.

## What I use
It is `soup.find_all()`.

```
find_all( name , attrs , recursive , text , **kwargs )
```
This function can find all the tags which named what you input.

You can input a string or a function or a regular expression even a boolean.

Then its output is a ResultSet. Then you can use map or for to find what you want.

Because I just use it to find some super-link which is end of ".png" or ".jpg". So it's enough.

#　Writing In The End
This is the easiest way to use BeautifulSoup. Maybe next time I will write some others function and its uses.
