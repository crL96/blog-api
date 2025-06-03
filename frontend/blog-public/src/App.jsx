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

  if (blogPosts.length === 0) {
    return (
      <>
        <p>Loading...</p>
        <p>
          Due to this project being for educational purposes it uses a free 
          tier for publishing the backend that shuts down after inactivity, 
          give it a little time to boot up.
        </p>
      </>
    )
  }

  return (
    <>
      <h1>The Blog</h1>
      {blogPosts.map((post) => {
        return (
          <BlogPost key={post.id} post={post}/>
        );
      })}
    </>
  )
}

export default App
