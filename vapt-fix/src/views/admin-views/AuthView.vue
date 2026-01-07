<template>
  <main>
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <div class="col-md-5 form-section">

          <!-- LOGO (FIXED POSITION) -->
          <div class="logo-wrapper">
            <img src="@/assets/images/vaptfix_white.png" height="28">
          </div>

          <!-- FORM AREA (CENTERED) -->
          <!-- <div class="form-area text-white">
            <div class="form-wrapper w-75 pt-4">

             
              <div class="main-tabs">
                <div class="main-tab active" @click="switchRole('admin')"><i class="bi bi-person-square"></i> Admin
                </div>
                <div class="main-tab" @click="switchRole('user')"><i class="bi bi-people"></i> User</div>
              </div>

              
              <div class="sub-tabs">
                <div class="sub-tab active" @click="switchMode('signup')">Sign Up</div>
                <div class="sub-tab" @click="switchMode('signin')">Sign In</div>
              </div>

              <form id="authForm">

                <div class="mb-2">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control custom-input" placeholder="name@work.com">
                </div>

                <div class="mb-2 password-field">
                  <label class="form-label">Password</label>
                  <div class="position-relative">
                    <input type="password" class="form-control custom-input" placeholder="Password">
                    <span class="password-toggle" @click="togglePassword(this)">👁️</span>
                  </div>
                </div>

                <div class="mb-3 password-confirm">
                  <label class="form-label">Confirm Password</label>
                  <div class="position-relative">
                    <input type="password" class="form-control custom-input" placeholder="Confirm Password">
                    <span class="password-toggle" @click="togglePassword(this)">👁️</span>
                  </div>
                </div>

                <div class="mb-3 captcha-box">
                  reCAPTCHA placeholder
                </div>

                <button type="submit" class="btn signup-btn w-100 mb-2">
                  Continue
                </button>

                <div class="text-center">

                  <p class="small toggle-text" v-if="currentMode === 'signup'">
                    Already have an account?
                    <a href="#" @click.prevent="switchMode('signin')" class="fw-bold text-primary">Sign In</a>
                  </p>

                  <p class="small toggle-text" v-else>
                    Don’t have an account?
                    <a href="#" @click.prevent="switchMode('signup')" class="fw-bold text-primary">Sign Up</a>
                  </p>

                </div>

              </form>
            </div>
          </div> -->

          <div class="form-area text-white">
            <div class="form-wrapper w-75 pt-4">

              <!-- MAIN TABS -->
              <div class="main-tabs">
                <div class="main-tab" :class="{ active: currentRole === 'admin' }" @click="switchRole('admin')">
                  <i class="bi bi-person-square"></i> Admin
                </div>
                <div class="main-tab" :class="{ active: currentRole === 'user' }" @click="switchRole('user')">
                  <i class="bi bi-people"></i> User
                </div>
              </div>

              <!-- SUB TABS -->
              <div class="sub-tabs">
                <div class="sub-tab" :class="{ active: currentMode === 'signup' }" @click="switchMode('signup')">
                  Sign Up
                </div>
                <div class="sub-tab" :class="{ active: currentMode === 'signin' }" @click="switchMode('signin')">
                  Sign In
                </div>
              </div>

              <!-- FORM -->
              <form :key="formKey" id="authForm" @submit.prevent="handleSubmit" autocomplete="off">
                <!-- Hidden fields to trick browser autofill -->
                <input type="text" style="display:none" aria-hidden="true">
                <input type="password" style="display:none" aria-hidden="true">

                <!-- EMAIL -->
                <div class="mb-2">
                  <label class="form-label">Email</label>
                  <!-- <input 
                    type="email" 
                    class="form-control custom-input" 
                    placeholder="name@work.com" 
                    v-model="formData.email"
                    :autocomplete="isSignup ? 'new-email' : 'username'"
                    :name="isSignup ? 'new-email-' + formKey : 'email'"
                    required 
                  /> -->

                  <!-- <input type="email" class="form-control custom-input" placeholder="name@work.com"
                    v-model="formData.email" autocomplete="off" :name="'email-' + formKey" required /> -->

                  <input type="email" class="form-control custom-input" placeholder="name@work.com"
                    v-model="formData.email" autocomplete="new-email" autocorrect="off" autocapitalize="off"
                    spellcheck="false" :name="'email_' + formKey" required />


                </div>

                <!-- PASSWORD -->
                <div class="mb-2 password-field">
                  <label class="form-label">Password</label>
                  <div class="position-relative">
                    <!-- <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Password" v-model="formData.password"
                      :autocomplete="isSignup ? 'new-password' : 'current-password'"
                      :name="isSignup ? 'new-password-' + formKey : 'password'" required /> -->

                    <!-- <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Password" v-model="formData.password" autocomplete="off"
                      :name="'password-' + formKey" required /> -->

                    <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Password" v-model="formData.password" autocomplete="new-password" autocorrect="off"
                      autocapitalize="off" spellcheck="false" :name="'password_' + formKey" required />


                    <span class="password-toggle" @click="showPassword = !showPassword">
                      <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    </span>
                  </div>
                </div>

                <!-- CONFIRM PASSWORD (Signup only) -->
                <div class="mb-2 password-confirm" v-if="currentMode === 'signup'">
                  <label class="form-label">Confirm Password</label>
                  <div class="position-relative">
                    <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Confirm Password" v-model="formData.confirm_password" autocomplete="new-password"
                      :name="'confirm-password-' + formKey" required />
                    <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                      <i :class="showConfirmPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    </span>
                  </div>
                </div>

                <!-- FORGOT PASSWORD (Signin only) -->
                <div class="text-end mb-2" v-if="currentMode === 'signin'">
                  <router-link to="/forgotpassword" class="forgot-link">
                    Forgot Password?
                  </router-link>
                </div>

                <!-- reCAPTCHA -->
                <div class="mb-2 d-flex justify-content-center">
                  <div :id="recaptchaContainerId" :key="recaptchaKey"></div>
                </div>

                <!-- SUBMIT -->
                <button type="submit" class="btn signup-btn w-100 mb-2" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ submitButtonText }}
                </button>

                <!-- TOGGLE -->
                <div class="text-center">
                  <p class="small toggle-text" v-if="currentMode === 'signup'">
                    Already have an account?
                    <a href="#" @click.prevent="switchMode('signin')" class="fw-bold text-primary">
                      Sign In
                    </a>
                  </p>

                  <p class="small toggle-text" v-else>
                    Don't have an account?
                    <a href="#" @click.prevent="switchMode('signup')" class="fw-bold text-primary">
                      Sign Up
                    </a>
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>


        <!-- RIGHT SECTION -->
        <div class="col-md-7 d-flex flex-column justify-content-center align-items-center info-section p-5">

          <h2 class="testimonial-headline text-center mb-2">
          <span class="text-white">VAPTFIX — Scan Smart. Fix Fast. Stay Secure.</span><br />
            <!-- <span class="text-white">{{ rightHeadline }}</span> -->
          </h2>
          <!-- DASHBOARD ROTATOR -->
          <div class="dashboard-slider">
            <img src="@/assets/images/slider1.png" class="dashboard-slide active" />
            <img src="@/assets/images/slider2.png" class="dashboard-slide" />
            <img src="@/assets/images/slider3.png" class="dashboard-slide" />
          </div>

          <p class="text-white fst-italic">VAPTFIX gives a clear and structured way to handle vulnerability assessments.
          Instead of juggling multiple tools and reports, everything now lives in one place.
          It’s helped a team stay organised, focused, and confident in a security workflow.</p>

          <p class="text-light fw-semibold">From risk to resolution, VAPTFIX keeps everything Intune.</p>

        </div>

      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import Swal from 'sweetalert2';

export default {
  name: "AuthView",

  data() {
    return {
      currentRole: "admin",
      currentMode: "signup",

      formData: {
        email: "",
        password: "",
        confirm_password: ""
      },

      showPassword: false,
      showConfirmPassword: false,
      loading: false,

      recaptchaWidgetId: null,
      recaptchaKey: 0,
      recaptchaSiteKey: "6LevYjAsAAAAAH5H0o33_0IvZAbvvOiZ82ZwA8ny",

      authStore: null,
      formKey: Date.now() // Unique key to prevent autofill
    };
  },

  computed: {
    rightHeadline() {
      if (this.currentRole === "admin") {
        return this.currentMode === "signup"
          ? "Enter the Secure Zone. Sign up to take control"
          : "Welcome back!";
      }
      return this.currentMode === "signup"
        ? "Enter the Secure Zone. Sign up to take control"
        : "Welcome back!";
    },

    submitButtonText() {
      if (this.currentMode === "signup") {
        return "Continue";
      }
      return "Sign In";
    },

    recaptchaContainerId() {
      return `recaptcha-${this.currentRole}-${this.currentMode}`;
    },

    isSignup() {
      return this.currentMode === "signup";
    },

    isAdmin() {
      return this.currentRole === "admin";
    }
  },

  methods: {
    // ===============================
    // TAB SWITCHING
    // ===============================
    switchRole(role) {
      this.currentRole = role;
      this.resetForm();
      this.formKey = Date.now(); // Generate new key to prevent autofill

      this.$nextTick(() => {
        this.clearAutofill();
        this.reinitializeRecaptcha();
      });
    },

    switchMode(mode) {
      this.currentMode = mode;
      this.resetForm();
      this.formKey = Date.now(); // Generate new key to prevent autofill

      // 👇 ADD THIS LINE

      this.$nextTick(() => {
        this.clearAutofill();
        this.reinitializeRecaptcha();
      });
    },

    resetForm() {
      this.formData = {
        email: "",
        password: "",
        confirm_password: ""
      };
      this.showPassword = false;
      this.showConfirmPassword = false;
    },


    clearAutofill() {
      requestAnimationFrame(() => {
        this.formData.email = "";
        this.formData.password = "";
        this.formData.confirm_password = "";
      });
    },


    // ===============================
    // FORM VALIDATION
    // ===============================
    validateForm() {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        Swal.fire('Error', 'Please enter a valid email', 'error');
        return false;
      }

      // Password validation for signup
      if (this.isSignup) {
        if (this.formData.password.length < 8) {
          Swal.fire('Error', 'Password must be at least 8 characters', 'error');
          return false;
        }

        if (this.formData.password !== this.formData.confirm_password) {
          Swal.fire('Error', 'Passwords do not match', 'error');
          return false;
        }
      } else {
        // Signin validation
        if (!this.formData.password || this.formData.password.trim() === '') {
          Swal.fire('Error', 'Please enter your password', 'error');
          return false;
        }
      }

      // reCAPTCHA validation
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
        if (!recaptchaResponse) {
          Swal.fire('Error', 'Please verify you are not a robot', 'error');
          return false;
        }
      }

      return true;
    },

    // ===============================
    // FORM SUBMISSION
    // ===============================
    async handleSubmit() {
      if (!this.validateForm()) return;

      // If User auth, show coming soon message
      if (!this.isAdmin) {
        Swal.fire({
          icon: 'info',
          title: 'Coming Soon',
          text: 'User authentication will be available soon!',
          confirmButtonColor: '#5a44ff'
        });
        return;
      }

      this.loading = true;

      try {
        // Get reCAPTCHA response
        const recaptchaResponse = window.grecaptcha
          ? window.grecaptcha.getResponse(this.recaptchaWidgetId)
          : "";

        if (this.isSignup) {
          await this.handleSignup(recaptchaResponse);
        } else {
          await this.handleSignin(recaptchaResponse);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        Swal.fire('Error', error.message || 'Something went wrong', 'error');
      } finally {
        this.loading = false;
      }
    },

    // ===============================
    // SIGNUP HANDLER
    // ===============================
    async handleSignup(recaptchaResponse) {
      const payload = {
        email: this.formData.email,
        password: this.formData.password,
        confirm_password: this.formData.confirm_password,
        recaptcha: recaptchaResponse
      };

      const result = await this.authStore.signup(payload);

      if (result.status) {
        console.log('✅ Signup successful');
        this.$router.replace('/location');
      } else {
        // Extract error message from nested structure
        let errorMessage = result.message || 'Signup failed';

        if (result.details && result.details.errors) {
          const errors = result.details.errors;
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey && Array.isArray(errors[firstErrorKey])) {
            errorMessage = errors[firstErrorKey][0];
          }
        }

        Swal.fire('Error', errorMessage, 'error');
        this.resetRecaptcha();
      }
    },

    // ===============================
    // SIGNIN HANDLER
    // ===============================
    async handleSignin(recaptchaResponse) {
      const payload = {
        email: this.formData.email,
        password: this.formData.password,
        recaptcha: recaptchaResponse
      };

      const result = await this.authStore.login(payload);

      if (result.status) {
        console.log('✅ Login successful');
        await this.checkAndRedirect();
      } else {
        Swal.fire('Error', result.message || 'Login failed', 'error');
        this.resetRecaptcha();
      }
    },

    // ===============================
    // REDIRECT LOGIC
    // ===============================
    async checkAndRedirect() {
      const reportId = localStorage.getItem('reportId');

      if (!reportId) {
        this.$router.push('/location');
        return;
      }

      try {
        const res = await this.authStore.getUploadReportById(reportId);

        if (res.status && res.data?.upload_report) {
          this.$router.push('/admindashboardonboarding');
        } else {
          this.$router.push('/location');
        }
      } catch (error) {
        this.$router.push('/location');
      }
    },

    // ===============================
    // reCAPTCHA METHODS
    // ===============================
    loadRecaptchaScript() {
      // Check if script already loaded
      if (window.grecaptcha && window.grecaptcha.render) {
        this.initializeRecaptcha();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;

      // Set global callback
      window.onRecaptchaLoad = () => {
        this.initializeRecaptcha();
      };

      document.head.appendChild(script);
    },

    initializeRecaptcha() {
      if (!window.grecaptcha || !window.grecaptcha.render) {
        console.warn('⚠️ reCAPTCHA not ready yet');
        return;
      }

      this.$nextTick(() => {
        const container = document.getElementById(this.recaptchaContainerId);
        if (!container) {
          console.warn('⚠️ reCAPTCHA container not found:', this.recaptchaContainerId);
          return;
        }

        // Clear existing content
        container.innerHTML = '';

        try {
          this.recaptchaWidgetId = window.grecaptcha.render(container, {
            sitekey: this.recaptchaSiteKey,
            theme: "dark"
          });
          console.log('✅ reCAPTCHA rendered, Widget ID:', this.recaptchaWidgetId);
        } catch (error) {
          console.error('❌ reCAPTCHA render error:', error);
        }
      });
    },

    reinitializeRecaptcha() {
      // Increment key to force re-render
      this.recaptchaKey++;
      this.recaptchaWidgetId = null;

      this.$nextTick(() => {
        this.initializeRecaptcha();
      });
    },

    resetRecaptcha() {
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        try {
          window.grecaptcha.reset(this.recaptchaWidgetId);
        } catch (e) {
          console.warn('⚠️ reCAPTCHA reset error:', e);
        }
      }
    },

    // ===============================
    // CLEAR AUTOFILL ON MOUNT
    // ===============================

  },

  mounted() {
    // Initialize auth store
    this.authStore = useAuthStore();

    // Load reCAPTCHA
    this.loadRecaptchaScript();

    // Clear any autofilled data on signup
    // this.clearAutofill();
  },

  beforeUnmount() {
    // Cleanup
    if (window.grecaptcha && this.recaptchaWidgetId !== null) {
      try {
        window.grecaptcha.reset(this.recaptchaWidgetId);
      } catch (e) {
        console.error('Error resetting reCAPTCHA:', e);
      }
    }

    // Remove global callback
    if (window.onRecaptchaLoad) {
      delete window.onRecaptchaLoad;
    }
  }
};
</script>


<style scoped>
.form-section {
  background-color: rgb(9, 9, 35);
  min-height: 100vh;
  position: relative;
}

.logo-wrapper {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.form-area {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.form-wrapper {
  background: transparent;
  max-height: 100vh;
  position: relative;
  padding-top: 140px;
}

/* ===== MAIN TABS ===== */
.main-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.main-tab {
  flex: 1;
  padding: 8px;
  border-radius: 12px;
  background: #020617;
  border: 1px solid #1f2937;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  opacity: 0.6;
}


.main-tab.active {
  background-color: rgb(90, 68, 255);
  border-color: rgb(90, 68, 255);
  opacity: 1;
}

/* ===== SUB TABS ===== */
.sub-tabs {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 14px;
  border-bottom: 1px solid #1f2937;
}

.sub-tab {
  padding: 10px 0;
  cursor: pointer;
  font-weight: 500;
  opacity: 0.6;
  position: relative;
}

.sub-tab.active {
  opacity: 1;
  color: rgb(90, 68, 255);
}

.sub-tab.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgb(90, 68, 255);
  /* ✅ active underline */
}


/* ===== INPUTS ===== */
.form-label {
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 5px;
}

.custom-input {
  background: #020617;
  border: 1px solid #1f2937;
  color: #fff;
  height: 46px;
  border-radius: 10px;
}

.custom-input::placeholder {
  color: #6b7280;
}

.custom-input:focus {
  background: #020617;
  border-color: rgb(90, 68, 255);
  box-shadow: none;
  color: #fff;
}

.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.7;
}

/* ===== BUTTON ===== */
.signup-btn {
  height: 48px;
  border-radius: 12px;
  font-weight: 600;
  background: rgb(90, 68, 255);
  border: none;
  color: white;
}

/* ===== CAPTCHA ===== */
.captcha-box {
  background: #020617;
  border: 1px dashed #374151;
  padding: 14px;
  border-radius: 10px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}

.terms-text a {
  color: #93c5fd;
  text-decoration: underline;
}

.info-section {
  background-color: rgb(13, 13, 43);
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* Right Side Styling */
.testimonial-headline {
  color: #8b949e;
  font-size: 1.8rem;
  font-weight: 700;
}

.testimonial-card {
  max-width: 600px;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  border: 3px solid rgb(90, 68, 255);
}

.logo-grid img {
  filter: grayscale(100%) invert(1);
  max-width: 100%;
}



/* ===============================
   STATIC AUTH HEADER FIX
   =============================== */

/* Stop vertical re-centering jump */
.form-area {
  align-items: flex-start;
  /* 👈 KEY FIX */
}

/* Lock visible auth header height */
.form-wrapper {
  padding-top: 140px;
  /* keep as-is */
}

/* Create a static header zone */
.main-tabs,
.sub-tabs {
  flex-shrink: 0;
}

/* Ensure form area adjusts smoothly */
#authForm {
  width: 100%;
}

/* Prevent layout shift on mode switch */
.password-confirm {
  min-height: 78px;
  /* reserves space even when hidden */
}

/* ===============================
       DASHBOARD IMAGE SLIDER
       =============================== */

.dashboard-slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 300px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
}

.dashboard-slide {
  position: absolute;
  width: 100%;
  max-height: 100%;
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);

  opacity: 0;
  transform: scale(0.92) translateY(30px);
  transition:
    opacity 1s ease,
    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Active (front card) */
.dashboard-slide.active {
  opacity: 1;
  transform: scale(1) translateY(0);
  z-index: 3;
}

/* Previous (goes back) */
.dashboard-slide.prev {
  opacity: 0;
  transform: scale(0.9) translateY(-40px);
  z-index: 1;
}


@media (max-width: 768px) {
  .dashboard-slider {
    height: 260px;
  }
}

.testimonial-headline {
  color: #8b949e;
  font-size: 1.8rem;
  font-weight: 700;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 3px solid rgb(90, 68, 255);
}
</style>