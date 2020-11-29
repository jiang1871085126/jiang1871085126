(function(){
    var divSwitch = $(".menu_switch");
    var ulNav = $(".menu_nav");

    //切换显示类样式
    function toggleNav(){
        //如果当前没有该类样式就加上，如果当前有该类样式就删除
        divSwitch.classList.toggle("menu_switch--expand");
        ulNav.classList.toggle("menu_nav--expand");
    }

    divSwitch.onclick = toggleNav;
    ulNav.addEventListener("click", function () {
        toggleNav();
    });

})();