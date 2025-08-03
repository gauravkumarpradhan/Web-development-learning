import { useMemo, useState } from "react";
import { FIELD_TYPES } from "./constant";

function PollWidget({
    isMultiple = false,
    options,
    onVoteAdd,
    onVoteDelete,
    selectedVoteValues,
}) {
    const [localOptions, setLocalOptions] = useState(options);

    const percentageArray = useMemo(() => {
        const _total = localOptions?.reduce((count, currentVal) => {
            return (count += currentVal?.vote);
        }, 0);

        return _total
            ? localOptions?.map((pollItem) =>
                getPercentage(pollItem?.vote, _total)
            )
            : [];
    }, [localOptions]);

    function getPercentage(vote, total) {
        return ((vote / total) * 100).toFixed(2);
    }

    function _onChange(e, index) {
        const isPresent = selectedVoteValues?.includes(e.target.value);
        let updatedOptions;
        if (isMultiple) updatedOptions = structuredClone(localOptions);
        else updatedOptions = structuredClone(options);
        const requiredOption = updatedOptions[index];
        requiredOption.vote = isPresent
            ? (requiredOption.vote -= 1)
            : (requiredOption.vote += 1);
        setLocalOptions(updatedOptions);

        if (isMultiple) {
            onVoteAdd({
                target: {
                    name: e.target.name,
                    value: isPresent
                        ? selectedVoteValues?.filter(
                            (value) => value !== e.target.value
                        )
                        : [...selectedVoteValues, e.target.value],
                },
            });
        } else {
            onVoteAdd({
                ...e,
                target: { value: isPresent ? null : e.target.value },
            });
        }
    }

    return (
        <div className="vote-container">
            <div>
                <h1>Best YT channel to learn frontend</h1>
            </div>
            {localOptions?.map((field, index) => {
                return (
                    <div key={index} className="vote-item">
                        <div className="vote-item-top-wrapper">
                            <div className="top-vote-item-left">
                                <input
                                    name={field?.name}
                                    type={
                                        isMultiple
                                            ? FIELD_TYPES.CHECKBOX
                                            : FIELD_TYPES.RADIO
                                    }
                                    onChange={(e) => _onChange(e, index)}
                                    checked={
                                        isMultiple
                                            ? selectedVoteValues?.includes(
                                                field?.value
                                            )
                                            : Array.isArray(selectedVoteValues)
                                                ? selectedVoteValues?.[0] ===
                                                field?.value
                                                : selectedVoteValues ===
                                                field?.value
                                    }
                                    value={field?.value}
                                    className="cursor-pointer"
                                />
                                <div>{field?.label}</div>
                            </div>

                            <div className="top-vote-item-right">
                                <div>{field?.vote} Votes</div>
                                <div>({percentageArray[index]}%)</div>
                            </div>
                        </div>
                        <progress value={percentageArray[index]} max={100} />
                    </div>
                );
            })}

            <button
                onClick={() => {
                    onVoteDelete();
                    setLocalOptions(structuredClone(options));
                }}
                className="cursor-pointer"
            >
                Remove Vote
            </button>
        </div>
    );
}

export default PollWidget;
