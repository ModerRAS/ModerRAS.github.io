---
layout: post
title: writing something about scala collection function
date: 2017-06-02 12:00:00 +08:00
---

### write something about Scala collection function

## The first is map function
an easiest test :
```
def plusOne(x:Int):Int = x+1
val list1:List[Int] = List(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
println(list1.map(plusOne))
```
or using lambda:
```
val list1:List[Int] = List(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
println(list1.map(x=>x+1))
```
it will print :
```
List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
```
Map function can get every elements in the list and do something writing on the function .<br>
Its function signature is (List[A]): A -> B <br>
## The second is filter function
an easiest test:
```
def moreThanTwo(x:Int)Boolean = x>2
val list1:List[Int] = List(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
println(list1.filter(moreThanTwo))
```
or using lambda :
```
val list1:List[Int] = List(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
println(list1.filter(x=>x>2))
```
It will print :
```
List(3, 4, 5, 6, 7, 8, 9, 10, 11)
```
It's the same as map. But its function signature is (List[A]): A -> Boolean. And it only save the elements which can be the input function true in the new object.

## The last is reduce function
I think this function need I to say more. It's input is a function input x,y. x is the list's first element or the before reduce leave. y is the list's next element. I will write a function to say it
```
def plus(x:Int,y:Int):Int = {
    println(x+y)
    x+y
}
val l:List[Int] = List(1,2,3,4,5,6,7,8,9)
println(l.reduce(plus))
```
Firstly it will plus(1,2),then it's plus(plus(1,2),3),
then it's plus(plus(plus(1,2),3),4) ......
And It will print 45.
This is just what I think. Maybe it's not true.
