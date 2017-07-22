---
layout: post
title: Hello World - Vno
date: 2016-02-16 15:32:24.000000000 +09:00
---

# Writing At First
Coffee's class I think is familiar with Python's. Because of the grammar.
# About Class
## Writing An Example
```
class MyClass

    constructor: (name) ->
        @name = name

    getName: () ->
        @name
    setName: (name) ->
        @name = name
```
`constructor` is likes its name, it's a construct function.
`getName` is to get this value.
`setName` is to set this value.
Compiling this class and it will return this JavaScript:
```
MyClass = (function() {
  function MyClass(name) {
    this.name = name;
  }

  MyClass.prototype.getName = function() {
    return this.name;
  };

  MyClass.prototype.setName = function(name) {
    return this.name = name;
  };

  return MyClass;

})();
```
If I write like this :
```
class MyClass

    constructor: (name) ->
        @name = name

    @getName: () ->
        @name
    @setName: (name) ->
        @name = name
```
It will become this:
```
MyClass = (function() {
  function MyClass(name) {
    this.name = name;
  }

  MyClass.getName = function() {
    return this.name;
  };

  MyClass.setName = function(name) {
    return this.name = name;
  };

  return MyClass;

})();
```
Try this:
```
a = new MyClass("asd")
console.log(a.getName())
```
And it will return this:
```
console.log(a.getName());
              ^

TypeError: a.getName is not a function
```
So it can't work. The reason you just see the JavaScript output will you know that use `@` before the function name it will be a function likes java's static function.
## The Grammar Of The Class
First is the header.
```
class classname
```
Then it is the class function . To be careful about the space .
at least write two space to write the function.
```
  functionname : (parameters) ->
    todo
```
The last value is return value likes Scala.

Also it has a constructor function and its name is constructor. The uses is the same as normal function.
## Use A class
Just initial the object. Likes JavaScript and Java .
```
myClass = new MyClass("myClass")
```
Using its function is :
```
myClass.setName("new name")
```
The usage of class is the same as java I think. So I don't say anymore.
# Writing In The End
I think CoffeeScript's Class is familiar with Python. Also many people say that Python User and Ruby User may like Coffee. I think it's the truth.
