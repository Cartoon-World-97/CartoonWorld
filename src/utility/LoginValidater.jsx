import { Navigate } from "react-router-dom";

const LoginValidater = ({ children }) => {
  const token = localStorage.getItem("Jwttoken");

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default LoginValidater;
