import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; // reuse your styles
import Logo from "/short_logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "auth/resetpass", { email:email },
          {
          headers: { "Content-Type": "application/json", Authxxxxx: "XYZ" },
        }
      );
      if (res.data.Status) {
        toast.success(res.data.Message,{
          onClose: () => navigate("/signin"), 
        })
      } else {
          toast.error(res.data?.Message, {
          className: "custom-toast-error",
        });
      }
    } catch (err) {
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
              <p className="login-subtitle">Reset your account password</p>
            </div>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className={`form-control ${error ? "invalid" : ""}`}
                    id="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                  <i className="fas fa-envelope input-icon"></i>
                </div>
                {error && <small className="text-danger">{error}</small>}
              </div>

              <button type="submit" className="btn-login" disabled={isLoading}>
                <span className="btn-text">
                  {isLoading ? "Sending..." : "Continue"}
                </span>
              </button>
            </form>

            <div className="signup-link">
              <Link to="/signin">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
