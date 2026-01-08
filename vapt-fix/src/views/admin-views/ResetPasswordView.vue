<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
        <div class="col-lg-6 col-md-12 px-5 pb-4 form-section">
            <img src="@/assets/images/logo-capital.png" alt="" class="mb-4" style="height: 40px;">
            <h3 class="mb-4">Set New Password</h3>

            <form @submit.prevent="handleResetPassword">
      <div class="mb-4">
        <label for="password" class="form-label">New Password</label>
        <div class="position-relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.new_password"
            class="form-control"
            placeholder="Enter new password"
            @input="validatePassword"
            required
          />
          <span class="password-toggle" @click="showPassword = !showPassword" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer;">
            <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
          </span>
        </div>
        <ul v-if="showPasswordRules" class="password-rules mt-2 mb-0">
          <li :class="{ valid: rules.minLength }">At least 8 characters</li>
          <li :class="{ valid: rules.uppercase }">At least 1 uppercase letter</li>
          <li :class="{ valid: rules.special }">At least 1 special character</li>
        </ul>
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <div class="position-relative">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            id="confirmPassword"
            v-model="form.confirm_password"
            class="form-control"
            placeholder="Re-enter new password"
            required
          />
          <span class="password-toggle" @click="showConfirmPassword = !showConfirmPassword" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer;">
            <i :class="showConfirmPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
          </span>
        </div>
      </div>

      <button
        type="submit"
        class="btn w-100 btn-vaptfix"
        style="background-color: #422CE9;"
        :disabled="loading || !isPasswordValid"
      >
        {{ loading ? "Saving..." : "Reset Password" }}
      </button>
    </form>
        </div>
        
        <!-- Right Image Section -->
        <div class="col-lg-6 d-none d-lg-block image-section pt-3">
            <img src="@/assets/images/signin.jpg" alt="" class="img-fluid" style="height: 450px;border-radius: 15px;">
        </div>
    </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
  name: "ResetPasswordView",
  data() {
    return {
      form: {
        new_password: "",
        confirm_password: ""
      },
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      showPasswordRules: false,
      rules: {
        minLength: false,
        uppercase: false,
        special: false
      },
      token: "",
      email: "",
      userId: ""
    };
  },

  computed: {
    isPasswordValid() {
      return this.rules.minLength && this.rules.uppercase && this.rules.special;
    }
  },

  mounted() {
    // Check for URL params first (backend format: /set-password/:userId/:token)
    if (this.$route.params.userId && this.$route.params.token) {
      this.userId = this.$route.params.userId;
      this.token = this.$route.params.token;
    }
    // Fallback to query params (modal format: /reset-password?token=xxx&email=xxx)
    else if (this.$route.query.token && this.$route.query.email) {
      this.token = this.$route.query.token;
      this.email = this.$route.query.email;
    }

    // Validate required params exist
    if (!this.token || (!this.email && !this.userId)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "This reset link is invalid or has expired. Please request a new one.",
        confirmButtonColor: '#5a44ff'
      }).then(() => {
        this.$router.push("/auth");
      });
    }
  },

  methods: {
    validatePassword() {
      const pwd = this.form.new_password;

      this.showPasswordRules = pwd.length > 0;

      this.rules.minLength = pwd.length >= 8;
      this.rules.uppercase = /[A-Z]/.test(pwd);
      this.rules.special = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    },

    async handleResetPassword() {
      // Check if passwords match
      if (this.form.new_password !== this.form.confirm_password) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Passwords do not match. Please try again.",
          confirmButtonColor: '#5a44ff'
        });
        return;
      }

      // Check if password meets requirements
      if (!this.isPasswordValid) {
        Swal.fire({
          icon: "error",
          title: "Invalid Password",
          text: "Password must meet all requirements.",
          confirmButtonColor: '#5a44ff'
        });
        return;
      }

      this.loading = true;

      try {
        const authStore = useAuthStore();

        // Prepare payload based on available params
        const payload = {
          token: this.token,
          new_password: this.form.new_password,
          ...(this.userId ? { userId: this.userId } : {}),
          ...(this.email ? { email: this.email } : {})
        };

        const response = await authStore.resetPassword(payload);

        if (response.status) {
          await Swal.fire({
            icon: "success",
            title: "Password Reset Successful!",
            text: "Your password has been reset. You can now sign in with your new password.",
            confirmButtonColor: '#5a44ff'
          });
          this.$router.push("/auth");
        } else {
          Swal.fire({
            icon: "error",
            title: "Reset Failed",
            text: response.message || "Something went wrong. Please try again.",
            confirmButtonColor: '#5a44ff'
          });
        }
      } catch (err) {
        console.error("Reset error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to reset password. Please try again.",
          confirmButtonColor: '#5a44ff'
        });
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 15px;
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

.password-toggle {
  color: #6c757d;
}

.password-toggle:hover {
  color: #422CE9;
}
</style>
