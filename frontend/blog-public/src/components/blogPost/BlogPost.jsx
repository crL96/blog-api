import styles from "./blogPost.module.css";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import Comment from "../comment/Comment";
import SubmitComment from "../submitComment/SubmitComment";

function BlogPost({ post }) {
    const [comments, setComments] = useState([]);
    const [showSubmitComment, setShowSubmitComment] = useState(false);
    
    useEffect(() => {
        fetch(`${API_URL}/posts/${post.id}/comments`)
            .then((response) => response.json())
            .then((data) => setComments(data))
    }, [post.id])

    function toggleShowSubmitComment() {
        if (showSubmitComment) {
            setShowSubmitComment(false);
        } else {
            setShowSubmitComment(true);
        }
    }

    return (
        <div className={[styles.blogPost, "blogPost"].join(" ")}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <div className={styles.footer}>
                <p className={styles.author}>{post.author.name}</p>
                <p className={styles.timestamp}>{post.timestamp.toString().split("T")[0]}</p>
            </div>
            <div className={styles.comments}>
                <div className={styles.commentsHeader}>
                    <h3>Comments</h3>
                    <button onClick={toggleShowSubmitComment}>
                        {showSubmitComment ? ("Hide") : ("Add a comment")}
                    </button>
                </div>
                {showSubmitComment ? (
                    <SubmitComment postId={post.id}/>
                ) : null}
                {comments.map((comment) => {
                    return (
                        <Comment key={comment.id} comment={comment} />
                    );
                })}
            </div>
        </div>
    );
}

export default BlogPost;