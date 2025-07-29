


console.log("Running");

function importAction(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("First");
        }, 1000);
    })
}

function likeTheVideo(video, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(video);
        }, 1000);

    });
}


function shareTheVideo(video, cb) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

/* It is similar to the pyramid of dome kind of structure*/

// importAction().then((data) => {
//     console.log("First");
//     likeTheVideo(data).then((newInfo) => {
//         console.log("Second ");
//         shareTheVideo(newInfo).then((data) => {
//             console.log("Info", data);
//         }, 1000);
//     });
// })


// Promise chaining

// importAction().then((data) => {
//     console.log("First");
//     return likeTheVideo(data);
// }).then((res) => {
//     console.log("Second");
//     return shareTheVideo();
// }).then((propo) => {
//     console.log("Third");
// })

// Promise.all

// Promise.all([importAction, likeTheVideo, shareTheVideo]).then((result) => {
//     console.log("Result", result);
// });




// importAction("Gaurav", function (message) {
//     console.log(message);
//     likeTheVideo("Javascript Interview Questions", (action) => {
//         console.log(action);
//         shareTheVideo("Javscript Interview Questions ", (action) => {
//             console.log(action);
//         })
//     });
// });

console.log("Stop");


// Disadvantages of using callbacks -
/*
  create a order
  proceed to payment
  showOrderSummary
  updatethewallet
  

  -- as all these operations are interdependant on each other so it becomes kind of callback hell
  - call back creates a very unreadable and unmaitainable code.
  - it is also called pyramid of dome (Because of the code structure).


  Inversion of control -- loosing control of your code*/