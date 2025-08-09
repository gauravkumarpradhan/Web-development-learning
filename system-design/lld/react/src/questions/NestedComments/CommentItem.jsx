import { useState } from "react";
import ReplyBox from "./ReplyBox";

function CommentItem({ info, comments, addNewItem, deleteItem }) {
    const [showReplySection, setShowReplySection] = useState(false);
    const [showChildComments, setShowChildComments] = useState(false);
    const repliesLen = info?.replies?.length ?? 0;

    function toggleReplyBoxView() {
        setShowReplySection(!showReplySection);
    }

    function toggleRepliesSectionView() {
        setShowChildComments(!showChildComments);
    }

    return (
        <div className="comment-item">
            <div className="view-comment-section">
                <div className="view-comment-top-section">
                    <div className="reply-text">{info?.text}</div>

                    <div className="comment-item-actions">
                        <div
                            onClick={toggleReplyBoxView}
                            className="cancel-reply-btn"
                        >
                            {showReplySection ? "Cancel" : "Reply"}
                        </div>

                        <div
                            className="delete-btn"
                            onClick={() => deleteItem(info?.id)}
                        >
                            Delete
                        </div>
                    </div>
                </div>

                <div className="view-comment-bottom-section">
                    <ReplyBox
                        handlePostReply={(text) => addNewItem(text, info?.id)}
                        setShow={setShowReplySection}
                        show={showReplySection}
                    />

                    {repliesLen ? (
                        <div
                            onClick={toggleRepliesSectionView}
                            className="replies-count"
                        >
                            {repliesLen} repl{repliesLen > 1 ? "ies" : "y"}
                        </div>
                    ) : null}
                </div>
            </div>

            {showChildComments ? (
                <div className="child-comments-section">
                    {info?.replies?.map((replyId, index) => {
                        return (
                            <CommentItem
                                key={`${index}-${replyId}`}
                                info={comments[replyId]}
                                comments={comments}
                                addNewItem={addNewItem}
                                deleteItem={deleteItem}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default CommentItem;
