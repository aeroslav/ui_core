//---Arrays---
var app = {
    arrOut: function(a) {
        var result = '[';

        if (!(a instanceof Array)) {
            console.log(a);
            return false;
        };
        a.forEach(function(el){ //-forEach(el,ind,arr) - iterate through all el-s of array and apply callback fn to them (ES5)
            if (el instanceof Array) {
                result += app.arrOut(el) + ',';
            } else {
                result += el + ',';
            };
        });
        result = result.slice(0,-1);
        result += ']';
        return result;
    },
    sum: function () { //refactor to sum arrays
        var result = Array.prototype.filter.call(arguments, function(el){
            if (typeof el == 'number') {
                return true;
            } else {
                return false;
            };
        }),
        sum = 0;
        sum = result.reduce(function(sum, el){
            return sum + el;
        });
        return sum;
    }
};
//debugger; -- can helps debug js; pauses scripts if devtools is open

var arr = [
    [1,2,3],
    [[1,2],2,3],
    [1,[1,2,3,[1,2]],3]
];
console.log('Multidimensional array output by default');
console.log(arr);
//>[Array[3], Array[3], Array[3]]
console.log('Multidimensional array output with custom method');
console.log(app.arrOut(arr));
//> arr open
//> >1
//> >2
// etc.
console.log('----------------------------toString');
console.log(arr.toString()); //> 1,2,3,1,2,2,3,1,1,2,3,1,2,3

var a1 = [1,2,3],
    a2 = ['q','w','e'],
    obj = {
        prop1 : 1,
        prop2 : 2
    },
    tmp = null;


//-concat
// concatenates array and arguments; if arg is array - adds its elements one by one; if arg is object, copies reference to it
console.log('----------------------------concat');
console.log(a1.concat('[',a2,']'));
//> [1, 2, 3, "[", "q", "w", "e", "]"]
console.log('obj.prop1=='+obj.prop1);
tmp = a1.concat(obj);
console.log(tmp);
tmp[3].prop1 = 3;
console.log('obj.prop1=='+obj.prop1);


//-join
// joins array elements into string; separator is optional
console.log('----------------------------join');
console.log(arr.join('%'));
//> 1,2,3%1,2,2,3%1,1,2,3,1,2,3

//-push
// adds its arguments to the end of array, returns new length of array; adds elements 'as is'
console.log('----------------------------push');
a1.push('a');
console.log(a1);
//> [1, 2, 3, "a"]
a1.push(a2);
console.log(app.arrOut(a1));
//> [1,2,3,a,[q,w,e]]

//-pop
// 'cuts' last element of array and return it
console.log('----------------------------pop');
console.log(a1.pop());
//> ["q", "w", "e"]
console.log(a1);
//> [1, 2, 3, "a"]

//-reverse
// reverses array
console.log('----------------------------reverse');
console.log(a1.reverse());
//> ["a", 3, 2, 1]

//-shift
// 'cuts' first element of array and return it
console.log('----------------------------shift');
console.log(a1.shift());
//> a
console.log(a1);
//> [3, 2, 1]

//-unshift
// adds its arguments to the end of array, returns new length of array; adds elements 'as is'
console.log('----------------------------unshift');
a1.unshift('z');
console.log(a1);
//> ["z", 3, 2, 1]
a1.unshift(a2);
console.log(app.arrOut(a1));
//> [[q,w,e],z,3,2,1]

//-slice([begin = 0 [, end = arr.length]])
// returns copy of a part of an array; for objects, copies reference to it
// 'begin' and 'end' could be negative, which means offset from last el
console.log('----------------------------slice');
tmp = a1.slice(0,3);
console.log(app.arrOut(tmp));
//> [[q,w,e],z,3]
tmp[0][0] = 'z';
console.log(app.arrOut(tmp));
//> [[z,w,e],z,3]

//-splice(startDel, count[, items])
// deletes 'count' elements starting from startDel, and insert 'items' to this position; returns cutted items
console.log('----------------------------splice');
tmp = a1.splice(0,2,5,4);
console.log(app.arrOut(tmp));
//> [[z,w,e],z]
console.log(app.arrOut(a1));
//> [5,4,3,2,1]
a1 = a1.concat(tmp);
console.log(app.arrOut(a1));
//> [5,4,3,2,1,[z,w,e],z]

//-sort(cmp(a,b))
// if no comparing fn provided, sort items by converting els to strings: ('b,'c','a') -> ('a','b','c'), but (10,7,50) -> (10,50,7)
// compare fn works like this: if cmp<0 - 'a' comes before 'b'; if cmp==0 - no changes; cmp>0 - 'b' comes before 'a'
// cmp fn must always return the same value for the same 'a' and 'b'
console.log('----------------------------sort');
a1.push(10);
tmp = a1.slice(); //slice w/o args can clone whole array (not just copy reference to it)
tmp.sort();
console.log(app.arrOut(tmp));
//> [1,10,2,3,4,5,z,[z,w,e]]
tmp=a1.slice();
tmp.push('a','A','d','D');
console.log(app.arrOut(tmp));
//> [5,4,3,2,1,[z,w,e],z,10,a,A,d,D]
tmp.sort(function(a,b){
    if ( (typeof a == 'number')&&(typeof b == 'number' )) {
        if (a>b) {
            return 1
        } else {
            return -1
        }
    } else  {
        if ([a,b].sort()[0] == a) {
            return -1
        } else {
            return 1
        }
    };
});
console.log(app.arrOut(tmp));
//> [1,2,3,4,5,10,A,D,a,d,z,[z,w,e]]

//-indexOf(searchFor[, fromInd = 0]) (ES5)
// searches for index of first el which is strictly equal (===) to 'searchFor', starting from 'fromInd' (optional) (-1 if no such el)
console.log('----------------------------indexOf');
console.log(a1.indexOf(2));
//> 3

//-lastIndexOf(searchFor[, fromInd = arr.length]) (ES5)
// searches for index of last el which is strictly equal (===) to 'searchFor', starting from 'fromInd' (optional) and going backwards (-1 if no such el)
console.log('----------------------------LastIndexOf');
console.log(a1.lastIndexOf('z'));
//> 6

//-every(el,ind,arr) (ES5)
// tests if every el is passes test in callback; if callback return falsy (false, 0, '', null, undefined, NaN) - all fn returns false
//-some(el,ind.arr) (ES5)
// tests if some els passes test in callback; if callback returns falsy for ALL els -> fn returns false, else -> true
console.log('----------------------------every and some');
console.log(a1.every(function(el){
    if (el=='falsy') {
        return false;
    } else {
        return true;
    }
}));
//> true
console.log(a1.every(function(el){
    if (el=='z') {
        return false;
    } else {
        return true;
    }
}));
//> false
console.log(a1.some(function(el){
    if (el=='z') {
        return true;
    } else {
        return false;
    }
}));
//> true
console.log(a1.some(function(el){
    if (el=='zooo!') {
        return true;
    } else {
        return false;
    }
}));
//> false

//-map (ES5)
// creates new array by calling callback on every el
console.log('----------------------------map');
function mapInc(el,i,arr){
    if (el instanceof Array) {
        return el.map(mapInc);
    } else
        return el+1;
};
a1 = a1.map(mapInc);
console.log(app.arrOut(a1));
//> [6,5,4,3,2,[z1,w1,e1],z1,11]

//-filter (ES5)
// creates new array by filtering, using callback for that test
console.log('----------------------------filter');
a1 = a1.filter(function(el){
    if (el instanceof Array) {
        return false;
    } else {
        return el;
    }
})
console.log(app.arrOut(a1));
//> [6,5,4,3,2,z1,11]

//-reduce (ES5)
// execute callback on every el and accumulate result to accumulator
console.log('----------------------------reduce');
tmp = 0;
tmp = a1.reduce(function(tmp,el){
    if (typeof el == 'number') {
        return tmp + el;
    } else
        return tmp;
});
console.log(tmp);
//> 31

// methods above are not works with collections, like 'arguments' inside function.
//to use them, we need to 'call' them.
console.log('----------------------------call methods for hash');
console.log(app.sum(1,2,3));