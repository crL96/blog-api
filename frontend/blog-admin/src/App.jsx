import './App.css'
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/posts/admin")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
  }, [])

  console.log(blogPosts);

  if (blogPosts.length === 0) return <p>Loading...</p>

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}

export default App
