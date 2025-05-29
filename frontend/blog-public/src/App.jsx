import './App.css'
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import BlogPost from './components/blogPost/BlogPost';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/posts")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
  }, [])

  if (blogPosts.length === 0) return <p>Loading...</p>

  return (
    <>
      <h1>Hello World!</h1>
      {blogPosts.map((post) => {
        return (
          <BlogPost key={post.id} post={post}/>
        );
      })}
    </>
  )
}

export default App
