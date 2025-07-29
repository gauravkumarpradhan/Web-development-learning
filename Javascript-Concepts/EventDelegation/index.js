/*
  Event Delegation Example 1
*/
const categorySection = document.querySelector("#category").addEventListener("click", (e) => {
    console.log("e", e.target);
    console.log("Tag Name ", e.target.tagName);
    console.log("Tag Id", e.target.id);
    if (e.target.tagName === "LI") {
        window.location.href = "/" + e.target.id;
    }
});

/*
   Event Delegation Example 2
 */

document.querySelector("#form").addEventListener("keyup", function (e) {
    console.log("data set",);
    if (e.target.dataset.uppercase) {
        console.log("entered")
        e.target.value = e.target.value.toUpperCase();
    }
});

/*
  1. Make a funcionality once and use it anytime, need not individually write the same function for each input
  2. need to store these many events in the webapi, making it space and performance inefficient
 */