# Data types
## Objects  

### Declaration

They can be created different ways

#### Literal:
```javascript
var obj = {
    prop: 42, //property
    method: function(arg) {...} //method
};
```

#### Constructor:
```javascript
    var obj = new Object();
    var arr = new Array();
```
Custom constructor:
```javascript
function CustomConstructor(prop) {
    this.prop = prop;
    this.method = function() {
        console.log(this.prop);
    };
};
var foo = new CustomConstructor(42);
```
#### With Object.create(prototype)
```javascript
var obj = Object.create({prop: 1, prop2: 'txt'}); - есть еще аргументы
```
defineProperty

#### JSON
JavaScript Object Notation  
Format for storing data like js-object, but no methods, only properties, and all properties in "-quotes  
Only double quotes allowed
```javascript
{
    "prop1": "qwe",
    "prop2": "rty"
}
```
Objects can be serialized to a string and then restored from a string (`Date.toJSON()` and `JSON.parse()`) - problems in IE https://github.com/douglascrockford/JSON-js

### Methods

Some useful properties and methods  
* `.prototype` - prototype of object;
Prototype is other object, "parent" of object, reserve source of properties (if obj asked for property it is not have, then this property will be searched in P)  
The first ancestor of objects is `Object.prototype`  
`.getPrototypeOf()` - returns prototype of its argument  
```javascript
    console.log(Object.getPrototypeOf({}) ==  Object.prototype);
    // true
    console.log(Object.getPrototypeOf(Object.prototype));
    // null
```

* `.hasOwnProperty('prop_name')` - return true if object itself (not its prototype) contains this property
```javascript
    var obj = {
        x: 1,
        y: '2'
    };
    console.log(obj.toString());
    // -> [object Object]
    // but
    console.log(obj.hasOwnProperty('toString'));
    // -> false
```\



var o = {
    j: 123,
    r: [
    'at',
    'dhdhf',
    true],
    g: 'hello'
}


iterator(o)
o is object
is empty

is array nested
has true value


var o1
o1.prop = 'hey'
var o2


var t = o1;
t.prop = 'not hey'


o1 === o2 ?



o1.prop