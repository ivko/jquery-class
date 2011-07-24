module('core');

test('bootstrap', function() {
	equals(true, !(undefined === window.jQuery.Class),
		'$.Class is available in global window context.');
});

module('core.native');

test('overload', function() {
	equals(true, !(undefined === Function.prototype.overload),
		'overload() native method is available in Function prototype.');
	var o = { a: null, b: null },
	fn = function(k, v) { this[k] = v; }.overload();
	fn.call(o, { a: 'z', b: 'w' });
	equals(true, ('z' === o.a && 'w' === o.b), 'overload() behavior is ok.');
});

module('$.Class');

test('instanciate', function() {
	var C = new $.Class({ t : true }), c = new C();
	equals(true, c.t, '$.Class instanciation.');
});

test('constructor', function() {
	var C = new $.Class({ initialize: function() { return { w: 'spam' }; } }), c = new C();
	equals(true, ('spam' === c.w), '$.Class constructor call.');
});
