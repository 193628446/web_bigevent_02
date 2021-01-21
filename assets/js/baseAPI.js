// 开发环境服务器地址
var baseURL = 'http://api-breakingnews-web.itheima.net';
//测试环境服务器地址
// var baseURL = 'http://api-breakingnews-web.itheima.net';
// 生产环境服务器地址
// var baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
    // 身份认证 必须以my 开头才行
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 拦截所有响应 判断身份认证信息
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        // 身份认证失败！ 这里的文字去复制  都是中文写
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空本地token
            localStorage.removeItem('token');
            // 页面跳转
            location.href = "/login.html"
        }
    }
})