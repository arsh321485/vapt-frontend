<template>
  <div class="callback-container">
    <div class="callback-card">
      <!-- Loading State -->
      <div v-if="status === 'loading'" class="callback-content">
        <div class="loader"></div>
        <h2>Connecting to Slack...</h2>
        <p>Please wait while we complete the authentication.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="status === 'success'" class="callback-content">
        <i class="bi bi-check-circle-fill success-icon"></i>
        <h2>Slack Connected!</h2>
        <p>You can close this window now.</p>
      </div>

      <!-- Error State -->
      <div v-else-if="status === 'error'" class="callback-content">
        <i class="bi bi-x-circle-fill error-icon"></i>
        <h2>Connection Failed</h2>
        <p>{{ errorMessage }}</p>
        <button class="btn btn-primary mt-3" @click="retry">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "SlackCallbackView",

  data() {
    return {
      status: "loading",
      errorMessage: "",
      authStore: null,
    };
  },

  async mounted() {
    console.log("=== SlackCallbackView MOUNTED ===");
    console.log("Current URL:", window.location.href);
    console.log("Query params:", window.location.search);
    this.authStore = useAuthStore();
    await this.handleCallback();
  },

  methods: {
    async handleCallback() {
      try {
        console.log("=== handleCallback STARTED ===");

        // Get code and error from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        console.log("Code from URL:", code);
        console.log("Error from URL:", error);

        // Check for OAuth error
        if (error) {
          console.log("OAuth error detected:", error);
          this.status = "error";
          this.errorMessage = urlParams.get("error_description") || "Authorization was denied.";
          return;
        }

        // Validate code exists
        if (!code) {
          console.log("No code found in URL!");
          this.status = "error";
          this.errorMessage = "No authorization code received.";
          return;
        }

        // Build redirect URI (must match what was sent to Slack)
        const redirectUri = `${window.location.origin}/slack/callback`;
        console.log("Redirect URI:", redirectUri);

        // Exchange code for token
        console.log("Calling loginWithSlack API with code:", code);
        const res = await this.authStore.loginWithSlack(code, redirectUri);
        console.log("loginWithSlack response:", res);

        if (res.status) {
          this.status = "success";

          // Notify parent window
          if (window.opener) {
            console.log("Posting SLACK_CONNECTED message to parent...");
            window.opener.postMessage({ type: "SLACK_CONNECTED" }, "*");
          } else {
            console.warn("No window.opener found - parent window may not receive message");
          }

          // Auto close after 2 seconds
          setTimeout(() => {
            window.close();
          }, 2000);
        } else {
          this.status = "error";
          this.errorMessage = res.message || "Failed to connect Slack.";
        }
      } catch (err) {
        console.error("Slack callback error:", err);
        this.status = "error";
        this.errorMessage = "An unexpected error occurred.";
      }
    },

    retry() {
      // Close this window and let user try again
      window.close();
    }
  }
};
</script>

<style scoped>
.callback-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 20px;
}

.callback-card {
  background: #fff;
  border-radius: 20px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
}

.callback-content h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 20px 0 10px;
}

.callback-content p {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #e6e9f2;
  border-top: 4px solid #611f69;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-icon {
  font-size: 56px;
  color: #22c55e;
}

.error-icon {
  font-size: 56px;
  color: #ef4444;
}

.btn-primary {
  background: #611f69;
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(97, 31, 105, 0.25);
}
</style>
