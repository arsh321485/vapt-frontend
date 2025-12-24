import { defineStore } from "pinia";
import endpoint from "../services/apiServices";
import type { AxiosError } from "axios";

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
    tickets: [] as any[], 
    countries: [] as string[],
    totalAssets: 0 as number,
    avgScore: 0 as number,
    vulnerabilities: { critical: 0,high: 0,medium: 0,low: 0, },
    vulnerabilityRegister: [] as any[],
    vulnerabilityCount: 0,
    vulnerabilityRows: [] as any[],
    assetRows: [] as any[],
    assetCount: 0,
    memberType: "",
    assetSearchResults: [] as any[],
    assetSearchCount: 0,
    selectedAssetDetail: null as any,
    selectedAssetVulnerabilities: [] as any[],
    mitigationTimeline: null,
    meanTimeToRemediate: null as null | {
    mean_time_to_remediate_days: number;
    mean_time_to_remediate_hours: number;
    risk_criteria_days: {
      critical: number;
      high: number;
      medium: number;
      low: number;
      };
    },
    reportLocations: [] as { id: string; name: string }[],
    selectedReportLocation: null as
      | { id: string; name: string }
      | null,
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

  // ✅ Restore auth + auto-fetch locations on refresh
  initFromStorage() {
    try {
      // 1️⃣ Restore user
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        console.log("♻️ Restored user from storage:", this.user);
      }

      // 2️⃣ Restore locations quickly (so UI shows instantly)
      const savedLocations = localStorage.getItem("locations");
      if (savedLocations) {
        this.locations = JSON.parse(savedLocations);
        console.log("♻️ Restored locations from storage:", this.locations);
      }

      // 3️⃣ Then re-fetch fresh locations from API (by admin id)
      const adminId =
        this.user?.admin_id || this.user?.id || this.user?._id;

      if (adminId) {
        this.fetchLocationsByAdminId(adminId);
      }
    } catch (e) {
      console.error("initFromStorage error:", e);
    }
  },

  // signup
  async signup(payload: any) {
    try {
      const res = await endpoint.post(
        "https://vaptbackend.secureitlab.com/api/admin/users/signup/",
        payload
      );

      const data = res.data;

      if (data.tokens?.access) {
        this.setAuth(data.tokens.access, data.user);
        if (data.tokens.refresh) {
          localStorage.setItem("refreshToken", data.tokens.refresh);
        }
      }

      // ✅ NEW USER
      localStorage.setItem("isNewUser", "true");

      return { status: true, data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || "Signup failed",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Login (signin)
  async login(payload: any) {
    try {
      const res = await endpoint.post(
        "https://vaptbackend.secureitlab.com/api/admin/users/login/",
        payload
      );

      const data = res.data;

      if (data.tokens?.access) {
        this.setAuth(data.tokens.access, data.user, data.locations || []);
        if (data.tokens.refresh) {
          localStorage.setItem("refreshToken", data.tokens.refresh);
        }
      }

      // ✅ OLD USER
      localStorage.setItem("isNewUser", "false");

      return { status: true, data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || "Login failed",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ Google login
  async googleLogin(id_token: string) {
  const res = await endpoint.post("/admin/users/google-oauth/", { id_token });
  const data = res.data;

  if (!data?.tokens?.access || !data?.user) {
    return { status: false, message: "Google login failed" };
  }

  this.setAuth(data.tokens.access, data.user);
  localStorage.setItem("refreshToken", data.tokens.refresh);

  // ✅ TRUST BACKEND (THIS IS THE FIX)
  localStorage.setItem(
    "isNewUser",
    data.is_new_user === true ? "true" : "false"
  );

  console.log("Google login → isNewUser =", localStorage.getItem("isNewUser"));

  return { status: true };
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

  // ✅ Get all countries
  async fetchCountries() {
    try {
      const res = await endpoint.get("/admin/location/countries/");
      const data = res.data;

      if (Array.isArray(data.countries)) {
        this.countries = data.countries;
        console.log("🌍 Countries fetched:", this.countries);
      } else {
        this.countries = [];
        console.warn("⚠ No countries array found in response:", data);
      }

      return { status: true, data };
    } catch (error: any) {
      console.error(
        "Fetch countries error:",
        error.response?.data || error.message
      );

      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Fetch countries failed",
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

  // ✅ Fetch locations by particular admin ID
  async fetchLocationsByAdminId(adminId: string) {
    try {
      const res = await endpoint.get(
        `/admin/location/locations/admin/${adminId}/`
      );

      const data = res.data;

      if (Array.isArray(data.locations) && data.locations.length > 0) {
        this.locations = data.locations;

        // ✅ Save to localStorage
        localStorage.setItem("locations", JSON.stringify(this.locations));

        console.log("📌 Locations fetched for admin:", adminId, this.locations);
      } else {
        console.warn("⚠ No locations found for admin:", adminId);
        this.locations = [];
        localStorage.removeItem("locations");
      }

      return { status: true, data };
    } catch (error: any) {
      console.error("❌ Failed to fetch locations:", error);

      // ✅ Fallback: load from localStorage
      const saved = localStorage.getItem("locations");
      if (saved) {
        this.locations = JSON.parse(saved);
        console.log(
          "📦 Loaded locations from localStorage (offline mode):",
          this.locations
        );
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

  // ✅ Upload report
  async uploadReport(formData: FormData) {
    try {
      const res = await endpoint.post(
        "https://vaptbackend.secureitlab.com/api/admin/upload_report/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = res.data;
      const reportId = data?.upload_report?._id || data?.upload_report?.id || null;

      return { status: true, data, reportId };
    } catch (error: any) {
      console.error("Upload error:", error.response?.data || error.message);
      return {
        status: false,
        message: error.response?.data?.message || error.message,
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
    // const users = Array.isArray(data.data) ? data.data : [];
    const users = Array.isArray(data) ? data : [];

      return {
        status: true,
        message: "All users fetched successfully",
        data: users,
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

  // Update Member Role
  async updateUserRoles(userId: string, newRoles: string[]): Promise<any> {
    try {
      const res = await endpoint.patch(
        `/admin/users_details/user-detail/${userId}/update-role/`,
        { new_roles: newRoles }
      );

      return {
        status: true,
        message: res.data.message,
        updated_roles: res.data.updated_roles,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  // ✅ Add Risk Criteria
  async addRiskCriteria(payload: any) {
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
    } catch (error: any) {
      console.error("❌ Error adding Risk Criteria:", error);
      return { status: false, message: error?.response?.data?.message || error.message || "Failed to add Risk Criteria" };
    }
  },

  // 🧠 Login with Microsoft Teams OAuth
  async microsoftLogin(authCode: string, state: string) {
  try {
    const response = await endpoint.post("/admin/users/microsoft-oauth/", {
      code: authCode,
      state,
    });

    const data = response.data;
    console.log("✅ Microsoft Teams login success:", data);

    if (data && data.tokens && data.user) {
      // Save in localStorage
      localStorage.setItem("teams_user", JSON.stringify(data.user));
      localStorage.setItem("teams_access_token", data.tokens.access);
      localStorage.setItem("teams_refresh_token", data.tokens.refresh);
      localStorage.setItem("authenticated", "true");

      return { status: true, data };
    } else {
      return { status: false, message: "Invalid Microsoft login response" };
    }
  } catch (err: any) {
    console.error("❌ Microsoft login API error:", err);
    return {
      status: false,
      message:
        err.response?.data?.message || "Microsoft login failed, please try again",
    };
  }
  },

  // 🧠 Login with Slack OAuth  
  async getSlackOAuthUrl(baseUrl: string) {
      try {
        const res = await endpoint.post("/admin/users/slack/oauth-url/", {
          base_url: baseUrl,
        });

        if (res.data.success) {
          console.log("✅ Slack OAuth URL received:", res.data.auth_url);
          return { status: true, data: res.data };
        } else {
          return { status: false, message: "Failed to get Slack OAuth URL" };
        }
      } catch (error: any) {
        console.error("Slack OAuth URL API error:", error);
        return {
          status: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Slack OAuth URL fetch failed",
          details: error.response?.data || null,
        };
      }
  },
  async getSlackBotToken(code: string) {
      try {
        const res = await endpoint.get("/admin/users/slack/callback/", {
          params: { code, state: "dummy_state" },
        });

        if (res.data.success && res.data.data?.bot?.access_token) {
          const botToken = res.data.data.bot.access_token;
          console.log("🤖 Bot Access Token:", botToken);

          // Save it for later use
          localStorage.setItem("slack_user_login", botToken);
          return { status: true, botToken };
        } else {
          return { status: false, message: "Failed to get bot access token" };
        }
      } catch (error: any) {
        console.error("Slack callback API error:", error);
        return {
          status: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Slack callback failed",
        };
      }
  },
  async loginWithSlack(botToken: string, code: string, redirectUri: string) {
      try {
        // Debug
        console.log("🚀 Using bot token for login:", botToken);

        const res = await endpoint.post("/admin/users/slack-oauth/", {
          code,
          redirect_uri: redirectUri,
        });

        const data = res.data;

        if (data.success) {
          const slackData = data.data;

          // Save user data
          if (slackData.user) {
            this.user = slackData.user;
            localStorage.setItem(
              "slack_user_login_data",
              JSON.stringify(this.user)
            );
            console.log("👤 Slack User Saved:", this.user);
          }

          return { status: true, data: slackData };
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

  // fetch total assets
  async fetchTotalAssets(reportId: string) {
  try {
    const res = await endpoint.get(
      `/admin/admindashboard/report/${reportId}/total-assets/`
    );

    this.totalAssets = res.data.total_assets ?? 0;
    return { status: true, data: res.data };
  } catch (error: any) {
    console.error("Total assets error:", error.response?.data || error.message);
    return { status: false, message: "Failed to fetch total assets", details: error.response?.data || null };
  }
  },

  // 🔹 FETCH AVG SCORE
  async fetchAvgScore(reportId: string) {
  try {
    const res = await endpoint.get(
      `/admin/admindashboard/report/${reportId}/avg-score/`
    );
    this.avgScore = res.data?.avg_score ?? 0;
    return { status: true, data: res.data };
  } catch (error: any) {
    console.error("Avg score error:", error.response?.data || error.message);
    return {
      status: false,
      message: error.response?.data?.message || error.message || "Failed to fetch avg score",
      details: error.response?.data || null,
    };
  }
  },

  // ✅ ADD THIS
  async fetchVulnerabilities(reportId: string) {
  try {
    const res = await endpoint.get(
      `/admin/admindashboard/report/${reportId}/vulnerabilities/`
    );
    this.vulnerabilities = res.data || { critical: 0, high: 0, medium: 0, low: 0 };
    return { status: true, data: res.data };
  } catch (error: any) {
    console.error("Vulnerabilities error:", error.response?.data || error.message);
    this.vulnerabilities = { critical: 0, high: 0, medium: 0, low: 0 };
    return { status: false, message: "Failed to fetch vulnerabilities", details: error.response?.data || null };
  }
  },

  // fetch Mitigation Timeline
  async fetchMitigationTimeline(reportId: string) {
    try {
      const res = await endpoint.get(
        `/admin/admindashboard/report/${reportId}/mitigation-timeline/`
      );

      this.mitigationTimeline = res.data;
      return { status: true, data: res.data };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.detail || "Failed to fetch mitigation timeline",
      };
    }
  },

  // fetch MeanTime To Remediate
  async fetchMeanTimeToRemediate(reportId: string) {
  try {
    console.log("[MTTR] Calling API for reportId:", reportId);

    const res = await endpoint.get(
      `/admin/admindashboard/report/${reportId}/mean-time-remediate/`
    );

    console.log("[MTTR] API response:", res.data);

    this.meanTimeToRemediate = res.data;

    console.log("[MTTR] Stored in authStore:", this.meanTimeToRemediate);

    return { status: true, data: res.data };
  } catch (error: any) {
    console.error(
      "[MTTR] API error:",
      error.response?.data || error.message
    );

    return {
      status: false,
      message:
        error.response?.data?.detail ||
        "Failed to fetch mean time to remediate",
    };
  }
  },

  // Fetch locations by upload report id
  async fetchLocationsByReportId(reportId: string) {
    try {
      const res = await endpoint.get(
        `/admin/upload_report/upload/locations/${reportId}/`
      );

      if (res.data?.success) {
        this.reportLocations = res.data.locations || [];
        this.selectedReportLocation = res.data.selected_location || null;

        return { status: true, data: res.data };
      }

      return { status: false, message: "No locations found" };
    } catch (error: any) {
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch locations by report",
      };
    }
  },

  // FETCH Vulnerability Register
  async fetchVulnerabilityRegister(reportId: string) {
  try {
    if (!reportId) {
      console.warn("Vulnerability Register → Missing reportId");
      this.vulnerabilityRows = [];
      this.vulnerabilityCount = 0;
      return { status: false, message: "No reportId provided" };
    }

    console.log("Fetching Vulnerability Register for:", reportId);

    const res = await endpoint.get(
      `/admin/adminregister/register/${reportId}/vulns/`
    );

    console.log("Vulnerability Register response raw:", res && res.data ? res.data : res);

    // Try a few likely response shapes:
    const rows =
      res.data?.rows ??
      res.data?.data?.rows ??
      res.data?.results ??
      res.data?.vulnerabilities ??
      res.data ??
      [];

    // If rows is an object with keys (not an array), try to extract an array
    const finalRows = Array.isArray(rows) ? rows : Array.isArray(res.data?.rows) ? res.data.rows : [];

    this.vulnerabilityRows = finalRows;
    this.vulnerabilityCount = this.vulnerabilityRows.length;

    console.log("Vulnerability Count:", this.vulnerabilityCount);

    return { status: true, data: this.vulnerabilityRows };
  } catch (error: any) {
    console.error(
      "Vulnerability Register error:",
      error.response?.status,
      error.response?.data || error.message
    );

    this.vulnerabilityRows = [];
    this.vulnerabilityCount = 0;

    return {
      status: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch vulnerability register",
      details: error.response?.data || null,
    };
  }
  },

  // FIX Vulnerability
  async createFixVulnerability(reportId: string,asset: string,payload: Record<string, any>) {
  try {
    const res = await endpoint.post(
      `/admin/adminregister/fix-vulnerability/report/${reportId}/asset/${asset}/create/`,
      payload
    );
    return {
      status: true,
      data: res.data.data,
      message: res.data.message
    };
  } catch (error) {
    const err = error as AxiosError<any>;
    return {
      status: false,
      message:
        err.response?.data?.message || "Fix vulnerability failed",
      details: err.response?.data || null
    };
  }
  },

  // create Raise Support Request (UPDATED API)
  async raiseSupportRequest(
    reportId: string,
    vulnerabilityId: string,
    payload: {
      step: string;
      description: string;
    }
  ) {
    try {
      const res = await endpoint.post(
        `/admin/adminregister/support-requests/raise/report/${reportId}/vulnerability/${vulnerabilityId}/`,
        payload
      );

      return {
        status: true,
        data: res.data.data,
        message: res.data.message
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message:
          err.response?.data?.message || "Failed to raise support request",
        details: err.response?.data || null
      };
    }
  },

  // Get raise support request by vulnerability ID
  async getRaiseSupportRequestByVulnerability(vulnerabilityId: string) {
    try {
      const res = await endpoint.get(
        `/admin/adminregister/raise-support-requests/vulnerability/${vulnerabilityId}/`
      );

      return {
        status: true,
        exists: res.data.exists,
        data: res.data.data || null
      };
    } catch (error: any) {
      return {
        status: false,
        exists: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch support request"
      };
    }
  },

  // Create new ticket (updated API)
  async createTicket(
    reportId: string,
    fixVulnerabilityId: string,
    payload: {
      category: string;
      subject: string;
      description: string;
    }
  ) {
    try {
      const res = await endpoint.post(
        `/admin/adminregister/tickets/report/${reportId}/fix/${fixVulnerabilityId}/create/`,
        payload
      );

      return {
        status: true,
        data: res.data.data,
        message: res.data.message
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message:
          err.response?.data?.message || "Failed to create ticket",
        details: err.response?.data || null
      };
    }
  },

  // Get all tickets by report id
  async getTicketsByReport(reportId: string) {
    try {
      console.log("🔥 Fetching tickets for report:", reportId);

      const res = await endpoint.get(
        `/admin/adminregister/tickets/report/${reportId}/`
      );

      console.log("✅ Tickets API response:", res.data);

      return {
        status: true,
        data: res.data.results
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      console.error("❌ Tickets API error:", err.response?.data || err);

      return {
        status: false,
        message:
          err.response?.data?.message || "Failed to fetch tickets"
      };
    }
  },

  // GET ALL ASSETS
  async fetchAssets(reportId: string) {
    try {
      const res = await endpoint.get(`/admin/adminasset/report/${reportId}/assets/`);
      const rows = res.data.assets || [];
      const normalized = rows.map((a: any) => ({
        ...a,
        selected: !!a.selected || false,
        held: !!a.held || false,
        isInternal: (a.exposure || "").toLowerCase() === "internal",
        host_information: a.host_information || {},
        severity_counts: a.severity_counts || { critical: 0, high: 0, medium: 0, low: 0 },
      }));
      this.assetRows = normalized;
      this.assetCount = res.data.count ?? normalized.length;
      this.memberType = res.data.member_type;
      console.log("[authStore] assetRows length:", this.assetRows.length);
      return { status: true, data: res.data };
    } catch (error: any) {
      console.error("[authStore] fetchAssets error:", error.response?.data || error.message);
      return { status: false, error: error.response?.data || error.message };
    }
  },

  // search assets (UPDATED for new API)
  async searchAssets(reportId: string, q: string) {
    try {
      console.log("[authStore] searchAssets ->", { reportId, q });

      const res = await endpoint.get(
        `/admin/adminasset/report/${reportId}/assets/`,
        {
          params: { q }
        }
      );

      const assets = res.data.assets || [];

      // normalize same as fetchAssets
      const normalized = assets.map((a: any) => ({
        ...a,
        selected: false,
        held: false,
        isInternal: (a.exposure || "").toLowerCase() === "internal",
        host_information: a.host_information || {},
        severity_counts: a.severity_counts || {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0
        }
      }));

      this.assetSearchResults = normalized;
      this.assetSearchCount =
        res.data.total_assets ?? normalized.length;

      console.log("[authStore] searchAssets results:", normalized);

      return { status: true, data: normalized };
    } catch (error: any) {
      console.error(
        "[authStore] searchAssets error:",
        error.response?.data || error.message
      );
      return { status: false, error: error.response?.data || error.message };
    }
  },

  // DELETE Asset from report
  async deleteAsset(reportId: string, assetIp: string) {
    try {
      const res = await endpoint.delete(
        `/admin/adminasset/report/${reportId}/assets/${assetIp}/`
      );

      console.log("✔ Asset deleted:", res.data);
      this.assetRows = this.assetRows.filter(a => a.asset !== assetIp);

      return { status: true, data: res.data };
    } catch (error: any) {
      console.error("❌ Delete Asset Error:", error.response?.data || error.message);
      return { status: false, error: error.response?.data || error.message };
    }
  },

  // HOLD asset
  async holdAsset(reportId: string, assetIp: string) {
  try {
    const res = await endpoint.post(
      `/admin/adminasset/report/${reportId}/assets/${assetIp}/hold/`
    );

    if (typeof res.data?.total_assets === "number") {
      this.assetCount = res.data.total_assets;
    }

    return {
      status: true,
      heldAsset: res.data.asset,
      data: res.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.detail || "Failed to hold asset",
    };
  }
  },

  //  fetch held assets list
  async fetchHeldAssets(reportId: string) {
  try {
    const res = await endpoint.get(
      `/admin/adminasset/report/${reportId}/assets/hold-list/`
    );

    return {
      status: true,
      assets: res.data.assets || [],
      count: res.data.count || 0,
    };
  } catch (error: any) {
    return {
      status: false,
      assets: [],
      message: error.response?.data?.detail || "Failed to fetch held assets",
    };
  }
  },

  // UNHOLD asset
  async unholdAsset(reportId: string, assetIp: string) {
    try {
      const res = await endpoint.post(
        `/admin/adminasset/report/${reportId}/assets/${assetIp}/unhold/`
      );

      if (typeof res.data?.total_assets === "number") {
        this.assetCount = res.data.total_assets;
      }

      return {
        status: true,
        restoredAsset: res.data.asset, // ✅ important
        data: res.data,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.detail || "Failed to unhold asset",
      };
    }
  },

  // Get support requests by host for assets page
  async getSupportRequestsByHost(host: string) {
    try {
      const res = await endpoint.get(
        `/admin/adminasset/support-requests/host/${host}/`
      );

      return {
        status: true,
        data: res.data.results || [],
        count: res.data.count || 0
      };
    } catch (error: any) {
      return {
        status: false,
        data: [],
        count: 0
      };
    }
  },

  // Get closed fix vulnerabilities by host
  async getClosedFixVulnerabilitiesByHost(host: string) {
    try {
      const res = await endpoint.get(
        `/admin/adminasset/fix-vulnerabilities/host/${host}/closed/`
      );

      return {
        status: true,
        data: res.data.results || [],
        count: res.data.count || 0
      };
    } catch (error) {
      return {
        status: false,
        data: [],
        count: 0
      };
    }
  },

  // fetch single asset
  async fetchSingleAssetVulnerabilities(reportId: string, asset: string) {
    try {
      const res = await endpoint.get(
        `/admin/adminasset/report/${reportId}/asset/${asset}/vulnerabilities/`
      );

      const vulns = res.data.vulnerabilities || [];

      this.selectedAssetVulnerabilities = vulns;

      this.selectedAssetDetail = {
        asset: res.data.asset,
        exposure: vulns[0]?.exposure || "",
        owner: vulns[0]?.owner || "",
        severity: vulns[0]?.severity || "",
      };

      return { status: true };
    } catch (error) {
      this.selectedAssetDetail = null;
      this.selectedAssetVulnerabilities = [];
      return { status: false };
    }
  },

  // Get all support requests by report id
  async getSupportRequestsByReport(reportId: string) {
  console.log("📡 Store API called with:", reportId);

  const res = await endpoint.get(
    `/admin/adminregister/support-requests/report/${reportId}/`
  );

  return {
    status: true,
    data: res.data.results,
    count: res.data.count
  };
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
      localStorage.removeItem("isNewUser");
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