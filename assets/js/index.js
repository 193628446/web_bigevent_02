$(function () {
    // 用于获取信息
    getUserInfo();

    // 退出
    var layer = layui.layer;
    // 点击退出的时候 弹出询问框
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //必须 清空本地的token
            localStorage.removeItem("token")
            // 进行页面跳转 跳转到登录页面
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
          });
    })
});

// 用于 获取用户的基本信息（封装到入口函数的外面了）
// 因为 ： 后面其他的页面要调用
function getUserInfo() {
    // 发送ajax
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     // 重新登录 因为token 过期事件12小时
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            //console.log(res);   //返回数据成功
            if (res.status !== 0) {
                return layui.layer.msg(res.message) 
            }
            // 如果成功 渲染头像
            renderAvatar(res.data)
        }
    });
}

// 封装函数
function renderAvatar(user) {
    // 渲染名称nickname 优先 如果没有 就用username
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    // 渲染头像
    if (user.user_pic !== null) { 
        // 也就是有头像 让他显示出来 并且把图片的src 属性换成用户的 让另一个盒子隐藏
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide();
    } else {
        // 没有头像的时候  拿到用户名  并且让第一个字大写
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
        $('.layui-nav-img').hide();
    }
}