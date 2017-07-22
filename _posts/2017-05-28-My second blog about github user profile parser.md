---
layout: post
title: My Second Blog About Github User Profile Parser
date: 2017-05-28 12:00:00 +8
tags: [Python,Web Spider]
---

Now I write my second blog. It’s also a web spider but for github. Our teacher said that github is a social coding and want me to find some api about github in order to know our active in github. But I search that api and find that v3 and v4 api I found didn’t have what I need. So I can only use something likes spider.😥😥

Because github is the social coding. I need to create a harmless spider. I think it’s just use less than twenty http get a day. So I think it’s nothing. This spider I use Scala and jsoup to create. The reason why I use jsoup is that I find github user profile website is nearly a static website.
<pre><code class="none">&lt;g transform="translate(16, 20)"&gt;
      &lt;g transform="translate(0, 0)"&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="0" fill="#ebedf0" data-count="0" data-date="2016-05-22"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="12" fill="#ebedf0" data-count="0" data-date="2016-05-23"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="24" fill="#ebedf0" data-count="0" data-date="2016-05-24"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="36" fill="#ebedf0" data-count="0" data-date="2016-05-25"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="48" fill="#ebedf0" data-count="0" data-date="2016-05-26"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="60" fill="#ebedf0" data-count="0" data-date="2016-05-27"/&gt;
          &lt;rect class="day" width="10" height="10" x="13" y="72" fill="#ebedf0" data-count="0" data-date="2016-05-28"/&gt;
      &lt;/g&gt;</code></pre>
And what I need is like this. It’s a static website. What I need is in rect. It’s data-count and data-date. And these attributes. So I write my code like this.
<pre><code class="none">  def getLinks(url:String): List[Node] = {
    val doc:Document = Jsoup.connect(url).get()
    val links:Elements = doc.select("rect")
    var ret:ListBuffer[Node] = ListBuffer()
    val iterator = links.iterator()
    while (iterator.hasNext) {
      val ne = iterator.next()
      ret += new Node(ne.attr("data-date"),ne.attr("data-count"))
    }
    ret.toList
  }</code></pre>
These codes have a pit. It’s about the list. List is a static object. If I need to append some objects in it, I can use ListBuffer. That’s about the Node class
<pre><code class="none">
class Node(date:String,count:String) {
  val Date:String = date
  val Count:String = count

  override def toString: String = "Date="+Date+"\t"+"Count="+Count
}</code></pre>
It’s just have two string and I rewrite the toString function.

Now I just have finished the kernel about the parser. The next version I will use XML to read who I need to parser and write those actives.

If you want to see all the codes place see my project on the github. It’s <a href="https://github.com/ModerRAS/GitHubUserProfileParser">GitHubUserProfileParser</a>
