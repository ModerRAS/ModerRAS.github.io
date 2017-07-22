# 写在开始
最近有个朋友让我帮他做一下他的某个实验,自称老师一个学期就讲了五六个课时,还没讲什么有效内容,于是一点都不会,来求我帮忙,毕竟是好朋友,也不好意思拒绝,所以顺带着做了一下,搞了一点奇葩的代码扔进去了.这里扔出来玩玩吧.
# 所谓的实验一
## 实验名称：面向对象程序设计（一）

### 【一】实验内容及要求
#### 实验目的：
1、	熟悉使用Java常用类
2、	掌握类的定义以及使用
3、	理解类的封装性、继承性、多态性
4、	熟悉构造函数的概念和使用
#### 实验内容：
1.	编写Java代码实现一个计数器类Computer，其中包括：
用CountValue来保存计数器的当前值。
方法Computer（int a）是构造方法并给CountValue赋初值。
方法increment()计数器加一
方法decrement()计数器减一
方法reset（）计数器清零
使用计数器类创建一对象，该计数器对象当前值为10，调用三次increment()，输出计数器当前值，调用一次decrement()，输出计数器当前值，调用reset（）, 输出计数器当前值.

2. 定义一个名字为MyRectangle的矩形类，类中有4个私有的整型成员变量，分别是矩形的左上角坐标（xUp，yUp）和右下角坐标（xDown，yDown）；类中定义了无参数的构造方法和有4个int参数的构造方法，用来初始化类对象。类中还有以下方法：
getW（）－ 计算矩形的宽度；
getH（）－ 计算矩形的高度；
area（）－ 计算矩形的面积；
toString（）－ 把矩形的宽、高和面积等信息作为一个字符串返回。
编写应用程序使用MyRectangle类。

#### 实验步骤：（写出程序）
#### 实验小结：（调试过程中遇到的问题）
## 看到这个的反应
感觉说白了就是来解释一下这个类是怎么用的,方法是怎么调用的,`new`怎么用的一个小实验,非常无语.

# 直接贴出来代码吧......
## 这是Computer类
<pre class="lang:java decode:true " >
package org.xxx.shiyanyi;

/**
 * Created by adqew on 2017/7/9.
 */
public class Computer {
    int CountValue;
    Computer(int a){
        CountValue = a;
    }
    void increment(){
        CountValue++;
    }
    void decrement(){
        CountValue--;
    }
    void reset(){
        CountValue = 0;
    }
}

</pre>

## 这是MyRectangle类

<pre class="lang:java decode:true " >
package org.xxx.shiyanyi;

import static java.lang.Math.abs;

/**
 * Created by adqew on 2017/7/9.
 */
public class MyRectangle {
    private int xUp,yUp,xDown,yDown;
    MyRectangle(){

    }
    MyRectangle(int xUp,int yUp,int xDown,int yDown){
        this.xUp = xUp;
        this.yUp = yUp;
        this.xDown = xDown;
        this.yDown = yDown;
    }
    public int getW(){
        return abs(yUp-xUp);
    }
    public int getH(){
        return abs(xUp-xDown);
    }
    public int area(){
        return getH()*getW();
    }

    @Override
    public String toString() {
        return "宽: " + getW() + "\n"
                + "长: " + getH() + "\n"
                + "面积: "+ area() + "\n";
    }
}

</pre>

## 这是Main类
<pre class="lang:java decode:true " >
package org.xxx.shiyanyi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by adqew on 2017/7/9.
 */
public class Main {
    public static void main(String[] args){
        System.out.println("测试Computer类");
        Computer computer = new Computer(10);
        for (int i = 0; i < 3; i++) {
            computer.increment();
        }
        System.out.println(computer.CountValue);
        computer.decrement();
        System.out.println(computer.CountValue);
        computer.reset();
        System.out.println(computer.CountValue);
        System.out.println("测试MyRectangle类");
        try(BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {

            System.out.println("请输入矩形的左上角的坐标X");
            int xUp = Integer.valueOf(reader.readLine());
            System.out.println("请输入矩形的左上角的坐标Y");
            int yUp = Integer.valueOf(reader.readLine());
            System.out.println("请输入矩形的右下角的坐标X");
            int xDown = Integer.valueOf(reader.readLine());
            System.out.println("请输入矩形的右下角的坐标Y");
            int yDown = Integer.valueOf(reader.readLine());
            System.out.println(new MyRectangle(xUp,yUp,xDown,yDown).toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

</pre>

# 写在最后
这个实验真的是没什么好说的,应该说是新手入门只要会写类会写方法应该就没啥问题.
