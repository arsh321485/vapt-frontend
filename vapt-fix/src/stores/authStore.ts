import { defineStore } from "pinia";
import endpoint from "../services/apiServices";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
    token: localStorage.getItem("authorization")
      ? localStorage.getItem("authorization") 
      : null,
    authenticated: localStorage.getItem("authenticated")
      ? JSON.parse(localStorage.getItem("authenticated")!)
      : false,
  }),

  actions: {
    // signup
    async signup(payload: any) {
      try {
        const res = await endpoint.post("/admin/users/signup/", payload);
        const data = res.data;

        if (data.tokens?.access) {
          this.setAuth(data.tokens.access, data.user);

          if (data.tokens.refresh) {
            localStorage.setItem("refreshToken", data.tokens.refresh); 
          }
        }

        return { status: true, data };
      } catch (error: any) {
        console.error("Signup error:", error.response?.data || error.message);

        return {
          status: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Signup failed",
          details: error.response?.data || null,
        };
      }
    },

    // ✅ Login (signin)
    async login(payload: any) {
      try {
        const res = await endpoint.post("/admin/users/login/", payload);
        const data = res.data;

        if (data.tokens?.access) {
          this.setAuth(data.tokens.access, data.user);

          if (data.tokens.refresh) {
            localStorage.setItem("refreshToken", data.tokens.refresh);
          }
        }

        return { status: true, data };
      } catch (error: any) {
        return {
          status: false,
          message: error.response?.data?.message || error.message || "Login failed",
          details: error.response?.data || null,
        };
      }
    },

    // ✅ Forgot Password
  async forgotPassword(payload: { email: string }) {
    try {
      const res = await endpoint.post("/admin/users/forgot-password/", payload);
      return { status: true, data: res.data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message || "Request failed",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Get User Profile
  async getUserProfile() {
    try {
      const res = await endpoint.get("/admin/users/profile/");
      // API should return { message, user: {...} }
      return { status: true, data: res.data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message || "Failed to fetch profile",
        details: error.response?.data || null,
      };
    }
  },
  
  // ✅ Update User Profile
  async updateUserProfile(payload: { firstname: string; lastname: string; organisation_name: string; organisation_url: string }) {
    try {
      const res = await endpoint.put("/admin/users/profile/update/", payload);
      return { status: true, data: res.data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message || "Failed to update profile",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Change Password
  async changePassword(payload: { old_password: string; new_password: string; confirm_password: string }) {
    try {
      const res = await endpoint.put("/admin/users/change-password/", payload);
      return { status: true, data: res.data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message || "Failed to change password",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Logout user
async logout() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return { status: false, message: "No refresh token found" };
    }

    const res = await endpoint.post("/admin/users/logout/", {
      refresh: refreshToken,
    });

    // Clear auth data from localStorage
    localStorage.removeItem("authorization");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");

    return { status: true, data: res.data };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || error.message || "Logout failed",
      details: error.response?.data || null,
    };
  }
},

  // ✅ Set Auth
  setAuth(token: string, user: any) {
      this.token = token;
      this.user = user;
      this.authenticated = true;

      // ✅ Save as raw strings
      localStorage.setItem("authorization", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", JSON.stringify(true));

      console.log("Access Token saved:", token);
      console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
  },

    getAuthorization() {
      return this.token;
    },
  },
});