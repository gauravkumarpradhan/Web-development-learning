import { useEffect, useMemo, useState } from "react";
import "./style.css";

function EmiCalculator() {
    const [amount, setAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0); // Annual %
    const [processingRate, setProcessingFee] = useState(0); // %
    const [downPaymentPct, setDownPaymentPct] = useState(0); // %
    const [tenure, setTenure] = useState(12); // months
    const tenureArr = [12, 24, 36, 48, 60];

    // Derived values for Down Payment (with and without processing fee)
    const [downPayment, downPaymentWithFee] = useMemo(() => {
        const percAmt = (downPaymentPct / 100) * amount;
        // Processing fee only on the loan portion
        const procFee = (processingRate / 100) * (amount - percAmt);
        return [percAmt, percAmt + procFee];
    }, [downPaymentPct, amount, processingRate]);

    // Calculate EMI for given down payment
    function calculateEmi(dp) {
        if (!amount || !interestRate || !tenure) return 0;
        const loanAmt = amount - (dp ?? downPayment);
        const r = interestRate / 12 / 100;
        if (r === 0) return (loanAmt / tenure).toFixed(0); // Simple per month, no interest
        const emi = (loanAmt * r * Math.pow(1 + r, tenure)) /
            (Math.pow(1 + r, tenure) - 1);
        return emi.toFixed(0);
    }

    // Calculate Down Payment required for a given EMI
    function calculateDownPaymentFromEmi(targetEmi) {
        if (!amount || !interestRate || !tenure) return 0;
        const r = interestRate / 12 / 100;
        if (r === 0) return amount - (targetEmi * tenure); // no interest
        const loanPrincipal = (targetEmi * (Math.pow(1 + r, tenure) - 1)) /
            (r * Math.pow(1 + r, tenure));
        let dp = amount - loanPrincipal;
        // Don't allow negative down payment (when EMI is high enough)
        if (dp < 0) dp = 0;
        return dp.toFixed(0);
    }

    // Compute EMI whenever main params change and set to state
    const [emi, setEmi] = useState(0);
    useEffect(() => {
        setEmi(Number(calculateEmi()));
    }, [amount, interestRate, downPayment, tenure]);

    // For EMI input slider (allow users to adjust EMI and see required down payment)
    const minEmi = Number(calculateEmi(amount)); // minimum down payment (i.e. all upfront)
    const maxEmi = Number(calculateEmi(0));      // zero down payment

    // For showing down payment when manually setting EMI
    const [customEmi, setCustomEmi] = useState(null);
    const customDownPayment = customEmi ? calculateDownPaymentFromEmi(customEmi) : null;

    return (
        <div className="parent-section">
            <div>
                <div>Total cost of asset</div>
                <input
                    type="number"
                    value={amount}
                    min={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            <div>
                <div>Interest rate yearly (in %)</div>
                <input
                    type="number"
                    value={interestRate}
                    min={0}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                />
            </div>

            <div>
                <div>Processing Fee (in %)</div>
                <input
                    type="number"
                    value={processingRate}
                    min={0}
                    onChange={(e) => setProcessingFee(Number(e.target.value))}
                />
            </div>

            <div>
                <div>Down payment</div>
                <div>
                    With fee: {downPaymentWithFee?.toFixed(0)}<br />
                    W/O fee: {downPayment?.toFixed(0)}
                </div>
                <input
                    type="range"
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    value={downPaymentPct}
                    min={0}
                    max={100}
                />
                <div>{downPaymentPct}%</div>
            </div>

            <div>
                <div>Loan per month (EMI)</div>
                <input
                    type="range"
                    min={minEmi}
                    max={maxEmi}
                    value={customEmi ?? emi}
                    onChange={(e) => setCustomEmi(Number(e.target.value))}
                />
                <div>
                    <div>Min: {minEmi}</div>
                    <div>Default: {emi}</div>
                    <div>Max: {maxEmi}</div>
                    <div>
                        {customEmi ? (
                            <>
                                Custom EMI: {customEmi} <br />
                                Down Payment Needed: {customDownPayment}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div>Tenure (months)</div>
                <div style={{ display: "flex", gap: 8 }}>
                    {tenureArr.map((ten) => (
                        <div
                            key={ten}
                            style={{
                                background: ten === tenure ? "red" : "",
                                color: ten === tenure ? "#fff" : "#000",
                                cursor: "pointer",
                                padding: "4px 8px",
                                borderRadius: 4,
                            }}
                            onClick={() => setTenure(ten)}
                        >
                            {ten}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;
