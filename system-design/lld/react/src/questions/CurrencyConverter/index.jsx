import { useEffect, useState } from "react";
import "./style.css";
import Dropdown from "./Dropdown";
import { FaExchangeAlt } from "react-icons/fa";

/*
Requirements
1. The selected option from or to can be set favourite.
2. If the selected option is favourite then it should have star be color as yellow
3. it should persisit the state of the star even though we refresh
4. the favourite options should be visible at the top of the dropdown options
5. we can exchange the from currency and to currency by clicking on the exchange icon
6. use of useClickoutside also has come into play
 */

function CurrencyConverter() {
    const [currentOptions, setCurrencyOptions] = useState([]);
    const [conversionInfo, setConversionInfo] = useState({
        fromCurrency: "USD",
        toCurrency: "INR",
        amount: null,
        isFetching: false,
        conversionAmount: null,
    });
    const favCurrencies = JSON.parse(localStorage.getItem("favCurrencies")) ?? [];

    const isConvertBtnDisabled = !(
        conversionInfo?.fromCurrency &&
        conversionInfo.toCurrency &&
        conversionInfo.amount
    );

    useEffect(() => {
        async function fetchCurrencyOptions() {
            const response = await fetch(
                "https://api.frankfurter.dev/v1/currencies"
            );
            const data = await response.json();
            setCurrencyOptions(Object.keys(data));
        }

        fetchCurrencyOptions();
    }, []);

    function handleFromCurrency(value) {
        setConversionInfo((prevConversionInfo) => ({
            ...prevConversionInfo,
            fromCurrency: value,
        }));
    }

    function handleToCurrency(value) {
        setConversionInfo((prevConversionInfo) => ({
            ...prevConversionInfo,
            toCurrency: value,
        }));
    }

    function handleAmountValue(value) {
        setConversionInfo((prevConversionInfo) => ({
            ...prevConversionInfo,
            amount: value,
        }));
    }

    function convert() {
        setConversionInfo((prevConversionInfo) => ({
            ...prevConversionInfo,
            isFetching: true,
        }));
        fetch(
            `https://api.frankfurter.dev/v1/latest?base=${conversionInfo.fromCurrency}&symbols=${conversionInfo.toCurrency}`
        )
            .then((resp) => resp.json())
            .then((data) => {
                const convertedAmount = (
                    conversionInfo.amount *
                    data.rates[conversionInfo.toCurrency]
                ).toFixed(2);
                setConversionInfo((prevConversionInfo) => ({
                    ...prevConversionInfo,
                    conversionAmount: convertedAmount,
                    isFetching: false,
                }));
            });
    }

    function handleExchangeCurrency() {
        setConversionInfo((prevConversionInfo) => {
            return {
                ...prevConversionInfo,
                toCurrency: prevConversionInfo.fromCurrency,
                fromCurrency: prevConversionInfo.toCurrency,
                conversionAmount: null,
            };
        });
    }

    function handleFavouriteOption(value, checked) {
        localStorage.setItem(
            "favCurrencies",
            JSON.stringify(
                checked
                    ? [...favCurrencies, value]
                    : favCurrencies?.filter((currency) => currency !== value)
            )
        );
    }

    return (
        <div className=" w-screen h-screen bg-gray-200 flex items-center justify-center flex-col">
            <div className="w-100 h-fit bg-white rounded-lg p-4 gap-2 flex flex-col">
                <div className="flex flex-row w-full justify-between w-full flex-nowrap items-center">
                    <Dropdown
                        options={currentOptions}
                        label="From:"
                        className={"w-[40%]"}
                        onChange={handleFromCurrency}
                        value={conversionInfo?.fromCurrency}
                        favouriteOptions={favCurrencies}
                        handleFavouriteOption={handleFavouriteOption}
                    />

                    <FaExchangeAlt
                        className="cursor-pointer"
                        onClick={handleExchangeCurrency}
                    />

                    <Dropdown
                        options={currentOptions}
                        label="To:"
                        className={"w-[40%]"}
                        onChange={handleToCurrency}
                        value={conversionInfo?.toCurrency}
                        favouriteOptions={favCurrencies}
                        handleFavouriteOption={handleFavouriteOption}
                    />
                </div>

                <div className="font-semibold">Amount</div>
                <input
                    className="focus:outline-none border-2 border-neutral-500 p-2 rounded-lg w-full"
                    type="number"
                    onChange={(e) => handleAmountValue(e.target.value)}
                />

                <button
                    className="bg-blue-800 px-3 py-1.5  text-white rounded hover:bg-blue-600 cursor-pointer w-fit"
                    disabled={
                        isConvertBtnDisabled || conversionInfo?.isFetching
                    }
                    onClick={convert}
                >
                    Convert
                </button>

                {conversionInfo.conversionAmount ? (
                    <div className="flex w-full justify-end">
                        <div className="text-lime-500">
                            Converted amount: {conversionInfo.conversionAmount}{" "}
                            {conversionInfo.toCurrency}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default CurrencyConverter;
