//---Objects---

//-literal declaration
var obj_empty = {};
console.log('---obj_empty');
iterate(obj_empty);
//>object
//>EMPTY

var obj_lit = {
	prop1: 1,
	prop2: 'qwe',
	prop3: ['1','a',true],
	prop4: true
};
console.log('---obj_lit');
iterate(obj_lit);
//>object
//>prop1 = 1 - number
//>prop2 = qwe - string
//>prop3 = [ 1,a,true ] - array
//>prop4 = true - boolean

//-constructor
var obj_Obj = new Object();
console.log('---obj_Obj');
iterate(obj_Obj)
//>object
//>EMPTY

//-custom constructor
function CustomObj(prop1, prop2) {
	this.prop1 = prop1;
	this.prop2 = prop2;
}
//constructor name starts with Uppercase
var obj_cons = new CustomObj(42,'qwe');
console.log('---obj_cons');
iterate(obj_cons)
//>object
//>prop1 = 42 - number
//>prop2 = qwe - string

//-Object.create(prototype)
//Object.create(prototype[, propertiesObject])
var obj_create = Object.create(CustomObj.prototype, {
	prop3: {
		value: 10, //properties below this is false by default 
		writable: true,
		enumerable: true,
		configurable: true
	}
});
console.log('---obj_create');
iterate(obj_create)
//>object
//>prop3 = 10 - number

//Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(CustomObj.prototype, "hiddenProp", {enumerable: false, value: "i am hidden"});
//.hasOwnProperty(prop) - true if prop belongs to obj (not to its prototype)
console.log('value of hiddenProp = '+obj_cons.hiddenProp);
// value of hiddenProp = i am hidden

//--function for logging objects
function iterate(o) {
	console.log(typeof o); //typeof returns string with type of operand
	if (typeof o == 'object') {
		if ((o !== null) && (Object.getOwnPropertyNames(o).length>0)) { //Object.getOwnPropertyNames(obj) - returns enumerable and non-enumerable own properties of obj
			var propStr = '';
			for (prop in o) {
				if (o.hasOwnProperty(prop)) {
					if (o[prop] instanceof  Array) { //'a instanceof b' checks if 'a' has prototype 'b' in its prototype chain
						propStr = prop + ' = [ ' + o[prop] + ' ] - array';
					} else {
						propStr = prop + ' = ' + o[prop] + ' - ' + typeof o[prop];
					}
					console.log(propStr);
				}
			}
		} else {
			console.log('EMPTY');
		}
	}
	console.log('-----=====-----');
};

//-