import './App.css'
import { useState, useEffect } from "react";
import BlogPost from './components/blogPost/BlogPost';
import NavBar from './components/navBar/NavBar.jsx';
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(API_URL + "/posts/admin", {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token")
        }
      });
      if (res.status === 401) {
        navigate("/login")
      } else {
        const data = await res.json()
        setBlogPosts(data);
      }
    }
    fetchPosts()
      .catch((error) => console.log(error));
  }, [navigate]);

  if (blogPosts.length === 0) {
    return (
      <>
        <NavBar />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <h1>Blog Posts</h1>
      <div className="blogPostsContainer">
        {blogPosts.map((post) => {
          return (
            <BlogPost key={post.id} post={post}/>
          );
        })}
      </div>
    </>
  )
}

export default App
