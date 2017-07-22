# 写在开始
这一篇一样的,整理一下我写的C语言的实验,就当是复习C语言了吧.

# 实验三 选择结构与循环结构程序设计

　

一、 实验目的

掌握选择结构与循环结构程序设计的一般方法及其调试方法。

二、实验要求

1． 仔细阅读下列实验内容，并编写出相应的C语言源程序。

2． 在C语言运行环境下，编辑录入源程序。

3． 调试运行源程序， 注意观察调试运行过程中发现的错误及改正方法。

4． 掌握如何根据出错信息查找语法错误。

5. 最后提交带有充分注释的源程序文件（扩展名为.c）。 要求该文件必须能够正确地编译及运行，并不得与他人作品雷同。

三、实验内容

你知道你生日那天是星期几吗，还有你知道你爸爸生日那天是星期几吗？你可能会说：可以查万年历啊。然而，不查万年历你能计算出来吗？　   

编程序实现：输入任意一个日期的年、月、日的值，求出从公元1年1月1日到该日期前一年的年末总共有多少天，到该日期前一个月的月末总共有多少天，到这一天总共有多少天，并求出这一天是星期几。

要求：

1. 输入数据时，数据之间以空格隔开。
　
2. 输出星期几时，要求使用全中文形式（例如“星期一”），而不能使用“星期1”这种形式。

参考测试数据及结果：

请输入年月日的值（以空格隔开）：
2012 3 31
到前一年年末的天数=734502
到前一个月月末的天数=734562
到这一天的天数=734593
这一天是星期六

请输入年月日的值（以空格隔开）：
2014 4 1
到前一年年末的天数=735233
到前一个月月末的天数=735323
到这一天的天数=735324
这一天是星期二

四、常见问题

疑问1：闰年的规律是不是四年一闰？

答：四年一闰是儒略历（儒略也就是凯撒大帝）的置闰规则。我们现在使用的是格里高利历，置闰规则是每400年97闰。

疑问2：公元1年1月1日是星期几呢？

答：星期一。

疑问3：据说从儒略历改为格里高利历时，将1582年10月4日的下一天定为格里高利历的10月15日，中间销去了10天，这会不会影响星期几的计算？

答：这个调整是对儒略历误差的纠正，并不会影响总天数和星期几的计算。
# 题目分析
这个题需要计算从公元元年到某一年底的天数还有到某一个月底的天数还有到某一天的天数以及那一天是星期几.

所以需要一个函数来获取从公元元年到某一年底的天数,再用一个函数来获取从某年年初到这一年的某个月的月底的天数,最后再获取从某一个月初到这个月某一天的天数,然后再通过获取完的这些天数来计算这一天是星期几,需要额外适配的就是确定哪一年是闰年,然后输出一年每个月有几天,因为C语言不能直接返回数组,所以我把这一部分放进函数来解决了,所以想要获取哪一年的那个月有几天就调用`getMonthDays`就可以了.然后和往常一样,专门写一个打印用的函数来格式化输出当前的数据.

我的代码我感觉我已经不需要讲了,因为里面带着注释,而且函数名自带注释,然后代码需要开尾递归优化的,如果没有打开的话容易堆栈溢出.我确定的是不优化的话20000就溢出了.
# 我的代码
和之前一样的,为了适配VS2017所以我写成了C++的版本.
```
//本程序需要在编译时打开尾递归优化,不开尾递归优化有可能堆栈溢出，不过最大层数应该不超过20000
// gcc 的优化选项 ~-O1 -foptimize-sibling-calls~  或 ~-O2~
#include "stdafx.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* Weekdays[] = { "星期一","星期二","星期三","星期四","星期五","星期六","星期天" };

int getYearDays(int year) {//int -> int
						   //这一个函数写的是获取本年的天数
	if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
		return 366;
	}
	else {
		return 365;
	}
}
int getMonthDays(int year, int month) {//(int,int) -> int
									   //获得本月的天数
	int months[] = { 31,28,31,30,31,30,31,31,30,31,30,31 };
	if (getYearDays(year) == 366) {
		months[1] = 29;
	}
	return months[month - 1];
}
int getToLastYearsDays(int sum, int year) {//(int,int) -> int
										   //get from AD 1 to this year's before year's last day.
	if (year <= 1) {
		return sum + getYearDays(year);
	}
	else {
		return getToLastYearsDays(sum + getYearDays(year), year - 1);
	}
}
int getToLastMonthsDays(int sum, int year, int months) {// (int,int,int) -> int
														//Only get this year's before this month's days sum.
	if (months == 0) return sum;
	return getToLastMonthsDays(sum + getMonthDays(year, months), year, months - 1);
}

int getToTodays(int sum, int year, int months, int days) {// (int,int,int,int) -> int
														  // useless
	return getToLastYearsDays(0, year) + getToLastMonthsDays(0, year, months) + days;
}

int getWeekday(int day) {//int -> int
	int weekday = day % 7;
	if (weekday == 0) return 6;
	else return weekday - 1;
}

int main(int argc, char const *argv[]) {
	int year;
	int month;
	int day;
	int sum = 0;
	//printf("%d\n",getYearDays(100));
	printf("请输入年月日的值（以空格隔开）:\n");
	scanf("%d %d %d", &year, &month, &day);
	printf("到前一年年末的天数=%d\n", sum = getToLastYearsDays(sum, year - 1));
	printf("到前一个月月末的天数=%d\n", sum = getToLastMonthsDays(sum, year, month - 1));
	printf("到这一天的天数=%d\n", sum += day);
	printf("这一天是%s\n", Weekdays[getWeekday(sum)]);
	system("pause");
	return 0;
}
```
# 写在最后
整体来说这个代码的质量我认为还是起码不是什么烂代码吧,除了大量使用尾递归之外没有啥难理解的地方.然后整体代码偏向于函数式风格,但是因为C语言是命令式语言嘛,所以不能算是函数式的了,只能说有一点函数式的样子.
