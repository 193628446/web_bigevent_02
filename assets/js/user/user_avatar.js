$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    // 修改裁剪图片
    var layer = layui.layer;
    // 当文件路径发生改变的时候
    $('#file').on('change', function (e) {
        //拿到用户选择的文件 e.target 不会冒泡 指向的就是事件触发元素
        var file = e.target.files[0];
        if (file == undefined) {
            return layer.msg('请选择图片！')
        }
        var imgURL = URL.createObjectURL(file)
        // console.log(imgURL);   图片路径地址
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 上传头像
    $('#btnUpload').on('click', function () {
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
            .toDataURL('image/png')
        // console.log(dataURL);
        // 发送ajax
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，更换头像成功！")
                window.parent.getUserInfo();
            }
        });
    })
})