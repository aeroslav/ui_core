//---Objects---
var app = {
	iterate: function(o) { //--function for logging objects
		var propStr = '';
		console.log(typeof o); //typeof returns string with type of operand
		if (typeof o == 'object') {
			if (o instanceof Array) {
				console.log('array');
				console.log('-----=====-----');
				return false;
			}

			if ((o !== null) && (Object.getOwnPropertyNames(o).length>0)) { //Object.getOwnPropertyNames(obj) - returns enumerable and non-enumerable own properties of obj
				for (prop in o) {
					if (o.hasOwnProperty(prop)) {
						if (o[prop] instanceof  Array) { //'a instanceof b' checks if 'a' has prototype 'b' in its prototype chain
							propStr = prop + ' = ' + o[prop].join(',');
						} else {
							propStr = prop + ' = ' + o[prop];
						}
						console.log(propStr + ' - ' + typeof o[prop]);
					}
				}
			} else {
				console.log('EMPTY');
			}
		}
		console.log('-----=====-----');
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