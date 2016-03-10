// JavaScript Document
'use strict';
//定义footer
var     myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
var timer=null;
/**
 * 下拉刷新 上拉加载 （自定义实现此方法）
 * myScroll.refresh(); 数据加载完成后，调用界面更新方法
 */
function pullDownAction () {
    clearTimeout(timer);
	timer=setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		page_num=1;
		classify_hotel();
		myScroll.refresh();/****remember to refresh when you action was completed！！！****/
	}, 100);  

}
 
function pullUpAction () {
     //定义默认加载列表的总页数
	page_num++;
	clearTimeout(timer);
	timer=setTimeout(function () {// <-- Simulate network congestion, remove setTimeout from production!	
		classify_hotel();
		myScroll.refresh();/****remember to refresh when you action was completed！！！****/
	}, 100);   
}
function loaded() {
	pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');  
    pullUpOffset = pullUpEl.offsetHeight;
     
    myScroll = new iScroll('wrapper', {
       
        useTransition: false,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } 
        },
        onScrollMove: function () {
            if (this.y > 30 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手更新...';
                this.minScrollY = 0;
            } else if (this.y < 30 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 30) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 30) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '';               
                pullDownAction();   // $.ajax call
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '';               
                pullUpAction(); // $.ajax call
            }
        }
    });
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);