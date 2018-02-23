(function (window, document) {
    var defaultOptions = {};
    var component = function (options) {
        this.options = $.extend({}, defaultOptions, options || {});
        return this;
    }
    window.component = component;
})(window, document);