import React from "react";
import SortableList from "./SortableList";

function index() {
    return (
        <SortableList
            items={Array.from({ length: 20 }).map((_, index) => index)}
        />
    );
}

export default index;
