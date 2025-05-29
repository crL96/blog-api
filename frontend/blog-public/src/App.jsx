import './App.css'
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
  }, [])

  return (
    <>
      <h1>Hello World!</h1>
      {blogPosts.map((post) => {
        return (
          <div key={post.id}>{post.text}</div>
        );
      })}
    </>
  )
}

export default App
