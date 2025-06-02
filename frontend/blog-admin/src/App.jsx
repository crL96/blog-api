import './App.css'
import { useState, useEffect } from "react";
import BlogPost from './components/blogPost/BlogPost';
import NavBar from './components/navBar/NavBar.jsx';
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
      <NavBar />
      <h1>Admin Access - The Blog</h1>
      {blogPosts.map((post) => {
        return (
          <BlogPost key={post.id} post={post}/>
        );
      })}
    </>
  )
}

export default App
