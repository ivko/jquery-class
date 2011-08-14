(function($, window) {

    var enumerables = true, slice = Array.prototype.slice, has = Object.prototype.hasOwnProperty;
    for (var i in { toString: 1 }) { enumerables = null; }
    enumerables = (enumerables) ? [ 'hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
        'toLocaleString', 'toString', 'constructor' ] : enumerables;

    window.Function.prototype.overload = function() {
        var e = enumerables, self = this;
        return function() {
            var argc = arguments.length, argv = slice.call(arguments);
            if (0 === argc) { return this; }
            if ('string' === typeof argv[0]) { self.call(this, argv[0], argv[1]); return this; }
            for (var o in argv) for (var k in argv[o]) {
                self.call(this, k, argv[o][k]);
                if (e) for (var po in e) if (has.call(argv[o], e[po])) { self.call(this, e[po], this[e[po]]); }
            }
            return this;
        };
    };

    $.Class = function(params) {
        if ('undefined' === typeof params) { return $.noop; }
        params = ($.isFunction(params)) ? { initialize: params } : params;
        this['$instance'] = function() { return (this.initialize) ? this.initialize.apply(this, arguments) : this; };
        var $instance = this['$instance']; // hack to prevent chrome inspector lexer to display internal var...
        delete this['$instance'];
        $instance.extend = function(key, value) { this.prototype[key] = value; }.overload();
        $instance.prototype.implement = function(key, value) { this[key] = value; }.overload();
        // Extends
        if (has.call(params, "Extends")) {
            if ($.isFunction(params.Extends)) {
                $instance.extend(params.Extends.prototype);
                $instance.extend('parent', params.Extends.prototype); // unique parent
            } else if ($.isArray(params.Extends)) for(e in params.Extends) $instance.extend(params.Extends[e].prototype);
        }
        delete $instance.prototype.Extends;
        $.extend($instance.prototype, params);
        // Mutators
        for(m in $.Class.Mutators) $.Class.Mutators[m].call($instance, has.call(params, m) ? params[m] : ($.Class.MutatorsDefaults.indexOf(m) >= 0));
        return $instance;
    };

    $.Class.Mutators = {};
    $.Class.MutatorsDefaults = [];

})(jQuery, this);
