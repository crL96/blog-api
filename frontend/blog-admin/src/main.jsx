import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import LogIn from './components/logIn/LogIn.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import NewPost from './components/newPost/NewPost.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "signup",
    element: <SignUp />
  },
  {
    path: "newpost",
    element: <NewPost />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
