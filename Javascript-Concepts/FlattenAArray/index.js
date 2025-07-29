// [[[1,[1,1]],2,3],[4,5]]


function getMainArray() {
    const array = [];

    function getFlattenArrayResult(arr) {

        if (typeof arr !== typeof []) {
            array.push(arr);
            return;
        };

        arr.forEach((ele) => {
            if (typeof arr === "object") {
                getFlattenArrayResult(ele);
            }
        })
    }

    return {
        getFlattenArrayResult,
        array
    }
}

const { getFlattenArrayResult: callerMethod, array } = getMainArray();
callerMethod([[[1, [1, 1]], 2, 3], [4, 5]]);
console.log("Array is ", array);
