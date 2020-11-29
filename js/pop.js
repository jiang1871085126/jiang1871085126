var showPop = (function(){

    //显示弹出窗
    function showPop(id){
        var container = $("#" + id);
        container.style.display = "";
        if(id === "popVideo"){
            //当弹出框是视频时，弹出则自动播放
            var video = container.querySelector("video");
            video.play();
        }
    }

    //获取所有的关闭按钮
    var closes = $$(".pop_close");
    for (var i = 0; i < closes.length; i++) {
        closes[i].onclick = function(){
            var popContainer = this.parentElement.parentElement;
            popContainer.style.display = "none";
        }
    }

    //切换登录方式效果
    var popWx = $(".pop_wx");
    var popQq = $(".pop_qq");
    popWx.onclick = function(){
        //添加类样式
        popWx.classList.add("selected");
        //删除类样式
        popQq.classList.remove("selected");
    };
    popQq.onclick = function(){
        //删除类样式
        popWx.classList.remove("selected");
        //添加类样式
        popQq.classList.add("selected");
    };

    //处理当关闭视频弹窗是，暂停视频播放
    var closeBtn =$("#popVideo .pop_close");
    closeBtn.addEventListener("click",function(){
        $("#popVideo video").pause();
    });
    
    return showPop;
})();