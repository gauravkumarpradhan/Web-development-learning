import { useState } from "react";
import "./style.css";

function Accordian() {
    const accordianList = [
        {
            title: "JavaScript Basics",
            content: "Learn variables, data types, and operators.",
        },
        {
            title: "Control Flow",
            content:
                "Understand if/else, switch, and loops like for, while, do-while.",
        },
        {
            title: "Functions",
            content:
                "Learn function declarations, expressions, and arrow functions.",
        },
        {
            title: "Arrays",
            content:
                "Work with array methods like push, pop, map, filter, reduce.",
        },
    ];

    const [expandIndex, setExpandIndex] = useState(null);

    return (
        <div className="accordian-container">
            {accordianList.length
                ? accordianList.map((item, index) => {
                    const isItemFocused = index === expandIndex;
                    return (
                        <div
                            key={index}
                            className="accordian-item"
                            onClick={() =>
                                setExpandIndex((prevExpandIndex) =>
                                    prevExpandIndex !== index ? index : null
                                )
                            }
                        >
                            <div
                                className={`${isItemFocused
                                    ? "accordian-item-title-focused"
                                    : ""
                                    } accordian-item-title`}
                            >
                                {item.title}
                                <span>{!isItemFocused ? '⬇️' : '⬆️'}</span>
                            </div>

                            {expandIndex === index ? (
                                <div
                                    className={`accordian-item-content ${isItemFocused
                                        ? "accordian-item-content-focused"
                                        : ""
                                        }`}
                                >
                                    {item.content}
                                </div>
                            ) : null}
                        </div>
                    );
                })
                : null}
        </div>
    );
}
export default Accordian;
