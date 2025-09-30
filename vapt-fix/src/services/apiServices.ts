import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Create axios instance
const endpoint = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Signup API
export const signup = async (payload: any) => {
  try {
    const res = await endpoint.post("/admin/users/signup/", payload);
    return res.data;
  } catch (error: any) {
    console.error("Signup API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Login(Signin)
export const loginUser = async (body: { email: string; password: string; recaptcha: string }) => {
  try {
    const res = await endpoint.post("/admin/users/login/", body);
    return res.data; 
  } catch (error: any) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Forgotpassword on 
export const forgotPassword = async (payload: { email: string }) => {
  try {
    const res = await endpoint.post("/admin/users/forgot-password/", payload);
    return res.data;
  } catch (error: any) {
    console.error(
      "Forgot Password API error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Reset Password API
export const resetPassword = async (
  userId: string,
  token: string,
  payload: { new_password: string; confirm_password: string }
) => {
  try {
    const res = await endpoint.put(
      `/admin/users/set-password/${userId}/${token}/`,
      payload
    );
    return res.data;
  } catch (error: any) {
    console.error("Reset Password API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export default endpoint;
