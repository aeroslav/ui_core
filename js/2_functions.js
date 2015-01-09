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
console.log('\nSCOPE');
var s = 'declared globally';
var b = (function scopeTest(){
    var s = 'declared in scopeTest', //redefine var s for inner fn scope
        s2 = 'declared in scopeTest';
    console.log('s inside scopeTest ==', s);
    //> s inside scopeTest == declared in scopeTest
    console.log('s2 inside scopeTest ==', s2);
    //> s2 inside scopeTest == declared in scopeTest

    function scopeTestInner(a) {
        console.log('s2 inside scopeTestInner ==', s2);
        //> s2 inside scopeTestInner == declared in scopeTest
        return a + ' --this added in scopeTestInner--';
    };
    console.log('scopeTestInner ==', scopeTestInner('passed argument'));
    //> scopeTestInner == passed argument --this added in scopeTestInner--

    var scopeTestOnlyInner = function (s) {
        return s + ' --this added in scopeTestOnlyInner--';
    };
    console.log('scopeTestOnlyInner ==', scopeTestOnlyInner('passed argument'));
    //> scopeTestOnlyInner == passed argument --this added in scopeTestOnlyInner--
    return scopeTestInner;
})();

//console.log('s2 ==', s2); - throw error 's2 is not defined'
//scopeTestInner(s); - error, this fn doesn't present in current scope

console.log('returned From Scope Test ==', b(s));
//> returnedFromScopeTest == declared globally --this added in scopeTestInner--

//--CLOSURE
console.log('\nCLOSURE');
function summator(startSum){
    var currentSum = startSum;
    return function(toSum) {
        return currentSum += toSum;
    }
};
var sum1 = summator(0);
console.log(sum1(10));
console.log(sum1(2));
//> 10
//> 12

var sum2 = summator(100);
console.log(sum2(1));
console.log(sum2(2));
//> 101
//> 103