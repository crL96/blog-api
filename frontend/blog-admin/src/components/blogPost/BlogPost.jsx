import styles from "./blogPost.module.css";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import Comment from "../comment/Comment";
import { useNavigate } from "react-router-dom";

function BlogPost({ post }) {
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        fetch(`${API_URL}/posts/${post.id}/comments`)
            .then((response) => response.json())
            .then((data) => setComments(data))
    }, [post.id])

    async function handleDelete() {
        try {
            const res = await fetch(`${API_URL}/posts/${post.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: sessionStorage.getItem("token")
                }
            });
            if (res.status === 401) {
                navigate("login");
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={[styles.blogPost, "blogPost"].join(" ")}>
            <button onClick={handleDelete}>Delete</button>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
            <div className={styles.footer}>
                <p className={styles.author}>{post.author.name}</p>
                <p className={styles.timestamp}>{post.timestamp.toString().split("T")[0]}</p>
            </div>
            <div className={styles.comments}>
                <h3>Comments</h3>
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