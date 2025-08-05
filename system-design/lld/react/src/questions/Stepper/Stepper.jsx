function Stepper({ steps, handleNextBtnClick, currentStep }) {
    const content = steps?.[currentStep]?.Component ?? <></>;
    const StepperItem = ({ index, label }) => {
        const isStepCompleted = currentStep > index;
        return (
            <div className={"stepper-item"}>
                <div
                    className={`stepper-item-count ${currentStep === index || isStepCompleted
                        ? "current-stepper-item-count"
                        : ""
                        }`}
                >
                    {isStepCompleted ? "🤍" : index + 1}
                </div>

                <div
                    className="stepper-item-label"
                >
                    {label}
                </div>
            </div>
        );
    };

    function getPercentage() {
        return (currentStep / (steps.length - 1)) * 100;
    }

    return (
        <div>
            <div className="stepper-wrapper">
                <div className="stepper">
                    {steps?.map((step, index) => {
                        return (
                            <StepperItem
                                key={index}
                                index={index}
                                label={step?.label}
                            />
                        );
                    })}
                </div>

                <div className="progress">
                    <div
                        className="progress-dummy"
                        style={{
                            transform: `translateX(-${100 - getPercentage()}%)`,
                            transformOrigin: "left",
                        }}
                    ></div>
                </div>
            </div>

            <div className="stepper-footer">
                {content}
                <button onClick={handleNextBtnClick} className="next-btn">
                    Next
                </button>
            </div>
        </div>
    );
}

export default Stepper;
