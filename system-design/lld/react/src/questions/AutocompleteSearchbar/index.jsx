import { useEffect, useRef, useState } from "react";
import "./style.css";
import useDebounce from "./hooks";

/*
Important things implmented here
1. debouncing
2. caching
3. showing matched with bold letters
4. Keyword navigation
 */

function AutoComponentSerachBar() {
    const [searchInfo, setSearchInfo] = useState({
        text: "",
        list: [],
        isFetching: false,
    });
    const [showOptionsList, setShowOptionsList] = useState(false);
    const [cachedOptions, setCachedOptions] = useState({});
    const [currentFocusOption, setCurrentFocusOption] = useState(-1);
    const optionListRef = useRef({});

    const debouncedFetchOptionsBySearchText = useDebounce(
        fetchOptionsBySearchText,
        500
    );

    useEffect(() => {
        debouncedFetchOptionsBySearchText();
    }, [searchInfo.text]);

    useEffect(() => {
        const currentOptionItemNode = optionListRef.current[currentFocusOption];
        if (currentOptionItemNode) {
            currentOptionItemNode.scrollIntoView({
                // behavior: "smooth",
                block: "nearest"
            });
        }
    }, [currentFocusOption]);

    async function fetchOptionsBySearchText() {
        if (cachedOptions[searchInfo.text] !== undefined) {
            setSearchInfo((data) => ({
                ...data,
                list: cachedOptions[searchInfo.text],
                isFetching: false,
            }));
            return;
        }

        try {
            const response = await fetch(
                `https://dummyjson.com/recipes/search?q=${searchInfo.text}`
            );
            const result = await response.json();
            setSearchInfo((data) => ({
                ...data,
                list: result?.recipes,
                isFetching: false,
            }));
            setCachedOptions((options) => ({
                ...options,
                [searchInfo.text]: result?.recipes,
            }));
        } catch (error) {
            console.error(error);
        }
    }

    function handleSearchInputOnChange(e) {
        setSearchInfo((data) => ({ ...data, text: e.target.value }));
    }

    function getSelectedTextBoldOption(recipeName) {
        if (searchInfo.isFetching) {
            return <div>{recipeName}</div>;
        }
        const searchText = searchInfo.text.toLowerCase();
        const startIndex = recipeName.toLowerCase().indexOf(searchText);

        const OptionText = (
            <div>
                {recipeName.substring(0, startIndex)}
                <b className="text-match">
                    {recipeName.substring(
                        startIndex,
                        startIndex + searchText.length
                    )}
                </b>
                {recipeName.substring(
                    startIndex + searchText.length,
                    recipeName.length
                )}
            </div>
        );
        return OptionText;
    }

    function handleKeywordClick(e) {
        if (e.key === "ArrowDown") {
            setCurrentFocusOption((index) => index + 1);
        } else if (e.key === "ArrowUp") {
            setCurrentFocusOption((index) => index - 1);
        }
    }


    return (
        <div className="search-bar" onKeyDown={handleKeywordClick}>
            <h1>Autocomplete search bar</h1>
            <div>
                <div className="search-bar-input">
                    <input
                        onChange={(e) => {
                            setSearchInfo((data) => ({
                                ...data,
                                isFetching: true,
                            }));
                            handleSearchInputOnChange(e);
                        }}
                        onFocus={() => setShowOptionsList(true)}
                        onBlur={() => {
                            setCurrentFocusOption(-1);
                            setShowOptionsList(false);
                        }}
                    />
                </div>

                {showOptionsList ? (
                    <div className="search-bar-list" >
                        {searchInfo.isFetching
                            ? [...new Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="search-bar-list-item-loader"
                                >
                                    {""}
                                </div>
                            ))
                            : searchInfo.list.map((recipe, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`search-bar-list-item ${currentFocusOption === index
                                            ? "search-bar-list-item-focus"
                                            : ""
                                            }`}
                                        ref={(el) => (optionListRef.current[index] = el)}
                                    >
                                        {getSelectedTextBoldOption(
                                            recipe.name
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default AutoComponentSerachBar;
