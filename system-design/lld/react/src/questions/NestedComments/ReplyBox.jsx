import { useState } from "react";

function ReplyBox({ handlePostReply = () => { }, show = false, setShow = () => { } }) {
    const [text, setText] = useState("");

    function handleSubmit() {
        handlePostReply(text);
        setText(null);
        if (setShow) {
            setShow(false);
        }
    }

    return (
        show ? <div>
            <textarea
                className="text-area-input"
                placeholder="Add a comment"
                onChange={(e) => setText(e.target.value)}
            />
            <div className="reply-action-btns">
                <button onClick={handleSubmit}>Post Reply</button>
            </div>
        </div> : null
    );
}

export default ReplyBox;
