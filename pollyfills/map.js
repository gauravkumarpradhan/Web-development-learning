// Create a map() pollyfill

const nums = [1, 2, 3, 4];

Array.prototype.myMap = function (callback) {
    const newArray = [];
    this.forEach((arrayElement) => {
        newArray.push(callback(arrayElement));
    });

    return newArray;
};
// const newResult = nums.myMap((ele => Math.pow(ele, 2)));

// Create a pollyfill for Array Filter

Array.prototype.myFilter = function (callback) {
    const newArray = [];
    this.forEach((element) => {
        if (callback(element)) {
            newArray.push(element);
        }
    });
    return newArray;
};


// const filteredResult = nums.myFilter((ele => ele < 2));


// Create your own reduce method
// Syntax of reduce method --> myArray.reduce(() => {}, intialValue);

Array.prototype.myReduce = function (callback, intialValue) {
    let valueAccumaltor = intialValue;
    this.forEach((element, index) => {
        valueAccumaltor = valueAccumaltor ? callback(valueAccumaltor, element, index, this) : this[0];
    });
    return valueAccumaltor;
}

// ``````console.log(nums.myReduce((initialValue, currElement) => initialValue += currElement));``````


// Create a Pollyfill for call

// How normally call() function works

const car1 = {
    color: "red",
    brand: "Yamaha"
}

function purchaseCar(country, state) {
    console.log(`We are buying a car whose color is ${this.color} and brand name is ${this.brand} in ${country} and state is ${state}`)

}

// purchaseCar.call(car1, "India", "Jharkhand");

Function.prototype.myCall = function (referenceObject = {}, ...args) {
    if (typeof this !== "function") {
        throw new Error(this, " It is not Callable");
    }
    referenceObject.__proto__ = { ...referenceObject.__proto__, fn: this };
    referenceObject.fn();
}

// purchaseCar.myCall(car1, "Nepal", "Jharkhand");

// Create Pollyfill for apply method

Function.prototype.myApply = function (context, args) {
    context.__proto__ = { ...context.__proto, fn: this };
    context.fn(...args);
}

// purchaseCar.myApply(car1, ["SINGAPORE", "MALASIA"]);

// purchaseCar.apply(car1, ["India", "Singapore"]);

// Create a pollyfill for bind

Function.prototype.myBind = function (context, ...args) {
    context.__proto__ = { ...context.__proto, fn: this };
    return () => context.fn(...args);
}

// purchaseCar.myBind(car1, "ZYX", "PQ")();


// Create your own lodash once method

function once(callback, context) {
    let callCount = 0;

    return function () {
        if (callCount === 0) {
            callCount++;
            return callback.apply(context, arguments);
        }
    }
}

const hold = once(function (arguments) {
    console.log("Args ", arguments)
    console.log("Hello ", this.name)
}, { name: "Garuav" });

// hold([2, 3]);
// hold();
// hold();
// hold();



