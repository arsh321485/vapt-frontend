<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">
        <img src="@/assets/images/logo-capital.png" alt="" class="mb-4" style="height: 40px;">
        <h1 class="form-heading mb-3">Welcome back!</h1>
        <p class="form-subheading mb-4">Login into your account to start fixing.</p>

        
         <div id="googleButton">
        <button class="btn btn-outline-dark rounded-pill mb-2 mb-md-0 mb-lg-0 w-100"><img src="@/assets/images/google-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Login with Google</button>
      </div>

                    <div class="d-flex align-items-center mt-3">
                      <hr class="flex-grow-1">
                      <span class="mx-2 text-muted">or</span>
                      <hr class="flex-grow-1">
                    </div>

        <form @submit.prevent="handleLogin">

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" id="email" class="form-control" v-model="form.email" placeholder="Enter your email">
    </div>

    <div class="mb-4 mt-4 position-relative">
      <label class="form-label">Your password</label>
      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Enter your password" />
      <i class="bi" :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" 
         @click="togglePassword" style="position:absolute; top:42px; right:20px; cursor:pointer;"></i>

      <div class="text-end mt-1">
        <router-link to="/forgotpassword" class="text-primary" style="font-size: 14px; text-decoration: none;">
          Forgot Password?
        </router-link>
      </div>
    </div>

    <!-- ✅ Google reCAPTCHA -->
    <div id="recaptcha-container" class="mb-3"></div>

    <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-4">
      Login into vaptfix <i class="bi bi-arrow-right-circle-fill"></i>
    </button>
  </form>

        <p class="mt-4 text-center">Don’t have an account? <span>
          <router-link to="/signup" class="text-decoration-none" tag="button" style="color: #422CE9;">Signup</router-link>
        </span></p>
      </div>

      <!-- Right Image Section -->
      <div class="col-lg-6 d-none d-lg-block image-section pt-5">
        <img src="@/assets/images/signin.jpg" alt="" class="img-fluid" style="height: 500px;border-radius: 15px;">
      </div>
    </div>
  </div>


    </main>
</template>

<script>
import Vue3Select from "vue3-select";
import "vue3-select/dist/vue3-select.css";
import { useAuthStore } from "../../stores/authStore";
import Swal from "sweetalert2";

export default {
  name: "SigninView",
  components: { Vue3Select },
  data() {
    return {
      form: { email: "", password: "" },
      showPassword: false,
      loading: false,
      authStore: useAuthStore(),
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isPasswordFilled(password) {
      return password && password.trim() !== "";
    },
    async handleLogin() {
      if (!this.isValidEmail(this.form.email)) {
        Swal.fire("Error", "Please enter a valid email", "error");
        return;
      }
      if (!this.isPasswordFilled(this.form.password)) {
        Swal.fire("Error", "Please enter your password", "error");
        return;
      }

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        Swal.fire("Error", "Please verify you are not a robot", "error");
        return;
      }

      this.loading = true;
      try {
        const authStore = useAuthStore();
        const result = await authStore.login({
          email: this.form.email,
          password: this.form.password,
          recaptcha: recaptchaResponse,
        });

        if (result.status) {

          console.log("✅ Access Token:", localStorage.getItem("authorization"));
          console.log("✅ Refresh Token:", localStorage.getItem("refreshToken"));
          console.log("✅ User:", localStorage.getItem("user"));
          console.log("✅ Authenticated:", localStorage.getItem("authenticated"));

          // Check if user has uploaded report and redirect accordingly
          await this.checkAndRedirect();

        } else {
          Swal.fire("Error", result.message || "Login failed ❌", "error");
          grecaptcha.reset();
        }
      } catch (err) {
        console.error("Login API error:", err);
        Swal.fire("Error", "Login request failed. Please try again.", "error");
        grecaptcha.reset();
      } finally {
        this.loading = false;
      }
    },
    //  Google login 
    initializeGoogleLogin() {
      google.accounts.id.initialize({
        client_id:
          "727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com",
        callback: this.handleGoogleResponse,
      });

      // ✅ Optional: render Google Sign-In button
      google.accounts.id.renderButton(
        document.getElementById("googleButton"), 
        { theme: "outline", size: "large", text: "signin_with" }
      );
    },
  //   async handleGoogleResponse(response) {
  // try {
  //   const id_token = response.credential;
  //   console.log("🧠 Received Google ID Token:", id_token);

  //   localStorage.setItem("google_id_token", id_token);

  //   const authStore = useAuthStore();
  //   const result = await authStore.googleLogin(id_token);

  //   console.log("📦 Google login result:", result);
  //   if (result.status) {
  //     const { user, tokens } = result;
  //     if (tokens?.access) localStorage.setItem("accessToken", tokens.access);
  //     if (tokens?.refresh) localStorage.setItem("refreshToken", tokens.refresh);
  //     if (user) localStorage.setItem("user", JSON.stringify(user));
      
  //     this.$router.push("/location");
  //   } else {
  //     Swal.fire("Error", result.message || "Google login failed ❌", "error");
  //   }
  // } catch (error) {
  //   console.error("Google login API error:", error);
  //   Swal.fire("Error", "Something went wrong during Google login ❌", "error");
  // }
  //   },
  async handleGoogleResponse(response) {
  try {
    const id_token = response.credential;
    console.log("🧠 Google ID Token received");

    const authStore = useAuthStore();
    const result = await authStore.googleLogin(id_token);

    if (!result.status) {
      Swal.fire(
        "Error",
        result.message || "Google login failed ❌",
        "error"
      );
      return;
    }

    // ✅ Auth is already set in store
    // ✅ authenticated = true
    // ✅ user saved
    // ✅ tokens saved

    // 🔁 Check if user has uploaded report and redirect accordingly
    await this.checkAndRedirect();

  } catch (error) {
    console.error("Google login error:", error);
    Swal.fire(
      "Error",
      "Something went wrong during Google login ❌",
      "error"
    );
  }
},
    async checkAndRedirect() {
      const reportId = localStorage.getItem("reportId");
      console.log("📍 reportId:", reportId);

      if (!reportId) {
        // No report uploaded yet
        console.log("➡️ No reportId, redirecting to /location");
        this.$router.push("/location");
        return;
      }

      // Check if report exists
      const authStore = useAuthStore();
      console.log("🔍 Checking if report exists...");
      const res = await authStore.getUploadReportById(reportId);
      console.log("📊 API response:", res);

      if (res.status && res.data?.upload_report) {
        // Report exists, go to dashboard
        console.log("✅ Report exists, redirecting to /admindashboardonboarding");
        this.$router.push("/admindashboardonboarding");
      } else if (res.isNotFound) {
        // 404 - Report doesn't exist, go to location (expected for new users)
        console.log("➡️ No report found (404), redirecting to /location");
        this.$router.push("/location");
      } else {
        // Real error occurred, show error but still redirect to location
        console.error("❌ Error checking report:", res.message);
        Swal.fire("Error", res.message || "Failed to verify report status", "error");
        this.$router.push("/location");
      }
    }
  },
  beforeUnmount() {
  if (window.grecaptcha) {
    try {
      window.grecaptcha.reset();
    } catch (e) {}
  }
},
mounted() {
  const googleScript = document.createElement("script");
  googleScript.src = "https://accounts.google.com/gsi/client";
  googleScript.async = true;
  googleScript.defer = true;

  googleScript.onload = () => {
    google.accounts.id.initialize({
      client_id: "727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com",
      callback: this.handleGoogleResponse,
    });

    const btn = document.getElementById("googleButton");
    if (btn) {
      google.accounts.id.renderButton(btn, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });
    }

  };

  document.head.appendChild(googleScript);

  const recaptchaScript = document.createElement("script");
  recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=explicit";
  recaptchaScript.async = true;
  recaptchaScript.defer = true;

  recaptchaScript.onload = () => {
  if (this.$route.name !== "signin") return;

  const el = document.getElementById("recaptcha-container");
  if (!el) return;

  window.grecaptcha.render(el, {
    sitekey: "6LevYjAsAAAAAH5H0o33_0IvZAbvvOiZ82ZwA8ny",
  });
};

  document.head.appendChild(recaptchaScript);
}

};
</script>


<style scoped>
.position-relative input + i {
  font-size: 1.2rem;
}
</style>