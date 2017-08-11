---
layout: post
title: 收藏一个数学建模时的MATLAB作业一的Python版本
date: 2017-08-11 16:11:00 +08:00
tags: [Python]
---

# 写在开始
这是我最近数学建模的时候上课时老师布置的课下作业,老师要求是用MATLAB写了,但是我又顺便写了一份Python版本的,发现这个代码量根本不是一个数量级的,当然也有可能是我的MATLAB编程水平问题,不过先放出来代码吧.

# 作业题目

![](https://raw.githubusercontent.com/ModerRAS/MyBlogs/master/img/MATLAB_zuoyeyi_1.png)

# 超级简单粗暴的一套Python代码

```
from functools import reduce

import numpy as np


def 实验一_循环():
    sums = 0
    for i in range(1, 64):
        sums += 2 ** i
    return sums


def 实验一_非循环():
    return reduce(lambda x, y: x + y, map(lambda z: 2 ** z, range(1, 64)))


def 实验二():
    return mat_add(np.zeros(2), np.ones(2), np.ones(2))


def mat_add(*args: np.array):
    return reduce(lambda x, y: x + y, args)


def 实验三():
    return list(
        filter(lambda x: reduce(lambda y, z: y + z, map(lambda a: int(a) ** 3, list(str(x)))) == x, range(100, 999)))


def 实验四():
    ret = float(1 + 2 / 1)
    n = 2.
    while ret * float(1 + 2 / n ** 2) - ret > 1e-12:
        ret *= float(1 + 2 / n ** 2)
    return ret


def f(x):
    return x * x * np.sin(0.1 * x + 2) - 3


def 实验五(firsts=-4.0, ends=0.0):
    sums = f((ends - firsts) / 2 + firsts)
    if -1e-10 < sums < 1e-10:
        return (ends - firsts) / 2 + firsts
    else:

        return 实验五((ends - firsts) / 2 + firsts, ends) if sums > 0 else 实验五(firsts, (ends - firsts) / 2 + firsts)

def 实验五_特别慢():
    first, end, gen = np.float64(-4), np.float64(0), np.float64(f(np.float64(0)))
    while not -1e-10 < gen < 1e-10:
        gen = f((end - first) / 2 + first)
        if gen > 0:
            end = (end - first) / 2 + first
        else:
            first = (end - first) / 2 + first
    return (end - first) / 2 + first




if __name__ == '__main__':
    # print(实验五(-4,0))
    print(实验一_循环())
    print(实验一_非循环())
    print(实验二())
    print(实验三())
    print(实验四())
    print(实验五())
```

# MATLAB版本

## my_sum.m
```
function s = my_sum(num,lengths,sum)
    if lengths == num
        s = sum;
    else
        s = my_sum(num+1,lengths,sum+2^num);
    end
end
```

## my_sum2.m
```
function ret=my_sum2(lengths)
ret=0;
for i=1:lengths
    ret=ret+2^i;
end
end
```

## mat_add.m
```
function sum=mat_add(varargin)
sum=0;
for i=1:numel(varargin)
    sum=sum+varargin{i};
end
end
```

## Narcissistic.m
```
function all=Narcissistic(first,lengths,nums,both)
    if nargin == 2
        both = [];
        nums = 1;
    end
    if first == lengths
        all = both;
        return;
    end
    num_mat = split_num(first);
    o = ones(1,get_length(first));
    this_sum = num_mat.*num_mat.*num_mat;
    next_sum=o*this_sum;
    if next_sum == first
        both(nums) = next_sum;
        all = Narcissistic(first+1,lengths,nums+1,both);
    else
        all = Narcissistic(first+1,lengths,nums,both);

    return;
end
```

## split_num.m
```
function mat=split_num(num)
lengths = get_length(num);
mat = zeros(lengths,1);
tmp=num;
for i = 1 : lengths
    mat(lengths-i+1,1) = rem(tmp, 10);
    tmp = fix(tmp/10);
end
end
```

## get_length.m

```
function l=get_length(num)
l=0;    
tmp = num;
while tmp > 0
    tmp=fix(tmp/10);
    l=l+1;
end
end
```

## shiyan_4_loop.m
```
function ret=shiyan_4_loop()
ret=1;
n=1;
while 1
    % if get_dot_length(ret) >= 12
    if ret*(1+2/n^2) - ret < 1e-12
        return;
    else
        ret = ret*(1+2/n^2);
        n = n+1;
    end
end

end
```

## shiyan_4_tail.m
```
function ret=shiyan_4_tail(n,sums)
sums
if get_dot_length(sums) >= 12
    ret = sums;
    return;
else

    ret = shiyan_4(n+1,sums*(1+2/n^2));
    return;
end
return;
end
```

## get_dot_length.m
```
function len=get_dot_length(nums)
a = num2str(nums);
len = length(a)-find(a=='.');
return;
end
```

## shiyan_5_tail.m
```
function ret = shiyan_5_tail(firsts,ends)
% x^2*sin(0.1*x+2)-3
sums = f((ends-firsts)./2+firsts);
if sums < 1e-10 && sums > -1e-10
    ret = (ends-firsts)./2+firsts;
    return;
else
    if sums > 0
        ret = shiyan_5_tail((ends-firsts)./2+firsts,ends);
        return;
    else
        ret = shiyan_5_tail(firsts,(ends-firsts)./2+firsts);
        return;
    end
end
end
```

## f.m
```
function fx=f(x)
fx = x^2*sin(0.1*x+2)-3;
return;
end
```

## main.m
```
clear;clc
% 实验一 不用循环
a = my_sum(1,63,0)
% 实验一 用循环
b = my_sum2(63)
% 实验二
c = mat_add(ones(2),ones(2),zeros(2))
% 实验三
d =  Narcissistic(100,999)
% 实验四 循环
e = shiyan_4_loop()
% 实验四 用尾递归会堆栈溢出
% 实验五 尾递归
f = shiyan_5_tail(-4,0)
```

# 写在最后
不知道我这是MATLAB用的不熟还是Python用起来太简单了,这个代码量简直差了一个数量级,不知道怎么回事.不过Python做实验四的时候结果只能出来一个inf,算不出来数,很是无语,不过MATLAB倒是没啥问题了,其他的速度感觉基本一致,反正都是一秒内出结果了.
