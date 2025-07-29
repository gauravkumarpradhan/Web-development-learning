// 1> 
let user = {
    name: "Piush",
    age: 24,
    childObj: {
        newName: "RoadSide Coder",
        getDetails() {
            console.log(this.newName, " and", this.name);
        },
        _getDetails: () => {
            console.log(this.name);
        },
    },
    getDetails() {
        const print = () => console.log(this.name);
        print();
    }
}

// 2> 

class User {
    constructor(name) {
        this.name = name;
    }

    getName() {
        console.log(this.name);
    }
}

// const userEntity = new User("Piyush");
// userEntity.getName();

// 3> 

const obj = {
    firstName: "Pinya",
    getName() {
        const firstName = "Piyush";
        return this.firstName;
    }
};

// console.log(obj.getName());

// 4> 
function makeUser() {
    return {
        name: "John",
        ref: this
    }
}
// this.name = "Prashant"

// let us = makeUser();
// console.log("Output is ", us.ref.name);  //  Prashant

const usr = {
    name: "Piysh Agarwal",
    logMessage() {
        console.log(this.name);
    }
}

setTimeout(usr.logMessage, 1000);
