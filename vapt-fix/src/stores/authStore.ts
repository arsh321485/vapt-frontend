import { defineStore } from "pinia";
import endpoint from "../services/apiServices";
import type { AxiosError } from "axios";

interface CreateUserPayload {
  admin_id: string;
  user_type: string;
  email: string;
  Member_role: string;
}

interface RiskCriteriaPayload {
  critical: string;
  high: string;
  medium: string;
  low: string;
}

interface SlackMessageResponse {
  status: boolean;
  data?: any;
  message?: string;
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
    latestReportId: null,
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
    reportStatus: {
      hasReport: false,
      reportId: null as string | null,
      message: "",
      checked: false,  
    },
    teams: [],
    channels: [],
    selectedTeam: null,
    lastMessageMeta: null,
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
      // Clear any stale token so it doesn't get attached to the login request
      localStorage.removeItem("authorization");

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

  // ✅ Create User Detail
  // async createUserDetail(payload: CreateUserPayload) {
  //     try {
  //       const res = await endpoint.post(
  //         "/api/admin/users_details/add-user-detail/",
  //         payload
  //       );
  //       const data = res.data;
  //       console.log("✅ User created successfully:", data);

  //       return {
  //         status: true,
  //         message: data.message || "User created successfully",
  //         data: data.data || {},
  //       };
  //     } catch (error: unknown) {
  //       const err = error as any;
  //       console.error("❌ Failed to create user detail:", err);

  //       return {
  //         status: false,
  //         message:
  //           err.response?.data?.message ||
  //           err.message ||
  //           "Create user detail failed",
  //         details: err.response?.data || null,
  //       };
  //     }
  // },
  // ✅ Create User Detail + Slack Sync
  async createUserDetail(payload: CreateUserPayload) {
    try {
      const res = await endpoint.post(
        "/api/admin/users_details/add-user-detail/",
        payload
      );

      const data = res.data;

      console.log("✅ User created + Slack sync:", data);

      return {
        status: true,
        message: data.message || "User created successfully",
        data: data.data || {},
        slack_sync: data.slack_sync || [],   // 🔥 NEW
        email_sent: data.email_sent || false // 🔥 NEW
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

  // Delete member role
  async deleteUserRole(userId: string, roleToRemove: string): Promise<any> {
    try {
      const res = await endpoint.delete(
        `/api/admin/users_details/user-detail/${userId}/delete-role/`,
        {
          data: {
            confirm: true,
            member_role: roleToRemove,
          },
        }
      );

      return {
        status: true,
        message: res.data.message,
        remaining_roles: res.data.remaining_roles,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.response?.data?.message || error.message,
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

  // update Risk Criteria
  async updateRiskCriteria(payload: RiskCriteriaPayload) {
  try {
    const riskId = localStorage.getItem("riskId");
    const adminId = localStorage.getItem("adminId");

    const res = await endpoint.put(
      `/api/admin/risk_criteria/risks/${riskId}/update/`,
      {
        admin_id: adminId,
        critical: payload.critical,
        high: payload.high,
        medium: payload.medium,
        low: payload.low,
      }
    );

    return { status: true, message: res.data.message, data: res.data };

  } catch (err: any) {
    return { status: false, message: err?.response?.data?.message };
  }
  },

  //Microsoft Teams
  async getMicrosoftOAuthUrl(redirectUri: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/users/microsoft-teams/oauth-url/?redirect_uri=${encodeURIComponent(
          redirectUri
        )}`
      );

      if (res.data?.auth_url) {
        return { status: true, data: res.data };
      }
      return { status: false, message: "Auth URL not received" };
    } catch (error) {
      console.error("Microsoft OAuth API error:", error);
      return { status: false, message: "API failed" };
    }
  },
 async microsoftLogin(accessToken: string) {
  try {
    const response = await endpoint.post(
      "/api/admin/users/microsoft-teams-oauth/",
      {
        access_token: accessToken,
      }
    );

    const data = response.data;

    // basic validation
    if (!data || !data.tokens || !data.user) {
      return { status: false, message: "Invalid login response" };
    }

    // 🔐 Save app JWT tokens
    localStorage.setItem("teams_access_token", data.tokens.access);
    localStorage.setItem("teams_refresh_token", data.tokens.refresh);

    // 👤 Save Microsoft user
    localStorage.setItem("teams_user", JSON.stringify(data.user));

    // 🧠 Save Microsoft graph token (used for Teams APIs)
    localStorage.setItem("microsoft_graph_token", data.access_token);

    // 🏢 Save default VAPTFIX team info
    if (data?.vaptfix_team) {
      localStorage.setItem(
        "vaptfix_team",
        JSON.stringify(data.vaptfix_team)
      );

      // save default channels if present
      if (data.vaptfix_team.channels) {
        localStorage.setItem(
          "vaptfix_channels",
          JSON.stringify(data.vaptfix_team.channels)
        );
      }
    }

    // 🆕 Save new user flag
    localStorage.setItem("is_new_teams_user", String(data.is_new_user));

    // mark Teams connected
    localStorage.setItem("teams_connected", "true");

    return {
      status: true,
      data,
    };

  } catch (error) {
    console.error("Microsoft login API error:", error);
    return { status: false, message: "Microsoft login failed" };
  }
},
  // async microsoftLogin(accessToken: string) {
  //   try {
  //     const response = await endpoint.post(
  //       "/api/admin/users/microsoft-teams-oauth/",
  //       {
  //         access_token: accessToken,
  //       }
  //     );
  //     const data = response.data;
  //     if (data?.tokens && data?.user) {
  //       // save JWT tokens (your app auth)
  //       localStorage.setItem("teams_access_token", data.tokens.access);
  //       localStorage.setItem("teams_refresh_token", data.tokens.refresh);

  //       // Microsoft user
  //       localStorage.setItem("teams_user", JSON.stringify(data.user));

  //       // Microsoft graph token
  //       localStorage.setItem("microsoft_graph_token", data.access_token);

  //       localStorage.setItem("teams_connected", "true");

  //       return { status: true, data };
  //     }

  //     return { status: false };
  //   } catch (error) {
  //     console.error("Microsoft login API error:", error);
  //     return { status: false };
  //   }
  // },
  async fetchMicrosoftTeams() {
    try {
      const graphToken = localStorage.getItem("microsoft_graph_token");

      if (!graphToken) {
        return { status: false, message: "Graph token missing" };
      }

      const response = await endpoint.post(
        "/api/admin/users/teams/list/",
        {},
        {
          headers: {
            Authorization: `Bearer ${graphToken}`,
          },
        }
      );

      const data = response.data;

      if (data?.teams) {
        localStorage.setItem("microsoft_teams_list", JSON.stringify(data.teams));
        return { status: true, teams: data.teams };
      }

      return { status: false };
    } catch (error) {
      console.error("Teams list API error:", error);
      return { status: false };
    }
  },
  async fetchTeamChannels(teamId: string) {
    try {
      const graphToken = localStorage.getItem("microsoft_graph_token");

      if (!graphToken) {
        return { status: false, message: "Graph token missing" };
      }

      const response = await endpoint.post(
        "/api/admin/users/teams/channels/list/",
        {
          access_token: graphToken,
          team_id: teamId,
        }
      );

      const data = response.data;

      if (data?.channels) {
        // save channels for later use
        localStorage.setItem(
          `teams_channels_${teamId}`,
          JSON.stringify(data.channels)
        );

        return { status: true, channels: data.channels };
      }

      return { status: false };
    } catch (error) {
      console.error("Teams channels API error:", error);
      return { status: false };
    }
  },
  async sendMessageToTeamsChannel({
    teamId,
    channelId,
    message,
  }: {
    teamId: string;
    channelId: string;
    message: string;
  }) {
    try {
      const graphToken = localStorage.getItem("microsoft_graph_token");

      if (!graphToken) {
        return { status: false, message: "Graph token missing" };
      }

      const response = await endpoint.post(
        "/api/admin/users/teams/messages/send/",
        {
          access_token: graphToken,
          team_id: teamId,
          channel_id: channelId,
          message: message,
        }
      );

      const data = response.data;

      if (data?.messageDetails) {
        return {
          status: true,
          messageId: data.messageDetails.id,
          createdAt: data.messageDetails.createdDateTime,
        };
      }

      return { status: false };
    } catch (error) {
      console.error("Send Teams message API error:", error);
      return { status: false };
    }
  },

  // Slack 
  async getSlackOAuthUrl(baseUrl: string) {
      console.log("Calling POST /api/admin/users/slack/oauth-url/ with baseUrl:", baseUrl);
      const res = await endpoint.post(
        "/api/admin/users/slack/oauth-url/",
        {
          base_url: baseUrl,
        }
      );
      console.log("Slack OAuth URL response:", res.data);

      if (res.data.success) {
        return { status: true, data: res.data };
      }
      return { status: false };
  },
  async loginWithSlack(botToken: string, userToken: string) {
    console.log("=== loginWithSlack called ===");
    console.log("Bot Token:", botToken);
    console.log("User Token:", userToken);

    try {
      const res = await endpoint.post(
        "/api/admin/users/slack/login/",
        {
          bot_access_token: botToken,
          user_access_token: userToken
        }
      );

      console.log("Slack login API response:", res.data);

      if (res.data.success) {
        const data = res.data.data;

        // ✅ Save tokens
        localStorage.setItem("slack_bot_token", data.bot_access_token);
        localStorage.setItem("slack_user_token", data.user_access_token);

        // ✅ Save team info
        if (data.team) {
          localStorage.setItem("slack_team", JSON.stringify(data.team));
        }

        // ✅ Save channels
        if (data.channels) {
          localStorage.setItem("slack_channels", JSON.stringify(data.channels));
        }

        // ✅ Save Slack user
        if (data.user) {
          this.user = data.user;
          localStorage.setItem("slack_user_login_data", JSON.stringify(data.user));
        }

        // ✅ Save local app user
        if (data.local_user) {
          localStorage.setItem("local_user", JSON.stringify(data.local_user));
        }

        return { status: true, data };
      }

      return {
        status: false,
        message: res.data.message || "Slack login failed"
      };

    } catch (error: any) {
      console.error("loginWithSlack error:", error);
      return {
        status: false,
        message: error.response?.data?.message || "Slack login failed"
      };
    }
  },
  async validateSlackToken(accessToken: string) {
  try {
    const res = await endpoint.post(
      "/api/admin/users/slack/validate-token/",
      {
        access_token: accessToken,
      }
    );

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: "Slack token validation failed",
    };
  }
  },
  async listSlackChannels() {
    try {
      const res = await endpoint.get("/api/admin/users/slack/channels/list/");

      if (res.data?.success) {
        return {
          status: true,
          channels: res.data.data?.channels || []
        };
      }

      return {
        status: false,
        channels: [],
        message: res.data?.message || "Failed to fetch channels"
      };

    } catch (error: any) {
      console.error("List Slack channels error:", error);
      return {
        status: false,
        channels: [],
        message: error.response?.data?.message || "Failed to fetch channels",
      };
    }
  },
  async sendSlackMessage(
  accessToken: string,
  channel: string,
  text: string
): Promise<SlackMessageResponse> {
  try {
    const res = await endpoint.post(
      "/api/admin/users/slack/messages/send/",
      {
        access_token: accessToken,
        channel,
        text,
      }
    );

    if (res.data?.success) {
      return {
        status: true,
        data: res.data.data,
      };
    }

    return {
      status: false,
      message: res.data?.message,
    };

  } catch (error: any) {
    return {
      status: false,
      message:
        error.response?.data?.message || "Failed to send Slack message",
    };
  }
  },
  async listSlackUsers(accessToken: string) {
    try {
      console.log("Calling Slack Users List API...");

      const res = await endpoint.post(
        "/api/admin/users/slack/users/list/",
        {
          access_token: accessToken,
        }
      );

      console.log("Slack users response:", res.data);

      if (res.data?.success) {
        return {
          status: true,
          users: res.data.users || []
        };
      }

      return {
        status: false,
        users: []
      };

    } catch (error: any) {
      console.error("Slack users fetch error:", error);
      return {
        status: false,
        users: [],
        message:
          error.response?.data?.message || "Failed to fetch Slack users",
      };
    }
  },
  async addUserToSlackChannel(
    accessToken: string,
    channel: string,
    userId: string
  ) {
    try {
      console.log("Calling Add User to Slack Channel API...");
      const res = await endpoint.post(
        "/api/admin/users/slack/channel/add-user/",
        {
          access_token: accessToken,
          channel: channel,
          user_id: userId,
        }
      );
      console.log("Add user response:", res.data);
      if (res.data?.success) {
        return {
          status: true,
          data: res.data.data
        };
      }
      return {
        status: false,
        message: res.data?.message
      };

    } catch (error: any) {
      console.error("Add user to channel error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to add user to Slack channel",
      };
    }
  },
  async inviteUsersToSlackChannel(
    accessToken: string,
    channel: string,
    users: string[]
  ) {
    try {
      console.log("Calling Invite Users to Slack Channel API...");

      const res = await endpoint.post(
        "/api/admin/users/slack/channel/invite/",
        {
          access_token: accessToken,
          channel: channel,
          users: users,
        }
      );

      console.log("Invite users response:", res.data);

      if (res.data?.success) {
        return {
          status: true,
          data: res.data.data
        };
      }

      return {
        status: false,
        message: res.data?.message
      };

    } catch (error: any) {
      console.error("Invite users error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to invite users to Slack channel",
      };
    }
  },
  async joinSlackChannel(accessToken: string, channel: string) {
    try {
      console.log("Calling Join Slack Channel API...");

      const res = await endpoint.post(
        "/api/admin/users/slack/channel/join/",
        {
          access_token: accessToken,
          channel: channel,
        }
      );

      console.log("Join channel response:", res.data);

      if (res.data?.success) {
        return {
          status: true,
          data: res.data.data
        };
      }

      return {
        status: false,
        message: res.data?.message
      };

    } catch (error: any) {
      console.error("Join channel error:", error);
      return {
        status: false,
        message:
          error.response?.data?.message ||
          "Failed to join Slack channel",
      };
    }
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

    // 🔥 add testing_type in body
    formData.append("testing_type", testingType);

    const res = await endpoint.post(
      `/api/admin/scope/create/`,
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
        error.response?.data?.message ||
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

  // fetch all vul register data 
  async fetchVulnerabilityRegister() {
  try {
    console.log("Fetching Latest Vulnerabilities...");

    const res = await endpoint.get(
      `/api/admin/adminregister/register/latest/vulns/`
    );

    console.log("Vulnerability Register response:", res.data);

    const rows = res.data?.rows ?? [];
    const count = res.data?.count ?? rows.length;

    this.vulnerabilityRows = Array.isArray(rows) ? rows : [];
    this.vulnerabilityCount = count;

    // 👇 ADD HERE
    this.latestReportId = res.data?.report_id || null;

    console.log("Latest Report ID:", this.latestReportId);

    return { status: true, data: this.vulnerabilityRows };

  } catch (error: any) {
    console.error(
      "Vulnerability Register error:",
      error.response?.status,
      error.response?.data || error.message
    );

    this.vulnerabilityRows = [];
    this.vulnerabilityCount = 0;
    this.latestReportId = null; // optional reset

    return {
      status: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch vulnerability register",
    };
  }
  },

  // FIX Vulnerability CREATE
  async createFixVulnerability(reportId: string, asset: string, payload: Record<string, any>) {
    try {
      const res = await endpoint.post(
        `/api/admin/adminregister/fix-vulnerability/report/${reportId}/asset/${asset}/create/`,
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
        message: err.response?.data?.message || "Fix vulnerability failed",
        details: err.response?.data || null
      };
    }
  },

  // FIX Vulnerability CARD GET
  async fetchFixVulnerabilityCardDetails(fixId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/fix-vulnerability/${fixId}/card/`
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
        message: err.response?.data?.message || "Failed to fetch fix vulnerability card",
        details: err.response?.data || null
      };
    }
  },

  // GET Fix Vulnerability Card by report + asset
  // async getFixVulnerabilityByAsset(reportId: string, asset: string, id?: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/fix-vulnerability/report/${reportId}/asset/${asset}/create/`,
  //       { params: id ? { id } : {} }
  //     );

  //     return {
  //       status: true,
  //       data: res.data
  //     };

  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message: err.response?.data?.message || "Failed to fetch fix vulnerability",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // Get complete fix vulnerability details (card view)
  // async getFixVulnerabilityCard(fixVulnerabilityId: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/detail/`
  //     );

  //     return {
  //       status: true,
  //       data: res.data.data
  //     };

  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message: err.response?.data?.message || "Failed to fetch fix vulnerability detail",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

  // Mark a step as complete (NEW API FORMAT)
  async completeFixVulnerabilityStep(
    fixVulnerabilityId: string,
    payload: {
      step_number: number;
      status: string;
      comment: string;
    }
  ) {
    try {
      const res = await endpoint.post(
        `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/step-complete/`,
        payload
      );

      return {
        status: true,
        message: res.data.message,
        vulnerability_status: res.data.status,
        completed_steps: res.data.completed_steps,
        step_saved: res.data.step_saved
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      console.log("FULL ERROR:", err.response);   // 👈 ADD
  console.log("ERROR DATA:", err.response?.data);
      return {
        status: false,
        message: err.response?.data?.message || "Failed to complete step",
        details: err.response?.data || null
      };
    }
  },

  // Get step completion status for fix vulnerability (UPDATED)
  async getFixVulnerabilitySteps(fixVulnerabilityId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/step-complete/`
      );

      return {
        status: true,
        data: {
          fix_vulnerability_id: res.data.fix_vulnerability_id,
          vulnerability_status: res.data.status,
          completed_steps: res.data.completed_steps,
          total_steps: res.data.total_steps,
          next_step: res.data.next_step,
          steps: res.data.steps || []
        }
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to fetch step completion data",
        details: err.response?.data || null
      };
    }
  },

  // CREATE Final Fix Feedback
  async submitFixFinalFeedback(
    fixVulnerabilityId: string,
    payload: {
      feedback_comment: string;
      fix_result: string;
    }
  ) {
    try {
      const res = await endpoint.post(
        `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/final-feedback/`,
        payload
      );

      return {
        status: true,
        message: res.data.message,
        data: res.data.data
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to submit feedback",
        details: err.response?.data || null
      };
    }
  },

  // GET Final Fix Feedback
  async getFixFinalFeedback(fixVulnerabilityId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/fix-vulnerability/${fixVulnerabilityId}/final-feedback/`
      );

      return {
        status: true,
        data: res.data
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to fetch final feedback",
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
        `/api/admin/adminregister/support-requests/raise/report/${reportId}/vulnerability/${vulnerabilityId}/`,
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

  // GET Raise support request by vulnerability id
  async getRaiseSupportRequestByVulnerability(vulnerabilityId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/raise-support-requests/vulnerability/${vulnerabilityId}/`
      );

      return {
        status: true,
        exists: res.data.exists,
        data: res.data.data,
        message: res.data.message
      };

    } catch (error) {
      const err = error as AxiosError<any>;

      // if no support request exists
      if (err.response?.status === 404) {
        return {
          status: true,
          exists: false,
          data: null
        };
      }

      return {
        status: false,
        message:
          err.response?.data?.message || "Failed to fetch support request",
        details: err.response?.data || null
      };
    }
  },

  // Create new ticket
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
        `/api/admin/adminregister/tickets/report/${reportId}/fix/${fixVulnerabilityId}/create/`,
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

  // GET Ticket by fix_vulnerability_id + ticket_id
  async getTicketById(fixVulnerabilityId: string, ticketId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/tickets/fix/${fixVulnerabilityId}/ticket/${ticketId}/`
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
        message: err.response?.data?.message || "Failed to fetch ticket",
        details: err.response?.data || null
      };
    }
  },

  // GET all open tickets by reportId
  async getOpenTickets(reportId: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/reports/${reportId}/tickets/open/`
      );

      return {
        status: true,
        data: res.data.results || [],
        count: res.data.count || 0,
        message: res.data.message
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message:
          err.response?.data?.message || "Failed to fetch open tickets",
        details: err.response?.data || null
      };
    }
  },

  // Get all support requests by report id
  async getSupportRequestsByReport(reportId: string) {
    try {
      console.log("📡 Store API called with:", reportId);

      const res = await endpoint.get(
        `/api/admin/adminregister/support-requests/report/${reportId}/`
      );

      return {
        status: true,
        data: res?.data?.results || [],
        count: res?.data?.count || 0
      };

    } catch (error) {
      console.error("❌ Support request API error:", error);
      return {
        status: false,
        data: [],
        count: 0
      };
    }
  },

  // Get all tickets by report id
  async getTicketsByReport(reportId: string) {
    try {
      console.log("Fetching tickets for report:", reportId);

      const res = await endpoint.get(
        `/api/admin/adminregister/tickets/report/${reportId}/`
      );

      const tickets = res?.data?.results
        || (Array.isArray(res?.data?.data) ? res.data.data : null)
        || (Array.isArray(res?.data) ? res.data : []);

      console.log("Tickets fetched:", tickets.length);

      return {
        status: true,
        data: tickets,
        count: res?.data?.count || tickets.length
      };

    } catch (error) {
      console.error("Tickets API error:", error);
      return {
        status: false,
        data: [],
        count: 0
      };
    }
  },

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

  // ✅ Get support requests by host_name
  async getSupportRequestsByHost(host: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/support-requests/host/${host}/`
      );

      return {
        status: true,
        data: res.data.results || [],
        count: res.data.count || 0,
        message: res.data.message
      };

    } catch (error: any) {
      return {
        status: false,
        data: [],
        count: 0,
        message: error?.response?.data?.message || "Failed to fetch support requests"
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

  // Get all closed vulnerabilities for a report + asset
  async getClosedVulnerabilities(reportId: string, asset: string) {
    try {
      const res = await endpoint.get(
        `/api/admin/adminregister/closed-vulnerabilities/report/${reportId}/asset/${asset}/`
      );

      return {
        status: true,
        data: res.data
      };

    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to fetch closed vulnerabilities",
        details: err.response?.data || null
      };
    }
  },

  // Get dashboard vulnerabilities fixed summary
  async getDashboardVulnerabilitiesFixed() {
    try {
      const res = await endpoint.get(
        `/api/admin/admindashboard/dashboard/vulnerabilities-fixed/`
      );
      return {
        status: true,
        data: res.data
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to fetch vulnerabilities fixed",
      };
    }
  },

  // Get dashboard support requests summary
  async getDashboardSupportRequests() {
    try {
      const res = await endpoint.get(
        `/api/admin/admindashboard/dashboard/support-requests/`
      );
      return {
        status: true,
        data: res.data
      };
    } catch (error) {
      const err = error as AxiosError<any>;
      return {
        status: false,
        message: err.response?.data?.message || "Failed to fetch support requests",
      };
    }
  },

  // Get vulnerabilities for a specific host, grouped by risk factor
  // async getHostVulnerabilities(hostName: string) {
  //   try {
  //     const res = await endpoint.get(
  //       `/api/admin/adminregister/register/host/${hostName}/vulns/`
  //     );

  //     return {
  //       status: true,
  //       data: res.data
  //     };

  //   } catch (error) {
  //     const err = error as AxiosError<any>;
  //     return {
  //       status: false,
  //       message: err.response?.data?.message || "Failed to fetch host vulnerabilities",
  //       details: err.response?.data || null
  //     };
  //   }
  // },

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