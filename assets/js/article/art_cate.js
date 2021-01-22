$(function () {
    // 文章类别列表显示
    initArtCateList();
    // 封装函数
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        });
    }

    var layer = layui.layer;
    // 点击添加类别
    $('#btnAdd').on('click', function () {
        // 利用框架 显示添加文章类别区域
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 提交文章分类添加
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 添加成功后 渲染页面中的数据
                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功！')
                layer.close(indexAdd)
            }
        });
    })

    // 修改 点击编辑
    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        // 获取id 发送ajax 获取数据 渲染到页面
        var Id = $(this).attr('data-id');
        // alert(Id)
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + Id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        });
    })

    // 提交
    $('body').on('submit', "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 更新成功 重新渲染页面
                initArtCateList();
                layer.msg('恭喜您，文章类别更新成功！');
                layer.close(indexEdit)
            }
        });
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类失败！')
                        }
                        layer.msg('删除分类成功！')
                        layer.close(index)
                        initArtCateList()
                    }
                })
            })
    })
})
