import { defineStore } from "pinia";
import endpoint from "../services/apiServices";

interface Location {
  _id: string;
  admin_id: string;
  location_name: string;
  created_at?: string;
  updated_at?: string;
}

interface CreateUserPayload {
  admin_id: string;
  location_id: string;
  first_name: string;
  last_name: string;
  user_type: string;
  email: string;
  select_location: string;
  Member_role: string;
}

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
    locations: localStorage.getItem("locations") 
      ? JSON.parse(localStorage.getItem("locations")!)
      : [] as Location[],
    accessToken: localStorage.getItem("authorization") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  }),

  actions: {
    // ✅ Restore session on reload
    restoreFromStorage() {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");
      const user = localStorage.getItem("user");

      if (access && user) {
        this.accessToken = access;
        this.refreshToken = refresh;
        this.user = JSON.parse(user);
        this.authenticated = true;
        console.log("🔄 Session restored from localStorage");
        return true;
      }
      return false;
    },

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
          this.setAuth(data.tokens.access, data.user,data.locations || []);

          if (data.tokens.refresh) {
            localStorage.setItem("refreshToken", data.tokens.refresh);
          }

          // ✅ Save user in localStorage (for later use like admin_id)
          if (data?.user) {
            this.user = data.user;
            localStorage.setItem("user", JSON.stringify(this.user));
            console.log("👤 Logged-in Admin Saved:", this.user);
          }

          // ✅ Fetch locations after login
          await this.fetchLocations();
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
        const response = await endpoint.get("/admin/users/profile");
        const data = response.data;
        if (data.status) {
          this.user = data.user;
          localStorage.setItem("user", JSON.stringify(data.user));
          return { status: true, data };
        }
        return { status: false, message: data.message };
      } catch (error) {
        console.error("Profile fetch error:", error);
        return { status: false, message: "Unable to fetch profile" };
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

  // add location
  async addLocation(locationName: string) {
      try {
        const adminId = this.user?.id || this.user?._id;

        if (!adminId) {
          throw new Error("Admin ID not found. Please login again.");
        }

        const payload = {
          admin_id: adminId,
          location_name: locationName,
        };

        const res = await endpoint.post(
          "/admin/location/add-location/",
          payload
        );
        const data = res.data;

        if (data.location) {
          this.locations.push(data.location);
          localStorage.setItem("locations", JSON.stringify(this.locations));
          console.log("📌 New location added & saved:", this.locations);
        }

        return { status: true, data };
      } catch (error: any) {
        return {
          status: false,
          message:
            error.response?.data?.message || error.message || "Add location failed",
          details: error.response?.data || null,
        };
      } 
  }, 

  // ✅ Fetch all locations
  async fetchLocations() {
    try {
      const res = await endpoint.get("/admin/location/locations/");
      const data = res.data;

      // Handle array or object response safely
      if (Array.isArray(data.locations) && data.locations.length > 0) {
        this.locations = data.locations;

        // ✅ Save to localStorage for persistence
        localStorage.setItem("locations", JSON.stringify(this.locations));
        console.log("📌 Locations fetched & saved:", this.locations);
      } else {
        console.warn("⚠ No locations received from API:", data);
        this.locations = [];
        localStorage.removeItem("locations");
      }

      return { status: true, data };
    } catch (error :any) {
      console.error("❌ Failed to fetch locations:", error);

      // Fallback: load from localStorage if available
      const saved = localStorage.getItem("locations");
      if (saved) {
        this.locations = JSON.parse(saved);
        console.log("📦 Loaded locations from localStorage (offline mode):", this.locations);
      }

      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Fetch locations failed",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Create User Detail
  async createUserDetail(payload: CreateUserPayload) {
      try {
        const res = await endpoint.post(
          "/admin/users_details/add-user-detail/",
          payload
        );

        const data = res.data;
        console.log("✅ User created successfully:", data);

        return {
          status: true,
          message: data.message || "User created successfully",
          data: data.data || {},
        };
      } catch (error: unknown) {
        const err = error as any;
        console.error("❌ Failed to create user detail:", err);

        return {
          status: false,
          message:
            err.response?.data?.message ||
            err.message ||
            "Create user detail failed",
          details: err.response?.data || null,
        };
      }
  },

  // ✅ Fetch All Users
  async fetchAllUsers() {
    try {
      const res = await endpoint.get("/admin/users_details/list-user-details/");
      const data = res.data;

      console.log("✅ All users fetched successfully:", data);
      console.log("✅ All users fetched successfully:", data);

    // Extract user list properly
    const users = Array.isArray(data.data) ? data.data : [];

      return {
        status: true,
        message: data.message || "All users fetched successfully",
        data: data || [],
      };
    } catch (error : unknown) {
      const err = error as any;
      console.error("❌ Failed to fetch users:", err);

      return {
        status: false,
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch users",
        details: err.response?.data || null,
      };
    }
  },

  // ✅ Add Risk Criteria
  async addRiskCriteria(payload) {
    try {
      const adminId =
        this.user?.admin_id ||
        this.user?.id ||
        this.user?._id ||
        this.user?.user?._id ||
        this.user?.user?.admin_id;

      if (!adminId) {
        throw new Error("Admin ID not found. Please login again.");
      }

      const body = {
        admin_id: adminId,
        critical: payload.critical,
        high: payload.high,
        medium: payload.medium,
        low: payload.low,
      };

      const res = await endpoint.post("/admin/risk_criteria/add-risk/", body);

      if (res.status === 200 || res.status === 201) {
        console.log("✅ Risk Criteria created successfully:", res.data);
        return { status: true, message: res.data.message, data: res.data.risk_criteria };
      }

      return { status: false, message: "Failed to create Risk Criteria" };
    } catch (error) {
      console.error("❌ Error adding Risk Criteria:", error);
      // No type checks, just return message
      return { status: false, message: error?.response?.data?.message || error.message || "Failed to add Risk Criteria" };
    }
  },

  // 🧠 Login with Microsoft Teams OAuth
  async loginWithMicrosoftTeams(access_token: string) {
    try {
      const res = await endpoint.post("/admin/users/microsoft-teams-oauth/", {
        access_token: access_token,
      });

      const data = res.data;

      if (data.tokens?.access) {
        // ✅ Save access + refresh tokens
        this.setAuth(data.tokens.access, data.user, data.locations || []);

        if (data.tokens.refresh) {
          localStorage.setItem("refreshToken", data.tokens.refresh);
        }

        // ✅ Save user info in localStorage
        if (data?.user) {
          this.user = data.user;
          localStorage.setItem("user", JSON.stringify(this.user));
          console.log("👤 Teams User Saved:", this.user);
        }

        return { status: true, data };
      }

      return { status: false, message: "Microsoft Teams login failed" };
    } catch (error: any) {
      console.error("Microsoft Teams login API error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Microsoft Teams login failed",
        details: error.response?.data || null,
      };
    }
  },

  // 🧠 Login with Slack OAuth
  async loginWithSlack(code: string, redirectUri: string) {
    try {
      const res = await endpoint.post("/admin/users/slack-oauth/", {
        code,
        redirect_uri: redirectUri,
      });

      const data = res.data;

      if (data.success) {
        // ✅ Save access tokens
        if (data.data.user_access_token) {
          localStorage.setItem("slackAccessToken", data.data.user_access_token);
        }

        // ✅ Save Slack user info
        if (data.data.user) {
          this.user = data.data.user;
          localStorage.setItem("slackUser", JSON.stringify(this.user));
          console.log("👤 Slack User Saved:", this.user);
        }

        return { status: true, data: data.data };
      }

      return { status: false, message: "Slack login failed" };
    } catch (error: any) {
      console.error("Slack login API error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Slack login failed",
        details: error.response?.data || null,
      };
    }
  },  

  // 🧠 Jira OAuth - Get Authorization URL
  async getJiraAuthUrl() {
    try {
      const res = await endpoint.get("/admin/users/jira/oauth-url/");
      const data = res.data;

      if (data?.auth_url) {
        console.log("🌐 Jira Auth URL:", data.auth_url);
        return { status: true, url: data.auth_url, state: data.state };
      } else {
        return { status: false, message: "No authorization URL received." };
      }
    } catch (error: any) {
      console.error("❌ Jira OAuth URL API error:", error);
      return {
        status: false,  
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch Jira OAuth URL",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Google login
  async googleLogin(id_token: string) {
  try {
    const response = await endpoint.post("/admin/users/google-oauth/", {
      id_token,
    });

    const data = response.data;
    console.log("✅ Google login successful:", data);

    if (data && data.tokens && data.user) {
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authorization", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      localStorage.setItem("authenticated", JSON.stringify(true));

      this.user = data.user;
      this.token = data.tokens.access;
      this.accessToken = data.tokens.access;
      this.refreshToken = data.tokens.refresh;
      this.authenticated = true;

      // ✅ also store google_id_token for restoration
      localStorage.setItem("google_id_token", id_token);

      return { status: true, data }; // <-- important
    } else {
      return { status: false, message: "Invalid Google login response" };
    }
  } catch (error: any) {
    console.error("❌ Google login API error:", error);
    return {
      status: false,
      message:
        error.response?.data?.message || "Google login failed, please try again",
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
      localStorage.removeItem("authorization");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("locations");
      localStorage.removeItem("google_id_token");
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      console.log("🚪 User logged out, localStorage cleared");

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
  setAuth(token: string, user: any, locations: Location[] = []) {
      this.token = token;
      this.user = user;
      this.authenticated = true;

      if (locations.length > 0) {
        this.locations = locations;
      } else {
        const savedLocations = localStorage.getItem("locations");
        this.locations = savedLocations ? JSON.parse(savedLocations) : [];
      }

      localStorage.setItem("authorization", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", JSON.stringify(true));
      localStorage.setItem("locations", JSON.stringify(this.locations));

      console.log("Access Token saved:", token);
      console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
      console.log("✅ Locations saved in localStorage:", this.locations);
      console.log("✅ Auth set successfully:", this.user, this.locations);
  },

    getAuthorization() {
      return this.token;
    },
  },
});