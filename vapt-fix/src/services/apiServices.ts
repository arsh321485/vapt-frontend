import axios from "axios";
import router from "../router";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const endpoint = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add token to requests (if exists)
// endpoint.interceptors.request.use(
//   (config) => {
//     const authorization = localStorage.getItem("authorization");

//     if (authorization && authorization !== "null" && authorization !== "undefined") {
//       try {
//         const token = JSON.parse(authorization);

//         if (token) {
//           config.headers["Authorization"] = `Bearer ${token}`;
//         }
//       } catch (e) {
//         console.error("Invalid token format", e);
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// ✅ Add token to requests (if exists)
endpoint.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authorization");

    if (token && token !== "null" && token !== "undefined") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle session expiry
endpoint.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage directly
      localStorage.removeItem("authorization");
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("refreshToken");

      router.push("/signin");

      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please log in again.",
      });
    }
    return Promise.reject(error);
  }
);

export default endpoint;