import React, { useEffect, useMemo, useState } from "react";
import { useClickOutside } from "./hooks";
import { IoMdStar } from "react-icons/io";

function Dropdown({
    options,
    label,
    className,
    onChange,
    value,
    favouriteOptions = [],
    handleFavouriteOption
}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const ref = useClickOutside(() => setShowDropdown(false));
    const [checkedFavourite, setCheckedFavourite] = useState(false);

    const reqOptions = useMemo(() => {
        if (favouriteOptions.length) {
            return options.filter((option) => !favouriteOptions.includes(option));
        }
        return options;
    }, [favouriteOptions, options]);

    useEffect(() => {
        if (favouriteOptions.length) {
            setCheckedFavourite(favouriteOptions?.includes(value));
        }
    }, [favouriteOptions]);

    const DropdownOption = ({ index, currency }) => {
        return (
            <div
                key={index}
                className={`cursor-pointer hover:bg-gray-200 p-2 ${value === currency ? "bg-indigo-300" : ""
                    }`}
                onClick={(e) => {
                    e.stopPropagation();
                    onChange(currency);
                    setShowDropdown(false);
                }}
            >
                {currency}
            </div>
        );
    };

    return (
        <div ref={ref} className={`${className} relative`}>
            <div>{label}</div>
            <div className={` flex flex-col`}>
                <div className="bg-gray-300 p-2 rounded-lg relative">
                    <input
                        className={`focus:outline-none  w-full`}
                        onFocus={() => setShowDropdown(true)}
                        type="string"
                        value={value}
                    />

                    <IoMdStar
                        className={`absolute right-2 top-1/4 cursor-pointer  ${checkedFavourite ? "text-amber-300" : ""
                            }`}
                        onClick={() => {
                            handleFavouriteOption(value, !checkedFavourite);
                            setCheckedFavourite(!checkedFavourite);
                        }}
                    />
                </div>

                {showDropdown ? (
                    <div className="h-30 overflow-y-scroll w-full mt-2 flex flex-col gap-2 shadow-lg rounded absolute bg-white top-15">
                        {favouriteOptions?.length &&
                            <div className="bg-violet-300 border-b border-gray-200">
                                {
                                    favouriteOptions?.map((option, index) => {
                                        return (
                                            <DropdownOption
                                                key={index}
                                                index={index}
                                                currency={option}
                                            />
                                        );
                                    })
                                }
                            </div>
                        }


                        {reqOptions?.map((currency, index) => {
                            return (
                                <DropdownOption
                                    index={index}
                                    currency={currency}
                                />
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Dropdown;
