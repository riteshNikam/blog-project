import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllPostPage from './pages/AllPostsPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostPage from './pages/PostPage.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/login',
          element: (
            <AuthLayout authentication={ false }>
              <LoginPage></LoginPage>
            </AuthLayout>
          )
        },
        {
          path: '/signup',
          element: (
            <AuthLayout authentication={ false }>
              <SignupPage></SignupPage>
            </AuthLayout>
          )
        },
        {
          path: '/all-posts',
          element: (
            <AuthLayout authentication>
              { '' }
              <AllPostPage></AllPostPage>
            </AuthLayout>
          )
        }, 
        {
          path: '/add-post',
          element: (
            <AuthLayout authentication>
              { '' }
              <AddPostPage></AddPostPage>
            </AuthLayout>
          )
        },
        {
          path: '/edit-post/:slug',
          element: (
            <AuthLayout authentication>
              { '' }
              <EditPostPage></EditPostPage>
            </AuthLayout>
          )
        },
        {
          path: '/post/:slug',
          element: <PostPage></PostPage>
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} ></RouterProvider>
    </Provider>
  // </React.StrictMode>,
)
