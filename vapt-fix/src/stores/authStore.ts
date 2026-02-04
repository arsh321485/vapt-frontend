import { defineStore } from "pinia";
import endpoint from "../services/apiServices";
import type { AxiosError } from "axios";

interface CreateUserPayload {
  admin_id: string;
  // location_id: string;
  user_type: string;
  email: string;
  // select_location: string;
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
    // locations: localStorage.getItem("locations") 
    //   ? JSON.parse(localStorage.getItem("locations")!)
    //   : [] as Location[],
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
    uploadedReportDetails: null as any,
    completedSteps: localStorage.getItem("completedSteps")
      ? JSON.parse(localStorage.getItem("completedSteps")!)
      : [] as number[],
    projectNames: [] as string[],
    isLoadingProjects: false,

    // ✅ Report Status (reactive state for dashboard blocking)
    reportStatus: {
      hasReport: false,
      reportId: null as string | null,
      message: "",
      checked: false,  
    },

    }),


  actions: {
  // ✅ Restore session on reload
  restoreFromStorage() {
    const access = localStorage.getItem("authorization"); // ✅ FIX
    const refresh = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("user");

    if (access && user) {
      this.token = access;
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
      // const savedLocations = localStorage.getItem("locations");
      // if (savedLocations) {
      //   this.locations = JSON.parse(savedLocations);
      //   console.log("♻️ Restored locations from storage:", this.locations);
      // }

      // 3️⃣ Then re-fetch fresh locations from API (by admin id)
      const adminId =
        this.user?.admin_id || this.user?.id || this.user?._id;

      // if (adminId) {
      //   this.fetchLocationsByAdminId(adminId);
      // }
    } catch (e) {
      console.error("initFromStorage error:", e);
    }
  },

  // ✅ Signup Step 1: Send OTP
  async signupSendOtp(payload: {
      email: string;
      password: string;
      confirm_password: string;
      recaptcha: string;
    }) {
      try {
        const res = await endpoint.post(
          "/api/admin/users/signup/send-otp/",
          payload
        );
        return { status: true, data: res.data, message: res.data.message };
      } catch (error: any) {
        const errorData = error.response?.data;
        const errorMessage = errorData?.message || errorData?.error || errorData?.detail || "Failed to send OTP";
        return {
          status: false,
          message: errorMessage,
          details: errorData || null,
        };
      }
    },

  // ✅ Signup Step 2: Verify OTP
  async signupVerifyOtp(payload: { email: string; otp: string }) {
      try {
        const res = await endpoint.post(
          "/api/admin/users/signup/verify-otp/",
          payload
        );

        const data = res.data;

        if (data.tokens?.access && data.user) {
          this.setAuth(data.tokens.access, data.user);

          if (data.tokens.refresh) {
            localStorage.setItem("refreshToken", data.tokens.refresh);
          }

          localStorage.setItem("authenticated", "true");
          localStorage.setItem("isNewUser", "true");
        }

        return { status: true, data, message: data.message };
      } catch (error: any) {
        const errorData = error.response?.data;
        const errorMessage = errorData?.message || errorData?.error || errorData?.detail || "OTP verification failed";
        return {
          status: false,
          message: errorMessage,
          details: errorData || null,
        };
      }
    },

    // ✅ LOGIN
  async login(payload: {
    email: string;
    password: string;
    testing_type: string[];
    recaptcha: string;
  }) {
    try {
      const res = await endpoint.post(
        "/api/admin/users/login/",
        payload
      );

      const data = res.data;

      if (data.tokens?.access) {
        this.setAuth(data.tokens.access, data.user);

        if (data.tokens.refresh) {
          localStorage.setItem("refreshToken", data.tokens.refresh);
        }
      }

      localStorage.setItem("isNewUser", "false");

      return { status: true, data, message: data.message };
    } catch (error: any) {
      const errorData = error.response?.data;
      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        errorData?.detail ||
        "Login failed";

      return {
        status: false,
        message: errorMessage,
        details: errorData || null,
      };
    }
  },

  // ✅ Google login
  async googleLogin(id_token: string) {
  const res = await endpoint.post("/api/admin/users/google-oauth/", { id_token });
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

  return { status: true, user: data.user, tokens: data.tokens };
  },

  // ✅ Forgot Password
  async forgotPassword(payload: { email: string }) {
      try {
        const res = await endpoint.post("/api/admin/users/forgot-password/", payload);
        return { status: true, data: res.data };
      } catch (error: any) {
        return {
          status: false,
          message: error.response?.data?.message || error.message || "Request failed",
          details: error.response?.data || null,
        };
      }
  },

  // ✅ Reset Password
  async resetPassword(payload: { uidb64: string; token: string; password: string; confirm_password: string }) {
      try {
        const { uidb64, token, password, confirm_password } = payload;
        const res = await endpoint.post(`/api/admin/users/reset-password/${uidb64}/${token}/`, {
          password,
          confirm_password
        });
        return { status: true, data: res.data, message: res.data.msg };
      } catch (error: any) {
        return {
          status: false,
          message: error.response?.data?.message || error.response?.data?.msg || error.message || "Reset failed",
          details: error.response?.data || null,
        };
      }
  },

  // ✅ Get User Profile
  async getUserProfile() {
      try {
        const response = await endpoint.get("/api/admin/users/profile");
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

  // ✅ Change Password
  async changePassword(payload: { old_password: string; new_password: string; confirm_password: string }) {
    try {
      const res = await endpoint.put("/api/admin/users/change-password/", payload);
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
  // async fetchCountries() {
  //   try {
  //     const res = await endpoint.get("/api/admin/location/countries/");
  //     const data = res.data;

  //     if (Array.isArray(data.countries)) {
  //       this.countries = data.countries;
  //       console.log("🌍 Countries fetched:", this.countries);
  //     } else {
  //       this.countries = [];
  //       console.warn("⚠ No countries array found in response:", data);
  //     }

  //     return { status: true, data };
  //   } catch (error: any) {
  //     console.error(
  //       "Fetch countries error:",
  //       error.response?.data || error.message
  //     );

  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message ||
  //         error.message ||
  //         "Fetch countries failed",
  //       details: error.response?.data || null,
  //     };
  //   }
  // },

  // add location
  // async addLocation(locationName: string) {
  //     try {
  //       const adminId = this.user?.id || this.user?._id;

  //       if (!adminId) {
  //         throw new Error("Admin ID not found. Please login again.");
  //       }

  //       const payload = {
  //         admin_id: adminId,
  //         location_name: locationName,
  //       };

  //       const res = await endpoint.post(
  //         "/api/admin/location/add-location/",
  //         payload
  //       );
  //       const data = res.data;

  //       if (data.location) {
  //         this.locations.push(data.location);
  //         localStorage.setItem("locations", JSON.stringify(this.locations));
  //         console.log("📌 New location added & saved:", this.locations);
  //       }

  //       return { status: true, data };
  //     } catch (error: any) {
  //       return {
  //         status: false,
  //         message:
  //           error.response?.data?.message || error.message || "Add location failed",
  //         details: error.response?.data || null,
  //       };
  //     } 
  // }, 

  // ✅ Fetch locations by particular admin ID
  // async fetchLocationsByAdminId(adminId: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/location/locations/admin/${adminId}/`
  //     );

  //     const data = res.data;

  //     if (Array.isArray(data.locations) && data.locations.length > 0) {
  //       this.locations = data.locations;

  //       // ✅ Save to localStorage
  //       localStorage.setItem("locations", JSON.stringify(this.locations));

  //       console.log("📌 Locations fetched for admin:", adminId, this.locations);
  //     } else {
  //       console.warn("⚠ No locations found for admin:", adminId);
  //       this.locations = [];
  //       localStorage.removeItem("locations");
  //     }

  //     return { status: true, data };
  //   } catch (error: any) {
  //     console.error("❌ Failed to fetch locations:", error);

  //     // ✅ Fallback: load from localStorage
  //     const saved = localStorage.getItem("locations");
  //     if (saved) {
  //       this.locations = JSON.parse(saved);
  //       console.log(
  //         "📦 Loaded locations from localStorage (offline mode):",
  //         this.locations
  //       );
  //     }

  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message ||
  //         error.message ||
  //         "Fetch locations failed",
  //       details: error.response?.data || null,
  //     };
  //   }
  // },

  // ✅ Get admin testing types for upload report page
  async getAdminTestingTypes(adminId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/users/${adminId}/testing-type/`
      );

      const raw = res.data?.data?.testing_type;

      let testingTypes: string[] = [];

      // Backend returns string like "['white_box', 'grey_box']"
      if (typeof raw === "string") {
        testingTypes = JSON.parse(raw.replace(/'/g, '"'));
      }

      return {
        status: true,
        testingTypes,
      };
    } catch (error: any) {
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to fetch testing types",
      };
    }
  },

  // ✅ Upload report
  // async uploadVulnerabilityReport(payload: {
  //   locationId: string;
  //   memberType: "internal" | "external" | "both";
  //   file: File;
  // }) {
  //   try {
  //     const formData = new FormData();

  //     formData.append("location", payload.locationId);
  //     formData.append("member_type", payload.memberType);
  //     formData.append("file", payload.file);

  //     const res = await endpoint.post(
  //       "/api/admin/upload_report/upload/",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     // 🔥 IMPORTANT: detect duplicate from response
  //     if (res.data?.errors?.length) {
  //       return {
  //         status: false,
  //         isDuplicate: true,
  //         message: res.data.errors[0].error,
  //         data: res.data,
  //       };
  //     }

  //     return {
  //       status: true,
  //       data: res.data,
  //       message: res.data?.message,
  //     };

  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       isDuplicate: false,
  //       message: error.response?.data?.message || "Upload failed",
  //       data: error.response?.data || null,
  //     };
  //   }
  // },

  // ✅ Delete uploaded report (Admin only)
  // async deleteUploadReport(reportId: string) {
  //   try {
  //     const res = await endpoint.delete(
  //       `/api/admin/upload_report/upload/${reportId}/delete/`
  //     );

  //     return {
  //       status: res.data?.success === true,
  //       message: res.data?.message,
  //       data: res.data,
  //     };
  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message ||
  //         "Failed to delete upload report",
  //       data: error.response?.data || null,
  //     };
  //   }
  // },

  // ✅ Get all uploaded reports (Admin only)
  // async getAllUploadReports() {
  //   try {
  //     const res = await endpoint.get(
  //       "/api/admin/upload_report/upload/all/"
  //     );

  //     return {
  //       status: res.data?.success === true,
  //       data: res.data?.upload_reports || [],
  //       count: res.data?.count || 0,
  //     };
  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message ||
  //         "Failed to fetch upload reports",
  //       data: [],
  //     };
  //   }
  // },

  // ✅ Get upload report by ID (Admin only)
  // async getUploadReportById(reportId: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/upload_report/upload/${reportId}/`
  //     );

  //     return {
  //       status: res.data?.success === true,
  //       data: res.data?.upload_report,
  //       message: res.data?.message,
  //     };
  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       message:
  //         error.response?.data?.message ||
  //         "Failed to fetch upload report",
  //       data: null,
  //     };
  //   }
  // },

  // ✅ Create User Detail
  async createUserDetail(payload: CreateUserPayload) {
      try {
        const res = await endpoint.post(
          "/api/admin/users_details/add-user-detail/",
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

  // ✅ Fetch  UsersByAdminid
  async fetchUsersByAdmin() {
    try {
      const adminId = this.user?._id || this.user?.id;

      if (!adminId) {
        throw new Error("Admin ID not found");
      }

      const res = await endpoint.get(
        `/api/admin/users_details/admin/${adminId}/user-details/`
      );

      const data = res.data;

      return {
        status: true,
        message: "Users fetched successfully",
        data: Array.isArray(data.results) ? data.results : [],
        count: data.count || 0,
      };
    } catch (error: any) {
      console.error("❌ Failed to fetch users:", error);

      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch users",
        details: error.response?.data || null,
      };
    }
  },

  // Update Member Role
  async updateUserRoles(userId: string, newRoles: string[]): Promise<any> {
    try {
      const res = await endpoint.patch(
        `/api/admin/users_details/user-detail/${userId}/update-role/`,
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

      const res = await endpoint.post("/api/admin/risk_criteria/add-risk/", body);

      if (res.status === 200 || res.status === 201) {
      const riskCriteria = res.data.risk_criteria;
      if (riskCriteria?._id) {
        localStorage.setItem("riskCriteriaId", riskCriteria._id);
      }
        console.log("✅ Risk Criteria created successfully:", res.data);
        return { status: true, message: res.data.message, data: res.data.risk_criteria };
      }

      return { status: false, message: "Failed to create Risk Criteria" };
    } catch (error: any) {
      console.error("❌ Error adding Risk Criteria:", error);
      return { status: false, message: error?.response?.data?.message || error.message || "Failed to add Risk Criteria" };
    }
  },

  // ✅ GET Risk Criteria (from localStorage)
  async getRiskCriteriaById() {
    try {
      const riskCriteriaId = localStorage.getItem("riskCriteriaId");

      if (!riskCriteriaId) {
        return {
          status: false,
          message: "Risk Criteria ID not found",
          isNotFound: true,
        };
      }

      const res = await endpoint.get(
        `/api/admin/risk_criteria/risks/${riskCriteriaId}/`
      );

      return {
        status: true,
        data: res.data,
      };
    } catch (error: any) {
      const is404 = error?.response?.status === 404;

      if (is404) {
        console.log("ℹ️ No risk criteria found (404) - user can create new");
      } else {
        console.error("❌ Error fetching risk criteria:", error);
      }

      return {
        status: false,
        message: error?.response?.data?.message || "Failed to fetch risk criteria",
        isNotFound: is404,
      };
    }
  },

  async microsoftLogin(authCode: string, state: string) {
      const response = await endpoint.post(
        "/api/admin/users/microsoft-teams-oauth/",
        {
          code: authCode,
          state,
        }
      );

      const data = response.data;

      if (data?.tokens && data?.user) {
        localStorage.setItem("teams_access_token", data.tokens.access);
        localStorage.setItem("teams_refresh_token", data.tokens.refresh);
        localStorage.setItem("teams_user", JSON.stringify(data.user));
        localStorage.setItem("teams_connected", "true");

        return { status: true, data };
      }

      return { status: false };
  },
  async getMicrosoftOAuthUrl(redirectUri: string) {
  const res = await endpoint.get(
    `/api/admin/users/microsoft-teams/oauth-url/?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`
  );

  if (res.data?.auth_url) {
    return { status: true, data: res.data };
  }

  return { status: false };
  },

  async getSlackOAuthUrl(baseUrl: string) {
      const res = await endpoint.post(
        "/api/admin/users/slack/oauth-url/",
        {
          base_url: baseUrl,
        }
      );

      if (res.data.success) {
        return { status: true, data: res.data };
      }
      return { status: false };
  },

  // 🔑 Slack Login (THIS SAVES BOT TOKEN)
  async loginWithSlack(code: string, redirectUri: string) {
      const res = await endpoint.post(
        "/api/admin/users/slack-oauth/",
        {
          code,
          redirect_uri: redirectUri,
        }
      );

      if (res.data.success) {
        const data = res.data.data;

        // ✅ SAVE BOT TOKEN
        localStorage.setItem("slack_bot_token", data.bot_access_token);

        if (data.user) {
          this.user = data.user;
          localStorage.setItem(
            "slack_user_login_data",
            JSON.stringify(data.user)
          );
        }

        return { status: true };
      }

      return { status: false };
  },

  // 🧠 Jira OAuth - Get Authorization URL
  async getJiraAuthUrl() {
    try {
      const res = await endpoint.get("/api/admin/users/jira/oauth-url/");
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

  // 🧠 Jira OAuth - Handle Callback (exchange code for token)
  async handleJiraCallback(code: string, state: string) {
    try {
      const res = await endpoint.get("/api/admin/users/jira/callback/", {
        params: { code, state }
      });
      const data = res.data;

      if (data?.access_token) {
        localStorage.setItem("jira_access_token", data.access_token);
        if (data.refresh_token) {
          localStorage.setItem("jira_refresh_token", data.refresh_token);
        }
        return { status: true, data };
      }

      return { status: false, message: "No access token received" };
    } catch (error: any) {
      console.error("❌ Jira callback error:", error);
      return {
        status: false,
        message: error.response?.data?.message || "Jira authentication failed",
        details: error.response?.data || null,
      };
    }
  },

  // 🧠 Jira - Get Accessible Resources (Cloud IDs)
  async getJiraResources() {
    try {
      const jiraToken = localStorage.getItem("jira_access_token");
      if (!jiraToken) {
        return { status: false, message: "No Jira access token found" };
      }

      const res = await endpoint.get("/api/admin/users/jira/resources/", {
        headers: {
          "Jira-Access-Token": jiraToken
        }
      });

      return { status: true, data: res.data.resources || res.data };
    } catch (error: any) {
      console.error("❌ Jira resources error:", error);
      return {
        status: false,
        message: error.response?.data?.message || "Failed to fetch Jira resources",
        details: error.response?.data || null,
      };
    }
  },

  // GET SCOPE PROJECT NAMES (BY ADMIN ID)
  async fetchScopeProjectNames(adminId: string) {
    try {
      if (!adminId) {
        throw new Error("Admin ID is required");
      }

      const res = await endpoint.get(
        `/api/admin/scope/names/${adminId}/`
      );

      return {
        status: true,
        data: res.data, // full response
      };

    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch project names",
        details: error.response?.data || null,
      };
    }
  },

  // CREATE SCOPE (TEXT OR FILE)
  async createScope(formData: FormData, testingType: string) {
    try {
      if (!testingType) {
        throw new Error("Testing type is required");
      }

      const res = await endpoint.post(
        `/api/admin/scope/create/?current_testing_box=${testingType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        status: true,
        data: res.data,
      };

    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Create scope failed",
        details: error.response?.data || null,
      };
    }
  },

  // GET FULL SCOPE DATA BY PROJECT NAME
  async getFullScopeData(
  adminId: string,
  projectName: string,
  testingType: string
) {
  try {
    if (!adminId || !projectName || !testingType) {
      throw new Error("Admin ID, Project Name and Testing Type are required");
    }

    const res = await endpoint.get(
      `/api/admin/scope/data/${adminId}/${encodeURIComponent(projectName)}/`,
      {
        params: {
          testing_type: testingType,
        },
      }
    );

    return {
      status: true,
      data: res.data,
    };
  } catch (err) {
    const error = err as AxiosError<any>;

    return {
      status: false,
      message:
        (error.response?.data as any)?.message ||
        error.message ||
        "Failed to fetch scope data",
      details: error.response?.data || null,
    };
  }
  },

  // get all scope targets
  async getScopeTargets(testingType: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/scope/?current_testing_box=${testingType}`
      );

      return {
        status: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        status: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch targets",
      };
    }
  },

  // GET TESTING TYPE BY SCOPE PROJECT NAME
  async getTestingTypeByScope(adminId: string, scopeName: string) {
    try {
      if (!adminId || !scopeName) {
        throw new Error("Admin ID and Scope Name are required");
      }

      const res = await endpoint.get(
        `/api/admin/scope/testing-type/${adminId}/${encodeURIComponent(scopeName)}/`
      );

      return {
        status: true,
        data: res.data,
      };

    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch testing type",
        details: error.response?.data || null,
      };
    }
  },

  // GET SINGLE SCOPE ENTRY (DETAIL)
  async getScopeEntryDetail(scopeId: string, entryId: string) {
    try {
      if (!scopeId || !entryId) {
        throw new Error("Scope ID and Entry ID are required");
      }

      const res = await endpoint.get(
        `/api/admin/scope/${scopeId}/entries/${entryId}/detail/`
      );

      return {
        status: true,
        data: res.data,
      };
    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch entry detail",
        details: error.response?.data || null,
      };
    }
  },

  // UPDATE SCOPE ENTRY
  async updateScopeEntry(
    scopeId: string,
    entryId: string,
    payload: { value: string }
  ) {
    try {
      if (!scopeId || !entryId) {
        throw new Error("Scope ID and Entry ID are required");
      }

      const res = await endpoint.patch(
        `/api/admin/scope/${scopeId}/entries/${entryId}/update/`,
        payload
      );

      return {
        status: true,
        data: res.data,
      };
    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to update scope entry",
        details: error.response?.data || null,
      };
    }
  },
  
  // DELETE SCOPE ENTRY
  async deleteScopeEntry(scopeId: string, entryId: string) {
    try {
      if (!scopeId || !entryId) {
        throw new Error("Scope ID and Entry ID are required");
      }

      const res = await endpoint.delete(
        `/api/admin/scope/${scopeId}/entries/${entryId}/`
      );

      return {
        status: true,
        message: res.data?.detail || "Entry deleted successfully",
      };

    } catch (err) {
      const error = err as AxiosError<any>;

      return {
        status: false,
        message:
          error.response?.data?.detail ||
          error.message ||
          "Failed to delete entry",
        details: error.response?.data || null,
      };
    }
  },

  // ✅ NEW: Dashboard Total Assets (NO reportId)
    async fetchDashboardTotalAssets() {
      try {
        const res = await endpoint.get(
          "/api/admin/admindashboard/dashboard/total-assets/"
        );

        this.totalAssets = res.data?.total_assets ?? 0;
        console.log("Dashboard total assets:", this.totalAssets);

        return { status: true };
      } catch (error) {
        console.error("Dashboard total assets error", error);
        this.totalAssets = 0;
        return { status: false };
      }
    },

    // 🔹 DASHBOARD AVG SCORE (NO reportId)
    async fetchDashboardAvgScore() {
      try {
        const res = await endpoint.get(
          "/api/admin/admindashboard/dashboard/avg-score/"
        );

        this.avgScore = res.data?.avg_score ?? 0;
        console.log("Dashboard avg score:", this.avgScore);

        return { status: true, data: res.data };
      } catch (error: any) {
        console.error(
          "Dashboard avg score error:",
          error.response?.data || error.message
        );

        this.avgScore = 0;
        return {
          status: false,
          message: "Failed to fetch dashboard avg score",
          details: error.response?.data || null,
        };
      }
    },

    // 🔹 DASHBOARD VULNERABILITIES (NO reportId)
    async fetchDashboardVulnerabilities() {
      try {
        const res = await endpoint.get(
          "/api/admin/admindashboard/dashboard/vulnerabilities/"
        );

        this.vulnerabilities = {
          critical: res.data?.critical ?? 0,
          high: res.data?.high ?? 0,
          medium: res.data?.medium ?? 0,
          low: res.data?.low ?? 0,
        };

        console.log("Dashboard vulnerabilities:", this.vulnerabilities);

        return { status: true, data: res.data };
      } catch (error: any) {
        console.error(
          "Dashboard vulnerabilities error:",
          error.response?.data || error.message
        );

        this.vulnerabilities = { critical: 0, high: 0, medium: 0, low: 0 };

        return {
          status: false,
          message: "Failed to fetch dashboard vulnerabilities",
          details: error.response?.data || null,
        };
      }
    },
  
    // 🔹 DASHBOARD MITIGATION TIMELINE
    async fetchDashboardMitigationTimeline() {
      try {
        const res = await endpoint.get(
          "/api/admin/admindashboard/dashboard/mitigation-timeline/"
        );

        this.mitigationTimeline = res.data || null;

        return { status: true, data: res.data };
      } catch (error: any) {
        console.error(
          "Mitigation timeline error:",
          error.response?.data || error.message
        );

        this.mitigationTimeline = null;

        return {
          status: false,
          message:
            error.response?.data?.detail ||
            "Failed to fetch mitigation timeline",
        };
      }
    },

    // ✅ fetch Dashboard Mean Time To Remediate
  async fetchDashboardMeanTimeToRemediate() {
    try {
      console.log("[MTTR] Calling DASHBOARD API");

      const res = await endpoint.get(
        "/api/admin/admindashboard/dashboard/mean-time-remediate/"
      );

      console.log("[MTTR] API response:", res.data);

      // 🔹 Store full response
      this.meanTimeToRemediate = res.data;

      console.log("[MTTR] Stored in authStore:", this.meanTimeToRemediate);

      return { status: true, data: res.data };
    } catch (error: any) {
      console.error(
        "[MTTR] API error:",
        error.response?.data || error.message
      );

      this.meanTimeToRemediate = null;

      return {
        status: false,
        message:
          error.response?.data?.detail ||
          "Failed to fetch mean time to remediate",
      };
    }
  },

  // FETCH Vulnerability Register
  // async fetchVulnerabilityRegister(reportId: string) {
  // try {
  //   if (!reportId) {
  //     console.warn("Vulnerability Register → Missing reportId");
  //     this.vulnerabilityRows = [];
  //     this.vulnerabilityCount = 0;
  //     return { status: false, message: "No reportId provided" };
  //   }

  //   console.log("Fetching Vulnerability Register for:", reportId);

  //   const res = await endpoint.get(
  //     `/api/admin/adminregister/register/${reportId}/vulns/`
  //   );

  //   console.log("Vulnerability Register response raw:", res && res.data ? res.data : res);

  //   // Try a few likely response shapes:
  //   const rows =
  //     res.data?.rows ??
  //     res.data?.data?.rows ??
  //     res.data?.results ??
  //     res.data?.vulnerabilities ??
  //     res.data ??
  //     [];

  //   // If rows is an object with keys (not an array), try to extract an array
  //   const finalRows = Array.isArray(rows) ? rows : Array.isArray(res.data?.rows) ? res.data.rows : [];

  //   this.vulnerabilityRows = finalRows;
  //   this.vulnerabilityCount = this.vulnerabilityRows.length;

  //   console.log("Vulnerability Count:", this.vulnerabilityCount);

  //   return { status: true, data: this.vulnerabilityRows };
  // } catch (error: any) {
  //   console.error(
  //     "Vulnerability Register error:",
  //     error.response?.status,
  //     error.response?.data || error.message
  //   );

  //   this.vulnerabilityRows = [];
  //   this.vulnerabilityCount = 0;

  //   return {
  //     status: false,
  //     message:
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Failed to fetch vulnerability register",
  //     details: error.response?.data || null,
  //   };
  // }
  // },

  // FIX Vulnerability
  // async createFixVulnerability(reportId: string,asset: string,payload: Record<string, any>) {
  // try {
  //   const res = await endpoint.post(
  //     `/api/admin/adminregister/fix-vulnerability/report/${reportId}/asset/${asset}/create/`,
  //     payload
  //   );
  //   return {
  //     status: true,
  //     data: res.data.data,
  //     message: res.data.message
  //   };
  // } catch (error) {
  //   const err = error as AxiosError<any>;
  //   return {
  //     status: false,
  //     message:
  //       err.response?.data?.message || "Fix vulnerability failed",
  //     details: err.response?.data || null
  //   };
  // }
  // },

  // Get step completion status for fix vulnerability
  // async getFixVulnerabilitySteps(fixVulnerabilityId: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/step-complete/`
  //     );

  //     return {
  //       status: true,
  //       data: {
  //         fix_vulnerability_id: res.data.fix_vulnerability_id,
  //         vulnerability_status: res.data.status,
  //         steps: res.data.steps || []
  //       }
  //     };
  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message: err.response?.data?.message || "Failed to fetch step completion data",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // Mark a step as complete
  // async completeFixVulnerabilityStep(
  //   fixVulnerabilityId: string,
  //   payload: {
  //     step_number: number;
  //     comment: string;
  //   }
  // ) {
  //   try {
  //     const res = await endpoint.post(
  //       `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/step-complete/`,
  //       payload
  //     );

  //     return {
  //       status: true,
  //       data: {
  //         message: res.data.message,
  //         vulnerability_status: res.data.status,
  //         completed_steps: res.data.completed_steps
  //       }
  //     };
  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message: err.response?.data?.message || "Failed to complete step",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // create Raise Support Request (UPDATED API)
  // async raiseSupportRequest(
  //   reportId: string,
  //   vulnerabilityId: string,
  //   payload: {
  //     step: string;
  //     description: string;
  //   }
  // ) {
  //   try {
  //     const res = await endpoint.post(
  //       `/api/admin/adminregister/support-requests/raise/report/${reportId}/vulnerability/${vulnerabilityId}/`,
  //       payload
  //     );

  //     return {
  //       status: true,
  //       data: res.data.data,
  //       message: res.data.message
  //     };
  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message:
  //         err.response?.data?.message || "Failed to raise support request",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // Get raise support request by vulnerability ID
  // async getRaiseSupportRequestByVulnerability(vulnerabilityId: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/raise-support-requests/vulnerability/${vulnerabilityId}/`
  //     );

  //     return {
  //       status: true,
  //       exists: res.data.exists,
  //       data: res.data.data || null
  //     };
  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       exists: false,
  //       message:
  //         error.response?.data?.message ||
  //         "Failed to fetch support request"
  //     };
  //   }
  // },

  // Create new ticket (updated API)
  // async createTicket(
  //   reportId: string,
  //   fixVulnerabilityId: string,
  //   payload: {
  //     category: string;
  //     subject: string;
  //     description: string;
  //   }
  // ) {
  //   try {
  //     const res = await endpoint.post(
  //       `/api/admin/adminregister/tickets/report/${reportId}/fix/${fixVulnerabilityId}/create/`,
  //       payload
  //     );

  //     return {
  //       status: true,
  //       data: res.data.data,
  //       message: res.data.message
  //     };
  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message:
  //         err.response?.data?.message || "Failed to create ticket",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // Get all tickets by report id
  // async getTicketsByReport(reportId: string) {
  //   try {
  //     console.log("🔥 Fetching tickets for report:", reportId);

  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/tickets/report/${reportId}/`
  //     );

  //     console.log("✅ Tickets API response:", res.data);

  //     return {
  //       status: true,
  //       data: res.data.results
  //     };
  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     console.error("❌ Tickets API error:", err.response?.data || err);

  //     return {
  //       status: false,
  //       message:
  //         err.response?.data?.message || "Failed to fetch tickets"
  //     };
  //   }
  // },

  // GET ALL ASSETS (NEW API)
  async fetchAssets() {
    console.log("🚀 fetchAssets called");
    try {
      const res = await endpoint.get(
        `/api/admin/adminasset/assets/`
      );

      const rows = res.data.assets || [];

      const normalized = rows.map((a: any) => ({
        ...a,

        // UI state flags
        selected: false,
        held: false,

        // NEW: member type comes from top-level response
        isInternal: res.data.member_type === "internal",

        // safety defaults
        host_information: a.host_information || {},
        severity_counts: a.severity_counts || {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0
        }
      }));

      // 🔥 store assignments
      this.assetRows = normalized;
      this.assetCount = res.data.total_assets ?? normalized.length;
      this.memberType = res.data.member_type;

      console.log("[authStore] assetRows length:", this.assetRows.length);

      return { status: true, data: res.data };
    } catch (error: any) {
      console.error(
        "[authStore] fetchAssets error:",
        error.response?.data || error.message
      );
      return { status: false, error: error.response?.data || error.message };
    }
  },

  // search assets (UPDATED for new API)
  // async searchAssets(reportId: string, q: string) {
  //   try {
  //     console.log("[authStore] searchAssets ->", { reportId, q });

  //     const res = await endpoint.get(
  //       `/api/admin/adminasset/report/${reportId}/assets/`,
  //       {
  //         params: { q }
  //       }
  //     );

  //     const assets = res.data.assets || [];

  //     // normalize same as fetchAssets
  //     const normalized = assets.map((a: any) => ({
  //       ...a,
  //       selected: false,
  //       held: false,
  //       isInternal: (a.exposure || "").toLowerCase() === "internal",
  //       host_information: a.host_information || {},
  //       severity_counts: a.severity_counts || {
  //         critical: 0,
  //         high: 0,
  //         medium: 0,
  //         low: 0
  //       }
  //     }));

  //     this.assetSearchResults = normalized;
  //     this.assetSearchCount =
  //       res.data.total_assets ?? normalized.length;

  //     console.log("[authStore] searchAssets results:", normalized);

  //     return { status: true, data: normalized };
  //   } catch (error: any) {
  //     console.error(
  //       "[authStore] searchAssets error:",
  //       error.response?.data || error.message
  //     );
  //     return { status: false, error: error.response?.data || error.message };
  //   }
  // },

  // DELETE Asset from report (UPDATED)
  async deleteAsset(assetIp: string) {
    try {
      const reportId = localStorage.getItem("reportId");

      if (!reportId) {
        return {
          status: false,
          message: "Report ID not found",
        };
      }

      const res = await endpoint.delete(
        `/api/admin/adminasset/report/${reportId}/assets/${assetIp}/`
      );

      console.log("✔ Asset deleted:", res.data);

      // ✅ remove from main assets list
      this.assetRows = this.assetRows.filter(
        a => a.asset !== assetIp
      );

      return {
        status: true,
        data: res.data,
      };
    } catch (error: any) {
      console.error(
        "❌ Delete Asset Error:",
        error.response?.data || error.message
      );
      return {
        status: false,
        message:
          error.response?.data?.detail ||
          "Failed to delete asset",
      };
    }
  },

  // HOLD asset (UPDATED API)
  async holdAsset(assetIp: string) {
    try {
      const reportId = localStorage.getItem("reportId");

      if (!reportId) {
        return {
          status: false,
          message: "Report ID not found",
        };
      }

      const res = await endpoint.post(
        `/api/admin/adminasset/report/${reportId}/assets/${assetIp}/hold/`
      );

      // ✅ update asset count (top Assets number)
      if (typeof res.data?.total_assets === "number") {
        this.assetCount = res.data.total_assets;
      }

      return {
        status: true,
        heldAsset: res.data.asset, // 👈 SAME SHAPE AS OLD CODE EXPECTS
        data: res.data,
      };
    } catch (error: any) {
      console.error("Hold asset error:", error);
      return {
        status: false,
        message: error.response?.data?.detail || "Failed to hold asset",
      };
    }
  },

  // FETCH HELD ASSETS LIST (UPDATED)
  async fetchHeldAssets() {
    try {
      const reportId = localStorage.getItem("reportId");

      if (!reportId) {
        return {
          status: false,
          assets: [],
          count: 0,
          message: "Report ID not found",
        };
      }

      const res = await endpoint.get(
        `/api/admin/adminasset/report/${reportId}/assets/hold-list/`
      );

      return {
        status: true,
        assets: res.data.assets || [],
        count: res.data.count || 0,
        data: res.data,
      };
    } catch (error: any) {
      console.error("Fetch held assets error:", error);
      return {
        status: false,
        assets: [],
        count: 0,
        message: error.response?.data?.detail || "Failed to fetch held assets",
      };
    }
  },

  // UNHOLD asset (UPDATED – matches new API)
  async unholdAsset(assetIp: string) {
    try {
      const reportId = localStorage.getItem("reportId");

      if (!reportId) {
        return {
          status: false,
          message: "Report ID not found",
        };
      }

      const res = await endpoint.post(
        `/api/admin/adminasset/report/${reportId}/assets/${assetIp}/unhold/`
      );

      // ✅ update asset count
      if (typeof res.data?.total_assets === "number") {
        this.assetCount = res.data.total_assets;
      }

      return {
        status: true,
        restoredAsset: res.data.asset, // 👈 REQUIRED by component
        data: res.data,
      };
    } catch (error: any) {
      console.error("Unhold asset error:", error);
      return {
        status: false,
        message: error.response?.data?.detail || "Failed to unhold asset",
      };
    }
  },

  // Get support requests by host for assets page
  // async getSupportRequestsByHost(host: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminasset/support-requests/host/${host}/`
  //     );

  //     return {
  //       status: true,
  //       data: res.data.results || [],
  //       count: res.data.count || 0
  //     };
  //   } catch (error: any) {
  //     return {
  //       status: false,
  //       data: [],
  //       count: 0
  //     };
  //   }
  // },

  // Get closed fix vulnerabilities by host
  // async getClosedFixVulnerabilitiesByHost(host: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminasset/fix-vulnerabilities/host/${host}/closed/`
  //     );

  //     return {
  //       status: true,
  //       data: res.data.results || [],
  //       count: res.data.count || 0
  //     };
  //   } catch (error) {
  //     return {
  //       status: false,
  //       data: [],
  //       count: 0
  //     };
  //   }
  // },

  // FETCH vulnerabilities for single asset (UPDATED)
  async fetchSingleAssetVulnerabilities(asset: string) {
    try {
      const reportId = localStorage.getItem("reportId");

      if (!reportId) {
        return { status: false };
      }

      const res = await endpoint.get(
        `/api/admin/adminasset/report/${reportId}/asset/${asset}/vulnerabilities/`
      );

      const vulns = res.data.vulnerabilities || [];

      // ✅ vulnerabilities list
      this.selectedAssetVulnerabilities = vulns;

      // ✅ asset summary (top card)
      this.selectedAssetDetail = {
        asset: res.data.asset,
        exposure: vulns[0]?.exposure || "",
        owner: vulns[0]?.owner || "",
        severity: vulns[0]?.severity || "",
      };

      return {
        status: true,
        count: res.data.count,
      };
    } catch (error) {
      console.error("Fetch single asset vulnerabilities failed:", error);
      this.selectedAssetDetail = null;
      this.selectedAssetVulnerabilities = [];
      return { status: false };
    }
  },

  // Get all support requests by report id
  // async getSupportRequestsByReport(reportId: string) {
  // console.log("📡 Store API called with:", reportId);

  // const res = await endpoint.get(
  //   `/api/admin/adminregister/support-requests/report/${reportId}/`
  // );

  // return {
  //   status: true,
  //   data: res.data.results,
  //   count: res.data.count
  // };
  // },

  // ✅ Logout user
  async logout() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return { status: false, message: "No refresh token found" };
      }
      const res = await endpoint.post("/api/admin/users/logout/", {
        refresh: refreshToken,
      });
      localStorage.removeItem("authorization");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
      // localStorage.removeItem("locations");
      localStorage.removeItem("google_id_token");
      localStorage.removeItem("isNewUser");
      localStorage.removeItem("completedSteps");
      // localStorage.removeItem("reportId");
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.completedSteps = [];
      // ✅ Reset report status on logout
      // this.reportStatus = {
      //   hasReport: false,
      //   reportId: null,
      //   message: "",
      //   checked: false,
      // };
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
  setAuth(token: string, user: any) {
      this.token = token;
      this.user = user;
      this.authenticated = true;

     

      localStorage.setItem("authorization", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authenticated", JSON.stringify(true));
      // localStorage.setItem("locations", JSON.stringify(this.locations));

      console.log("Access Token saved:", token);
      console.log("Refresh Token saved:", localStorage.getItem("refreshToken"));
      // console.log("✅ Locations saved in localStorage:", this.locations);
      // console.log("✅ Auth set successfully:", this.user, this.locations);
  },

  getAuthorization() {
    return this.token;
  },

  // ✅ Mark onboarding step as completed
  markStepCompleted(stepNumber: number) {
    if (!this.completedSteps.includes(stepNumber)) {
      this.completedSteps.push(stepNumber);
      localStorage.setItem('completedSteps', JSON.stringify(this.completedSteps));
      console.log(`✅ Step ${stepNumber} marked as completed`);
    }
  },

  // ✅ Initialize completed steps from localStorage
  initCompletedSteps() {
    const saved = localStorage.getItem('completedSteps');
    if (saved) {
      this.completedSteps = JSON.parse(saved);
      console.log('♻️ Restored completed steps:', this.completedSteps);
    }
  },

  // ✅ Reset completed steps (useful for testing or new onboarding)
  resetCompletedSteps() {
    this.completedSteps = [];
    localStorage.removeItem('completedSteps');
    console.log('🔄 Completed steps reset');
  },

  // ✅ GET Report Status (for dashboard - Super Admin upload check)
  async getReportStatus() {
    try {
      const res = await endpoint.get(
        "/api/admin/admindashboard/dashboard/report-status/"
      );

      const data = res.data;

      const hasReport = data.has_report ?? false;
      const reportId = data.report_id || null;
      const message = data.message || "";

      // ✅ Update reactive store state
      this.reportStatus.hasReport = hasReport;
      this.reportStatus.reportId = reportId;
      this.reportStatus.message = message;
      this.reportStatus.checked = true;

      // ✅ Also update localStorage for persistence
      if (hasReport && reportId) {
        localStorage.setItem("reportId", reportId);
      } else {
        localStorage.removeItem("reportId");
      }

      console.log("📊 Report status updated:", { hasReport, reportId, message });

      return {
        status: true,
        hasReport,
        showDashboard: data.show_dashboard ?? false,
        reportId,
        message,
        adminId: data.admin_id || null,
        adminEmail: data.admin_email || null,
      };
    } catch (error: any) {
      console.error("❌ Report status check failed:", error);

      // ✅ Update store state on error too
      this.reportStatus.checked = true;
      this.reportStatus.hasReport = false;
      this.reportStatus.message = error.response?.data?.message || "Failed to check report status";

      return {
        status: false,
        hasReport: false,
        showDashboard: false,
        reportId: null,
        message:
          error.response?.data?.message ||
          "Failed to check report status",
      };
    }
  },

  // ✅ Reset report status (useful for logout)
  resetReportStatus() {
    this.reportStatus.hasReport = false;
    this.reportStatus.reportId = null;
    this.reportStatus.message = "";
    this.reportStatus.checked = false;
    localStorage.removeItem("reportId");
    console.log("🔄 Report status reset");
  },

  },
});