$.Class : Object Oriented Class plugin for jQuery
=================================================

This is a Mootools-like class implementation for jQuery in just a few NCLOC.

The Big Picture
---------------

```javascript
var Egg = new $.Class({
    initialize: function() { /* constructor */ },
});

Egg.extend({ // extend class prototype
    spam: function() { return 'holy mother of gosh'; }
});

var SuperEgg = new $.Class({
    Extends: Egg,
    spam: function() { return "spam spam spam"; }
});

var egg = new Egg();

egg.spam(); // 'holy mother of gosh'

egg.implement({ // aop style modifier
    monty: function() { return this; },
    python: function() { return this; }
});

egg.monty().python().spam();

var superEgg = new SuperEgg();

superEgg.spam();

superEgg.implement({ // aop style modifier
    monty: function() { return this; },
    python: function() { return this; }
});

superEgg.monty().python().spam();

```

### Mutators

#### Use case 1

If you want to apply a same functionnality to sereval classes, you can use a mutator as a mixin.

```javascript
// A simple logger shortcut
$.Class.Mutators.BrowserLogger = function (allow) {
    if (!allow) return;
    this.prototype.log = function (msg) {
        console.log((new Date()) + " - " + msg);
    }
};

// Define a class who use BrowserLogger
var Loggable = new $.Class({
    BrowserLogger: true,
});

var a = new Loggable();
a.log("holy mother of gosh");

```

#### Use case 2

Mutators cam also be used to wrap existing methods in order to control or monitor inputs and outputs of theses methods.
For instance, we want to trace each class instanciation (each call to `initialize` is more precise) :

```javascript
$.Class.Mutators.Trace = function(allow) {
    if(!allow) return;

    var oldInit = this.prototype.initialize;
    var $instance = this;
    $instance.prototype.initialize = function() {
        console.log("new done");
        oldInit.apply(this, arguments);
    };
};

var Egg = new $.Class({
    initialize: function() {},
	Trace: true,
});

var egg1 = new Egg();
var egg2 = new Egg();
var egg3 = new Egg();

```

### Parent reference

```javascript
var Egg = new $.Class({
	initialize: function(name) {
		console.log("Egg constructor");
		this.name = name;
	},
	who: function() {
		console.log("I'm " + this.name);
	},
	crack: function() {},
});

var Chicken = new $.Class({
	initialize: function(name) {
		this.parent.initialize.call(this, name);
		console.log("Chicken constructor")
	},
	Extends: Egg,
});

e = new Egg("Bob");
e.who();
c = new Chicken("Alfred");
c.who();

```


Features
--------

* Define a basic class
* Modify methods or attributes of a class after its definition (`extend`)
* Add specific instance methods (`implement`)
* Extend existing classes (`Extends`)
* Mutators (`$.Class.Mutators.MyMutator`)

Todo
----

* method wrap support for protected and hidden methods.
* hasOwnProperty checks.
* Extend native types (by wrapping native classes) ?

Bugs
----

* The `parent.initialize()` calls (used with `Extend` and the mutators) require the `initialize` function. The initialize function must be created even if it has not been defined by user script.

Licence
-------
Please read the LICENCE file.

