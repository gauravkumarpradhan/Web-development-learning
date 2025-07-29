// Promises in javascript

// q1>

// const newPromise = new Promise((resolve, rejct) => {
//     resolve("Hello World");
// });

// newPromise.then((data) => {
//     console.log(data);
// });

// Promise.resolve(newPromise).then(data => console.log("Resolve ", data));

// const response = async function () {

//     try {
//         const res = await newPromise;
//         console.log("Await ", res);
//     } catch (error) {
//         console.log("Error ", error);
//     }

// };
// response();


// 2>
// console.log("Start");

// const promise1 = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve(2);
//     console.log(3);
// });

// promise1.then((res) => {
//     console.log(res);
// })

// console.log("end");

// 3>

// console.log("start");
// const fn = () => {
//     return new Promise((resolve, reject) => {
//         console.log(1);
//         resolve("success");
//     });
// }
// console.log("middle");
// fn().then((res) => {
//     console.log(res);
// });
// console.log("end");

// output - start, middle, 1, end, success

// 4>

// function job() {
//     return new Promise((resolve, reject) => {
//         reject();
//     });
// }

// let promise = job();

// promise.then(function () {
//     console.log("Success 1");
// }).then((function () {
//     console.log("Succdess2");
// })).catch((error) => {
//     console.log("2nd Error");
// }).then(function () {
//     console.log("Success 3");
// }).then((function () {
//     console.log("Succdess 4");
// }))


// 2nd error, success 3, success 4

// function job(state) {
//     return new Promise((resolve, reject) => {
//         if (state) {
//             resolve("success");
//         } else {
//             reject("error");
//         }
//     });
// }

// let promise1 = job();

// promise1.then((data) => {
//     console.log(data);
//     return job(false);
// }).catch(function (error) {
//     console.log(error);
//     return "Error caught";
// }).then(function (data) {
//     console.log(data);
//     return job(true);
// }).catch(function (error) {
//     console.log(error);
// });

// success, error, Error caught

// function job(state) {
//     return new Promise((resolve, reject) => {
//         if (state) {
//             resolve("success");
//         } else {
//             reject("error");
//         }
//     });
// }

// let promise = job(true);

// promise.then(function (data) {
//     console.log(data);
//     return job(true);
// }).then(function (data) {
//     if (data !== "victory") {
//         throw "Defeat";
//     }
//     return job(true);
// }).then(function (data) {
//     console.log(data);
// }).catch(function (error) {
//     console.log(error);
//     return job(false);
// }).then((data) => {
//     console.log(data);
//     return job(true);
// }).catch((error) => {
//     console.log(error);
//     return "Error caught";
// }).then((data) => console.log(`Success, ${data.message}`)).
//     catch(((data) => {
//         console.log(`Error, ${data.message}`)
//     }))

// q>

