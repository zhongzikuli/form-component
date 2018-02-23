(function ($) {
    var Form = function (option, callback) {
        //初始化组件
        initComponent(option);
        return this;
    };

    function initChosen(it) {
        var config = {
            disable_search_threshold: 10,
            no_results_text: '无数据',
            width: "undefined" != typeof(it.width) ? it.width : "100%"
        };

        try {
            $("#" + it.id).chosen(config);
        } catch (e) {
            //
        }
    }

    function initLayDate(it) {
        if (it.conTime) {
            var sTime = {
                elem: '#' + it.sId,
                format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                min: it.min ? it.min : '',
                max: it.max ? it.max : '',
                istoday: it.istoday ? it.istoday : false, //是否显示今天
                issure: it.issure ? it.issure : false, //是否显示确认
                istime: it.istime ? it.istime : false, //是否开启时间选择
                choose: function (datas) {
                    eTime.min = datas; //开始日选好后，重置结束日的最小日期
                },
                clear: function () {
                    eTime.min = '1970-01-01'; //开始日清空后，重置结束日的最小日期
                }
            };

            var eTime = {
                elem: '#' + it.eId,
                format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                min: it.min ? it.min : '',
                max: it.max ? it.max : '',
                istoday: it.istoday ? it.istoday : false, //是否显示今天
                issure: it.issure ? it.issure : false, //是否显示确认
                istime: it.istime ? it.istime : false, //是否开启时间选择
                choose: function (datas) {
                    sTime.max = datas;			//结束日选好后，重置开始日的最大日期
                },
                clear: function () {
                    sTime.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
                    sTime.max = laydate.now();	//将开始日的最大值设定为今天
                }
            };
            laydate(sTime);
            laydate(eTime);
        } else {
            $("#" + it.id).on("click", function () {
                laydate({
                    format: it.formatDate ? it.formatDate : 'YYYY-MM-DD',
                    max: it.max ? it.max : '',
                    istime: it.istime ? it.istime : false, //是否开启时间选择
                    isclear: it.isclear ? it.isclear : true, //是否显示清空
                    istoday: it.istoday ? it.istoday : false, //是否显示今天
                    issure: it.issure ? it.issure : false, //是否显示确认
                    choose: function (datas) {

                    }
                });
            })
        }
    }

    function initArea(it) {//城市级联组件，支持省市2级联动和省市区3级联动
        if (it.name == "carLicenseProvince" || it.name == "province" || it.name == "telArea") {
            init_city_select($("#" + it.id), 2, it.direction);
        } else {
            init_city_select($("#" + it.id), it.num, it.direction);
        }
    }

    function initComponent(option) {
        //需要初始化控件对象
        var plugins = new Array();
        if (option.items) {
            if (option.tagStyle == 'form') {
                var html = '<form class="form-horizontal">';
            } else {
                var html = '<div class="form-horizontal">';
            }
            if (option.xType == 'fieldSet') {
                html += initFieldSetContainer(option, plugins);
            } else {
                for (var i = 0; i < option.items.length; i++) {
                    var item = option.items[i];

                    html += initFieldContainer(item, plugins, option);

                    if (item.readonly) {
                        readOnly(item)
                    }
                }
            }

            if (option.tagStyle === 'form') {
                html += '</form>';
            } else {
                html += '</div>';
            }

            $(option.id).append(html);
        }
        //初始化插件
        initPlugin(plugins);
        //事件
        if (typeof(option.beforeShow) === "function") {
            option.beforeShow();
        }
    }

    function initFieldSetContainer(option, plugins) {
        var title = "";
        var index = 0;
        var html = "";
        if (typeof(option.title) != 'undefined') {
            title = option.title;
        }
        if (typeof(option.index) != 'undefined') {
            index = option.index;
        }

        html += '<fieldset id="fieldset-' + index + '"><legend>' + title + '</legend>';
        var items = option["items"];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            html += initFieldContainer(item, plugins, option);
        }

        html += '</fieldset>';
        return html;
    }

    function initFieldContainer(item, plugins, option) { //xType = fieldContainer
        var html = "";
        var lWidth = tWidth = 2;
        var widthNum = parseInt(12 / item.items.length) % 2;
        if (widthNum > 0) {
            lWidth = parseInt(parseInt(12 / item.items.length) / 2);
            tWidth = 12 / item.items.length - lWidth;
        } else {
            lWidth = parseInt(12 / item.items.length) / 2 - 1;
            tWidth = parseInt(12 / item.items.length) / 2 + 1;
        }
        html += '<div class="row ' + (item.className ? item.className : "") + '">';
        for (var j = 0; j < item.items.length; j++) {
            var tHtml = "";
            var it = item.items[j];
            if (null != option && null != option.data) {
                /*for (var name in option.data) {
                    if (it.name == name) {
                        it.defaultValue = option.data[name];
                    }
                }*/
            }

            if (it.xType === 'text') {
                tHtml = prepareText(it, lWidth, tWidth);
            } else if (it.xType === 'hidden') {
                tHtml = prepareHidden(it, lWidth, tWidth);
            } else if (it.xType === 'checkbox') {
                tHtml = prepareCheckBox(it, lWidth, tWidth);
            } else if (it.xType === 'radio') {
                tHtml = prepareRadio(it, lWidth, tWidth);
            } else if (it.xType === "select") {
                tHtml = prepareSelect(it, lWidth, tWidth);
            } else if (it.xType === 'button') {
                tHtml = prepareButton(it, lWidth, tWidth);
            } else if (it.xType === 'buttons') {
                tHtml = prepareButtons(it, lWidth, tWidth);
            } else if (it.xType === 'textArea') {
                tHtml = prepareTextArea(it, lWidth, tWidth);
            } else if (it.xType === 'label') {
                tHtml = prepareLabel(it, lWidth, tWidth);
            } else if (it.xType === 'date') {
                tHtml = prepareDate(it, lWidth, tWidth);
            } else if (it.xType === 'area') {
                tHtml = prepareArea(it, lWidth, tWidth);
            } else if (it.xType === 'checkInput') {
                tHtml = prepareCheckInput(it, lWidth, tWidth);
            } else if (it.xType === 'checkSelect') {
                tHtml = prepareCheckSelect(it, lWidth, tWidth);
            } else if (it.xType === 'checkDate') {
                tHtml = prepareCheckDate(it, lWidth, tWidth);
            } else if (it.xType === 'checkArea') {
                tHtml = prepareCheckArea(it, lWidth, tWidth);
            }
            html += tHtml;

            if (it.isPlugin) {
                plugins.push(it);
            }
        }
        html += '</div>';
        return html;
    }

    //初始化插件,包括下列选择组件,时间选择组件,城市级联组件
    function initPlugin(plugins) {
        for (var i = 0; i < plugins.length; i++) {
            var item = plugins[i];
            if (item.xType === "select" || item.xType === "checkSelect") {
                initChosen(item);
            } else if (item.xType === "date" || item.xType === "checkDate") {
                initLayDate(item);
            } else if (item.xType === "area" || item.xType === "checkArea") {
                initArea(item);
            }
        }
    }

    function prepareHidden(it) {
        var html = "";
        html += '<input ' + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + ' type = "hidden" > ';
        return html;
    }

    function prepareText(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<input ' + (it.maxLength ? ' maxlength="' + it.maxLength + '"' : '') + (it.readonly ? ' readonly="readonly"' : '')
            + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + (it.lightUp ? ' class="form-control lightUp "' : 'class="form-control"') + ' type="text">';
        html += '</div>';
        return html;
    }


    function prepareSelect(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<select data-placeholder="选择..." class="form-control" ' + (it.width ? ' style="width:' + it.width + 'px;"' : ' style="width:100%;"')
            + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + (it.disabled ? ' disabled="' + it.disabled + '"' : '') + ' >';

        //设置“请选择”下拉值
        html += '<option value="" >请选择...</option>';
        if (it.data) {
            for (var m = 0; m < it.data.length; m++) {
                if (it.displayField && it.valueField) {
                    if (it.defaultValue === it.data[m][it.valueField]) {
                        html += '<option value="' + it.data[m][it.valueField] + '" selected = "selected" name="' + it.data[m][it.displayField] + '">' + it.data[m][it.displayField] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m][it.valueField] + '" name="' + it.data[m][it.displayField] + '">' + it.data[m][it.displayField] + '</option>';
                    }
                } else {
                    if (it.defaultValue === it.data[m]['value']) {
                        html += '<option value="' + it.data[m]['value'] + '" selected = "selected" name="' + it.data[m]['name'] + '">' + it.data[m]['name'] + '</option>';
                    } else {
                        html += '<option value="' + it.data[m]['value'] + '" name="' + it.data[m]['name'] + '">' + it.data[m]['name'] + '</option>';
                    }
                }
            }
        } else if (it.url) {
            $.ajax({
                url: it.url,
                type: "post",
                dataType: "json",
                async: it.async,
                success: function (result) {
                    if (result.error === 1) {
                        var record = result["rows"];
                        for (var n = 0; n < record.length; n++) {
                            if (it.displayField && it.valueField) {
                                if (it.defaultValue === record[n][it.valueField]) {
                                    html += '<option value="' + record[n][it.valueField] + '" selected = "selected" >' + record[n][it.displayField] + '</option>';
                                } else {
                                    html += '<option value="' + record[n][it.valueField] + '" >' + record[n][it.displayField] + '</option>';
                                }
                            } else {
                                if (it.defaultValue === record[n]['value']) {
                                    html += '<option value="' + record[n]['value'] + '" selected = "selected">' + record[n]['name'] + '</option>';
                                } else {
                                    html += '<option value="' + record[n]['value'] + '" >' + record[n]['name'] + '</option>';
                                }
                            }
                        }
                    }
                }
            });
        }

        html += '</select></div>';
        return html;
    }

    function prepareCheckBox(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        for (var i = 0; i < it["checkboxes"].length; i++) {
            var item = it["checkboxes"][i];
            html += '<input type="checkbox" ' + (item.disabled ? ' disabled="disabled"' : '') + (item.checked ? ' checked="checked"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + '>' + (item.text ? item.text : '');
        }

        html += '</div>';
        return html;
    }

    function prepareRadio(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        for (var i = 0; i < it["radios"].length; i++) {
            var item = it["radios"][i];
            html += '<input type="radio" ' + (item.checked ? ' checked="checked"' : '') + (item.disabled ? ' disabled="disabled"' : '')
                + (it.name ? ' name="' + it.name + '"' : '') + '>' + (item.text ? item.text : '');
        }
        html += '</div>';
        return html;
    }

    function prepareButton(it, lWidth, tWidth) {
        var html = "";
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<button type="button" ' + (it.btnClass ? 'class="btn ' + it.btnClass + '"' : 'class="btn  btn-default"' ) + '>' + it.title + '</button>';
        html += '</div>';
        return html;
    }

    function prepareButtons(it, lWidth, tWidth) {
        var html = "";
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        for (var i = 0; i < it["buttons"].length; i++) {
            var item = it["buttons"][i];
            html += '<button type="button" ' + (item.id ? 'id="' + item.id + '"' : '' )
                + (item.btnClass ? 'class="btn  ' + item.btnClass + '"' : 'class="btn  btn-default"' ) + '>' + item.text + '</button>';
        }
        html += '</div>';
        return html;
    }

    function prepareTextArea(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<textarea ' + (it.maxLength ? ' maxlength="' + it.maxLength + '"' : '') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.readonly ? ' readonly="' + it.readonly + '"' : '') + (it.name ? ' name="' + it.name + '"' : '')
            + ' class="form-control" ' + (it.cls ? "style=" + it.cls : "") + '></textarea>';
        html += '</div>';
        return html;
    }

    function prepareLabel(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>' +
            '<span  ' + (it.spanClass ? 'class="' + it.spanClass + ' form-text "' : 'class="form-text"' ) + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + '>' + it.defaultValue + '</span></div>';
        return html;
    }

    function prepareDate(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<input ' + (it.readonly ? ' readonly="readonly"' : '')
            + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
        html += '</div>';
        return html;
    }

    function prepareArea(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':</label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
        html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
            + (it.name ? ' name="' + it.name + '"' : '') + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"')
            + (it.cls ? "style=" + it.cls : "") + (it.id ? ' id="' + it.id + '"' : '') + '>';
        if (it.showDetail) {
            html += '<input placeholder="地址详情"' + (it.maxlength ? ' maxlength="' + it.maxLength + '"' : '')
                + (it.dReadonly ? ' readonly="readonly"' : '') + (it.dDefaultValue ? ' value="' + it.dDefaultValue + '"' : 'value=""')
                + (it.dId ? ' id="' + it.dId + '"' : '') + (it.dName ? ' name="' + it.dName + '"' : '')
                + (it.dClass ? ' class="' + it.dClass + '"' : 'class="form-control"') + '>';
        }
        html += '</div>';
        return html;
    }

    function prepareCheckInput(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':';
        if (!it.disabled) {
            if (it.checked) {
                html += '<input type="checkbox" checked></label>';
            } else {
                html += '<input type="checkbox"></label>';
            }
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
            if (it.checked) {
                html += '<input ' + (it.maxLength ? ' maxlength="' + it.maxLength + '"' : '')
                    + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                    + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
            } else {
                html += '<input  readonly="readonly" ' + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                    + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
            }
            html += '</div>';
        } else {
            html += '<input type="checkbox" disabled></label>';
        }
        return html;
    }

    function prepareCheckSelect(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span class="red">*</span>';
        }
        html += it.title + ':';
        if (!it.disabled) {
            if (it.checked) {
                html += '<input type="checkbox" checked></label>';
            } else {
                html += '<input type="checkbox"></label>';
            }
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
            if (it.checked) {
                html += '<select data-placeholder="选择..." class="chosen-select" '+ (it.id ? ' id="' + it.id + '"' : '')
                    + (it.name ? ' name="' + it.name + '"' : '') +' >';
            } else {
                html += '<select data-placeholder="选择..." disabled class="chosen-select" '+ (it.id ? ' id="' + it.id + '"' : '')
                    + (it.name ? ' name="' + it.name + '"' : '') + ' >';
            }
            html += '<option value="" >请选择...</option>';
            if (it.data) {
                for (var m = 0; m < it.data.length; m++) {
                    if (it.displayField && it.valueField) {
                        if (it.defaultValue == it.data[m][it.valueField]) {
                            html += '<option value="' + it.data[m][it.valueField] + '" selected = "selected" >' + it.data[m][it.displayField] + '</option>';
                        } else {
                            html += '<option value="' + it.data[m][it.valueField] + '" >' + it.data[m][it.displayField] + '</option>';
                        }
                    } else {
                        if (it.defaultValue == it.data[m]['value']) {
                            html += '<option value="' + it.data[m]['value'] + '" selected = "selected">' + it.data[m]['name'] + '</option>';
                        } else {
                            html += '<option value="' + it.data[m]['value'] + '" >' + it.data[m]['name'] + '</option>';
                        }
                    }
                }
            } else if (it.url) {
                $.ajax({
                    url: it.url,
                    type: "post",
                    dataType: "json",
                    async: it.async,
                    success: function (result) {
                        if (result.error == 1) {
                            var record = result["rows"];
                            for (var n = 0; n < record.length; n++) {
                                if (it.displayField && it.valueField) {
                                    if (it.defaultValue == record[n][it.valueField]) {
                                        html += '<option value="' + record[n][it.valueField] + '" selected = "selected" >' + record[n][it.displayField] + '</option>';
                                    } else {
                                        html += '<option value="' + record[n][it.valueField] + '" >' + record[n][it.displayField] + '</option>';
                                    }
                                } else {
                                    if (it.defaultValue == record[n]['value']) {
                                        html += '<option value="' + record[n]['value'] + '" selected = "selected">' + record[n]['name'] + '</option>';
                                    } else {
                                        html += '<option value="' + record[n]['value'] + '" >' + record[n]['name'] + '</option>';
                                    }
                                }
                            }
                        }
                    }
                });
            }
            html += '</select></div>';
        } else {
            html += '<input type="checkbox" disabled></label>';
        }
        return html;
    }

    function prepareCheckDate(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span style="color:red">*</span>';
        }
        html += it.title + ':';
        if (!it.disabled) {
            if (it.checked) {
                html += '<input type="checkbox" checked></label>';
            } else {
                html += '<input type="checkbox"></label>';
            }
            html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';
            if (it.checked) {
                html += '<input '+ (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
                    + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
            } else {
                html += '<input  readonly' + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""')
                    + (it.id ? ' id="' + it.id + '"' : '') + (it.name ? ' name="' + it.name + '"' : '') + ' class="form-control">';
            }
            html += '</div>';
        } else {
            html += '<input type="checkbox" disabled></label>';
        }
        return html;
    }

    function prepareCheckArea(it, lWidth, tWidth) {
        var html = "";
        html += '<label ' + (it.labelClass ? ' class="' + it.labelClass + ' control-label"' : 'class="col-xs-' + lWidth + ' control-label"') + ' >';
        if (it.required) {
            html += '<span style="color:red">*</span>';
        }
        html += it.title + ':<input type="checkbox" value=""></label>';
        html += '<div ' + (it.textClass ? ' class="' + it.textClass + '"' : 'class="col-xs-' + tWidth + '"') + '>';

        html += '<input ' + (it.readonly ? ' readonly="readonly"' : '') + (it.defaultValue ? ' value="' + it.defaultValue + '"' : 'value=""') + (it.id ? ' id="' + it.id + '"' : '')
            + (it.name ? ' name="' + it.name + '"' : '') + (it.iClass ? ' class="' + it.iClass + '"' : 'class="form-control"') + (it.cls ? "style=" + it.cls : "") + '>';


        if (it.showDetail) {
            html += '<input placeholder="地址详情"' + (it.dReadonly ? ' readonly="readonly"' : '') + (it.dDefaultValue ? ' value="' + it.dDefaultValue + '"' : 'value=""') + (it.dId ? ' id="' + it.dId + '"' : '')
                + (it.dName ? ' name="' + it.dName + '"' : '') + (it.dClass ? ' class="' + it.dClass + '"' : 'class="form-control"')
                + (it.dCls ? "style=" + it.dCls : "style=" + it.cls) + '>';
        }
        html += '</div>';
        return html;
    }
    component.form = Form;
})($);