<template>
  <div class="signin-page">
    <div class="signin-card">

      <!-- Logo -->
      <div class="text-center mb-4">
        <img src="@/assets/images/logo-capital.png" alt="VaptFix" class="signin-logo" />
      </div>

      <h2 class="signin-title">Welcome back</h2>
      <p class="signin-sub mb-4">Sign in to your VaptFix account</p>

      <form @submit.prevent="handleLogin" autocomplete="off">
        <!-- Email -->
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control signin-input"
            v-model="form.email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-2 position-relative">
          <label class="form-label">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control signin-input"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
          <i
            class="bi password-eye"
            :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
            @click="showPassword = !showPassword"
          ></i>
        </div>

        <div class="text-end mb-3">
          <router-link to="/forgotpassword" class="forgot-link">Forgot password?</router-link>
        </div>

        <!-- reCAPTCHA -->
        <div id="recaptcha-container" class="mb-4 d-flex justify-content-center"></div>

        <button
          type="submit"
          class="btn signin-btn w-100"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Sign In
        </button>
      </form>

      <p class="text-center mt-3 small">
        Don't have an account?
        <router-link to="/signup" class="signup-link">Sign Up</router-link>
      </p>

    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import Swal from 'sweetalert2'

export default {
  name: 'SignInView',
  data() {
    return {
      form: { email: '', password: '' },
      showPassword: false,
      loading: false,
      recaptchaWidgetId: null
    }
  },
  methods: {
    async handleLogin() {
      const recaptchaResponse = window.grecaptcha?.getResponse(this.recaptchaWidgetId)
      if (!recaptchaResponse) {
        Swal.fire('Error', 'Please verify you are not a robot', 'warning')
        return
      }

      this.loading = true
      try {
        const authStore = useAuthStore()
        const result = await authStore.login({
          email: this.form.email,
          password: this.form.password,
          recaptcha: recaptchaResponse,
        })

        if (result.status) {
          await this.checkAndRedirect()
        } else {
          Swal.fire('Error', result.message || 'Login failed', 'error')
          this.form.password = ''
          window.grecaptcha?.reset(this.recaptchaWidgetId)
        }
      } catch (err) {
        Swal.fire('Error', 'Login request failed. Please try again.', 'error')
        this.form.password = ''
        window.grecaptcha?.reset(this.recaptchaWidgetId)
      } finally {
        this.loading = false
      }
    },

    async handleGoogleResponse(response) {
      try {
        const authStore = useAuthStore()
        const result = await authStore.googleLogin(response.credential)
        if (!result.status) {
          Swal.fire('Error', result.message || 'Google login failed', 'error')
          return
        }
        await this.checkAndRedirect()
      } catch (error) {
        Swal.fire('Error', 'Something went wrong during Google login', 'error')
      }
    },

    checkAndRedirect() {
      this.$router.push('/scoping-form-2')
    }
  },

  mounted() {
    const googleScript = document.createElement('script')
    googleScript.src = 'https://accounts.google.com/gsi/client'
    googleScript.async = true
    googleScript.defer = true
    googleScript.onload = () => {
      google.accounts.id.initialize({
        client_id: '727499952932-0v6984jl4eg37ak60d4851vkbkf0itb7.apps.googleusercontent.com',
        callback: this.handleGoogleResponse,
      })
    }
    googleScript.onerror = () => {
      console.error('Failed to load Google Sign-In script')
    }
    document.head.appendChild(googleScript)

    const recaptchaScript = document.createElement('script')
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    recaptchaScript.async = true
    recaptchaScript.defer = true
    recaptchaScript.onload = () => {
      window.grecaptcha.ready(() => {
        const el = document.getElementById('recaptcha-container')
        if (!el) return
        this.recaptchaWidgetId = window.grecaptcha.render(el, {
          sitekey: '6LevYjAsAAAAAH5H0o33_0IvZAbvvOiZ82ZwA8ny',
        })
      })
    }
    recaptchaScript.onerror = () => {
      console.error('Failed to load reCAPTCHA script')
    }
    document.head.appendChild(recaptchaScript)
  },

  beforeUnmount() {
    try {
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        window.grecaptcha.reset(this.recaptchaWidgetId)
      }
    } catch (e) {}
  }
}
</script>

<style scoped>
.signin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0f2d47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.signin-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 36px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.signin-logo {
  height: 36px;
}

.signin-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
}

.signin-sub {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.signin-input {
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  font-size: 14px;
  padding: 10px 14px;
  transition: border-color 0.2s;
}

.signin-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
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

.signin-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 11px;
  transition: opacity 0.2s, transform 0.1s;
}

.signin-btn:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
}

.signin-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.signup-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>
