import CommentItem from "./CommentItem";
import "./style.css";
import nestedComments from "./index.json";
import { useState } from "react";
import ReplyBox from "./ReplyBox";

export default function CommentSection() {
    const [comments, setComments] = useState(nestedComments);

    const rootComments = Object.values(comments).filter(
        (comment) => comment.parent === null
    );

    function addNewItem(text, parent = null) {
        const id = Date.now().toString();
        const newComment = {
            id,
            text,
            parent,
            replies: [],
        };

        setComments((prevComments) => {
            return {
                ...prevComments,
                [id]: newComment,
                ...(parent
                    ? {
                        [parent]: {
                            ...prevComments[parent],
                            replies: [...prevComments[parent].replies, id],
                        },
                    }
                    : {}),
            };
        });
    }

    function deleteItem(itemId) {
        setComments((prevComments) => {
            const clonedPrevComments = { ...prevComments };

            function removeChildren(id) {
                const replies = [...clonedPrevComments[id].replies];
                delete clonedPrevComments[id];

                if (replies.length) {
                    replies.forEach((replyId) => removeChildren(replyId));
                }
            };

            if (clonedPrevComments[itemId].parent) {
                const parentId = clonedPrevComments[itemId].parent;

                clonedPrevComments[parentId] = {
                    ...clonedPrevComments[parentId],
                    replies: clonedPrevComments[parentId].replies.filter((id) => Number(id) !== Number(itemId))
                }

            }
            removeChildren(itemId)
            return clonedPrevComments
        })
    }

    console.log(comments)

    return (
        <div className="comment-section">
            {/* Top level add-comment box */}
            <ReplyBox show handlePostReply={addNewItem} />

            {/* Render all root comments */}
            {rootComments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    info={comment}
                    comments={comments}
                    addNewItem={addNewItem}
                    deleteItem={deleteItem}
                />
            ))}
        </div>
    );
}
