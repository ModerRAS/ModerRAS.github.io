// ==UserScript==
// @name         解决百度云大文件下载限制
// @namespace    undefined
// @version      0.0.6
// @description  一行代码，解决百度云大文件下载限制
// @author       funianwuxin
// @match        http://pan.baidu.com/*
// @match        https://pan.baidu.com/*
// @match        http://yun.baidu.com/*
// @match        https://yun.baidu.com/*
// @match        https://eyun.baidu.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

Object.defineProperty(Object.getPrototypeOf(navigator),'platform',{get:function(){return 'sb_baidu';}})


(function(){
var href=location.href;
/http:/.test(href)?location.href='https'+href.slice(4):0;
}());


    
