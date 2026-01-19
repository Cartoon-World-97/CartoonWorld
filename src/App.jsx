import "./App.css";
import Search from "./Pages/Search";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./Pages/Home";
// const Home = lazy(() => import("./pages/Home"));
import Login from "./Pages/Login";
import Tvshows from "./Pages/Tvshows";
import Category from "./Pages/Category";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Forgetpassword from "./Pages/Forgetpassword";
import Setpass from "./Pages/Setpass";
import Video from "./Pages/Video";
import Allvideo from "./Pages/Allvideo";
import ProtectedRoute from "./components/ProtectedRoute";
import Scrolltotop from "./components/Scrolltotop";
import { SearchProvider } from "./context/SearchContext";
import Profile from "./Pages/Profile";
import Movie from "./Pages/Movie";
import Playlist from "./Pages/Playlist";
import Payment from "./Pages/Payment";
import Plans from "./Pages/Plans";
import { ToastContainer } from "react-toastify";
import LoginValidater from "./utility/LoginValidater";

// In your App component

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Scrolltotop />
          <Home />
        </>
      ),
    },
    {
      path: "/all-video",
      element: (
        <>
          <ProtectedRoute>
            <Scrolltotop />
            <Allvideo />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/search",
      element: (
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      ),
    },
    {
      path: "/tvshows",
      element: (
        <ProtectedRoute>
          <Tvshows />
        </ProtectedRoute>
      ),
    },
    {
      path: "/movie",
      element: (
        <ProtectedRoute>
          <Movie />
        </ProtectedRoute>
      ),
    },
    {
      path: "/mylist",
      element: <Playlist />,
    },
    {
      path: "/category",
      element: (
        <ProtectedRoute>
          <Category />
        </ProtectedRoute>
      ),
    },
    {
      path: "/payments/:id",
      element: (
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      ),
    },
    {
      path: "/plans",
      element: (
        <ProtectedRoute>
          <Plans />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/video/:id",
      element: (
        <ProtectedRoute>
          <Video />
        </ProtectedRoute>
      ),
    },

    {
      path: "/signin",
      element: (
        <LoginValidater>
          <Signin />
        </LoginValidater>
      ),
    },
    {
      path: "/signup",
      element: (
        <LoginValidater>
          <Signup />
        </LoginValidater>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgotpass",
      element: (
        <LoginValidater>
          <Forgetpassword />
        </LoginValidater>
      ),
    },
    {
      path: "/resetpassword",
       element: (
        <LoginValidater>
           <Setpass />
        </LoginValidater>
      ),
    },
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
}

export default App;
