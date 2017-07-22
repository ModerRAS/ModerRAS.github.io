---
layout: post
title: Hello World - Vno
date: 2016-02-16 15:32:24.000000000 +09:00
---

# Writing Something about CNN

Because I use English . May be something I can't write very well.

An easiest convolutional neural network just has an input layer,a conv layer,a RELU layer,a pooling layer,a fully connect layer and a logistics regression classifier or a softmax regression classifier,then a output layer to output.

First is input layer. I think it needn't to say. It is just input some data and transport to the next layer.

The next is conv layer. This layer will compute the output of neurons that are connected to local regions in the input, each computing a dot product between their weights and a small region they are connected to in the input volume. In TensorFlow , conv2d is a 4D layer which need to input 4 parameters likes [1,28,28,1]. And it need stride. Most time we will use [1,1,1,1]. padding use "SAME". It will output a feature map and the shape is (If input is a 28x28 picture,[1,28,28,1].And it has 12 filters) [1,28,28,12] .

Then is RELU(Rectified Linear Units). Most times you may see it likes this.
![max(0,x)](https://raw.githubusercontent.com/ModerRAS/MyBlogs/master/img/ReLU.png)

It doesn't change the input's size. And most time it just makes data more non-linear.

Then it is pooling layer. I think the most time this layer is to lose the input's size . And usually max pool will be used. Max pool is to select the biggest one in this grid. It was started on AlexNet. It's size may usually be 2x2. In TensorFlow, its ksize usually is [1,2,2,1] and its stride usually is [1,2,2,1] and padding usually is 'SAME'.

After pooling layer,it's fully connected layer. It's a traditional artificial neural network's layer. I think it's just because then it is a ReLU then a classifier. ReLU is nothing but softmax and logistics need a stable matrix and they also need a fully connected layer. I think it is nothing to say. Just need to translate the data to the softmax or logistics need to input is OK.

Then it is classifier. Many time it is softmax regression. It's output is a vector and each dimension's number is from 0 to 1.

The last is output layer. It just output the data from classifier.

Others are BP or SGD. Maybe I will talk it later.

The last, showing a LeNet-5.
![](https://raw.githubusercontent.com/ModerRAS/MyBlogs/master/img/LeNet-5.png)
