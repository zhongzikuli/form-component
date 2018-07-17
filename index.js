/*
* created by zhongzikuli<hgb102xlg@126.com> on 17/10/9.
* */
$(document).ready(function () {
    new component.form({
        id: '#user',
        items: userTag,
        beforeShow: function () {

        }
    });

    new component.form({
        id: '#car',
        items: studentTag,
        tagStyle: 'form',
        xType: 'fieldSet',
        title: '其他信息',
        beforeShow: function () {

        }
    });
});