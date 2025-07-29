// 1>

// const user = {
//     name: "Gaurav Kumar",
//     age: 24
// };

// user.name = "Saurav"

// console.log(user);

// 2>

// const result = (function (a) {
//     delete a;
//     console.log("Value of a is ", a);
//     return a;
// })(5);

// console.log("Value ", result);
// It will not effect the a atall and will return a

// 3>

// const user = {
//     name: "Roadside Coder",
//     age: 24,
//     "like this video": true
// };

// add a key value pair
// user["like this video"] = true;
// delete user["like this video"];

// 4 >

const property = "firstName";
const name = "Piyush";

const user = {
    [property]: name,
}

/*
   @ Different types of for loops
      for(var i  = 0 ; i < 5 ; i++)
      forEach()
      for(ele of array)
      for(ele in array) used to iterate object and array
 */

// 5>
/*
  Create a function multiplyByTwo(obj) that multiplies all numberic property values of nums by 2

 */

// let nums = {
//     a: 100,
//     b: 200,
//     title: "My nums"
// };

// function multiplyByTwo() {
//     for (objKey in this) {
//         if (typeof this[objKey] === typeof 0) {
//             this[objKey] = this[objKey] * 2;
//         }
//     }

//     return this;
// };

// console.log(multiplyByTwo.call(nums));

// 6>
// q> What is the output of the following code ?

// const a = {};
// const b = { k: "b" };
// const c = { key: "c" };

// a[b] = 123;
// a[c] = 456;

// console.log(a[b]);
/*
  value of a is {
    object objct : 456
  }
    as value of b is object so the key which is set in the a is object object
 */



// 7 >
// What's JSON.stringify() and JSON.parse()
// while sending something to Backend and also while setting properties in localStorage (to set values in localStorage it has to be in stringified format)
// localStorage.setItem("test", JSON.stringify({ hello: "first" }));


// 8>
// What is the output of the following

// console.log([..."Gaurav"]); output -- ["G","a","u","r","a","v"]

// 9>
// Ouput

// const userInfo = { name: "Lydia", age: 21 };
// const admin = { admin: true, ...userInfo };
// console.log("Admin ", admin);


// 10>

// const settings = {
//     username: "Piyush",
//     level: 19,
//     health: 90
// };

// const data = JSON.stringify(settings, ["level", "health"]);
// console.log(data);

// It will stringify level and health only

const shape = {
    radius: 10,
    diameter() {
        console.log("Diameter ", this);
        return this.radius * 2;
    },
    perimeter: () => {
        console.log("Perimeter ", this);
        return 2 * Math.PI * this.radius
    }// this is just expression and will point to global window object
}

// console.log(shape.diameter());
// console.log(shape.perimeter());


// 11 >
// Destructring nested objects
// let userDetails = {
//     name: "Piysh",
//     fullName: {
//         firstName: "Piysh",
//         lastName: "Agarwal"
//     }
// };

// const { fullName: { firstName, lastName } } = userDetails;

// console.log("First Name", firstName);

// *** Object Refrencing Questions

// 12>
console.log({ a: 1 } == { a: 1 }); // false
// console.log({ a: 1 } === { a: 1 }) - false
// Javscript compares two object with references not by values

// 13> 
// const value = { number: 10 };

// const multiply = (x = { ...value }) => {
//     console.log((x.number *= 2));
// }

// multiply() // -- 20
// multiply() // 20
// multiply(value) // x will refer to value in this case // 20
// multiply(value) // x will refer to value in this case // 40

// 13> 
function change(person) {
    person.age = 25;
    person = {
        name: "Job",
        age: 50
    }

    return person;
}

const personObj1 = {
    name: "Alex",
    age: 30
}

const personObj2 = change(personObj1);

console.log(personObj1);
console.log(personObj2);













