const obj = {
    firstName: "Gaurav"
};

const arr = [1, 2, 3, 4];
console.log(arr?.__proto__); // we get to see what are the various methods we ahve gotten
console.log(Array.prototype);
console.log(arr.__proto__.__proto__); // Prototype chain
console.log(Object.prototype);
console.log(obj);

/*
  with this we could determine that everything in javascript is a object
 */

let object2 = {
    name: "Aditya"
}

object2.__proto__ = obj;



