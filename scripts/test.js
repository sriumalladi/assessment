
const str = 'one_two_three';
let z = str.split('_').map((e, i) => {
    if (i == 0) {
        return e.toLowerCase();
    }
    return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()
})
console.log(z);

// Implemantation memozied function

let myNewFunction = (fn, context) => {
    let res = {};
    return function (...args) {
        var argCat = JSON.stringify(args);
        if (!res[argCat]) {
            res[argCat] = fn.call(context || this, ...args)
        }

        return res[argCat]
    }

}


const clum = (num1, num2) => {
    for (let i = 1; i <= 100000000; i++) {

    }

    return num1 * num2
}


const memoized = myNewFunction(clum)

console.time("First call")
memoized(2459, 9499)
console.timeEnd("First call")

console.time("Second call")
memoized(2459, 9499)
console.timeEnd("Second call")


// Infinate currieng function

function add(a) {
    return function (b) {
        if(b) return add(a + b);
        return a;
    }
}

console.log(add(3)(4)(5)())


// Implement code

let calc = {
    total : 0,
    add(a){
        this.total += a;
        return this;
    },
    multiply(a){
        this.total *= a;
        return this;
    },
    substract(a){
        this.total -= a;
        return this;
    }
}


const result = calc.add(10).multiply(5).substract(30).add(10);

console.log(result.total , "Implemented above")

