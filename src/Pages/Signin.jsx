import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import Logo from "/short_logo.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!loginForm.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!loginForm.password.trim()) {
      newErrors.password = "Password is required";
    } else if (loginForm.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        loginForm,
        {
          headers: { "Content-Type": "application/json", Authxxxxx: "XYZ" },
        }
      );
      if (res.data.Status) {
          localStorage.setItem("Jwttoken", res.data.token);
          localStorage.setItem("refreshToken", res.data.refresh);

        toast.success(res.data.Message, {
          onClose: () => {
            navigate("/");
          },
        });
      } else {
        toast.error(res.data?.Message, {
          className: "custom-toast-error",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.Message || "Login failed", {
          className: "custom-toast-error",
        });
      } else if (error.request) {
        toast.error("Server not responding. Please check Flask server.", {
          className: "custom-toast-error",
        });
      } else {
        toast.error("Something went wrong while sending request.", {
          className: "custom-toast-error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="signinBody">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="login-container">
          <div className="login-card">
            <div className="login-logo">
              <img src={Logo} alt="logo" />
              <span className="logo-text">Cartoon World</span>
              <p className="login-subtitle">
                Welcome back! Please login to continue
              </p>
            </div>

            <form onSubmit={login}>
              <div id="loginForm">
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        errors.email ? "invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => {
                        setLoginForm({
                          ...loginForm,
                          [e.target.name]: e.target.value,
                        });
                        setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                      }}
                    />
                    <i className="fas fa-envelope input-icon"></i>
                  </div>
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showpassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${
                        errors.password ? "invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => {
                        setLoginForm({
                          ...loginForm,
                          [e.target.name]: e.target.value,
                        });
                        setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                      }}
                    />
                    <i
                      className={`fas ${
                        showpassword ? "fa-eye-slash" : "fa-eye"
                      } input-icon`}
                      onClick={() => setShowpassword(!showpassword)}
                    ></i>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                <div className="form-options">
                  <label className="custom-checkbox">
                    <input type="checkbox" id="rememberMe" />
                  </label>
                  <Link to="/forgotpass" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn-login"
                  disabled={isLoading}
                >
                  <span className="btn-text">
                    {isLoading ? "Logging in..." : "Login"}
                  </span>
                </button>
              </div>
            </form>

            <div className="signup-link">
              Don't have an account? <Link to="/Signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
