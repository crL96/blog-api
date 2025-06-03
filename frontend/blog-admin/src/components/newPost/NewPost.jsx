import { useState } from "react";
import styles from "./newPost.module.css";
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
import NavBar from "../navBar/NavBar";


function NewPost() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const post = Object.fromEntries(formData);
        // Set published value to boolean
        post.published = post.published === "on";

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                    Authorization: sessionStorage.getItem("token")
                },
                body: JSON.stringify(post),
            });
            if (response.status === 200) {
                navigate("/");
            } else if (response.status === 401) {
                navigate("/login");
            } else {
                setErrorMessage("Something went wrong, please try again")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <NavBar />
            <div className={styles.div}>
                <h3 className={styles.header}>New Post</h3>
                <p>{errorMessage}</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" />
                    <label htmlFor="text">Content: </label>
                    <textarea name="text" id="text" rows="10"></textarea>
                    <label htmlFor="published">Published: </label>
                    <input type="checkbox" name="published" id="published" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default NewPost;