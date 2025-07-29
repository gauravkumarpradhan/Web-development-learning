function myDebounce(callback, timeDelay) {
    let timeoutRef = null;

    return function (value) {
        if (!timeoutRef) {
            timeoutRef = setTimeout(() => {
                callback(value);
                clearTimeout(timeoutRef);
                timeoutRef = null;
            }, [timeDelay]);
        } else {
            clearTimeout(timeoutRef);
            timeoutRef = null;
        }
    }
}

function sout(value) {
    console.log("New Value is  ", value);

}
const debounceFunc = myDebounce((value) => {
    sout(value);
}, 3000);



function myThrotlling(callback, delayTime) {
    /*
        What trottling is actually i
     */
    let timer = null;

    return function (value) {
        if (timer) {
            return;
        } else {
            callback(value);
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
        }, [delayTime]);
    }
}

const throttleFunc = myThrotlling((value) => {
    sout(value);
}, 6000);

document.querySelector("#write").addEventListener("input", (e) => {
    throttleFunc(e.target.value);
});
