import React from "react";
import { useState } from "react";
import "./style.css";

export default function SortableList({ items }) {
    const [draggableItems, setDrragableItems] = useState(items);
    const [startIndex, setStartIndex] = useState(-1);
    const [swapIndex, setSwapIndex] = useState(-1);

    function onDragStart(e, index) {
        // Use the native event for dataTransfer
        const dt = e.nativeEvent?.dataTransfer || e.dataTransfer;
        dt.effectAllowed = "move"; // use "move" or another supported value

        setStartIndex(index);

        // Custom drag image example (optional)
        const original = e.currentTarget;
        const dragImage = original.cloneNode(false);
        dragImage.textContent = "replaced";
        dragImage.style.position = "absolute";
        dragImage.style.pointerEvents = "none";
        dragImage.style.opacity = "0.8";
        dragImage.style.transform = "scale(1.2)";
        dragImage.style.backgroundColor = "red";
        dragImage.style.top = "-1000px";
        dragImage.style.left = "-1000px";
        document.body.appendChild(dragImage);
        dt.setDragImage(dragImage, 0, 0);
        setTimeout(() => {
            document.body.removeChild(dragImage);
        }, 0); // Keep this synchronous/fast
    }


    function onDropEnd() {
        if (swapIndex >= 0 && startIndex >= 0) {
            setDrragableItems((prevDraggableItems) => {
                const newDraggableItems = structuredClone(prevDraggableItems);
                [newDraggableItems[startIndex], newDraggableItems[swapIndex]] = [newDraggableItems[swapIndex], newDraggableItems[startIndex]];
                return newDraggableItems;
            });
            reset();
            resetSwapIndex();
        }

    }

    function reset() {
        setStartIndex(-1);

    }

    function resetSwapIndex() {
        setSwapIndex(-1);
    }

    return (
        <div
            className="sortable-list-container"
            onDragOver={(e) => e.preventDefault()}
        >
            {draggableItems.length
                ? draggableItems?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`${startIndex === index
                                ? "sortable-start-list-item"
                                : ""
                                } ${index === swapIndex ? "drop-zone" : ""
                                } sortable-list-item`}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragEnd={reset}
                            onDrag={(e) => e.preventDefault()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setSwapIndex(index);
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                resetSwapIndex();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                onDropEnd(e);
                            }}
                        >
                            {item}
                        </div>
                    );
                })
                : null}
        </div>
    );
}
