$.Class : Object Oriented Class plugin for jQuery
=================================================

This is a Mootools-like class implementation for jQuery in just 37 NCLOC.

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

superegg.implement({ // aop style modifier
  monty: function() { return this; },
  python: function() { return this; }
});

superegg.monty().python().spam();

```

Todo
----

* method wrap support for protected and hidden methods.
* Mutators (Implements)
* hasOwnProperty checks.

Licence
-------
Please read the LICENCE file.

