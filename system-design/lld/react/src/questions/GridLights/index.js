(function () {
    const stack = [];
    const grid = document.getElementById("grid-container");
    let timerRef = null;

    function getGridItem(index) {
        const gridItemEle = document.createElement("div");
        gridItemEle.setAttribute("id", `grid-item-${index}`);
        gridItemEle.classList.add("grid-item");

        gridItemEle.addEventListener("click", function () {
            const hasGridItemSelected =
                gridItemEle.classList.contains("grid-item-selected");
            if (hasGridItemSelected) return;

            if (stack.length <= 8) {
                gridItemEle.classList.toggle("grid-item-selected");
                stack.push(gridItemEle);
                if (stack.length === 8) {
                    timerRef = setInterval(function () {
                        const poppedEle = stack.pop();
                        poppedEle.classList.toggle("grid-item-selected");
                        if (stack.length === 0) {
                            clearInterval(timerRef);
                        }
                    }, 300);
                }
            }
        });
        return gridItemEle;
    }

    [...new Array(9)].forEach((_, rowIndex) => {
        grid.insertAdjacentElement("beforeend", getGridItem(rowIndex));
    });

    document.getElementById;
})();
