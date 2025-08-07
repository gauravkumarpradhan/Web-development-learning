import React, { useCallback, useMemo, useState } from "react";
import "./style.css";

function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [anwser, setAnswer] = useState({});

    const quizResponse = [
        {
            que: "What is the capital of France?",
            options: [
                { label: "Paris", value: "Paris" },
                { label: "London", value: "London" },
                { label: "Berlin", value: "Berlin" },
                { label: "Rome", value: "Rome" },
            ],
            value: "Paris",
        },
        {
            que: "Which planet is known as the Red Planet?",
            options: [
                { label: "Earth", value: "Earth" },
                { label: "Mars", value: "Mars" },
                { label: "Jupiter", value: "Jupiter" },
                { label: "Venus", value: "Venus" },
            ],
            value: "Mars",
        },
        {
            que: "What is the largest mammal in the world?",
            options: [
                { label: "Elephant", value: "Elephant" },
                { label: "Blue Whale", value: "Blue Whale" },
                { label: "Giraffe", value: "Giraffe" },
                { label: "Hippopotamus", value: "Hippopotamus" },
            ],
            value: "Blue Whale",
        },
        {
            que: "Which language is primarily used for web development?",
            options: [
                { label: "Python", value: "Python" },
                { label: "JavaScript", value: "JavaScript" },
                { label: "C++", value: "C++" },
                { label: "Swift", value: "Swift" },
            ],
            value: "JavaScript",
        },
        {
            que: "Who wrote 'Romeo and Juliet'?",
            options: [
                { label: "William Shakespeare", value: "William Shakespeare" },
                { label: "Charles Dickens", value: "Charles Dickens" },
                { label: "Jane Austen", value: "Jane Austen" },
                { label: "Mark Twain", value: "Mark Twain" },
            ],
            value: "William Shakespeare",
        },
    ];

    function onOptionsSelect(index, value) {
        setAnswer((anwser) => ({ ...anwser, [index]: value }));
    }

    const areAllQuestionsAnswered =
        currentQuestion + 1 === quizResponse?.length;

    function getCounts() {
        return quizResponse.reduce(([_correctCount, _wrongCount], currentEle, index) => {
            if (currentEle?.value === anwser[index]) {
                return [_correctCount + 1, _wrongCount];
            }

            return [_correctCount, _wrongCount + 1];
        }, [0, 0]);
    };

    const [correctCount, wrongCount] = getCounts();

    function retry() {
        setAnswer({});
        setCurrentQuestion(0);
    }

    return areAllQuestionsAnswered ? (
        <div className="result-section-wrapper">
            <h2>Result section</h2>
            <div className="ans-status-section">
                <div>You have answered {correctCount} correctly out of {correctCount + wrongCount} questions</div>
                <div onClick={retry} className="retry">Click here to retry</div>
            </div>

            <div className="result-section">
                {quizResponse?.map((quesObj, index) => {
                    return (
                        <div
                            className={
                                quesObj?.value === anwser[index]
                                    ? "right-ans"
                                    : "wrong-ans"
                            }
                        >
                            Q{index + 1}: {quesObj?.que}
                        </div>
                    );
                })}
            </div>

        </div>
    ) : (
        <div className="quiz-container">
            {quizResponse?.map((quizItem, index) => {
                return index === currentQuestion ? (
                    <div key={index} className="quiz-ques-item">
                        <div>{quizItem?.que}</div>
                        <div className="quiz-opt-container">
                            {quizItem?.options?.map((quizItemOpt, ind) => {
                                return (
                                    <div
                                        className={`${quizItemOpt?.value === anwser[index]
                                            ? "quiz-opt-selected"
                                            : ""
                                            } quiz-opt`}
                                        key={`${index}-${ind}`}
                                        onClick={() =>
                                            onOptionsSelect(
                                                index,
                                                quizItemOpt?.value
                                            )
                                        }
                                    >
                                        <input
                                            type="radio"
                                            value={quizItemOpt?.value}
                                            checked={
                                                quizItemOpt?.value ===
                                                anwser[index]
                                            }
                                            onChange={(e) =>
                                                onOptionsSelect(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <div>{quizItemOpt?.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null;
            })}

            <div className="btn-container">
                <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    disabled={currentQuestion <= 0}
                >
                    Prev
                </button>
                <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    disabled={
                        currentQuestion > quizResponse.length - 1 ||
                        !anwser[currentQuestion]
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default QuizApp;
