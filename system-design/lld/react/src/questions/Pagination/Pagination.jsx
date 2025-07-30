import React from "react";
import "./pagination-styles.css";

function Pagination({ page, limit, total, handleClick }) {
    console.log(page, limit, total);
    const pageItemCount = Math.floor(total / limit);

    const Arrow = ({ show, icon, handleClick }) => {
        return show ? (
            <div className="pagination-item" onClick={handleClick}>
                {icon}
            </div>
        ) : null;
    };

    return (
        <div className="pagination-container">
            <Arrow
                show={page > 1}
                icon={"◀️"}
                handleClick={() => handleClick(page - 1)}
            />

            {[...new Array(pageItemCount)].map((_, index) => {
                return (
                    <div
                        key={index}
                        className={`pagination-item ${index + 1 === page ? "pagination-item-selected" : ""
                            }`}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </div>
                );
            })}

            <Arrow
                show={page < pageItemCount}
                icon={"▶️"}
                handleClick={() => handleClick(page + 1)}
            />
        </div>
    );
}

export default Pagination;

/*
fetch("url", {
method:"POST"
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(response);
})
 */
