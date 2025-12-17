<template>
    <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">
        <img src="@/assets/images/logo-capital.png" alt="" class="mb-4" style="height: 40px;">
        <h1 class="form-heading mb-2">Get started now</h1>
        <p class="form-subheading mb-4">Join vaptfix, fix your vulnerabilities now</p>

        <div id="googleButton">
        <button class="btn btn-outline-dark rounded-pill mb-2 mb-md-0 mb-lg-0 w-100"><img src="@/assets/images/google-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Signup with Google</button>
      </div>
                     
                    <div class="d-flex align-items-center mt-3">
                      <hr class="flex-grow-1">
                      <span class="mx-2 text-muted">or</span>
                      <hr class="flex-grow-1">
                    </div>

        
     <form class="mt-3" @submit.prevent="handleSignup">

    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-2 mb-md-0">
        <label class="form-label">First name</label>
        <input type="text" class="form-control" v-model="form.firstname" placeholder="Enter your first name" />
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label">Last name</label>
        <input type="text" class="form-control" v-model="form.lastname" placeholder="Enter your last name" />
      </div>
    </div>

    <div class="mb-3 mt-4">
      <label class="form-label">Organisation name</label>
      <input type="text" class="form-control" v-model="form.organisation_name" placeholder="Enter your organisation name" />
    </div>

    <div class="mb-3 mt-4">
      <label class="form-label">Organisation URL</label>
      <input type="url" class="form-control" v-model="form.organisation_url" placeholder="Enter your organisation URL" />
    </div>

    <div class="mb-4 mt-4">
      <label class="form-label">Email</label>
      <input type="email" id="email" class="form-control" v-model="form.email" placeholder="Enter your email" />
    </div>

    <div class="mb-4 mt-4 position-relative">
      <label class="form-label">Your password</label>
      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Pick a password" />
      <i class="bi" :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" 
         @click="togglePassword" style="position:absolute; top:42px; right:20px; cursor:pointer;"></i>
    </div>

    <div class="mb-4 position-relative">
      <label class="form-label">Confirm password</label>
      <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" v-model="form.confirm_password" placeholder="Re-enter your password" />
      <i class="bi" :class="showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'" 
         @click="toggleConfirmPassword" style="position:absolute; top:42px; right:20px; cursor:pointer;"></i>
    </div>

    <!-- reCAPTCHA -->
    <div id="recaptcha-container" class="mb-3"></div>

    <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-3">
      Signup for vaptfix <i class="bi bi-arrow-right-circle-fill"></i>
    </button>
  </form>


  <p class="text-center pt-3 mt-2">Already have an account? <span> <router-link to="/signin" class="text-decoration-none" tag="button" style="color: #422CE9;">Signin</router-link></span></p>
      </div>

     
      <div class="col-lg-6 image-section d-none d-lg-block pt-5">
        <img src="@/assets/images/signup.jpg" alt="" style="width: 455px;height: 700px;border-radius: 15px;">
      </div>
    </div>
  </div>

    </main>
</template>

<script>
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
import { useAuthStore } from "../../stores/authStore";
import Swal from "sweetalert2";

export default {
  name: 'SignupView',
  components: {
    Vue3Select
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        organisation_name: "",
        organisation_url: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      authStore: useAuthStore(),
    };
  },
  methods: {
    async handleSignup() {
      this.loading = true;
      try {
        const authStore = useAuthStore();
        const result = await authStore.signup(this.form);

        if (result.status) {
          // Swal.fire(
          //   "Success",
          //   result.data.message || "Signup successful ✅",
          //   "success"
          // );

          // 🔎 Debug logs (tokens & user)
          console.log("✅ Access Token:", localStorage.getItem("authorization"));
          console.log("✅ Refresh Token:", localStorage.getItem("refreshToken"));
          console.log("✅ User:", localStorage.getItem("user"));
          console.log("✅ Authenticated:", localStorage.getItem("authenticated"));

          this.$router.push("/home");
        } else {
          console.error("Signup failed details:", result.details);
          Swal.fire("Error", result.message, "error");
        }
      } catch (error) {
        console.error("Unexpected signup error:", error);
        Swal.fire(
          "Error",
          error.message || "Something went wrong ❌",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    //  Google login 
  initializeGoogleLogin() {
      google.accounts.id.initialize({
        client_id:
          "727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com",
        callback: this.handleGoogleResponse,
      });
    },
  //   async handleGoogleResponse(response) {
  // try {
  //   const id_token = response.credential;
  //   console.log("🧠 Received Google ID Token:", id_token);

  //   localStorage.setItem("google_id_token", id_token);

  //   const authStore = useAuthStore();
  //   const result = await authStore.googleLogin(id_token);

  //   console.log("📦 Google login result:", result);

  //   // ✅ use the same structure as your authStore return
  //   if (result.status) {
  //     const { user, tokens } = result;

  //     // ✅ save everything properly
  //     if (tokens?.access) localStorage.setItem("accessToken", tokens.access);
  //     if (tokens?.refresh) localStorage.setItem("refreshToken", tokens.refresh);
  //     if (user) localStorage.setItem("user", JSON.stringify(user));

  //     // Swal.fire("Success", "Google login successful ✅", "success");

  //     this.$router.push("/home");
  //   } else {
  //     Swal.fire("Error", result.message || "Google login failed ❌", "error");
  //   }
  // } catch (error) {
  //   console.error("Google login API error:", error);
  //   Swal.fire("Error", "Something went wrong during Google login ❌", "error");
  // }
  // },
  async handleGoogleResponse(response) {
  const result = await this.authStore.googleLogin(response.credential);
  if (result.status) {
    this.$router.push("/home");
  }
},
  },
  mounted() {
  // ✅ Load Google Identity Services script safely
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  // When script loads → initialize Google Login
  script.onload = () => {
    google.accounts.id.initialize({
      client_id: "727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com",
      callback: this.handleGoogleResponse,
    });

    const buttonContainer = document.getElementById("googleButton");
    if (buttonContainer) {
      google.accounts.id.renderButton(buttonContainer, {
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "rectangular",
      });
    }   
  };

  document.head.appendChild(script);

  // ✅ reCAPTCHA setup (keep your existing)
  if (window.grecaptcha) {
    window.grecaptcha.ready(() => {
      window.grecaptcha.render("recaptcha-container", {
        sitekey: "6LfFQ7srAAAAAGK73MKmO08VjWPjBQDjyw7fY9Lr",
      });
    });
  }

  // ✅ Redirect if already authenticated
  const isAuthenticated = localStorage.getItem("authenticated");
  if (isAuthenticated === "true") {
    this.$router.push("/home");
  }
},
};
</script>

<style scoped>
/* Adjust eye icon inside password input */
.position-relative input + i {
  font-size: 1.2rem;
}
.g-recaptcha {
  min-height: 78px;
  transform: scale(1);
  transform-origin: 0 0;
}
</style>