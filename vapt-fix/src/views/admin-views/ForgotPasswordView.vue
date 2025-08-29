<template>
  <div class="d-flex justify-content-center align-items-center vh-100 px-3">
    <div class="card shadow p-4" style="max-width: 400px; width: 100%;">
      <h3 class="text-center mb-3">Forgot Password</h3>
      <p class="text-muted text-center">
        Enter your registered email to reset your password.
      </p>

      <!-- Email Input -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="Enter your email"
        />
      </div>

      <!-- Static message -->
      <div class="text-success mb-2" v-if="showMessage">
        Reset link has been sent to your email!
      </div>

      <!-- Submit Button -->
      <button class="btn w-100 text-light" style="background-color: #422CE9;" @click="showMessage = true">
        Send Reset Link
      </button>

      <!-- Back to Login -->
      <p class="text-center mt-3">
        <router-link to="/signin">Back to Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordView",
  data() {
    return {
      showMessage: false,
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>
