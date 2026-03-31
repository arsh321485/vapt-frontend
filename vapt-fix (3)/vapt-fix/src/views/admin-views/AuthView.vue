<template>
  <div class="auth-page">
    <div class="auth-card">

      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="@/assets/images/logo-capital.png" alt="VaptFix" class="auth-logo" />
      </div>

      <!-- SET PASSWORD MODE -->
      <template v-if="currentMode === 'set-password'">
        <h2 class="auth-title">Set Your Password</h2>
        <p class="auth-sub mb-4">Create a secure password for your VaptFix account</p>

        <form @submit.prevent="handleSubmit" autocomplete="off">
          <input type="text" style="display:none" aria-hidden="true" />
          <input type="password" style="display:none" aria-hidden="true" />

          <!-- New Password -->
          <div class="mb-3 position-relative">
            <label class="form-label">New Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control auth-input"
              placeholder="Enter new password"
              v-model="formData.password"
              @input="validatePassword"
              autocomplete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              required
            />
            <i
              class="bi password-eye"
              :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
              @click="showPassword = !showPassword"
            ></i>
          </div>

          <!-- Password Rules -->
          <ul v-if="showPasswordRules && !allRulesValid" class="password-rules mb-3">
            <li :class="{ valid: rules.minLength }">At least 8 characters</li>
            <li :class="{ valid: rules.uppercase }">At least 1 uppercase letter</li>
            <li :class="{ valid: rules.special }">At least 1 special character</li>
          </ul>

          <!-- Confirm Password -->
          <div class="mb-4 position-relative">
            <label class="form-label">Confirm Password</label>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-control auth-input"
              placeholder="Confirm your password"
              v-model="formData.confirm_password"
              autocomplete="off"
              readonly
              onfocus="this.removeAttribute('readonly');"
              required
            />
            <i
              class="bi password-eye"
              :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"
              @click="showConfirmPassword = !showConfirmPassword"
            ></i>
          </div>

          <button type="submit" class="btn auth-btn w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Setting Password...' : 'Set Password' }}
          </button>
        </form>

        <p class="text-center mt-3 small">
          Already have an account?
          <a href="#" @click.prevent="switchMode('signin')" class="auth-link">Sign In</a>
        </p>
      </template>

      <!-- SIGN IN MODE -->
      <template v-else>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub mb-4">Sign in to your VaptFix account</p>

        <form :key="formKey" @submit.prevent="handleSubmit" autocomplete="off">
          <input type="text" style="display:none" aria-hidden="true" />
          <input type="password" style="display:none" aria-hidden="true" />

          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input
              type="email"
              class="form-control auth-input"
              placeholder="Enter your email"
              v-model="formData.email"
              autocomplete="off"
              :name="'email_' + formKey"
              readonly
              onfocus="this.removeAttribute('readonly');"
              required
            />
          </div>

          <!-- Password -->
          <div class="mb-2 position-relative">
            <label class="form-label">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control auth-input"
              placeholder="Enter your password"
              v-model="formData.password"
              autocomplete="off"
              :name="'password_' + formKey"
              readonly
              onfocus="this.removeAttribute('readonly');"
              required
            />
            <i
              class="bi password-eye"
              :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
              @click="showPassword = !showPassword"
            ></i>
          </div>

          <div class="text-end mb-3">
            <a href="#" @click.prevent="openForgotPasswordModal" class="forgot-link">Forgot password?</a>
          </div>

          <!-- reCAPTCHA -->
          <div :id="recaptchaContainerId" :key="recaptchaKey" class="mb-4 d-flex justify-content-center"></div>

          <button type="submit" class="btn auth-btn w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </template>

    </div>
  </div>

  <!-- FORGOT PASSWORD MODAL -->
  <div v-if="showForgotPasswordModal" class="fp-backdrop" @click="closeForgotPasswordModal">
    <div class="fp-modal" @click.stop>
      <div class="fp-modal-header">
        <h5 class="fp-modal-title">Reset Password</h5>
        <button class="fp-close" @click="closeForgotPasswordModal">&times;</button>
      </div>
      <div class="fp-modal-body">
        <p class="fp-desc">Enter your registered email address and we'll send you a reset link.</p>
        <form @submit.prevent="handleForgotPassword">
          <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input
              type="email"
              class="form-control auth-input"
              placeholder="name@work.com"
              v-model="forgotEmail"
              autocomplete="off"
              required
            />
          </div>
          <button type="submit" class="btn auth-btn w-100" :disabled="forgotLoading">
            <span v-if="forgotLoading" class="spinner-border spinner-border-sm me-2"></span>
            {{ forgotLoading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import Swal from 'sweetalert2';

export default {
  name: "AuthView",
  data() {
    return {
      currentMode: "set-password",
      formData: { email: "", password: "", confirm_password: "" },
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      formKey: Date.now(),
      showPasswordRules: false,
      rules: { minLength: false, uppercase: false, special: false },
      showForgotPasswordModal: false,
      forgotEmail: "",
      forgotLoading: false,
      uidb64: "",
      token: "",
      recaptchaWidgetId: null,
      recaptchaKey: 0,
      recaptchaSiteKey: "6LevYjAsAAAAAH5H0o33_0IvZAbvvOiZ82ZwA8ny",
      authStore: null,
    };
  },
  computed: {
    recaptchaContainerId() {
      return `recaptcha-auth-${this.recaptchaKey}`;
    },
    allRulesValid() {
      return this.rules.minLength && this.rules.uppercase && this.rules.special;
    },
  },
  methods: {
    switchMode(mode) {
      this.currentMode = mode;
      this.formData = { email: "", password: "", confirm_password: "" };
      this.showPassword = false;
      this.showConfirmPassword = false;
      this.showPasswordRules = false;
      this.rules = { minLength: false, uppercase: false, special: false };
      this.formKey = Date.now();
      this.$router.replace({ path: '/auth', query: { mode } });
      if (mode === 'signin') {
        this.$nextTick(() => { this.reinitializeRecaptcha(); });
      }
    },
    validatePassword() {
      const pwd = this.formData.password;
      this.showPasswordRules = pwd.length > 0;
      this.rules.minLength = pwd.length >= 8;
      this.rules.uppercase = /[A-Z]/.test(pwd);
      this.rules.special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    },
    validateForm() {
      if (!this.formData.password || this.formData.password.trim() === '') {
        Swal.fire('Error', 'Please enter a password', 'error');
        return false;
      }
      if (this.currentMode === 'set-password') {
        if (!this.allRulesValid) {
          Swal.fire('Error', 'Password must be at least 8 characters, include one uppercase letter and one special character.', 'error');
          return false;
        }
        if (this.formData.password !== this.formData.confirm_password) {
          Swal.fire('Error', 'Passwords do not match', 'error');
          return false;
        }
      }
      if (this.currentMode === 'signin') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.email)) {
          Swal.fire('Error', 'Please enter a valid email', 'error');
          return false;
        }
        if (!window.grecaptcha || this.recaptchaWidgetId === null) {
          Swal.fire('Error', 'Security check not loaded. Please wait and try again.', 'error');
          return false;
        }
        const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
        if (!recaptchaResponse) {
          Swal.fire('Error', 'Please verify you are not a robot', 'error');
          return false;
        }
      }
      return true;
    },
    async handleSubmit() {
      if (!this.validateForm()) return;
      if (this.currentMode === 'set-password') {
        await this.handleSetPassword();
      } else {
        const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
        await this.handleSignin(recaptchaResponse);
      }
    },
    async handleSetPassword() {
      if (!this.uidb64 || !this.token) {
        Swal.fire('Error', 'Invalid or missing reset link. Please use the link sent to your email.', 'error');
        return;
      }
      this.loading = true;
      try {
        const result = await this.authStore.userSetPasswordWithToken({
          uidb64: this.uidb64,
          token: this.token,
          password: this.formData.password,
          confirm_password: this.formData.confirm_password,
        });
        if (result.status) {
          const emailFromResponse = result.data?.email || result.data?.user?.email || "";
          await Swal.fire({
            icon: 'success',
            title: 'Password Set!',
            text: result.message || 'Your password has been set successfully. Please sign in.',
            timer: 2000,
            showConfirmButton: false
          });
          this.switchMode('signin');
          if (emailFromResponse) {
            this.$nextTick(() => { this.formData.email = emailFromResponse; });
          }
        } else {
          Swal.fire('Error', result.message || 'Failed to set password.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
      } finally {
        this.loading = false;
      }
    },
    async handleSignin(recaptchaResponse) {
      this.loading = true;
      try {
        const result = await this.authStore.userLogin({
          email: this.formData.email,
          password: this.formData.password,
          recaptcha: recaptchaResponse,
        });
        if (result.status) {
          await Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: result.message || 'Welcome!',
            timer: 1500,
            showConfirmButton: false
          });
          this.$router.push('/userdashboard');
        } else {
          Swal.fire('Login Failed', result.message || 'Invalid credentials', 'error');
          this.resetRecaptcha();
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        this.resetRecaptcha();
      } finally {
        this.loading = false;
      }
    },
    openForgotPasswordModal() {
      this.showForgotPasswordModal = true;
      this.forgotEmail = "";
    },
    closeForgotPasswordModal() {
      this.showForgotPasswordModal = false;
      this.forgotEmail = "";
      this.forgotLoading = false;
    },
    async handleForgotPassword() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.forgotEmail)) {
        Swal.fire({ icon: 'error', title: 'Invalid Email', text: 'Please enter a valid email address', confirmButtonColor: '#4f46e5' });
        return;
      }
      this.forgotLoading = true;
      try {
        const response = await this.authStore.userForgotPassword({ email: this.forgotEmail });
        if (response.status) {
          this.closeForgotPasswordModal();
          await Swal.fire({ icon: 'success', title: 'Reset Link Sent!', text: 'Check your email for the password reset link.', timer: 3000, showConfirmButton: false });
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: response.message || 'Something went wrong!', confirmButtonColor: '#4f46e5' });
        }
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to send reset link. Please try again.', confirmButtonColor: '#4f46e5' });
      } finally {
        this.forgotLoading = false;
      }
    },
    loadRecaptchaScript() {
      if (window.grecaptcha && window.grecaptcha.render) {
        this.initializeRecaptcha();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      window.onRecaptchaLoad = () => { this.initializeRecaptcha(); };
      document.head.appendChild(script);
    },
    initializeRecaptcha() {
      if (!window.grecaptcha) return;
      window.grecaptcha.ready(() => {
        this.$nextTick(() => {
          const container = document.getElementById(this.recaptchaContainerId);
          if (!container) return;
          container.innerHTML = '';
          try {
            this.recaptchaWidgetId = window.grecaptcha.render(container, {
              sitekey: this.recaptchaSiteKey,
            });
          } catch (error) {
            console.error('reCAPTCHA render error:', error);
          }
        });
      });
    },
    reinitializeRecaptcha() {
      this.recaptchaKey++;
      this.recaptchaWidgetId = null;
      this.$nextTick(() => { this.initializeRecaptcha(); });
    },
    resetRecaptcha() {
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        try { window.grecaptcha.reset(this.recaptchaWidgetId); } catch (e) {}
      }
    },
  },
  mounted() {
    this.authStore = useAuthStore();
    const mode = this.$route.query.mode;
    if (mode === 'signin' || mode === 'set-password') {
      this.currentMode = mode;
    }
    this.uidb64 = this.$route.query.uid || this.$route.query.uidb64 || "";
    this.token = this.$route.query.token || "";
    if (this.currentMode === 'signin') {
      this.loadRecaptchaScript();
    }
    if (!this.$route.query.mode) {
      this.$router.replace({ path: '/auth', query: { mode: this.currentMode } });
    }
  },
  beforeUnmount() {
    if (window.grecaptcha && this.recaptchaWidgetId !== null) {
      try { window.grecaptcha.reset(this.recaptchaWidgetId); } catch (e) {}
    }
    if (window.onRecaptchaLoad) { delete window.onRecaptchaLoad; }
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0f2d47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-logo {
  height: 36px;
}

.auth-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.auth-sub {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.auth-input {
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  font-size: 14px;
  padding: 10px 14px;
  padding-right: 42px;
  transition: border-color 0.2s;
}

.auth-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  outline: none;
}

.password-eye {
  position: absolute;
  right: 14px;
  top: 38px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.35);
  font-size: 16px;
  transition: color 0.2s;
}

.password-eye:hover {
  color: #4f46e5;
}

.forgot-link {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.password-rules {
  list-style: none;
  padding-left: 0;
  font-size: 13px;
  margin-top: -8px;
}

.password-rules li { color: #dc3545; }
.password-rules li.valid { color: #28a745; }

.auth-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 11px;
  transition: opacity 0.2s, transform 0.1s;
}

.auth-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
  color: #fff;
}

.auth-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.auth-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover { text-decoration: underline; }

/* FORGOT PASSWORD MODAL */
.fp-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.fp-modal {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 400px;
  padding: 28px 28px 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
}

.fp-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.fp-modal-title {
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.fp-close {
  background: none;
  border: none;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  line-height: 1;
}

.fp-close:hover { color: #0f172a; }

.fp-desc {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 16px;
}
</style>
