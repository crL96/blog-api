import styles from "./comment.module.css";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

function Comment({ comment }) {
    const navigate = useNavigate();

    async function handleDelete() {
        try {
            const res = await fetch(`${API_URL}/posts/${comment.postId}/comments/${comment.id}`, {
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
        <div className={[styles.comment, "comment"].join(" ")}>
            <h4>{comment.author}</h4>
            <p>{comment.message}</p>
            <p>{comment.timestamp.toString().split("T")[0]}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Comment;