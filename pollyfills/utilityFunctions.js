function myMemoize(callbackFunction, context) {
    let cachedArgs = "";
    return function (...args) {
        if (JSON.stringify(args) !== cachedArgs) {
            cachedArgs = JSON.stringify(args);
            console.log("This ", this);
            return callbackFunction.apply(context || this, args);
        } else {
            throw new Error("The numbers provided are same, so there is no recruiment of computing");
        }
    }
}


const clumsySquare = (num1, num2) => {
    for (let i = 1; i <= 10000000; i++) {
    }

    return num1 * num2;
}

// const compute = myMemoize(clumsySquare);
// console.time("First call");
// console.log(compute(9467, 7649));
// console.timeEnd("First call");

// console.time("Second call");
// console.log(compute(9467, 7649));
// console.timeEnd("Second call");

