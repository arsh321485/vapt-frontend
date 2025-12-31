<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      <div class="row overflow-hidden w-100">

        <!-- Left Form Section -->
        <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">

          <!-- Logo (centered, col-6) -->
          <div class="row justify-content-center mb-4">
            <div class="col-6 text-center">
              <img src="@/assets/images/logo-capital.png" alt="VaptFix Logo" style="height: 40px;">
            </div>
          </div>

          <!-- Heading -->
          <h1 class="form-heading mb-2 text-center">{{ headingText }}</h1>
          <p class="form-subheading mb-4 text-center">{{ subheadingText }}</p>

          <!-- Main Tabs: Admin | User with Profile Icons -->
          <div class="main-tabs-container mb-2">
            <div class="row">
              <div class="col-6">
                <div
                  class="profile-tab"
                  :class="{ active: activeMainTab === 'admin' }"
                  @click="switchMainTab('admin')"
                >
                  <div class="profile-icon-wrapper">
                    <i class="bi bi-person-badge-fill profile-icon"></i>
                  </div>
                  <p class="profile-label">Admin</p>
                </div>
              </div>
              <div class="col-6">
                <div
                  class="profile-tab"
                  :class="{ active: activeMainTab === 'user' }"
                  @click="switchMainTab('user')"
                >
                  <div class="profile-icon-wrapper">
                    <i class="bi bi-person-fill profile-icon"></i>
                  </div>
                  <p class="profile-label">User</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sub Tabs: Signup | Signin -->
          <ul class="nav nav-pills nav-fill mb-3 sub-tabs">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeSubTab === 'signup' }"
                @click.prevent="switchSubTab('signup')"
                href="#"
              >
                Sign-up
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeSubTab === 'signin' }"
                @click.prevent="switchSubTab('signin')"
                href="#"
              >
                Sign-in
              </a>
            </li>
          </ul>

          <!-- Dynamic Form -->
          <form @submit.prevent="handleSubmit" class="mt-3">

            <!-- Admin Signup Fields -->
            <template v-if="isAdmin && isSignup">
              <div class="row mb-3">
                <div class="col-12 col-md-6 mb-2 mb-md-0">
                  <label class="form-label">First name</label>
                  <input type="text" class="form-control" v-model="currentForm.firstname" placeholder="Enter your first name" required />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label">Last name</label>
                  <input type="text" class="form-control" v-model="currentForm.lastname" placeholder="Enter your last name" required />
                </div>
              </div>

              <div class="mb-3 mt-4">
                <label class="form-label">Organisation name</label>
                <input type="text" class="form-control" v-model="currentForm.organisation_name" placeholder="Enter your organisation name" required />
              </div>

              <div class="mb-3 mt-4">
                <label class="form-label">Organisation URL</label>
                <input type="url" class="form-control" v-model="currentForm.organisation_url" placeholder="Enter your organisation URL" required />
              </div>
            </template>

            <!-- User Signup Fields -->
            <template v-if="!isAdmin && isSignup">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="currentForm.name" placeholder="Enter your name" required />
              </div>
            </template>

            <!-- Email Field (Common for all forms) -->
            <div class="mb-4 mt-4">
              <label class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                v-model="currentForm.email"
                placeholder="Enter your email"
                required
              />
            </div>

            <!-- Password Field with Validation -->
            <PasswordInput
              v-model="currentForm.password"
              :label="'Your password'"
              :placeholder="isSignup ? 'Pick a password' : 'Enter your password'"
              :show-validation="isSignup"
              :required="true"
              @validation-change="updatePasswordValidation"
            />

            <!-- Confirm Password (Signup only) -->
            <template v-if="isSignup">
              <div class="mb-4 position-relative">
                <label class="form-label">Confirm password</label>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  v-model="currentForm.confirm_password"
                  placeholder="Re-enter your password"
                  required
                />
                <i
                  class="bi"
                  :class="showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                  @click="toggleConfirmPassword"
                  style="position:absolute; top:42px; right:20px; cursor:pointer;"
                ></i>
              </div>
            </template>

            <!-- Forgot Password Link (Signin only) -->
            <template v-if="!isSignup">
              <div class="text-end mt-1 mb-3">
                <router-link to="/forgotpassword" class="text-primary" style="font-size: 14px; text-decoration: none;">
                  Forgot Password?
                </router-link>
              </div>
            </template>

            <!-- reCAPTCHA -->
            <div :id="recaptchaContainerId" :key="recaptchaContainerId" class="mb-3"></div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-3" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              {{ submitButtonText }} <i class="bi bi-arrow-right-circle-fill"></i>
            </button>
          </form>

          <!-- Divider -->
          <div class="d-flex align-items-center mt-3">
            <hr class="flex-grow-1">
            <span class="mx-2 text-muted">or</span>
            <hr class="flex-grow-1">
          </div>

          <!-- Google OAuth Button - Admin -->
          <div v-if="isAdmin" :id="googleButtonId" class="mt-3">
            <button type="button" class="btn btn-outline-dark rounded-pill mb-2 w-100">
              <img src="@/assets/images/google-icon.png" style="height: 23px; width: 23px; margin-top: -1px;" />
              {{ googleButtonText }}
            </button>
          </div>

          <!-- Google OAuth Button - User -->
          <div v-else :id="googleButtonId" class="mt-3">
            <button type="button" class="btn btn-outline-dark rounded-pill mb-2 w-100">
              <img src="@/assets/images/google-icon.png" style="height: 23px; width: 23px; margin-top: -1px;" />
              {{ googleButtonText }}
            </button>
          </div>

          <!-- Toggle Link (Signup ↔ Signin) -->
          <!-- <p class="text-center pt-3 mt-2">
            <template v-if="isSignup">
              Already have an account?
              <a href="#" @click.prevent="switchSubTab('signin')" class="text-decoration-none" style="color: #422CE9;">
                Signin
              </a>
            </template>
            <template v-else>
              Don't have an account?
              <a href="#" @click.prevent="switchSubTab('signup')" class="text-decoration-none" style="color: #422CE9;">
                Signup
              </a>
            </template>
          </p> -->
        </div>

        <!-- Right Image Section -->
        <div class="col-lg-6 image-section d-none d-lg-block pt-5">
          <img src="@/assets/images/signin.jpg" alt="" style="width: 455px; height: 700px; border-radius: 15px;">
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import PasswordInput from '@/components/common/PasswordInput.vue';
import { useAuthStore } from '@/stores/authStore';
import Swal from 'sweetalert2';

export default {
  name: 'AuthView',
  components: {
    PasswordInput
  },
  data() {
    return {
      activeMainTab: 'admin',
      activeSubTab: 'signup',

      adminSignupForm: {
        firstname: '',
        lastname: '',
        organisation_name: '',
        organisation_url: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      adminSigninForm: {
        email: '',
        password: ''
      },
      userSignupForm: {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      userSigninForm: {
        email: '',
        password: ''
      },

      showConfirmPassword: false,
      passwordValidation: {
        minLength: false,
        hasUppercase: false,
        hasSpecialChar: false
      },

      loading: false,
      recaptchaReady: false,
      recaptchaWidgetId: null,
      authStore: useAuthStore()
    };
  },

  computed: {
    currentForm() {
      if (this.activeMainTab === 'admin') {
        return this.activeSubTab === 'signup' ? this.adminSignupForm : this.adminSigninForm;
      } else {
        return this.activeSubTab === 'signup' ? this.userSignupForm : this.userSigninForm;
      }
    },

    isSignup() {
      return this.activeSubTab === 'signup';
    },

    isAdmin() {
      return this.activeMainTab === 'admin';
    },

    submitButtonText() {
      return this.isSignup ? 'Signup for vaptfix' : 'Login into vaptfix';
    },

    googleButtonText() {
      return this.isSignup ? 'Signup with Google' : 'Login with Google';
    },

    headingText() {
      return this.isSignup ? 'Get started now' : 'Welcome back!';
    },

    subheadingText() {
      if (this.isSignup) {
        return 'Get started now – Join VaptFix and fix your vulnerabilities today.';
      }
      return 'Login into your account to start fixing.';
    },

    rightImageSrc() {
      try {
        return this.isSignup
          ? require('@/assets/images/signup.jpg')
          : require('@/assets/images/signin.jpg');
      } catch (error) {
        return '';
      }
    },

    googleButtonId() {
      return `googleButton-${this.activeMainTab}-${this.activeSubTab}`;
    },

    recaptchaContainerId() {
      return `recaptcha-${this.activeMainTab}-${this.activeSubTab}`;
    }
  },

  methods: {
    switchMainTab(tab) {
      this.activeMainTab = tab;
      this.$nextTick(() => {
        this.reinitializeGoogleButton();
        this.reinitializeRecaptcha();
      });
    },

    switchSubTab(tab) {
      this.activeSubTab = tab;
      this.$nextTick(() => {
        this.reinitializeGoogleButton();
        this.reinitializeRecaptcha();
      });
    },

    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    updatePasswordValidation(validation) {
      this.passwordValidation = validation;
    },

    // Form validation
    validateForm() {
      const form = this.currentForm;

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        Swal.fire('Error', 'Please enter a valid email', 'error');
        return false;
      }

      // Password validation for signup
      if (this.isSignup) {
        if (!this.passwordValidation.minLength ||
            !this.passwordValidation.hasUppercase ||
            !this.passwordValidation.hasSpecialChar) {
          Swal.fire('Error', 'Password must be at least 8 characters with 1 uppercase and 1 special character', 'error');
          return false;
        }

        if (form.password !== form.confirm_password) {
          Swal.fire('Error', 'Passwords do not match', 'error');
          return false;
        }
      } else {
        // Signin validation
        if (!form.password || form.password.trim() === '') {
          Swal.fire('Error', 'Please enter your password', 'error');
          return false;
        }
      }

      // reCAPTCHA validation (for all forms)
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
        if (!recaptchaResponse) {
          Swal.fire('Error', 'Please verify you are not a robot', 'error');
          return false;
        }
      }

      return true;
    },

    // Submit handler
    async handleSubmit() {
      if (!this.validateForm()) return;

      // If User auth, show coming soon message
      if (!this.isAdmin) {
        Swal.fire({
          icon: 'info',
          title: 'Coming Soon',
          text: 'User authentication will be available soon!',
          confirmButtonColor: '#422CE9'
        });
        return;
      }

      this.loading = true;

      try {
        if (this.isSignup) {
          await this.handleSignup();
        } else {
          await this.handleSignin();
        }
      } catch (error) {
        console.error('Form submission error:', error);
        Swal.fire('Error', error.message || 'Something went wrong', 'error');
      } finally {
        this.loading = false;
      }
    },

    // Signup handler
    async handleSignup() {
      const result = await this.authStore.signup(this.currentForm);

      if (result.status) {
        console.log('✅ Signup successful');
        this.$router.replace('/location');
      } else {
        // Extract error message from nested structure
        let errorMessage = result.message || 'Signup failed';

        // Check for nested errors (e.g., {"errors":{"email":["A user with this email already exists."]}})
        if (result.details && result.details.errors) {
          const errors = result.details.errors;
          // Extract first error message
          const firstErrorKey = Object.keys(errors)[0];
          if (firstErrorKey && Array.isArray(errors[firstErrorKey])) {
            errorMessage = errors[firstErrorKey][0];
          }
        }

        Swal.fire(errorMessage);
        if (window.grecaptcha && this.recaptchaWidgetId !== null) {
          window.grecaptcha.reset(this.recaptchaWidgetId);
        }
      }
    },

    // Signin handler
    async handleSignin() {
      const recaptchaResponse = window.grecaptcha ? window.grecaptcha.getResponse() : '';

      const result = await this.authStore.login({
        email: this.currentForm.email,
        password: this.currentForm.password,
        recaptcha: recaptchaResponse
      });

      if (result.status) {
        console.log('✅ Login successful');
        await this.checkAndRedirect();
      } else {
        Swal.fire('Error', result.message || 'Login failed', 'error');
        if (window.grecaptcha && this.recaptchaWidgetId !== null) {
          window.grecaptcha.reset(this.recaptchaWidgetId);
        }
      }
    },

    // Google OAuth handler
    async handleGoogleResponse(response) {
      try {
        const id_token = response.credential;
        const result = await this.authStore.googleLogin(id_token);

        if (!result.status) {
          Swal.fire('Error', result.message || 'Google login failed', 'error');
          return;
        }

        // Redirect based on user type
        if (this.isAdmin) {
          await this.checkAndRedirect();
        } else {
          // User Google OAuth - redirect to user dashboard
          this.$router.push('/userdashboard');
        }
      } catch (error) {
        console.error('Google login error:', error);
        Swal.fire('Error', 'Something went wrong during Google login', 'error');
      }
    },

    // Check and redirect based on report status
    async checkAndRedirect() {
      const reportId = localStorage.getItem('reportId');

      if (!reportId) {
        this.$router.push('/location');
        return;
      }

      const res = await this.authStore.getUploadReportById(reportId);

      if (res.status && res.data?.upload_report) {
        this.$router.push('/admindashboardonboarding');
      } else {
        this.$router.push('/location');
      }
    },

    // Initialize Google OAuth
    initializeGoogleButton() {
      if (!window.google || !window.google.accounts) return;

      const clientId = '727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com';

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: this.handleGoogleResponse
      });

      const btn = document.getElementById(this.googleButtonId);
      if (btn) {
        window.google.accounts.id.renderButton(btn, {
          theme: 'outline',
          size: 'large',
          text: this.isSignup ? 'signup_with' : 'signin_with',
          shape: 'rectangular'
        });
      }
    },

    reinitializeGoogleButton() {
      this.$nextTick(() => {
        this.initializeGoogleButton();
      });
    },

    // Initialize reCAPTCHA
    initializeRecaptcha() {
      if (!window.grecaptcha || !window.grecaptcha.render) return;

      this.$nextTick(() => {
        const container = document.getElementById(this.recaptchaContainerId);
        if (!container) {
          console.warn('⚠️ reCAPTCHA container not found:', this.recaptchaContainerId);
          return;
        }

        // Clear existing reCAPTCHA if any
        container.innerHTML = '';

        try {
          // Render new reCAPTCHA widget and store the widget ID
          this.recaptchaWidgetId = window.grecaptcha.render(container, {
            sitekey: '6LevYjAsAAAAAH5H0o33_0IvZAbvvOiZ82ZwA8ny'
          });

          this.recaptchaReady = true;
          console.log('✅ reCAPTCHA rendered for:', this.recaptchaContainerId, 'Widget ID:', this.recaptchaWidgetId);
        } catch (error) {
          console.error('❌ reCAPTCHA render error:', error);
        }
      });
    },

    reinitializeRecaptcha() {
      // Reset and destroy previous reCAPTCHA widget if it exists
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        try {
          window.grecaptcha.reset(this.recaptchaWidgetId);
          console.log('🔄 reCAPTCHA reset');
        } catch (e) {
          console.warn('⚠️ reCAPTCHA reset error:', e);
        }
      }

      // Clear widget ID
      this.recaptchaWidgetId = null;

      // Reinitialize with new container
      this.$nextTick(() => {
        this.initializeRecaptcha();
      });
    },

    // Load external scripts
    loadGoogleScript() {
      const googleScript = document.createElement('script');
      googleScript.src = 'https://accounts.google.com/gsi/client';
      googleScript.async = true;
      googleScript.defer = true;

      googleScript.onload = () => {
        this.initializeGoogleButton();
      };

      document.head.appendChild(googleScript);
    },

    loadRecaptchaScript() {
      const recaptchaScript = document.createElement('script');
      recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      recaptchaScript.async = true;
      recaptchaScript.defer = true;

      recaptchaScript.onload = () => {
        this.initializeRecaptcha();
      };

      document.head.appendChild(recaptchaScript);
    }
  },

  mounted() {
    // Load Google and reCAPTCHA scripts
    this.loadGoogleScript();
    this.loadRecaptchaScript();
  },

  beforeUnmount() {
    if (window.grecaptcha && this.recaptchaWidgetId !== null) {
      try {
        window.grecaptcha.reset(this.recaptchaWidgetId);
      } catch (e) {
        console.error('Error resetting reCAPTCHA:', e);
      }
    }
  }
};
</script>

<style scoped>
/* Profile Tabs with Icons */
.main-tabs-container {
  margin-bottom: 0.5rem;
}

.profile-tab {
  text-align: center;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.profile-tab:hover {
  background-color: #f8f9fa;
}

.profile-icon-wrapper {
  margin-bottom: 6px;
  width: 70px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.profile-icon {
  font-size: 32px;
  color: #6c757d;
  transition: all 0.3s ease;
}

.profile-tab.active .profile-icon {
  color: #fff;
}

.profile-tab.active .profile-icon-wrapper {
  background: linear-gradient(135deg, #422CE9, #6C63FF);
  box-shadow: 0 4px 12px rgba(66, 44, 233, 0.3);
}

.profile-tab:not(.active) .profile-icon-wrapper {
  background: #f8f9fa;
}

.profile-label {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #6c757d;
  transition: color 0.3s ease;
}

.profile-tab.active .profile-label {
  color: #422CE9;
}

/* Sub Tabs - Simple underline style */
.sub-tabs {
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 1.5rem !important;
}

.sub-tabs .nav-link {
  border-radius: 0;
  padding: 8px 20px;
  color: #6c757d;
  font-weight: 500;
  border: none;
  border-bottom: 3px solid transparent;
  background-color: transparent;
  transition: all 0.3s ease;
  font-size: 15px;
  position: relative;
  bottom: -2px;
}

.sub-tabs .nav-link.active {
  background: transparent;
  color: #422CE9;
  border-bottom-color: #422CE9;
  font-weight: 600;
}

.sub-tabs .nav-link:hover:not(.active) {
  background-color: transparent;
  color: #422CE9;
  border-bottom-color: #422CE980;
}

/* Password toggle icon */
.position-relative input + i {
  font-size: 1.2rem;
}

/* Form section styling */
.form-section {
  max-width: 600px;
}

/* Image section */
.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .image-section {
    display: none !important;
  }
}
</style>
