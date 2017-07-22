---
layout: post
title: My First Blog About Picture Spider
date: 2017-05-25 12:00:00 +08:00
tags: [Python,Web Spider]
---

<h2 id="toc_0">It’s my first time to write a blog also the first time to write an English Blog. May be something I may write wrong.Just try.</h2>
Today I will say my web spider which can parser some web and get that website’s picture. What I use is python 3.5 with selenium. Also using urllib3. Web driver is phantomjs.

Firstly,I will say what I think about the parser.I think it’s very easy. It’s just a tree traversal,and using a BFS to traversal,and using a queue to let the url save. Then I make two sets to save the picture url and website url. So that can make the picture and website just have one url. That’s my source about the set. I use sqlite 3 to save the url.
<pre><code class="none">import threading

import sqlite3


class SQLControler:
    def __init__(self, path: str):
        self.__conn = sqlite3.connect(path)

    def close(self):
        self.__conn.commit()
        self.__conn.close()


class SQLControlerKV(SQLControler):
    def __init__(self, path: str):
        super().__init__(path)
        self.__conn = sqlite3.connect(path)

    def __check_type(self, data):
        __K = data
        if isinstance(__K, list):
            __K = tuple(__K)
        if not isinstance(__K, tuple):
            __K = (__K,)
        if isinstance(__K[0], tuple):
            __K = __K[0]
        return __K

    def createDB(self):
        with threading.RLock():
            self.__conn.execute('''CREATE TABLE KV_DB(
            Key TEXT NOT NULL,
            Value TEXT NOT NULL,
            PRIMARY KEY(Key)
            )''')

    def get(self, K):
        if not isinstance(K, tuple):
            K = (K,)
        return [i for i in self.__get(K)]

    def __get(self, K):
        with threading.RLock():
            __K = self.__check_type(K)
            return self.__conn.execute("SELECT Value from KV_DB where Key=?", __K)

    def add(self, K, V, commit=True):
        in_data = (self.__check_type(K)[0], self.__check_type(V)[0])
        cursor = self.__get(K)
        if len([i for i in cursor]) &gt; 0:
            return False
        else:
            self.__conn.execute("INSERT INTO KV_DB (Key, Value) VALUES (?, ?)", in_data)
            if commit:
                self.__conn.commit()
            return True

    def get_length(self):
        with threading.RLock():
            tmp2 = 0
            for i in self.__conn.execute("SELECT count(*) from KV_DB"):
                tmp2 = i[0]
            return tmp2

    def delete_all(self, commit=True):
        self.__conn.execute("DELETE FROM KV_DB")
        if commit:
            self.__conn.commit()

    def delete(self, K, commit=True):
        if not isinstance(K, tuple):
            K = (K,)
        if len(self.get(K)) &gt; 0:
            self.__conn.execute("DELETE FROM KV_DB WHERE Key=?", K)
        else:
            return False
        if commit:
            self.__conn.commit()
        return True

    def change(self, K, V, commit=True):
        __data = (self.__check_type(K)[0], self.__check_type(V)[0])
        if len(self.get(K)) &gt; 0:
            self.__conn.execute("UPDATE KV_DB SET Value=? WHERE Key=?", __data)
            if commit:
                self.__conn.commit()
            return True
        else:
            return False

    def rollback(self):
        self.__conn.rollback()


class SQLControlerSet(SQLControler):
    def __init__(self, path):
        super().__init__(path)
        self.__conn = sqlite3.connect(path,check_same_thread=False)

    def createDB(self):
        self.__conn.execute('''CREATE TABLE mysets(
        Key TEXT NOT NULL,
        PRIMARY KEY(Key)
        )''')

    def __check_type(self, data):
        with threading.RLock():
            __K = data
            if isinstance(__K, list):
                __K = tuple(__K)
            if not isinstance(__K, tuple):
                __K = (__K,)
            if isinstance(__K[0], tuple):
                __K = __K[0]
            return __K

    def get(self, tp):
        with threading.RLock():
            __tp = self.__check_type(tp)
            return self.__conn.execute("SELECT Key from mysets where Key=?", __tp)

    def add(self, tp, commit=True):
        with threading.RLock():
            __tp = self.__check_type(tp)
            cursor = self.get(__tp)
            if len([i for i in cursor]) &gt; 0:
                return False
            else:
                self.__conn.execute("INSERT INTO mysets (Key) VALUES (?)", __tp)
                if commit:
                    self.__conn.commit()
                return True

    def get_length(self):
        with threading.RLock():
            tmp2 = 0
            for i in self.__conn.execute("SELECT count(*) from mysets"):
                tmp2 = i[0]
            return tmp2

    def delete_all(self, commit=True):
        with threading.RLock():
            self.__conn.execute("DELETE FROM mysets")
            if commit:
                self.__conn.commit()

    def delete(self, tp):
        with threading.RLock():
            __tp = self.__check_type(tp)
            self.__conn.execute("DELETE FROM mysets WHERE Key=?", __tp)
            self.__conn.commit()

    def get_all(self):
        with threading.RLock():
            __tmp = self.__conn.execute("SELECT Key from mysets")
            return [i for i in __tmp]

    def commit(self):
        with threading.RLock():
            self.__conn.commit()
    """
        def add_all(self, li: list):
        with threading.RLock():
            i = 0
            for data in li:
                self.__conn.execute("INSERT INTO mysets (Key) VALUES (?)", tuple(data))
                self.__conn.commit()
                i += 1
            return i
    """


class SQLQueue():
    def __init__(self, path, first_run=False):
        self.queue = SQLControlerKV(path)
        self.first_run = first_run
        if first_run:
            try:
                self.queue.createDB()
            except sqlite3.OperationalError:
                pass
            self.queue.add("SQL_QUEUE_FIRST_CURSOR", "None")
            self.queue.add("SQL_QUEUE_LAST_CURSOR", "None")

    def length(self):
        if self.first_run:
            return 0
        else:
            return self.queue.get_length() - 2

    def append(self, V: str):
        if self.first_run:
            self.queue.change("SQL_QUEUE_FIRST_CURSOR", V)
            self.queue.change("SQL_QUEUE_LAST_CURSOR", V)
            self.first_run = False
        else:
            if self.queue.add(self.queue.get("SQL_QUEUE_LAST_CURSOR"), V, commit=False):
                self.queue.change("SQL_QUEUE_LAST_CURSOR", V, commit=True)
                return True
            else:
                return False

    def remove(self, delete=True):
        if self.first_run:
            return False
        else:
            __first = self.queue.get("SQL_QUEUE_FIRST_CURSOR").pop()
            if delete:
                __tmp = None
                try:
                    __tmp = self.queue.get(__first).pop()
                    __tmp_2 = self.queue.change("SQL_QUEUE_FIRST_CURSOR", __tmp, commit=False)
                    self.queue.delete(__tmp)
                except IndexError:
                    self.first_run = True
            return __first[0]</code></pre>
All of the source can be used is just the SQLControlSet. SQLControl is just as a interface and as a father class. It just define the basic function. Initial and close. Others is extends this class. And the SQLControlSet is extends that,and its also have some others functions. I think I needn’t to say every functions. I just say some pits. First is the type. Python is a strong type language through it seems that it have no type. Because I need to have a turple in that sql execute function which using excaped. But sometimes I may make a string here. So I need to change that type. And it will be used in many times. So I write it as a function to check types. It will change string to a turple and it contains a string. Some days before I write is just use a turple function. But it didn’t work as I think. I think it may change it to a turple contains a string. But it changes the string to a turple contains all the string’s chars. Another is if it’s a list, it will run well. In the end is that sometimes it will change that to a turple contains a turple contains a string. It will be a big error. Check the type now is work well. But the speed isn’t the best. It will use execute many times because of the function names get. But the native disk’s speed is not the bottle neck so I didn’t optimize it. The most time I use is to wait for the net io.
<pre><code class="none">from urllib.error import URLError

from selenium import webdriver
from selenium.common.exceptions import *
import re
import queue
import threading
import threadpool
import urllib.request
import os
import time
import sqlite3

from SQLControl import SQLControlerSet, SQLQueue

"""
在写代码之前先理清一下思路
    1.在外部图片群页面批量爬取图片的详细内容的链接
    2.打开这个链接然后搜索&lt;a&gt;标签内href的内容，遍历这些内容获取为以.jpg结尾的href内容扔进数据库一份备份，另一份提供给下载
    3.下载部分继续用aria2c，然后就是每次下载完毕之后暂停10秒
    4.每次搜索的时候中间暂停5秒左右，速度要慢
    5.每次搜索的时候搜索到的所有URL扔给数据库，然后每次获取到URL的时候先比对一下数据是否有重复，如果有重复就结束这一层的搜索
"""
lock = threading.RLock()

time_sleep = 5


def downloader(url):
    a = url.split('/')
    a.pop(0)
    a.pop(0)
    file = a.pop()
    ta = []
    for i in a:
        if i != '':
            ta.append(i)
    a = ta
    path = ''
    for i in a:
        path = path + i + '/'
    filepath = path + file
    if os.path.exists(filepath) == True:
        print(url + ' is exists!')
    else:
        print(
            'Now Downloading :' + 'aria2c.exe --all-proxy=\"http://rixcloud:rixcloud@localhost:1080\" -d ' + path + ' --referer=\"' + url + '\" \"' + url + '\" \n')
        os.system(
            'aria2c.exe --all-proxy=\"http://rixcloud:rixcloud@localhost:1080\" -d \"' + path + '\" --referer=\"' + url + '\" \"' + url + '\" \n')
        # time.sleep(time_sleep)


def download(url: str):
    a = url.split('/')
    a.pop(0)
    a.pop(0)
    file = a.pop()
    ta = []
    for i in a:
        if i != '':
            ta.append(i)
    a = ta
    path = ''
    for i in a:
        path = path + i + '/'
    filepath = path + file
    if os.path.exists(filepath) == True:
        print(url + ' is exists!')
    else:
        print('Now Downloading :' + 'aria2c.exe -d ' + path + ' --referer=\"' + url + '\" \"' + url + '\"\n')
        os.system('aria2c.exe -d \"' + path + '\" --referer=\"' + url + '\" \"' + url + '\"\n')
    time.sleep(time_sleep)
    return url


class DownloadControl:
    def __init__(self):
        self.q = queue.Queue(maxsize=-1)


def getPicture(browser: webdriver.PhantomJS):
    def _getPicture(add: SQLControlerSet.add):
        def __getPicture(url: str):
            """
                        用于写获取picture的函数，主要目的为获取picture的URLs，并把这个URLs返回为一个turple
                        :param add:
                        :param browser:
                        :param url:
                        :return turple:
                        """

            browser.get(url)
            print('Get : ' + url)
            links = browser.find_elements_by_tag_name('a')

            # browser.close()
            def __my_map(x):
                try:
                    return str(x.get_attribute('href'))
                except Exception:
                    return False

            links = map(__my_map, links)
            links = filter(lambda x: x, links)
            links = list(map(urllib.request.unquote, links))

            def notsearch(url: str):
                def isPicture(type: str):
                    all_type = ["jpg", "png", "jpeg", "bmp", "gif", "svg"]
                    return type.lower() in all_type

                return re.match('http', url) is not None \
                       and url is not None \
                       and (re.search('konachan.com', url) or re.search('yande.re', url)) \
                       and not isPicture(url.split('/')[-1].strip().split('.')[-1])

            def search(url: str):
                def isPicture(type: str):
                    all_type = ["jpg", "png", "jpeg", "bmp", "gif", "svg"]
                    return type.lower() in all_type

                return re.match('http', url) is not None \
                       and url is not None \
                       and (re.search('konachan.com', url) or re.search('yande.re', url)) \
                       and isPicture(url.split('/')[-1].strip().split('.')[-1])

            retlinks = list(filter(notsearch, links))
            links = list(filter(add, filter(search, links)))
            # dnld = list(map(downloader, links))
            print("Finish getPicture: ", url, "\nGet ", len(links), " Pictures")
            return retlinks

        return __getPicture

    return _getPicture


def findPicture(browser: webdriver.PhantomJS, url: str, SQLPicture: SQLControlerSet, SQLURL: SQLControlerSet):
    """
    在图片群里搜索图片的信息
    :param SQLURL:
    :param SQLPicture:
    :param browser:
    :param url:
    :return:
    """

    add = SQLURL.add
    if url == None or url == False:
        return []
    # try:
    browser.get(url)
    """
        except TimeoutException:
        print("Time out by loading %s" % url)
    except URLError:
        print(URLError)
    except ConnectionRefusedError:
        print(ConnectionRefusedError)
        """
    print('Get : ' + url)
    links = browser.find_elements_by_tag_name('a')

    # browser.close()
    def __my_map(x):
        try:
            return str(x.get_attribute('href'))
        except Exception:
            return False

    links = map(__my_map, links)
    links = filter(lambda x: x, links)
    links = map(urllib.request.unquote, links)

    def search(url: str):
        def isPicture(type: str):
            all_type = ["jpg", "png", "jpeg", "bmp", "gif", "svg"]
            return type.lower() in all_type

        return re.match('http', url) is not None \
               and (re.search('konachan.com', url) or re.search('yande.re', url)) \
               and url is not None \
               and not isPicture(url.split('/')[-1].strip().split('.')[-1])

    links = filter(add, filter(search, links))
    get = getPicture(browser)(SQLPicture.add)
    print("findPicture %s is finish!" % url)
    return list(map(get, links))


def worker(links, SQLPicture, SQLURL, SQLNow):
    def _worker(browser:webdriver.PhantomJS):
        while len(links) &gt; 0:
            try:
                print(time.asctime(time.localtime(time.time())), "迭代中。。。")
                retlinks = findPicture(browser, links.pop(0), SQLPicture=SQLPicture, SQLURL=SQLURL)
                print("开始刷新数据库")
                SQLNow.delete_all(commit=False)
                print("数据库已删除")
                for i in retlinks:
                    for j in i:
                        links.append(j)
                        SQLNow.add(j, commit=False)
                SQLNow.commit()
                print("本次迭代结束，数据库已重置")
            except Exception:
                browser.quit()
                exit()

    return _worker


if __name__ == '__main__':
    browser = webdriver.PhantomJS(executable_path='phantomjs.exe',
                                  service_args=['--load-images=false', '--disk-cache=true',
                                                '--disk-cache-path=E:/sqlite/phantomJS/',
                                                '--local-storage-path=E:/sqlite/phantomJS/',
                                                '--proxy=127.0.0.1:1080',
                                                '--proxy-type=socks5',
                                                '--proxy-auth=rixcloud:rixcloud',
                                                '--max-disk-cache-size=4194304'],
                                  service_log_path="E:/sqlite/PhantomJS.log")
    # browser = webdriver.Chrome(executable_path='chromedriver.exe', service_args=['--load-images=false'], service_log_path="E:/sqlite/Chrome.log")
    browser.set_page_load_timeout(300)
    browser.set_script_timeout(300)

    print("Init Browser!")
    SQLNow = SQLControlerSet("E:/sqlite/cache.db")
    SQLPicture = SQLControlerSet("E:/sqlite/picture.db")

    SQLURL = SQLControlerSet("E:/sqlite/url.db")
    try:
        SQLPicture.createDB()
    except sqlite3.OperationalError:
        pass
    try:
        SQLNow.createDB()
    except sqlite3.OperationalError:
        pass
    try:
        SQLURL.createDB()
    except sqlite3.OperationalError:
        pass
    links = [i[0] for i in SQLNow.get_all()]
    links.append("https://yande.re/tag?order=date")
    links.append("https://konachan.com/tag")
    print("Now Parsering!")

    # SQLNow = SQLQueue("queue.db", first_run=True)

    # SQLNow.append(links)
    worker(links, SQLPicture, SQLURL, SQLNow)(browser)
    SQLPicture.close()
    SQLNow.close()
    SQLURL.close()</code></pre>
This code is the main source in this spider. Main is just to init the sqlite and web driver. Worker is the main runner. And there are two functions for searching the web. One is to find pictures, another is to get pictures while having found the url which may have the pictures. In these two functions I use some functional programming functions to make the code easy to read. May be not. This version isn’t use download and Downloader. Because I think use another Downloader outside may be more safety.I think there is no pit in this parser. The most pits is the type. That’s I think. Maybe next time I will say my picture spider 2.1 version (this is 2.0,and 1.0 is to parser manhua using thread pool and memery set and usually out of memory because of the big set. ). That version is to use id to parser the picture.
