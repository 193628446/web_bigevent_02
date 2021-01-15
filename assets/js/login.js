$(function () {
    // 点击去登陆的时候 显示登录页面 隐藏注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去注册的时候 显示注册页面 隐藏登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 自定义验证规则 只要引入Layui.js 就回多出来一个layui 对象 从layui 中获取form对象
    var form = layui.form;
    form.verify({
        pwd: [
            // 第一个元素是正则
            /^[\S]{6,12}$/,
            // 第二个元素是提示的错误信息
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            var pwd = $('.reg-box input[name = password]').val();
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    })

    // 注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 手动切换到登录表单
                $('#link_login').click();
                // 重置form 表单 转为 dom 元素
                $('#form_reg')[0].reset()
            }
        });
    })

    // 登录表单
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提示信息 跳转到主页面
                layer.msg('恭喜您 登录成功')
                localStorage.setItem('token', res.token);
                location.href = "/index.html";
            }
        })
    })
})
