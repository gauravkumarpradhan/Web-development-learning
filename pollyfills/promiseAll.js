function subscribeChannel(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Subscribe to ${userName}`);
        }, [2000]);
    })
}


function likeTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Like the ${video} video`);
        }, [1000]);
    })
}

function shareTheVideo(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Share the ${video} video`);
        }, [1000]);
    })
}


Promise.allPolyfill = function (promisesArray) {
    const output = [];

    return new Promise((resolve, reject) => {
        if (!promisesArray || promisesArray?.length === 0) {
            resolve(output);
        } else {
            promisesArray?.forEach((promise, index) => {
                Promise.resolve(promise).then((res) => output[index] = res);
                if (output?.length === promisesArray?.length) {
                    resolve(output);
                }
            });

            resolve(output);
        }
    });
}

Promise.allPolyfill = function (promisesArray) {
    const output = [];

    return new Promise((resolve, reject) => {
        if (!promisesArray || promisesArray?.length === 0) {
            resolve(output);
        } else {
            promisesArray?.forEach((promise, index) => {
                Promise.resolve(promise).then((res) => output[index] = res);
                if (output?.length === promisesArray?.length) {
                    resolve(output);
                }
            });

            resolve(output);
        }
    });
}


Promise.allPolyfill([subscribeChannel("Roadside Coader"), likeTheVideo("Javascript Interview Questions"), shareTheVideo("Javascript Interview Questions")]).then((value) => console.log("Values ", value));

