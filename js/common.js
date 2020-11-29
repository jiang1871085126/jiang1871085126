// 全局通用的一些函数或一开始要执行的全局代码
function $(selector){
    return document.querySelector(selector);
}

function $$(selector){
    return document.querySelectorAll(selector);
}

function height(){
    return document.documentElement.clientHeight;
}

function width(){
    return document.documentElement.clientWidth;
}

/**
 * 创建一个轮播图
 * @param {*} carouselId 轮播图的id
 * @param {*} datas 轮播图的数据
 */
function creatCarousel(carouselId,datas){
    //获取整个轮播图容器及各个dom元素
    var container = document.getElementById(carouselId);
    var carouselList = container.querySelector(".g_carousel-list"); //轮播图的ul
    var indicator = container.querySelector(".g_carousel-indicator"); //轮播图指示器
    var prev = container.querySelector(".g_carousel-prev"); //按钮（上一张）
    var next = container.querySelector(".g_carousel-next"); //按钮（下一张）
    var curIndex = 0;//当前图片索引

    /**
     * 创建轮播图中的各种元素
     */
    function creatCarouselElement(){
        var carouselListHtml = ""; //轮播图列表
        var indicatorListHtml = ""; //指示器列表

        for (var i = 0; i < datas.length; i++){
            var data = datas[i];
            if(data.link){
                //有超链接的轮播图
                carouselListHtml += `<li>
                <a href="${data.link}">
                    <img src="${data.image}" target="_blank">
                </a>
                </li>`;
            }else{
                //没有超链接的轮播图
                carouselListHtml += `<li>
                    <img src="${data.image}" target="_blank">
                </li>`;
            }
            indicatorListHtml += `<li></li>`;
        }
        carouselList.style.width = `${datas.length}00%`;
        carouselList.innerHTML = carouselListHtml;
        indicator.innerHTML = indicatorListHtml;
    }
    creatCarouselElement();

    /**
     * 根据当前图片索引（curIndex），设置状态
     */
    function setStatus(){
        //当前显示的图片位置
        carouselList.style.marginLeft = -curIndex * width() + "px";
        //设置指示器状态
        var beforeSelected = indicator.querySelector(".selected");
        if(beforeSelected){
            beforeSelected.classList.remove("selected");
        }
        indicator.children[curIndex].classList.add("selected");

        //设置切换图片按钮的状态
        if(prev){
            if(curIndex === 0){
                //目前是第一张图片，则按钮（上一张）不可用
                prev.classList.add("disable");
            }else{
                prev.classList.remove("disable");
            }
        }
        if(next){
            if(curIndex === datas.length - 1){
                //目前是最后一张图片，则按钮（下一张）不可用
                next.classList.add("disable");
            }else{
                next.classList.remove("disable");
            }
        }
    }
    setStatus();

    /**
     * 去上一张
     */
    function toPrev(){
        if(curIndex === 0){
            //目前就是第一张
            return;
        }
        curIndex--;
        setStatus();
    }

    /**
     * 去下一张
     */
    function toNext(){
        if(curIndex === datas.length - 1){
            //目前就是最后一张
            return;
        }
        curIndex++;
        setStatus();
    }

    var timer = null; //计时器

    /**
     * 开始自动轮播
     */
    function start(){
        if(timer){
            //计时器为打开状态，表示正在切换
            return;
        }
        timer = setInterval(function(){
            curIndex++;
            if(curIndex === datas.length){
                curIndex = 0;
            }
            setStatus();
        },3000);
    }
    start();

    /**
     * 停止自动播放
     */
    function stop(){
        clearInterval(timer);
        timer = null;
    }
    //事件
    if(prev){
        prev.onclick = toPrev;
    }
    if(next){
        next.onclick = toNext;
    }

    container.ontouchstart = function(e){
        e.stopPropagation();
        var x = e.touches[0].clientX; //记录下当前的X坐标
        stop();//当手指按下时就停止自动轮播
        carouselList.style.transition = "none";
        //记录下手指按下时的时间
        var prevTime = Date.now();

        container.ontouchmove = function(e){
            var dis = e.touches[0].clientX - x; //计算手指拖动的距离
            carouselList.style.marginLeft = -curIndex * width() + dis + "px";
        }
        
        container.ontouchend = function(e){
            var dis = e.changedTouches[0].clientX - x;
            //打开自动播放
            start();
            //加上过渡效果
            carouselList.style.transition = "";
            //不再监听移动事件
            container.ontouchmove = null;
            //手指抬起的时候记录下当前时间，计算出滑动时间
            var spendTime = Date.now() - prevTime;
            if(spendTime < 300){
                //300ms内滑动都算快速滑动
                if(dis > 20 && curIndex > 0){
                    //在300ms内向右滑动至少20px
                    toPrev();
                }else if(dis < -20 && curIndex < datas.length - 1){
                    //在300ms内向左滑动至少20px
                    toNext();
                }else{
                    setStatus();
                }
            }else{
                if (dis < -width() / 2 && curIndex < datas.length - 1) {
                    toNext();
                } else if (dis > width() / 2 && curIndex > 0) {
                    toPrev();
                } else {
                    setStatus();
                }
            }
        }
    }
}

//ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
}