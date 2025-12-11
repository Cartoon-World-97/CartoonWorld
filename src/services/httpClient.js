// import axios from "axios";

// const httpClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, 
//   timeout: 15000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// httpClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("Jwttoken");
//     if (token){
//       config.headers.Authorization = `Bearer ${token}`;
//     } 
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

// export default httpClient;

import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// 🔐 Add Authorization Header
httpClient.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("Jwttoken");
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Auto Refresh on Expired Token
httpClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // JWT expired
    if (error.response?.data?.msg === "Token has expired") {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) {
        console.log("No refresh token, logout");
        window.location.href = "/signin";
        return;
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refresh }
        );

        const newToken = res.data.access;

        localStorage.setItem("Jwttoken", newToken);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(originalRequest);

      } catch (err) {
        console.log("Refresh failed, logout");
        localStorage.removeItem("Jwttoken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
