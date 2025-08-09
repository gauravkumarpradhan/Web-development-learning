(function () {
    let rows = 2;
    let cols = 2;
    let prevValIndex = null;
    let isProcessing = false;
    const memoryArray = generateShuffleValues();

    function generateShuffleValues() {
        const total = rows * cols;
        const reqTotal = total / 2;
        const result = [];

        for (let i = 1; i <= reqTotal; i++) {
            result.push(i);
            result.push(i);
        }

        for (let i = total - 1; i >= 0; i--) {
            const newPos = Math.floor(Math.random() * (i + 1));
            [result[newPos], result[i]] = [result[i], result[newPos]];
        }

        return result;
    }

    function generateGridRows() {
        function handleGridItemClick(e) {
            const isAlreadyClicked = e.target.classList.contains("selected");
            if (isAlreadyClicked || isProcessing) {
                return;
            }

            const grid = document.querySelector("#grid");
            const gridTargetChildren = grid.children;
            const prevVal =
                prevValIndex !== null
                    ? gridTargetChildren.item(prevValIndex).textContent
                    : null;
            const targetValue = memoryArray[e.target.getAttribute("key")];
            e.target.textContent = targetValue;
            e.target.classList.add("selected");

            if (prevVal !== null) {
                if (Number(prevVal) !== Number(targetValue)) {
                    isProcessing = true;
                    setTimeout(() => {
                        e.target.textContent = "";
                        gridTargetChildren.item(prevValIndex).textContent = "";
                        e.target.classList.toggle("selected");
                        gridTargetChildren
                            .item(prevValIndex)
                            .classList.toggle("selected");
                        prevValIndex = null;
                        isProcessing = false;
                    }, 1000);
                } else {
                    gridTargetChildren
                        .item(prevValIndex)
                        .setAttribute("data-matched", true);
                    e.target.setAttribute("data-matched", true);

                    const areAllGridItemsMatched = [...grid.children].every(
                        (child) => child.dataset.matched === "true"
                    );

                    if (areAllGridItemsMatched) {
                        [...grid.children].forEach((child) => {
                            child.classList.remove("selected");
                            child.removeAttribute("data-matched");
                            child.textContent = "";
                        });
                        const winnerElement = document.createElement("h1");
                        winnerElement.textContent = "We have winner";
                        document
                            .getElementsByClassName("memory-game-container")
                            .item(0)
                            .insertBefore(
                                winnerElement,
                                document
                                    .getElementsByClassName("memory")
                                    .item(0)
                            );
                    }

                    prevValIndex = null;
                }
            } else prevValIndex = e.target.getAttribute("key");
        }

        const target = document.getElementById("grid");
        memoryArray.forEach((_, index) => {
            const createElement = document.createElement("div");
            createElement.addEventListener("click", handleGridItemClick);

            createElement.setAttribute("key", index);
            createElement.classList.add("grid-item");
            target.appendChild(createElement);
        });
    }

    generateGridRows();
})();
