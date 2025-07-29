"use strict"
// this in global space
console.log(this);

// this inside a function 
function x() {
    /*
       1. The this is different from the this defined in the global scope
       2. When used in strict mode the value of this is undefined
     */
    console.log(this);
}

x();

// this inside a object's method
const student = {
    name: "Gaurav",
    printName: function () {
        console.log("Student Name is ", this.name);
    }
}

const student2 = {
    name: "Deepika"
}

// call, apply, bind methods (sharing methods)

student.printName.call(student2);
console.log(student2);

// this inside nested arrow function

const obj = {
    a: 10,
    x: () => {
        console.log(this);
    }
};

obj.x();

const obj2 = {
    a: 10,
    x: function () {
        // this value is obj2
        const y = () => {
            console.log("Enclosing Lexical Context: ", this);
        }
        y();
    }
};

obj2.x();



// how this keyword behaves inside DOM
// refrence to HTML element 

function sayHello(e) {
    console.log("Tag Name ", e.tagName)
}