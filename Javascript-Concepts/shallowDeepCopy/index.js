// Deep Copy Shallow Copy

const object1 = {
    firstName: "Gaurav",
    lastName: "Kumar",
    classes: {
        first: "First",
        second: "Second"
    }
};

const object2 = Object.assign({}, object1);   // creating a new object by keeping the same memory reference
// object2.firstName = "Saurav";
// console.log("First Name ", object1);

object2.classes.first = "third";
console.log("Object 1 ", object1)

/// Object.assign({}, object) or {...} creates a new object and helps out in deep copy but when it is linear, but if we have a nested Object that we want to copy then these things won't work

const array1 = [1, 2, [13, 14]];
const array2 = [...array1];
array2[2][1] = 121212;
console.log("Array1 value is ", array1);