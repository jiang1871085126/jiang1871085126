var pageIndex = 0; //当前显示的页面索引
var pages = $$(".page_container .page"); //获取到所有的页面
var nextIndex = null; //下一个页面的索引

setStatic();

/**
 * 设置页面的静止状态
 */
function setStatic(){
    nextIndex = null; //静止状态下没有下一个页面
    for(var i = 0; i < pages.length; i++){
        //设置每个页面的z-index值（当前显示页面的z-index值最低，才能被覆盖）
        if(i === pageIndex){
            pages[i].style.zIndex = 1;
        }else{
            pages[i].style.zIndex = 10;
        }
        //设置每个页面的位置
        pages[i].style.top = (i - pageIndex) * height() + "px";
    }
}

/**
 * 移动中
 * @param {*} dis 移动的距离
 */
function moving(dis){
    for(var i = 0; i < pages.length; i++){
        //设置每个页面的z-index值（当前显示页面的z-index值最低，才能被覆盖）
        if(i !== pageIndex){
            //重新设置每个页面的位置
            pages[i].style.top = (i - pageIndex) * height() + dis + "px";
        }
        //设置下一个页面
        if(dis > 0 && pageIndex > 0){
            //向下移动（向上翻页）且当前页面不是第一页
            nextIndex = pageIndex - 1; 
        }else if(dis < 0 && pageIndex < pages.length - 1){
            //向上移动（向下翻页）且当前页面不是最后一页
            nextIndex = pageIndex + 1;
        }else{
            nextIndex = null;
        }
    }
}

/**
 * 完成移动
 */
function finisMove(){
    //没有下一页了（已经是第一页或者是最后一页了）
    if(nextIndex == null){
        setStatic();
        return;
    }
    var nextPage = pages[nextIndex];
    nextPage.style.transition = "0.5s";
    nextPage.style.top = 0;

    setTimeout(function(){
        //将当前页面设置为刚才的下一个页面
        pageIndex = nextIndex;
        //移动完了
        nextPage.style.transition = "";
        //重新设置静止状态下的页面
        setStatic();
    },500);
}

//注册事件
var pageContainer = $(".page_container");
pageContainer.ontouchstart = function(e){
    //获取到了当前点击的位置的y坐标
    var y = e.touches[0].clientY;

    function handler(e){
        var dis = e.touches[0].clientY - y;
        if(Math.abs(dis) < 20){
            dis = 0;
        }else{
            moving(dis);
            // 阻止事件的默认行为
            if (e.cancelable) {
                // 如果事件可以取消
                e.preventDefault(); // 取消事件 - 阻止默认行为
            }
        }
    }
    //此时开始移动手指，监听移动事件
    pageContainer.addEventListener("touchmove",handler,{
        passive: false,
    });

    //移动完成
    pageContainer.ontouchend = function(){
        finisMove();
        //当手指抬起的时候停止不再监听移动事件
        pageContainer.removeEventListener("touchmove",handler);
    };
};

/**
 *  点击菜单，自动切换到与之对应的页面
 * @param {*} index 当前页面的索引 
 */
function togglePage(index){
    var nextPage = pages[index];
    if(index < pageIndex){
        //下一个页面在当前页面上面
        nextPage.style.top = -height() + "px";
    }else if(index > pageIndex){
        //下一个页面在当前页面下面
        nextPage.style.top = height() + "px";
    }else{
        //下一个页面就是当前页面
        if(pageIndex === 0){
            pageIndex++;
        }else{
            pageIndex--;
        }
        setStatic();
    }
    //读取dom的尺寸和位置，会导致浏览器强行渲染
    nextPage.clientHeight;
    nextIndex = index;
    finisMove();
}