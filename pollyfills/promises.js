function PromisePollyfill(callback) {

    // onSuccess, onFailure 
    let onSuccess, onFailure, val, isThenCalled, isFullfilled, isFailureFulfilled, isCatchCalled;


    function resolve(value) {
        val = value;
        isFullfilled = true;
        if (typeof onSuccess === "function") {
            onSuccess(value);
        }
    }

    function reject(error) {
        if (typeof onFailure === "function") {
            isFailureFulfilled = true;
            val = error;
            onFailure(error);
        }
    }

    this.then = function (callback) {
        isThenCalled = true;
        if (!isFullfilled && isThenCalled) {
            onSuccess = callback;
        } else {
            callback(val);
        }
        return this;
    }

    this.catch = function (callback) {
        isCatchCalled = true;

        if (isCatchCalled && !isFailureFulfilled) {
            onFailure = callback;
        } else {
            callback(val);
        }

        return this;
    }

    try {
        callback(resolve, reject);
    } catch (error) {
        reject(error);
    }


}

PromisePollyfill.resolve = function (val) {
    return new PromisePollyfill((resolve, reject) => {
        resolve(val);
    });
}

PromisePollyfill.reject = function (val) {
    return new PromisePollyfill((resolve, reject) => {
        reject(val);
    })
}

const prom = new PromisePollyfill((resolve, reject) => {
    console.log('Fetching...');
    setTimeout(() => {
        resolve("Api Response is fetched");
    }, [5000]);
});

prom.then((successResponse) => {
    console.log("Success Response", successResponse);
}).catch((failureResponse) => {
    console.log("Failure Response ", failureResponse);
});

