// Using Bind Method

function multiply(a, b) {
    console.log("The multiplication is ", a * b);
}

// const multiplyBy2 = multiply.bind(this, 10);
// const multiplyBy3 = multiply.bind(this, 3)
// multiplyBy3(3);


// Using closure

function multiplyClose(a) {
    return function (b) {
        console.log("Closure Multiplication is ", a * b);
    }
}

multiplyClose(2)(2);

