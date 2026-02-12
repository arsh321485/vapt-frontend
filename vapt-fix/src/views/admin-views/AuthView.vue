<template>
  <main>
    <div class="container-fluid min-vh-100">
      <div class="row min-vh-100">
        <div class="col-xl-5 col-lg-12 col-md-12 col-12 form-section">

          <!-- LOGO (FIXED POSITION) -->
          <div class="logo-wrapper">
            <img src="@/assets/images/vaptfix_white.png" height="28">
          </div>

          <div class="form-area text-white">
            <div class="form-wrapper w-75 pt-4">

              <!-- MAIN TABS -->
              <div class="main-tabs">
                <div class="main-tab" :class="{ active: currentRole === 'admin' }" @click="switchRole('admin')">
                  <i class="bi bi-person-square me-1"></i> Admin
                </div>
                <div class="main-tab" :class="{ active: currentRole === 'user' }" @click="switchRole('user')">
                  <i class="bi bi-people me-1"></i> User
                </div>
              </div>

              <!-- SUB TABS -->
              <div class="sub-tabs">
                <div class="sub-tab" :class="{ active: currentMode === 'signup' }" @click="switchMode('signup')"
                  v-if="currentRole === 'admin'">
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

                <!-- EMAIL (Hidden for User when OTP is sent) -->
                <div class="mb-2"
                  v-if="(currentRole === 'admin' && !adminOtpSent) || (currentRole === 'user' && !otpSent)">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control custom-input" placeholder="name@work.com"
                    v-model="formData.email" autocomplete="off" autocorrect="off" autocapitalize="off"
                    spellcheck="false" :name="'email_' + formKey" readonly onfocus="this.removeAttribute('readonly');"
                    required />
                </div>

                <!-- OTP FIELD (Only for User when OTP is sent) -->
                <div class="mb-3" v-if="currentRole === 'user' && otpSent">
                  <label class="form-label">Enter OTP</label>
                  <div class="otp-inputs d-flex justify-content-between gap-2">
                    <input v-for="(digit, index) in 6" :key="index" type="text" class="form-control otp-box text-center"
                      maxlength="1" v-model="otpDigits[index]" @input="handleOtpInput($event, index)"
                      @keydown="handleOtpKeydown($event, index)" @paste="handleOtpPaste($event, index)"
                      :ref="el => otpRefs[index] = el" autocomplete="off" required />
                  </div>
                  <small class="text-light d-block mt-2">OTP has been sent to your email</small>
                </div>

                <!-- ADMIN OTP FIELD (Signup only - TEMP) -->
                <div class="mb-3" v-if="currentRole === 'admin' && currentMode === 'signup' && adminOtpSent">
                  <label class="form-label">Enter OTP</label>
                  <div class="otp-inputs d-flex justify-content-between gap-2">
                    <input v-for="(digit, index) in 6" :key="index" type="text" class="form-control otp-box text-center"
                      maxlength="1" v-model="otpDigits[index]" @input="handleOtpInput($event, index)"
                      @keydown="handleOtpKeydown($event, index)" @paste="handleOtpPaste($event, index)"
                      :ref="el => otpRefs[index] = el" autocomplete="off" required />
                  </div>
                  <small class="text-light d-block mt-2">
                    OTP has been sent to your email
                  </small>
                </div>

                <!-- PASSWORD (Hidden for User role) -->
                <div class="mb-2 password-field" v-if="currentRole === 'admin' && !adminOtpSent">
                  <label class="form-label">Password</label>
                  <div class="position-relative">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Password" v-model="formData.password" @input="validatePassword" autocomplete="off"
                      autocorrect="off" autocapitalize="off" spellcheck="false" :name="'password_' + formKey" readonly
                      onfocus="this.removeAttribute('readonly');" required />

                    <span class="password-toggle" @click="showPassword = !showPassword">
                      <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    </span>
                  </div>
                </div>



                <!-- TESTING BOX DROPDOWN (Signin only, Admin only) -->

                <ul v-if="showPasswordRules && currentRole === 'admin' && !adminOtpSent && !allRulesValid"
                  class="password-rules mt-2 mb-1">
                  <li :class="{ valid: rules.minLength }">At least 8 characters</li>
                  <li :class="{ valid: rules.uppercase }">At least 1 uppercase letter</li>
                  <li :class="{ valid: rules.special }">At least 1 special character</li>
                </ul>

                <!-- CONFIRM PASSWORD (Signup only, Admin only) -->
                <div class="mb-2 password-confirm"
                  v-if="currentMode === 'signup' && currentRole === 'admin' && !adminOtpSent">
                  <label class="form-label">Confirm Password</label>
                  <div class="position-relative">
                    <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control custom-input"
                      placeholder="Confirm Password" v-model="formData.confirm_password" autocomplete="off"
                      :name="'confirm-password-' + formKey" readonly onfocus="this.removeAttribute('readonly');"
                      required />
                    <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                      <i :class="showConfirmPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                    </span>
                  </div>
                </div>

                <!-- TESTING BOX DROPDOWN -->
               <!-- TESTING BOX DROPDOWN -->
<!-- <div
  class="mb-1"
  v-if="currentMode === 'signin' && currentRole === 'admin'"
  ref="testingBoxDropdown"
>
  <label class="form-label">Testing Type</label>

  <div class="position-relative">
    
    <div
  class="form-control custom-input dropdown-trigger"
  @click="isTestingBoxOpen = !isTestingBoxOpen"
>
      <span class="dropdown-text">
        {{
          selectedTestingBox.length
            ? selectedTestingBox
                .map(v => testingBoxOptions.find(o => o.value === v)?.label)
                .join(', ')
            : 'Select testing type'
        }}
      </span>

      <i
        :class="isTestingBoxOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
        class="dropdown-icon"
      ></i>
    </div>

    <div v-if="isTestingBoxOpen" class="testing-dropdown-list">
      <label
        v-for="option in testingBoxOptions"
        :key="option.value"
        class="dropdown-option"
        :class="{ disabled: isPreviouslySelected(option.value) }"
      >
        <input
  type="checkbox"
  :value="option.value"
  v-model="selectedTestingBox" :disabled="isPreviouslySelected(option.value)"
/>
        {{ option.label }}
      </label>
    </div>
  </div>
</div> -->

                <!-- FORGOT PASSWORD (Signin only, Admin only) -->
                <div class="text-end mb-2" v-if="currentMode === 'signin' && currentRole === 'admin'">
                  <a href="#" @click.prevent="openForgotPasswordModal" class="forgot-link">
                    Forgot Password?
                  </a>
                </div>

                <!-- reCAPTCHA (Admin only) -->
                <div class="mb-2 d-flex justify-content-center" v-if="(currentRole === 'admin' && !adminOtpSent) ||
                  (currentRole === 'user' && currentMode === 'signin' && !otpSent)">
                  <div :id="recaptchaContainerId" :key="recaptchaKey"></div>
                </div>

                <!-- SUBMIT -->
                <button type="submit" class="btn signup-btn w-100 mb-2" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ submitButtonText }}
                </button>


              </form>

            </div>
          </div>

        </div>

        <!-- RIGHT SECTION -->
        <div
          class="col-xl-7 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center info-section p-5">

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

    <!-- FORGOT PASSWORD MODAL -->
    <div v-if="showForgotPasswordModal" class="modal-backdrop" @click="closeForgotPasswordModal">
      <div class="forgot-modal" @click.stop>
        <div class="forgot-modal-header">
          <h4>Reset Password</h4>
          <button class="modal-close" @click="closeForgotPasswordModal">&times;</button>
        </div>
        <div class="forgot-modal-body">
          <p class="text-light mb-3">Enter your registered email address and we'll send you a reset link.</p>
          <form @submit.prevent="handleForgotPassword">
            <div class="mb-3">
              <label class="form-label text-light">Email</label>
              <input type="email" class="form-control custom-input" placeholder="name@work.com" v-model="forgotEmail"
                autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" required />
            </div>
            <button type="submit" class="btn signup-btn w-100" :disabled="forgotLoading">
              <span v-if="forgotLoading" class="spinner-border spinner-border-sm me-2"></span>
              {{ forgotLoading ? "Sending..." : "Send Reset Link" }}
            </button>
          </form>
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
      formKey: Date.now(),
      adminOtpSent: false,
      otpSent: false,
      otp: "",
      otpDigits: ['', '', '', '', '', ''],
      otpRefs: [],
      currentSlide: 0,
      sliderInterval: null,
      showPasswordRules: false,
      rules: {
        minLength: false,
        uppercase: false,
        special: false
      },
      showForgotPasswordModal: false,
      forgotEmail: "",
      forgotLoading: false,
      
    };
  },
  watch: {
    "formData.email": {
      handler(email) {
        if (
          this.currentRole !== "admin" ||
          this.currentMode !== "signin"
        ) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return;

        clearTimeout(this._emailTimer);
        this._emailTimer = setTimeout(() => {
          this.restoreTestingTypesByEmail(email);
        }, 400);
      }
    }
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
      // User role OTP flow
      if (this.currentRole === 'user') {
        return this.otpSent ? "Sign In" : "Send OTP";
      }

      // ADMIN SIGNUP TEMP OTP FLOW
      if (this.currentRole === 'admin' && this.currentMode === 'signup') {
        return this.adminOtpSent ? "Sign Up" : "Send OTP";
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
    },
    allRulesValid() {
      return this.rules.minLength && this.rules.uppercase && this.rules.special;
    }
  },
  methods: {

    restoreTestingTypesByEmail(email) {
  try {
    const saved = localStorage.getItem(`testing_types_${email}`);

    if (!saved) {
      // First-time login → allow selection
      this.previouslySelectedTestingBox = [];
      this.selectedTestingBox = [];
      return;
    }

    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed) && parsed.length) {
      this.previouslySelectedTestingBox = parsed;
      this.selectedTestingBox = [...parsed]; // ✅ auto-select
      this.isTestingBoxOpen = false;
    }
  } catch (err) {
    console.error("Failed to restore testing types", err);
    this.previouslySelectedTestingBox = [];
    this.selectedTestingBox = [];
  }
},

    async fetchPreviousTestingTypesSafely(email) {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔒 No previous login on this browser
    if (!storedUser?.id || storedUser.email !== email) {
      this.previouslySelectedTestingBox = [];
      return;
    }

    const res = await this.authStore.getAdminTestingTypes(storedUser.id);

    if (res.status && Array.isArray(res.testingTypes)) {
      this.previouslySelectedTestingBox = res.testingTypes;

      // ✅ Auto-select previous testing types
      this.selectedTestingBox = [...res.testingTypes];
    }
  } catch (err) {
    console.error("Failed to fetch previous testing types", err);
    this.previouslySelectedTestingBox = [];
  }
},

    async checkScopeAndRedirect() {
  const testingType = this.selectedTestingBox[0]; // white_box / grey_box / black_box

  const res = await this.authStore.getScopeTargets(testingType);

  if (
    res.status &&
    res.data &&
    (
      (Array.isArray(res.data.data) && res.data.data.length > 0) ||
      res.data.count > 0
    )
  ) {
    // ✅ IP / URL exists
    this.$router.push("/admindashboardonboarding");
  } else {
    // ❌ No targets uploaded
    this.$router.push("/location");
  }
},
hasUploadedTargets(email) {
  const saved = localStorage.getItem(`targets_${email}`);
  if (!saved) return false;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed.targets)
      ? parsed.targets.length > 0
      : parsed.count > 0;
  } catch {
    return false;
  }
},



  
    isPreviouslySelected(type) {
      return this.previouslySelectedTestingBox.includes(type);
    },
    async fetchPreviousTestingTypes() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // 🔒 No previous login on this browser
  if (!storedUser?.id || !storedUser?.email) {
    this.previouslySelectedTestingBox = [];
    return;
  }

  // 🔐 IMPORTANT: email must match
  if (storedUser.email !== this.formData.email) {
    this.previouslySelectedTestingBox = [];
    return;
  }

  const res = await this.authStore.getAdminTestingTypes(storedUser.id);

  if (res.status && Array.isArray(res.testingTypes)) {
    this.previouslySelectedTestingBox = res.testingTypes;

    // ✅ Auto-select previous testing types
    this.selectedTestingBox = [...res.testingTypes];
  }
},
    switchRole(role) {
      this.currentRole = role;

      // Auto-select Sign In for User role
      if (role === 'user') {
        this.currentMode = 'signin';
        this.otpSent = false;
        this.otp = '';
      }

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
        confirm_password: "",
      };
      this.showPassword = false;
      this.showConfirmPassword = false;
      this.otpSent = false;
      this.adminOtpSent = false;
      this.otp = "";
      this.otpDigits = ['', '', '', '', '', ''];
      this.selectedTestingBox = [];
      this.isTestingBoxOpen = false;
    },
    clearAutofill() {
      requestAnimationFrame(() => {
        this.formData.email = "";
        this.formData.password = "";
        this.formData.confirm_password = "";
      });
    },
    handleOtpInput(event, index) {
      const value = event.target.value;

      // Only allow digits
      if (!/^\d*$/.test(value)) {
        this.otpDigits[index] = '';
        return;
      }

      // Update the digit
      this.otpDigits[index] = value;

      // Combine all digits into otp string
      this.otp = this.otpDigits.join('');

      // Auto-focus next input if digit entered
      if (value && index < 5) {
        this.otpRefs[index + 1]?.focus();
      }
    },
    handleOtpKeydown(event, index) {
      // Handle backspace
      if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
        this.otpRefs[index - 1]?.focus();
      }

      // Handle arrow keys
      if (event.key === 'ArrowLeft' && index > 0) {
        this.otpRefs[index - 1]?.focus();
      }
      if (event.key === 'ArrowRight' && index < 5) {
        this.otpRefs[index + 1]?.focus();
      }
    },
    handleOtpPaste(event, index) {
      event.preventDefault();

      // Get pasted text
      const pastedText = (event.clipboardData || window.clipboardData).getData('text');

      // Extract only digits
      const digits = pastedText.replace(/\D/g, '').slice(0, 6);

      if (digits.length === 0) return;

      // Fill OTP boxes starting from current index
      for (let i = 0; i < digits.length && (index + i) < 6; i++) {
        this.otpDigits[index + i] = digits[i];
      }

      // If pasting from first box, fill all available digits
      if (index === 0 && digits.length <= 6) {
        for (let i = 0; i < digits.length; i++) {
          this.otpDigits[i] = digits[i];
        }
      }

      // Combine all digits into otp string
      this.otp = this.otpDigits.join('');

      // Focus on the next empty box or last box
      const nextIndex = Math.min(index + digits.length, 5);
      this.otpRefs[nextIndex]?.focus();
    },
    closeTestingBoxOnOutside(e) {
      const dropdown = this.$refs.testingBoxDropdown;
      if (dropdown && !dropdown.contains(e.target)) {
        this.isTestingBoxOpen = false;
      }
    },
    validateForm() {

      /* ================= USER ROLE ================= */
      if (this.currentRole === 'user') {

        // STEP 1: Email validation (Before sending OTP)
        if (!this.otpSent) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(this.formData.email)) {
            Swal.fire('Error', 'Please enter a valid email', 'error');
            return false;
          }

          // ✅ reCAPTCHA validation (User → Sign In → Send OTP)
          if (window.grecaptcha && this.recaptchaWidgetId !== null) {
            const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
            if (!recaptchaResponse) {
              Swal.fire('Error', 'Please verify you are not a robot', 'error');
              return false;
            }
          }

          return true;
        }

        // STEP 2: OTP validation (After OTP is sent)
        if (!this.otp || this.otp.trim() === '') {
          Swal.fire('Error', 'Please enter the OTP', 'error');
          return false;
        }

        return true;
      }

      /* ================= ADMIN ROLE ================= */

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        Swal.fire('Error', 'Please enter a valid email', 'error');
        return false;
      }

      // Password validation (Signup)
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
        // Sign In validation
        if (!this.formData.password || this.formData.password.trim() === '') {
          Swal.fire('Error', 'Please enter your password', 'error');
          return false;
        }
      }

      // ✅ reCAPTCHA validation (Admin Sign In & Sign Up)
      if (window.grecaptcha && this.recaptchaWidgetId !== null) {
        const recaptchaResponse = window.grecaptcha.getResponse(this.recaptchaWidgetId);
        if (!recaptchaResponse) {
          Swal.fire('Error', 'Please verify you are not a robot', 'error');
          return false;
        }
      }

      return true;
    },
    async handleSubmit() {
      // if (!this.validateForm()) return;
      if (
        !(this.currentRole === 'admin' &&
          this.currentMode === 'signup' &&
          this.adminOtpSent)
      ) {
        if (!this.validateForm()) return;
      }

      /* ================= USER ROLE (OTP FLOW) ================= */
      if (this.currentRole === 'user') {
        if (!this.otpSent) {
          Swal.fire({
            icon: 'success',
            title: 'OTP Sent',
            text: `OTP has been sent to ${this.formData.email}`,
            timer: 2000,
            showConfirmButton: false
          });
          this.otpSent = true;
          this.resetRecaptcha();
          return;
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Sign in successful!',
              confirmButtonColor: '#5a44ff',
              timer: 1500,
              showConfirmButton: false
            });

            setTimeout(() => {
              this.$router.push('/userdashboard');
            }, 1500);
          }, 500);
          return;
        }
      }

      /* ================= ADMIN SIGNUP OTP FLOW ================= */
      if (
        this.currentRole === 'admin' &&
        this.currentMode === 'signup'
      ) {
        // STEP 2: VERIFY OTP (if OTP already sent)
        if (this.adminOtpSent) {
          if (!this.otp || this.otp.length !== 6) {
            Swal.fire({
              icon: 'error',
              title: 'Invalid OTP',
              text: 'Please enter a valid 6-digit OTP',
              timer: 3000,
              showConfirmButton: false
            });
            return;
          }

          this.loading = true;

          try {
            const result = await this.authStore.signupVerifyOtp({
              email: this.formData.email,
              otp: this.otp
            });

            if (result.status) {
              const userEmail = this.formData.email;

              await Swal.fire({
                icon: 'success',
                title: 'Account Created!',
                text: 'Your account has been created. Please sign in to continue.',
                timer: 2000,
                showConfirmButton: false
              });

              // Switch to signin tab instead of redirecting
              this.currentMode = 'signin';
              this.adminOtpSent = false;
              this.otpDigits = ['', '', '', '', '', ''];
              this.otp = '';
              this.formData.password = '';
              this.formData.confirm_password = '';
              // Keep email pre-filled for convenience
              this.formData.email = userEmail;

              // Reinitialize reCAPTCHA for signin
              this.$nextTick(() => {
                this.reinitializeRecaptcha();
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                text: result.message || 'Invalid OTP. Please try again.',
                timer: 3000,
                showConfirmButton: false
              });
            }
          } catch (error) {
            console.error('OTP verification error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong. Please try again.',
              timer: 3000,
              showConfirmButton: false
            });
          } finally {
            this.loading = false;
          }

          return;
        }

        // STEP 1: SEND OTP (Password validation first)
        if (
          !this.rules.minLength ||
          !this.rules.uppercase ||
          !this.rules.special
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text: 'Password must be at least 8 characters long, include one uppercase letter and one special character.',
            timer: 4000,
            showConfirmButton: false
          });
          return;
        }

        if (this.formData.password !== this.formData.confirm_password) {
          Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'Password and Confirm Password do not match.',
            timer: 3000,
            showConfirmButton: false
          });
          return;
        }

        // Get reCAPTCHA response
        const recaptchaResponse = window.grecaptcha
          ? window.grecaptcha.getResponse(this.recaptchaWidgetId)
          : "";

        if (!recaptchaResponse) {
          Swal.fire({
            icon: 'error',
            title: 'reCAPTCHA Required',
            text: 'Please complete the reCAPTCHA verification.',
            timer: 3000,
            showConfirmButton: false
          });
          return;
        }

        this.loading = true;

        try {
          const result = await this.authStore.signupSendOtp({
            email: this.formData.email,
            password: this.formData.password,
            confirm_password: this.formData.confirm_password,
            recaptcha: recaptchaResponse
          });

          if (result.status) {
            Swal.fire({
              icon: 'success',
              title: 'OTP Sent!',
              text: result.message || `OTP has been sent to ${this.formData.email}`,
              timer: 2500,
              showConfirmButton: false
            });

            this.adminOtpSent = true;
            this.resetRecaptcha();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed to Send OTP',
              text: result.message || 'Something went wrong. Please try again.',
              timer: 3000,
              showConfirmButton: false
            });
            this.resetRecaptcha();
          }
        } catch (error) {
          console.error('Send OTP error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again.',
            timer: 3000,
            showConfirmButton: false
          });
          this.resetRecaptcha();
        } finally {
          this.loading = false;
        }

        return;
      }

      /* ================= ADMIN SIGN IN / OLD FLOW ================= */

      this.loading = true;

      try {
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Something went wrong',
          timer: 3000,
          showConfirmButton: false
        });
      } finally {
        this.loading = false;
      }
    },
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

        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorMessage,
          timer: 3000,
          showConfirmButton: false
        });
        this.resetRecaptcha();
      }
    },



async handleSignin(recaptchaResponse) {
  this.loading = true;

  try {
    /* ===============================
       🔐 LOGIN
       =============================== */

    const payload = {
      email: this.formData.email,
      password: this.formData.password,
      recaptcha: recaptchaResponse,
    };

    const result = await this.authStore.login(payload);

    if (!result.status) {
      Swal.fire(
        "Login Failed",
        result.message || "Invalid credentials",
        "error"
      );
      return;
    }

    /* ===============================
       ✅ SAVE USER
       =============================== */

    const user = result.data?.user;

    if (!user) {
      Swal.fire("Error", "User data not found", "error");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    /* ===============================
       🔀 PROJECT NAME CHECK (KEY LOGIC)
       =============================== */

    const adminId = user.id; // 🔴 use correct key if different

    const scopeRes = await this.authStore.fetchScopeProjectNames(adminId);

    if (
      scopeRes.status &&
      (
        (Array.isArray(scopeRes.data?.scope_names) &&
          scopeRes.data.scope_names.length > 0) ||
        scopeRes.data?.count > 0
      )
    ) {
      // ✅ At least 1 project exists
      this.$router.push("/admindashboardonboarding");
    } else {
      // ❌ No project exists
      this.$router.push("/location");
    }

  } catch (error) {
    console.error("Signin error:", error);
    Swal.fire("Error", "Something went wrong", "error");
  } finally {
    this.loading = false;
  }
},

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
    startSlider() {
      this.sliderInterval = setInterval(() => {
        this.nextSlide();
      }, 4000); // Change slide every 4 seconds
    },
    nextSlide() {
      const slides = document.querySelectorAll('.dashboard-slide');
      if (!slides || slides.length === 0) return;

      // Remove active class from current slide
      slides[this.currentSlide].classList.remove('active');
      slides[this.currentSlide].classList.add('prev');

      // Move to next slide
      this.currentSlide = (this.currentSlide + 1) % slides.length;

      // Add active class to new slide
      slides[this.currentSlide].classList.add('active');
      slides[this.currentSlide].classList.remove('prev');

      // Remove prev class from other slides after animation
      setTimeout(() => {
        slides.forEach((slide, index) => {
          if (index !== this.currentSlide && index !== (this.currentSlide - 1 + slides.length) % slides.length) {
            slide.classList.remove('prev');
          }
        });
      }, 1000);
    },
    stopSlider() {
      if (this.sliderInterval) {
        clearInterval(this.sliderInterval);
        this.sliderInterval = null;
      }
    },
    validatePassword() {
      const pwd = this.formData.password;

      this.showPasswordRules = pwd.length > 0;

      this.rules.minLength = pwd.length >= 8;
      this.rules.uppercase = /[A-Z]/.test(pwd);
      this.rules.special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
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
        Swal.fire({
          icon: 'error',
          title: 'Invalid Email',
          text: 'Please enter a valid email address',
          confirmButtonColor: '#5a44ff'
        });
        return;
      }

      this.forgotLoading = true;

      try {
        const response = await this.authStore.forgotPassword({ email: this.forgotEmail });

        if (response.status) {
          // Close modal
          this.closeForgotPasswordModal();

          // Show success message
          await Swal.fire({
            icon: "success",
            title: "Reset Link Sent!",
            text: "Check your email for the password reset link.",
            timer: 3000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message || "Something went wrong!",
            confirmButtonColor: '#5a44ff'
          });
        }
      } catch (error) {
        console.error('Forgot password error:', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send reset link. Please try again.",
          confirmButtonColor: '#5a44ff'
        });
      } finally {
        this.forgotLoading = false;
      }
    },
  },
  mounted() {
    this.authStore = useAuthStore();
    this.loadRecaptchaScript();
    this.$nextTick(() => {
      this.startSlider();
    });
    if (this.currentRole === "admin" && this.currentMode === "signin") {
      this.fetchPreviousTestingTypes();
    }
    document.addEventListener("click", this.closeTestingBoxOnOutside);
  },
  beforeUnmount() {
    // Stop slider
    this.stopSlider();

    // Cleanup reCAPTCHA
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

    // Remove testing box dropdown listener
    document.removeEventListener("click", this.closeTestingBoxOnOutside);
  }
};
</script>

<style scoped>

.project-card {
  flex: 1;
  background: #020617;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  color: #fff;
}

.project-card small {
  display: block;
  font-size: 11px;
  color: #9ca3af;
}

.project-card.active {
  border-color: rgb(90, 68, 255);
  box-shadow: 0 0 0 2px rgba(90, 68, 255, 0.25);
}

.dropdown-trigger.disabled {
  pointer-events: none;
  opacity: 0.7;
}



.dropdown-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-option.disabled:hover {
  background: none;
}

.dropdown-option.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.password-rules {
  list-style: none;
  padding-left: 0;
  font-size: 13px;
}

.password-rules li {
  color: #dc3545;
}

.password-rules li.valid {
  color: #28a745;
}

.logo-wrapper {
  position: absolute;
  top: 28px;
  left: 20%;
  transform: translateX(-50%);
  z-index: 10;
}

.form-area {
  height: 100%;
  display: flex;
  align-items: flex-start;
  /* align-items: center; */
  justify-content: center;
  padding-top: 40px;
  width: 100%;
}

.form-wrapper {
  background: transparent;
  max-height: 100vh;
  position: relative;
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* ===== MAIN TABS ===== */
.main-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  min-height: 44px;
  height: 44px;
  flex-shrink: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-height: 46px;
  height: 46px;
  flex-shrink: 0;
}

#authForm {
  flex-grow: 1;
}

/* Prevent password confirm toggle shift */
.password-confirm {
  min-height: 78px;
}

.sub-tab {
  padding: 10px 0;
  cursor: pointer;
  font-weight: 500;
  opacity: 0.6;
  position: relative;
  min-width: 80px;
  text-align: center;
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
  color: #fff;
}

/* When browser autofill changes background to white, make eye icon dark */
.custom-input:-webkit-autofill~.password-toggle,
.custom-input:-webkit-autofill~.password-toggle i {
  color: #020617 !important;
  opacity: 1;
}

/* ===== OTP INPUTS ===== */
.otp-inputs {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.otp-box {
  width: 50px;
  height: 50px;
  background: #020617;
  border: 2px solid #1f2937;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 0;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.otp-box:focus {
  background: #020617;
  border-color: rgb(90, 68, 255);
  box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.15);
  outline: none;
  color: #fff;
}

.otp-box::-webkit-outer-spin-button,
.otp-box::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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

/* Stop vertical re-centering jump */
/* .form-area {
  align-items: flex-start;
} */

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
/* #authForm {
  width: 100%;
} */

/* Prevent layout shift on mode switch */
/* .password-confirm {
  min-height: 78px;
  
} */

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

/* Left form column */
.form-section {
  background-color: rgb(9, 9, 35);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
}

/* Optical centering (NOT true center) */
.form-wrapper {
  width: 100%;
  max-width: 420px;
  padding-top: 60px;
  padding-bottom: 40px;
}

@media (min-width: 1600px) {
  .form-wrapper {
    padding-top: 80px;
    padding-bottom: 60px;
  }



}

/* monitor size */
@media screen and (min-width: 1920px) {
  .form-wrapper {
    padding-top: 50px;
    padding-bottom: 40px;
  }

  .dashboard-slider {
    margin: 80px auto 60px;
  }

  .form-area {
    padding-top: 230px;
  }
}

@media (max-width: 1200px) {
  .form-wrapper {
    padding-top: 50px;
    padding-bottom: 40px;
  }
}



/* Laptops */
@media (max-width: 1366px) {
  .form-wrapper {
    padding-top: 50px;
    padding-bottom: 40px;
  }


}

/* Tablets */
@media (max-width: 992px) {
  .form-wrapper {
    padding-top: 40px;
    padding-bottom: 32px;
  }

  .logo-wrapper {
    top: 20px;

  }
}

/* Mobile */
@media (max-width: 768px) {
  .form-section {
    min-height: auto;
  }

  .form-wrapper {
    padding-top: 32px;
    padding-bottom: 24px;
  }

  .logo-wrapper {
    top: 20px;

  }

}

/* ===================================
   FORGOT PASSWORD MODAL STYLES
   =================================== */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.forgot-modal {
  background: linear-gradient(135deg, #020617 0%, #0f172a 100%);
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(90, 68, 255, 0.3);
  border: 1px solid rgba(90, 68, 255, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.forgot-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.forgot-modal-header h4 {
  color: #fff;
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, color 0.2s ease;
}

.modal-close:hover {
  transform: scale(1.1);
  color: #5a44ff;
}

.forgot-modal-body {
  padding: 28px;
}

.forgot-modal .custom-input {
  background: #020617;
  border: 2px solid #1f2937;
  color: #fff;
  border-radius: 12px;
  padding: 12px 16px;
}

.forgot-modal .custom-input:focus {
  background: #020617;
  border-color: #5a44ff;
  box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.15);
  color: #fff;
  outline: none;
}

.forgot-modal .form-label {
  color: #e5e7eb;
  font-weight: 500;
  margin-bottom: 8px;
}

.forgot-modal .text-light {
  color: #9ca3af !important;
}

/* Mobile responsive */
@media (max-width: 576px) {
  .forgot-modal {
    width: 95%;
    margin: 0 16px;
  }

  .forgot-modal-header {
    padding: 20px 20px;
  }

  .forgot-modal-body {
    padding: 20px;
  }
}

/* ===================================
   TESTING BOX DROPDOWN STYLES
   =================================== */
.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 46px;
}

.dropdown-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-icon {
  color: #9ca3af;
  font-size: 14px;
  transition: transform 0.2s ease;
  margin-left: 10px;
}

.testing-dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #020617;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 8px;
  z-index: 20;
  margin-top: 4px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.3);
}

.dropdown-option {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  padding: 10px 12px;
  cursor: pointer;
  color: #e5e7eb;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.dropdown-option:hover {
  background: rgba(90, 68, 255, 0.15);
}

.dropdown-option input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: rgb(90, 68, 255);
  cursor: pointer;
}

.forgot-link {
  /* color: #9ca3af; */
  color: rgb(90, 68, 255);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: rgb(90, 68, 255);
}
</style>