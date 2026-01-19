import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Signin.css"; // reuse the same styling for consistent UI
import Logo from "/short_logo.png";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setpass = () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/setpass",
        { token: token, password: form.password },
        {
          headers: { "Content-Type": "application/json", Authxxxxx: "XYZ" },
        }
      );

      if (res.data.Status) {
        toast.success(res.data.Message, {
          onClose: () => navigate("/signin"),
        });
      } else {
        toast.error(res.data?.Message || "Failed to reset password", {
          className: "custom-toast-error",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.Message, {
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
              <p className="login-subtitle">Set your new password below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div id="resetForm">
                {/* New Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${
                        errors.password ? "invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter new password"
                      value={form.password}
                      onChange={(e) => {
                        setForm({ ...form, [e.target.name]: e.target.value });
                        setErrors({ ...errors, [e.target.name]: "" });
                      }}
                    />
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } input-icon`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-control ${
                        errors.confirmPassword ? "invalid" : ""
                      }`}
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={form.confirmPassword}
                      onChange={(e) => {
                        setForm({ ...form, [e.target.name]: e.target.value });
                        setErrors({ ...errors, [e.target.name]: "" });
                      }}
                    />
                    <i
                      className={`fas ${
                        showConfirm ? "fa-eye-slash" : "fa-eye"
                      } input-icon`}
                      onClick={() => setShowConfirm(!showConfirm)}
                    ></i>
                  </div>
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-login"
                  disabled={isLoading}
                >
                  <span className="btn-text">
                    {isLoading ? "Updating..." : "Set Password"}
                  </span>
                </button>
              </div>
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

export default Setpass;
