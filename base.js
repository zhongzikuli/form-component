/*
* created by zhongzikuli<hgb102xlg@126.com> on 17/10/9.
* */
(function (window) {
    var defaultOptions = {};
    var component = function (options) {
        this.options = $.extend({}, defaultOptions, options || {});
        return this;
    }
    window.component = component;
})(window);