---
layout: post
title: The Start Of CoffeeScript
date: 2017-06-15 12:00:00 +08:00
tags: [CoffeeScript]
---

# Writing At First
Because Atom uses a lot of CoffeeScript to product itself. And writing some plugins can use it through JavaScript is also allowed. So I will study it to write some Atom plugins or Chrome plugins.

# What is CoffeeScript
From Coffee.org:
> CoffeeScript is a little language that compiles into JavaScript. Underneath that awkward Java-esque patina, JavaScript has always had a gorgeous heart. CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way.

Also it need I to know JavaScript. And I know a little. I think it is enough.

# About its grammar
I think its grammar likes Python.
## Define a variable
Like this:
```
a = 0
b = "i"
```
And after compiling, its JavaScript code like this:
```
var a, b;

a = 0;

b = "i";
```
## Define a function
Like this:
```
add = (a,b) -> a+b
multiply = (a,b) -> a*b
```
And after compiling, its JavaScript code like this:
```
var add, multiply;

add = function(a, b) {
  return a + b;
};

multiply = function(a, b) {
  return a * b;
};
```
Multi-line function:
```
add = (a,b) ->
    a+=b
    a++
    a+b
```
And after compiling, its JavaScript code like this:
```
var add;

add = function(a, b) {
  a += b;
  a++;
  return a + b;
};
```
The last expression's return value is the function's return value.
## Using Compare
A normal compare:
```
biggest = 10
things = 5
comp = things < biggest
```
Compiles to JavaScript:
```
var biggest, comp, things;

biggest = 10;

things = 5;

comp = things < biggest;
```
In Coffee, there is an easy way to put together compare.

Like this:
```
smallest = 0
biggest = 10
things = 5
comp = smallest < things < biggest
```
Compiles to JavaScript:
```
var biggest, comp, smallest, things;

smallest = 0;

biggest = 10;

things = 5;

comp = (smallest < things && things < biggest);
```
## Using if
Like this:
```
a = 1
if a=0
    a++
```
Compiles to JavaScript:
```
var a;

a = 1;

if (a = 0) {
  a++;
}
```
## Create an array

`[1..10]` is to create a array:
```
a = [1..10]
```
Compiles to JavaScript:
```
var a;

a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```
Use variable to create an array:
```
a = 5
b = 10
c = [a..b]
```
Compiles to JavaScript:
```
var a, b, c, i, results;

a = 5;

b = 10;

c = (function() {
  results = [];
  for (var i = a; a <= b ? i <= b : i >= b; a <= b ? i++ : i--){ results.push(i); }
  return results;
}).apply(this);
```
## Using for
```
for a in [1..10]
    alert(a)
```
Compiles to JavaScript:
```
var a, i;

for (a = i = 1; i <= 10; a = ++i) {
  alert(a);
}
```
If you want its step is 2:
```
for a in [1..10] by 2
    alert(a)
```
Compiles to JavaScript:
```
var a, i;

for (a = i = 1; i <= 10; a = i += 2) {
  alert(a);
}
```
# Writing In The End
I think it is a easy language. At least it can save my keyboard. Next time I will write it about its class.
