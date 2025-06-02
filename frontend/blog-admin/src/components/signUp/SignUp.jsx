import NavBar from "../navBar/NavBar";
const API_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${API_URL}/auth/admin`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON",
                },
                body: JSON.stringify(data),
            });
            if (response.status === 200) {
                setErrorMessage([]);
                const payload = await response.json()
                sessionStorage.setItem("token", payload.token);
                navigate("/");
            } else if (response.status === 409 || response.status === 403) {
                const payload = await response.json()
                setErrorMessage(payload.message)
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
            <p>{errorMessage}</p>
            <form onSubmit={handleSubmit}>
                <legend>Log In</legend>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name"  required/>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" required />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" required />
                <label htmlFor="admin">Secret admin password: </label>
                <input type="password" name="admin" id="admin" required/>
                <button type="submit">Sign up</button> 
            </form>
        </>
    );
}

export default SignUp;