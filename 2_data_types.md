# Data types
## Objects  
They can be created different ways
#### Literal:
```
var obj = {
    prop: 42, //property
    method: function(arg) {...}, //method
};
```

#### Constructor:
```
    var obj = new Object();
    var arr = new Array();
```
Custom constructor:
```
function CustomConstructor(prop) {
    this.prop = prop;
    this.method = function() {
        console.log(this.prop);
    };
};
var foo = new CustomConstructor(42);
```
#### With Object.create(prototype)
```
var obj = Object.create({prop: 1, prop2: 'txt'});
```

#### JSON
JavaScript Object Notation
Format for storing data like js-object, but no methods, only properties
Only double quotes allowed
```
{
    prop1: "qwe",
    prop2: "rty"
}
```
Objects can be serialized to string and then restored from string (`Date.toJSON()` and `JSON.parse()`)
