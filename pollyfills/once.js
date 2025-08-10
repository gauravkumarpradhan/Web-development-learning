function once(fn){
  let count = 0;
  
  return function (...args){
    if(count < 1){
      count++;
      fn.apply(this, args);
    }
  }
};

function printName(){
  console.log("My name is gaurav");
};

const oncePrint = once(printName);
oncePrint();
oncePrint();
oncePrint();
/*
Enables the feature of executing a function only 1 time irrespective of the call of function multiple times
 */