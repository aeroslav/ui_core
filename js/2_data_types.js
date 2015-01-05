//---Objects---
var app = {
    detectType: function (o) {
        if (typeof o == 'object') { //typeof returns string with type of operand
            if (o instanceof Array) { //'a instanceof b' checks if 'a' has prototype 'b' in its prototype chain
                return 'array'
            } else if (o == null) {
                return 'null'
            } else {
                return 'object'
            }
        } else {
            return typeof o;
        };
    },
    iterate: function(o) { //--function for logging objects
        var propStr = '';
        var oType = this.detectType(o);

        console.log('-----=====-----');
        console.log(oType);

        if (oType !== 'object') {
            return false;
        } else if (Object.getOwnPropertyNames(o).length>0) {
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    if (o[prop] instanceof  Array) {
                        propStr = prop + ' = ' + o[prop].join(',');
                    } else {
                        propStr = prop + ' = ' + o[prop];
                    }
                    console.log(propStr + ' - ' + typeof o[prop]);
                }
            };
        } else {
            console.log('EMPTY');
        };
    },
    /////////////!!!!!!!!!!!!!!!!!!!
    arrayOutput: function(a) {
        var nesting = arguments[1]?arguments[1]:0; //inside function we can use local array 'arguments' with all args passed to function
        var indent = '';                           //(not only declarated, but all that really passed)
        
        //debugger; -- can help debug js; pause scripts if devtools is open

        //console.log(nesting);
        for (var i = 0; i<nesting; i++)
            indent+='>';

        console.log('arr open');
        if (!(a instanceof Array)) {
            console.log(a);
            return false;
        };
        for (var i = 0; i<a.length; i++) {
            if (a[i] instanceof Array) {
                this.arrayOutput(a[i], nesting+1);
            } else {
                console.log(indent+' '+a[i]);
            }
        };
        console.log('arr close');
    }
}
//-literal declaration
var objEmpty = {};
console.log('---objEmpty');
app.iterate(objEmpty);
//>object
//>EMPTY

var objLiteral = {
    prop1: 1,
    prop2: 'qwe',
    prop3: ['1','a',true],
    prop4: true
};
console.log('---objLiteral');
app.iterate(objLiteral);
//>object
//>prop1 = 1 - number
//>prop2 = qwe - string
//>prop3 = 1,a,true - array
//>prop4 = true - boolean

//-constructor
var objObj = new Object();
console.log('---objObj');
app.iterate(objObj)
//>object
//>EMPTY

//-custom constructor
function CustomObj(prop1, prop2) {
    this.prop1 = prop1;
    this.prop2 = prop2;
}
//constructor name starts with Uppercase
var customObj = new CustomObj(42,'qwe');
console.log('---customObj');
app.iterate(customObj)
//>object
//>prop1 = 42 - number
//>prop2 = qwe - string

//-Object.create(prototype)
//Object.create(prototype[, propertiesObject])
var objCreate = Object.create(CustomObj.prototype, {
    prop3: {
        value: 10, //properties below this is false by default 
        writable: true,
        enumerable: true,
        configurable: true
    }
});
console.log('---objCreate');
app.iterate(objCreate)
//>object
//>prop3 = 10 - number

//Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(CustomObj.prototype, "hiddenProp", {enumerable: false, value: "i am hidden"});
//.hasOwnProperty(prop) - true if prop belongs to obj (not to its prototype)
console.log('value of hiddenProp = '+customObj.hiddenProp);
console.log('-----=====-----');
// value of hiddenProp = i am hidden

var oOne = {
    prop: '123'
}
var oTwo = Object.create(oOne);
console.log(oTwo.prop) //>123 - value taken from prototype chain
oTwo.prop = 'new value'
console.log(oTwo.prop) //>"new value" - value found right in this object

var arr = [1,2,3,5],
    number = 1,
    str = 'str',
    strObj = new String('str');
app.iterate(arr);
//>array
app.iterate(number);
//>number
app.iterate(str);
//>string
app.iterate(strObj);
//>object
//>0 = s - string
//>1 = t - string
//>2 = r - string

console.log('+++++++++++++++++++++');
console.log('+++++++++++++++++++++');

console.log('some fun with objects');
var o1 = { //reference to object
    prop1: 1,
    prop2: 2
};
var o2 = o1; //reference to the same object as o1
var o3 = { //it's reference to object identical to o1, but it's another object
    prop1: 1,
    prop2: 2
};

console.log('o1 - ', o1);
console.log('o2 - ', o2);
console.log('o3 - ', o3);
console.log('o1 === o2 - ', o1 === o2);
console.log('o1 === o3 - ', o1 === o3);

o1.prop1 = 42;
o2.prop2 = 42;
console.log('o1 - ', o1);
console.log('o2 - ', o2);
console.log('o3 - ', o3);
console.log('o1 === o2 - ', o1 === o2);
console.log('o1 === o3 - ', o1 === o3);


console.log('some fun with arrays');
var a1 = [1,2,3],
    a2 = a1,
    a3 = [1,2,3];

console.log('a1=', a1);
console.log('a2=', a2);
console.log('a3=', a3);
console.log('a1===a2 - ', a1===a2);
console.log('a1===a3 - ', a1===a3);

console.log(' ');
var multiDimArr = [
    [1,2,3],
    [[1,2],2,3],
    [1,[1,2,3,[1,2]],3]
];
console.log('Multidimensional array output by default');
console.log(multiDimArr);
//>[Array[3], Array[3], Array[3]]
console.log('Multidimensional array output with custom method');
app.arrayOutput(multiDimArr);
//> arr open
//> >1
//> >2
// etc.