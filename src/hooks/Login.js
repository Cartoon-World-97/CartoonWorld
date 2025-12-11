import { useEffect, useState } from "react";

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Jwttoken");
    setIsLogin(!!token); 
  }, []);

  return isLogin;
};

export default useLogin;
