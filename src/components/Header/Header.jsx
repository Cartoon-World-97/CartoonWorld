import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useLogin from "../../hooks/Login";
import httpClient from "../../services/httpClient"; // for search suggestions (optional)

import "./Header.css";

const Header = () => {
  const isLogin = useLogin();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const [query, setQuery] = useState(searchQuery);
  const [isScrolled, setIsScrolled] = useState(true);

  // 🔥 Auto-Fill (Autocomplete)
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 🔍 Handle Submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      setSearchQuery(query);

      if (pathname !== "/search") {
        navigate("/search");
      }
    }

    setShowSuggestions(false);
  };

  // 🔥 Fetch Suggestions (Optional backend)
  const fetchSuggestions = async (text) => {
    try {
      const body = { query: text, limit: 5, page: 1, type: "fetchSuggestions" };
      const res = await httpClient.post("/search", body);

      const list =
        res.data.results?.map((v) => v.Title) ||
        res.data.Vidoes?.map((v) => v.Title) ||
        [];

      setSuggestions(list);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  // 🧠 On typing → fetch suggestions
  // const handleInput = (text) => {
  //   setQuery(text);
  //   // if (text.trim().length > 0) {
  //     fetchSuggestions(text);
  //     setShowSuggestions(true);
  //   // } else {
  //   //   setShowSuggestions(false);
  //   // }
  // };
  const handleInput = (text) => {
    setQuery(text);

    if (text.trim() === "") {
      fetchSuggestions(""); // fetch history only
      setShowSuggestions(true);
      return;
    }

    fetchSuggestions(text); // typed suggestions
    setShowSuggestions(true);
  };

  // Sticky Header Scroll Logic
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Logout = () => {
    localStorage.removeItem("Jwttoken");
    navigate("/signin");
  };

  return (
    <header className={`header main-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/short_logo.png" className="logo-img" alt="" />
          <div className="logo-text">Cartoon World</div>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movie">Movies</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tvshows">TV Shows</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mylist">My List</NavLink>
            </li>
          </ul>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="search-wrapper d-none d-sm-block">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for movies, shows..."
              value={query}
              onInput={(e) => handleInput(e.target.value)}
              onFocus={() => {
                if (query.trim() === "") {
                  fetchSuggestions(""); // Only fetch history when empty
                }
                setShowSuggestions(true);
              }}
            />

            <i className="fas fa-search" onClick={handleSearch}></i>
          </div>

          {/* 🔥 Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setQuery(item); // Auto-fill
                    setSearchQuery(item);
                    navigate("/search"); // Search immediately
                    setShowSuggestions(false);
                  }}
                >
                  <i className="fa-solid fa-clock-rotate-left pe-2"></i> {item}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* User Actions */}
        <div className="user-actions">
          {/* <button className="notification-btn">
            <i className="fas fa-bell"></i>
          </button> */}

          {!isLogin && (
              <Link to="/signin" className="login-btn text-decoration-none">
              Login
            </Link>
          )}
              {isLogin && (
            <div className="profile-dropdown dropdown">
              <button
                className="profile-btn profile-icon"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">
                    <Link to="/profile" className="text-decoration-none text-white">
                      <i className="fa-solid fa-circle-user me-2"></i> Profile
                    </Link>
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={Logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSearch} className="search-wrapper d-block d-sm-none ">
          <div className="search-bar mx-3 my-2">
            <input
              type="text"
              placeholder="Search for movies, shows..."
              value={query}
              onInput={(e) => handleInput(e.target.value)}
              onFocus={() => {
                if (query.trim() === "") {
                  fetchSuggestions(""); // Only fetch history when empty
                }
                setShowSuggestions(true);
              }}
            />

            <i className="fas fa-search" onClick={handleSearch}></i>
          </div>

          {/* 🔥 Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestion-box">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setQuery(item); // Auto-fill
                    setSearchQuery(item);
                    navigate("/search"); // Search immediately
                    setShowSuggestions(false);
                  }}
                >
                  <i className="fa-solid fa-clock-rotate-left pe-2"></i> {item}
                </li>
              ))}
            </ul>
          )}
        </form>
    </header>
  );
};

export default Header;
