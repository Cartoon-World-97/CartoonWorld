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
import PayPalButton from "./Pages/testpayments";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ProtectedRoute>
            <Scrolltotop />
            <Home />
          </ProtectedRoute>
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
      element: (
        <ProtectedRoute>
          <Playlist />
        </ProtectedRoute>
      ),
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
      path: "/payments",
      element: (
        <ProtectedRoute>
          <PayPalButton />
        </ProtectedRoute>
      ),
    },{
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
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
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgotpass",
      element: <Forgetpassword />,
    },
    {
      path: "/resetpassword",
      element: <Setpass />,
    },
  ]);

  // return <RouterProvider router={router} />
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  );
}

export default App;
