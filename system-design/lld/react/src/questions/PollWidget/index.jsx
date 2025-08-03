/*
1. can have radio or checkbox option
2. 
 */
import { useState } from "react";
export const POLL_WIDGET_FIELD = "channel";
import "./style.css";
import PollWidget from "./PollWidget";

function PollWidgetMainPage() {
    const [selectedVoteValues, setSelectedVoteValues] = useState([]);
    const options = [
        {
            label: "Roadside Coder",
            name: "channel",
            value: "roadside coder",
            vote: 3,
            id: 1,
        },
        {
            label: "Algo Agarwal",
            name: "channel",
            value: "algo agarwal",
            vote: 2,
            id: 2,
        },
        {
            label: "All the above",
            name: "channel",
            value: "all the above",
            vote: 4,
            id: 3,
        },
    ];


    function onVoteAdd(e) {
        setSelectedVoteValues(e.target.value);
    }

    function onVoteDelete() {
        setSelectedVoteValues([]);
    }

    return (
        <div className="poll-widget-main-helper">
            <PollWidget
                options={options}
                selectedVoteValues={selectedVoteValues}
                onVoteAdd={onVoteAdd}
                onVoteDelete={onVoteDelete}
                isMultiple
            />
        </div>
    );
}

export default PollWidgetMainPage;
