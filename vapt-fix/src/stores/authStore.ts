import { defineStore } from "pinia";
import endpoint from "../services/apiServices";

interface Location {
  _id: string;
  admin_id: string;
  location_name: string;
  created_at?: string;
  updated_at?: string;
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
          this.setAuth(data.tokens.access, data.user,data.locations || []);

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

  // Fetch all locations
  // async fetchLocations() {
  // try {
  //   const res = await endpoint.get("/admin/location/locations/");
  //   const data = res.data;

  //   if (data.locations) {
  //     this.locations = data.locations;
  //     localStorage.setItem("locations", JSON.stringify(this.locations));
  //     console.log("📌 Locations fetched & saved:", this.locations);
  //   }

  //   return { status: true, data };
  // } catch (error: any) {
  //   console.error("❌ Failed to fetch locations", error);
  //   return {
  //     status: false,
  //     message:
  //       error.response?.data?.message || error.message || "Fetch locations failed",
  //     details: error.response?.data || null,
  //   };
  // }
  // },

  // ✅ Fetch locations by Admin ID
  // async fetchLocationsById() {
  //   try {
  //     const adminId = this.user?.id || this.user?._id;

  //     if (!adminId) {
  //       throw new Error("Admin ID not found. Please login again.");
  //     }

  //     const res = await endpoint.get(`/admin/location/locations/${adminId}`);
  //     const data = res.data;

  //     if (data.location) {
  //       // API returns a single "location" object → wrap it in array
  //       this.locations = [data.location];
  //       localStorage.setItem("locations", JSON.stringify(this.locations));
  //       console.log("📌 Location fetched by adminId & saved:", this.locations);
  //     } else {
  //       this.locations = [];
  //       localStorage.setItem("locations", JSON.stringify([]));
  //     }

  //     return { status: true, data };
  //   } catch (error: any) {
  //     console.error("❌ Failed to fetch locations by ID", error);
  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message || error.message || "Fetch locations by ID failed",
  //       details: error.response?.data || null,
  //     };
  //   }
  // },

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
      localStorage.removeItem("locations");
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
      this.locations = locations;

      localStorage.setItem("authorization", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", JSON.stringify(true));
      localStorage.setItem("locations", JSON.stringify(this.locations));

      console.log("Access Token saved:", token);
      console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
      console.log("✅ Locations saved in localStorage:", this.locations);

      // this.fetchLocationsById();
  },

    getAuthorization() {
      return this.token;
    },
  },
});