(function(){
    // 游戏介绍页面轮播图数据
    var carouselData = [
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
        },
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
        },
        {
        image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
        },
    ];
    creatCarousel("gameCarousel", carouselData);

    //当游戏页面滑动滚动条时阻止事件冒泡
    var container = $(".game_container");

    container.ontouchstart = function(e){
        if(container.scrollTop >= 10){
            //当滚动条不在顶部的时候阻止事件冒泡
            e.stopPropagation();
        }
    }
})();