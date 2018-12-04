---
layout: post
title:  selenium爬取宿舍剩余电量
date: 2017-07-16 12:00:00 +08:00
tags: [Python]
---

# 写在开始
最近突发奇想想做一个爬取当前宿舍剩余电费的爬虫,至于原因嘛是因为我一个朋友半夜查电费发现没电了......热的一晚上没睡着觉......
# 整体思路
先打开[山东理工大学后勤服务大厅](http://hqfw.sdut.edu.cn/login.aspx)的登录界面,然后输入人名和学号,然后找到[学生宿舍用电查询](http://hqfw.sdut.edu.cn/stu_elc.aspx),在里面输入校区和公寓楼号还有宿舍号,然后点击查询来查询,然后下面会返回一个现在的用电情况,以及剩余电量,抓出来就可以了
# 写几个API
## `selenium.webdriver.support.ui.Select`类

这个类里的方法可以用来选择选择框,三种选择方式:

`select_by_index(index)`用index来决定选择哪个选择框

`select_by_value(value)`用`attr`里面的`value`来决定选择哪个选择框

`select_by_visible_text(text)`用子节点的文本来决定选择哪个选择框

## `send_keys()`方法
这是`WebElement`类里的方法,用来发送一个值.

其实我就是用来向`<input>`标签对应的那个框里填充数据用的

## `click()`方法
就是点击这个`WebElement`对应的标签.

我也就是用来点击提交表单用的那个按钮的

# 代码
这个代码我一开始想用`requests`和`BeautifulSoup`来做的来着,但是因为aspx里面的各种问题整得快要懒得弄了,所以换成`selenium`+`pantomjs`来一起做,结果发现这个写法简单的不要不要的.
```
from selenium import webdriver
from selenium.webdriver.support.ui import Select

姓名 = "自己填"
学号 = "自己填"
校区 = "西校区" #东校区或者西校区
楼宇 = "5#公寓楼" #这个其实是在官网上面的那几个选项,自己根据需要改就好
宿舍号 = "自己填" #这是一个三位数的数字,自己填自己的宿舍号就行

def main():
    print("Now Start!")
    global browser
    browser = webdriver.PhantomJS(executable_path='phantomjs.exe')
    print("Initial Broswer!")
    browser.get("http://hqfw.sdut.edu.cn/login.aspx")
    print("Had Got!")
    browser.find_element_by_id("MainContent_txtName").send_keys(姓名)
    browser.find_element_by_id("MainContent_txtID").send_keys(学号)
    browser.find_element_by_id("MainContent_btnTijiao").click()
    browser.get("http://hqfw.sdut.edu.cn/stu_elc.aspx")
    选择校区 = Select(browser.find_element_by_id("MainContent_campus"))
    选择校区.select_by_visible_text(校区)
    选择公寓楼 = Select(browser.find_element_by_id("MainContent_buildingwest"))
    选择公寓楼.select_by_visible_text(楼宇)
    browser.find_element_by_id("MainContent_roomnumber").send_keys(宿舍号)
    browser.find_element_by_id("MainContent_Button1").click()
    print(browser.find_element_by_id("MainContent_TextBox1").text)



if __name__ == '__main__':
    main()

```
#写在最后
这个程序太简单了,我都怀疑我是不是写了一个假的程序,但是事实上真的能用.

来一张效果图:

[![selenium_SDUTEnergyParser_1.png](https://i.loli.net/2018/12/04/5c05e6e91ec7e.png)](https://i.loli.net/2018/12/04/5c05e6e91ec7e.png)

Tips : 因为Python3里面源代码的编码是`UTF-8`的,而且所有的有效的`UTF-8`字符都可以当做变量名和函数名,写这个程序基本上是因为用`requests`+`BeautifulSoup`没写出来的替代品,所以有一些变量名懒得去找对应的英文名,而且有觉得用拼音有失文雅,所以直接用中文了.
