import React from "react";
import "./tabStyles.css";

function Tabs({ tabs, currentTab, onClick }) {
    const content = tabs[currentTab - 1]?.component ?? <></>;

    return (
        <div className="tabs-container">
            {/* Showing tabs info */}
            <div className="tab-title-item-container">
                {tabs.map((tab, index) => (
                    <div
                        className={`tab-title-item ${currentTab - 1 === index
                                ? "tab-title-item-selected"
                                : ""
                            }`}
                        key={index}
                        onClick={() => onClick(tab?.key)}
                    >
                        {tab?.title}
                    </div>
                ))}

                {/* show tab content */}
            </div>

            <div className="tab-content-container">{content}</div>
        </div>
    );
}

export default Tabs;
