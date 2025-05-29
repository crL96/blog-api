import styles from "./comment.module.css";

function Comment({ comment }) {
    
    return (
        <div className={[styles.comment, "comment"].join(" ")}>
            <h4>{comment.author}</h4>
            <p>{comment.message}</p>
            <p>{comment.timestamp.toString().split("T")[0]}</p>
        </div>
    );
}

export default Comment;