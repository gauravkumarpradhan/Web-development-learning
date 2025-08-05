import { useState } from "react";
import Stepper from "./Stepper";
import "./style.css";

function SteppedMainPage() {
    const steps = [
        { label: "customer Info", Component: <div>Custom info content</div> },
        { label: "Shipping Info", Component: <div>Shipping info content</div> },
        { label: "Payment", Component: <div>Payment info content</div> },
        { label: "Delivered", Component: <div>delivered info content</div> },
    ];
    const [currentStep, setCurrentStep] = useState(0);


    return (
        <div className="stepper-main-page">
            <h1>Stepper Main page</h1>

            <Stepper
                steps={steps}
                currentStep={currentStep}
                handleNextBtnClick={() => {
                    setCurrentStep(currentStep + 1);
                }}
            />
        </div>
    );
}

export default SteppedMainPage;
