# 写在开始
把之前写的实验整理一下,这一次整理实验二.
# 实验二 选择结构程序

一、 实验目的

掌握选择结构程序设计的一般方法及选择结构程序的调试方法。

二、实验内容

你知道淄博到北京的地面距离是多少千米吗，淄博到纽约的地面距离又是多少千米呢？说不上来了吧。还是让我们编一个程序来计算一下吧。

已知地球的平均半径为6371.393千米，假设在地球的某一纬度上，有两个处于不同经度的点A、B，用C语言编程序求出这两点之间的直线距离（即弦长）、这两点在该纬度剖面上切圆的劣弧长度，以及这两点之间的球面距离。

拓展题（选作）：已知地球的平均半径为6371.393千米，假设在地球上有两个任意经纬度的点A、B，用C语言编程序求出这两点之间的直线距离（即弦长），以及这两点之间的球面距离。

提示：球面上两点之间的最短距离，等于这两点与球心之间的连线所确定的球面切圆的劣弧长度。
要求：　

 ⑴计算结果要有尽可能高的精确度。

 ⑵ 要考虑到横跨东、西两个半球的情况。（提示：东经为正，西经为负；北纬为正，南纬为负。）

 ⑶ 要求输入数据之间以空格分隔。例如，北纬30度上东经10度到东经50度的距离，输入格式应为：30 10 50

 ⑷ 最后提交完成的C语言源程序（扩展名为.c）文件。

 建议你自己一步步推导出公式，而不要照搬网上的现成公式。

三、常见问题

疑问1：这分明是一道数学题啊，能否将数学公式提供给我们呢，我们的主要任务不是编写程序吗？

答：建立数学模型也是编程序的一部分。学会分析解决现实中遇到的问题，是我们学习的重要目标。

疑问2：这个问题好像属于球面几何的范畴，用平面几何可以求解吗？

答：这个问题的确涉及到球面几何，但是也的确可以利用投影以及平面几何方法来求解。

四、参考测试数据及结果：

北纬0度，东经0度，东经90度——直线距离=9010.510271，纬度切圆劣弧长度=10008.160550,球面距离=10008.160550

北纬30度，东经20.5度，西经36.6度——直线距离=5274.183211，纬度切圆劣弧长度=5498.933864,球面距离=5437.719987

南纬60度，东经160度，西经170度——直线距离=1649.037876，纬度切圆劣弧长度=1668.026810,球面距离=1653.675603
# 问题分析
整体是输入一个纬度值和两个经度值,然后输出的是直线距离,维度切圆劣弧长度和球面距离.

所以需要一个函数来计算直线距离,一个函数来计算维度切圆劣弧长度,一个函数来计算球面距离.

不过这个版本我发懒所以写在一起了.然后做出来一个打印函数来把需要输出的数据打印出来.

似乎这个还是写的不是很完美,不过能解决问题了.
# 我的代码
同样的,为了适配VS2017,写成了C++版.
```
#include"stdafx.h"
#include<stdio.h>
#include<stdlib.h>
#include<math.h>
#include<string.h>
#define PI 3.14159265358979323846264338327950288419716939937510582097494459230781640628
#define AVGEarthR 6371.393
#define EarthR 6378.137
#define R 6378.137

double dabs(double input) {
	if (input <= 0) input = -input;
	return input;
}

void p(double inweidu1, double inweidu2, double a, double b, double c, double d, double inliehu) {
	char East[5] = "东经";
	char West[5] = "西经";
	char South[5] = "南纬";
	char North[5] = "北纬";
	char *weidu1;
	char *weidu2;
	char *jingdu1;
	char *jingdu2;
	jingdu1 = East;
	jingdu2 = East;
	weidu1 = North;
	weidu2 = North;
	if (a<0) {
		jingdu1 = West;
		a = dabs(a);
	}
	if (b<0) {
		jingdu2 = West;
		b = dabs(b);
	}
	if (inweidu1<0) {
		weidu1 = South;
		inweidu1 = dabs(inweidu1);
	}
	if (inweidu2<0) {
		weidu2 = South;
		inweidu2 = dabs(inweidu2);
	}
	printf("%s%lf度，%s%lf度，%s%lf度，%s%lf度——直线距离=%lf，纬度切圆劣弧长度=%lf，球面距离=%lf \n", weidu1, inweidu1, jingdu1, a, weidu2, inweidu2, jingdu2, b, c, inliehu, d);
}

int main(int argc, char const *argv[]) {
	double a, b, c, t, h, x, j, r, m;
	double in[3];
	printf("请输入两个地点的纬度：");
	scanf("%lf", &in[1]);
	printf("请输入第一个地点的经度：");
	scanf("%lf", &in[0]);
	printf("请输入第二个地点的经度：");
	scanf("%lf", &in[2]);
	c = in[1];
	a = in[0];
	b = in[2];
	m = c*PI / 180;// 把输入的维度作为角度转换为弧度
	r = R*cos(m);// r是
	t = fabs(a - b)*PI / 180;
	x = 2 * r*sin(t / 2);
	if (t <= PI)
	{
		h = t*r;
		j = R*acos(cos(m)*cos(m)*cos(t) + sin(m)*sin(m));
	}
	else
	{
		h = (2 * PI - t) *r;
		j = R*acos(cos(m)*cos(m)*cos(2 * PI - t) + sin(m)*sin(m));
	}
	p(in[1], in[1], in[0], in[2], x, h, j);
	system("pause");
	return 0;
}
```
# 写在最后
这个代码个人感觉比较烂,因为至少没有把代码耦合问题搞定,要是能把那几个求直线距离,维度切圆劣弧长度和球面距离的代码分成三个函数的话我感觉会更好的.
