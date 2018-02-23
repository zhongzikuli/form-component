var userTag = [{
    xType: 'fieldContainer',
    items: [{
        xType: 'hidden',
        name: 'id'
    }]
}, {
    xType: 'fieldContainer',
    items: [{
        xType: 'text',
        title: '姓名',
        id: 'realName',
        name: 'realName',
        required: true,
        maxLength: 16
    }, {
        xType: 'select',
        title: '性别',
        id: 'sex',
        name: 'sex',
        data: [{
            name: '男',
            value: 'male'
        }, {
            name: '女',
            value: 'female'
        }],
        labelClass: "col-xs-1",
        textClass: "col-xs-1",
        isPlugin: true
    }, {
        xType: 'date',
        title: '出生日期',
        id: 'birth',
        name: 'birth',
        isPlugin: true
    }, {
        xType: 'button',
        title: '计算身高',
        btnClass: 'btn-info height-btn'
    }]
}, {
    xType: 'fieldContainer',
    items: [{
        xType: 'area',
        title: '户籍',
        num: 2,
        id: 'address',
        name: 'address',
        labelClass: "col-xs-1",
        textClass: "col-xs-2",
    }, {
        xType: 'area',
        num: 3,
        title: '家庭地址',
        name: 'homeAddress',
        id: 'homeAddress',
        iClass: "form-control-expend-left col-xs-5",
        dClass: "form-control-expend-right col-xs-7",
        showDetail: true,
        isPlugin: true,
        required: true,
        maxLength: 100
    }, {
        xType: 'buttons',
        buttons: [{
            btnClass: 'btn-primary deal-btn',
            text: '按公式计算 '
        }, {
            btnClass: 'btn-success save-btn',
            text: '保存车辆信息 '
        }]
    }]
}];

var studentTag = [{
    xType: 'fieldContainer',
    items: [{
        xType: 'text',
        title: '姓名',
        id: 'name',
        name: 'name',
        required: true,
        labelClass: "col-xs-1",
        textClass: "col-xs-2",
        maxLength: 16
    }, {
        xType: 'date',
        title: '生日',
        id: 'bornBirth',
        name: 'bornBirth',
        isPlugin: true,
        labelClass: "col-xs-1",
        textClass: "col-xs-2"
    }, {
        xType: 'checkInput',
        title: '电话号码',
        id: 'tel',
        name: 'tel',
        checked:true,
        maxLength:11
    }]
},{
    xType: 'fieldContainer',
    items: [{
        xType: 'textArea',
        title: '备注',
        required: true,
        name: 'remark',
        id:'remark',
        labelClass: "col-xs-1",
        textClass: "col-xs-11"
    }]
}, {
    xType: 'fieldContainer',
    items: [{
        xType: 'radio',
        title: '是否成年',
        required: true,
        name: 'adult',
        radios: [{
            disabled:true,
            text:'是'
        },{
            text:'否'
        },{
            text:'不知道',
            checked:true
        }]
    }, {
        xType: 'checkbox',
        title: '爱好',
        required: true,
        name: 'hobby',
        checkboxes: [{
            disabled:true,
            text:'篮球'
        },{
            text:'电影'
        },{
            text:'游泳',
            checked:true
        },{
            text:'跑步',
            checked:true
        }]
    }]
}];