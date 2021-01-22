$(function () {
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度1~6位之间! ";
           }
        }
    })

    // 用户渲染
    initUserInfo();
    // 导出layui
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        });
    }

    // 表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 从新用户渲染
        initUserInfo();
    })

    // 修改用户信息
    $('.layui-form').on("submit", function () {
        // 阻止浏览器的默认行为
        e.preventDefault();
        // 发送ajax 修改用户信息
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return  layer.msg('用户信息修改失败! ')
                }
                layer.msg('恭喜您，获取用户基本信息成功！') 
                // 调用父页面中用户信息的头像和方法
                window.parent.getUserInfo();
            }
        });
    })
})