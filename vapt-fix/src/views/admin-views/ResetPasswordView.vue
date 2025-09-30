<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
        <div class="col-lg-6 col-md-12 px-5 pb-4 form-section">
            <img src="@/assets/images/logo-capital.png" alt="" class="mb-4" style="height: 40px;">
            <h3 class="mb-4">Set Password</h3>
            
            <form @submit.prevent="handleResetPassword">
      <div class="mb-4">
        <label for="password" class="form-label">New Password</label>
        <input
          type="password"
          id="password"
          v-model="form.new_password"
          class="form-control"
          placeholder="Enter new password"
        />
      </div>

      <div class="mb-4">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirm_password"
          class="form-control"
          placeholder="Re-enter new password"
        />
      </div>

      <button
        type="submit"
        class="btn w-100 btn-vaptfix"
        style="background-color: #422CE9;"
        :disabled="loading"
      >
        {{ loading ? "Saving..." : "Save Password" }}
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
import { resetPassword } from "../../services/apiServices";

export default {
  name: "ChangePasswordView",
  data() {
    return {
      form: {
        new_password: "",
        confirm_password: ""
      },
      loading: false
    };
  },
  methods: {
    async handleResetPassword() {
      if (this.form.new_password !== this.form.confirm_password) {
        alert("Passwords do not match ❌");
        return;
      }

      this.loading = true;
      try {
        const { userId, token } = this.$route.params;
        const response = await resetPassword(userId, token, this.form);
        console.log("Reset success ✅", response);
        alert("Password has been reset successfully!");
        this.$router.push("/signin");
      } catch (err) {
        console.error("Reset error:", err);
        alert(err.detail || "Something went wrong");
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
</style>
