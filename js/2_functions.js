//---FUNCTIONS AND SCOPES---
console.log('---FUNCTIONS---');

//--DEFINING FNS

//deprecated method, through Function obj
var fHi = new Function('name','return "Hi "+name'); //slow, because code evaluates when fn is being creating; scope is always global, no matter where it called
console.log(fHi('dude'));
//> Hi dude

//-fn defined, constructor assigned to var 'sum'
function sum(a,b){
    return a+b;
};
console.log(sum(1,1));
//> 2
console.log(sum.prototype.constructor);
//> function sum(a,b){
//>     return a+b;
//> }

//-fn expression of anonymous fn assigned to var 'fnMult'
var fnMult = function (a,b) {
    return a*b;
};
console.log(fnMult(2,2));
//> 4
console.log(fnMult.prototype.constructor);
//> function (a,b) {
//>     return a*b;
//> }

//anonimous fn, will execute right there and will be cleared
console.log(function (a,b){
    return a/b;
}(12,4));
//> 3

console.log('changing arguments');
var a = 1,
    obj = {
        prop: 3
    };
function changeExternalPrimitive(val){
    val = 'ext val changed';
}
console.log('before fn a == ', a);
changeExternalPrimitive(a);
console.log('after fn a == ', a);
//>  before fn a ==  1
//> after fn a ==  1

function changeExternalObj(valObj) {
    valObj.prop = 'ext obj prop changed';
}
console.log('before fn obj.prop == ', obj.prop);
changeExternalObj(obj);
console.log('after fn obj.prop == ', obj.prop);
//> before fn obj.prop ==  3
//> after fn obj.prop ==  ext obj prop changed

//--SCOPE
console.log('SCOPE');
var s = 1;
var b = (function scopeTest(){
    var s = 2, //redefine var s for inner fn scope
        sInside = 'sInside';
    console.log('s inside ==', s);

    function scopeTestInner(a) {
        console.log(sInside);
        return 10*a;
    };
    console.log('scopeTestInner ==', scopeTestInner(3));

    var scopeTestOnlyInner = function () {
        return 2*s;
    };
    console.log('scopeTestOnlyInner ==', scopeTestOnlyInner(s));
    //> scopeTestInner == 4
    return scopeTestInner;
})();
console.log('s outside ==', s);
//> 1
//console.log('sInside ==', sInside); - throw error 'sInside is not defined'

//> 2
//scopeTestInner(s); - error, this fn doesn't present in current scope
console.log('returnedFromScopeTest ==', b(s));