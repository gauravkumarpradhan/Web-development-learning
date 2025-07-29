function clickMe() {
    let count = 0;
    document.querySelector("#btn").addEventListener("click", function () {
        count += 1;
        console.log(count);
    });
}

clickMe();
