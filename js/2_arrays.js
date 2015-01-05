//---Arrays---
var app = {
    arrayOutput: function(a) {
        var result = '[';

        if (!(a instanceof Array)) {
            console.log(a);
            return false;
        };
        a.forEach(function(el){
            if (el instanceof Array) {
                result += app.arrayOutput(el) + ',';
            } else {
                result += el + ',';
            };
        });
        result = result.slice(0,-1);
        result += ']';
        return result;
    }

    //debugger; -- can helps debug js; pauses scripts if devtools is open
};

var arr = [
    [1,2,3],
    [[1,2],2,3],
    [1,[1,2,3,[1,2]],3]
];
console.log('Multidimensional array output by default');
console.log(arr);
//>[Array[3], Array[3], Array[3]]
console.log('Multidimensional array output with custom method');
console.log(app.arrayOutput(arr));
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
console.log(app.arrayOutput(a1));
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
console.log(app.arrayOutput(a1));
//> [[q,w,e],z,3,2,1]

//-slice([begin = 0 [, end = arr.length]])
// returns copy of a part of an array; for objects, copies reference to it
// 'begin' and 'end' could be negative, which means offset from last el
console.log('----------------------------slice');
tmp = a1.slice(0,3);
console.log(app.arrayOutput(tmp));
//> [[q,w,e],z,3]
tmp[0][0] = 'z';
console.log(app.arrayOutput(tmp));
//> [[z,w,e],z,3]

//-splice