import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Logo from "/short_logo.png";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [loginForm, setLoginForm] = useState({ name:"",email: "", password: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    let newErrors = {};
 if (!loginForm.name.trim()) {
      newErrors.name = "name is required";
    }
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
        import.meta.env.VITE_API_URL + "auth/register",
        loginForm,
        {
          headers: { "Content-Type": "application/json", Authxxxxx: "XYZ" },
        }
      );
      if (res.data.status) {
        toast.success(res.data.Message,{
          onClose: () => navigate("/signin"), 
        })
        // setTimeout(() => {
        //   navigate("/signin");
        // }, 3000);
      } else {
        toast.error(res.data?.Message, {
          className: "custom-toast-error",
        });
      }
    } catch (error) {
      // ❌ Don't log to console — only show toast
      if (error.response) {
        toast.error(error.response.data?.Message , {
          className: "custom-toast-error",
        });
      } else if (error.request) {
        toast.error("Server not responding.", {
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
                Create your account to start watching
              </p>
            </div>

            <form onSubmit={login}>
              <div id="loginForm">
                 <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                     Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${
                        errors.name ? "invalid" : ""
                      }`}
                      id="name"
                      placeholder="Enter your Name"
                      value={loginForm.name}
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
                    <i className="fas fa-user input-icon"></i>
                  </div>
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>
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
                <button
                  type="submit"
                  className="btn-login"
                  disabled={isLoading}
                >
                  <span className="btn-text">
                    {isLoading ? "Logging in..." : "Submit"}
                  </span>
                </button>
              </div>
            </form>

            <div className="signup-link">
                              Already have an account?<Link to="/signin">Signin</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
