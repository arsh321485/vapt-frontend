<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <div class="col-lg-6 col-md-12 px-5 pb-4 form-section">
        <img src="@/assets/images/logo-capital.png" alt="" class="mb-4" style="height: 40px;">
        <h3 class="mb-2">Forgot Password</h3>
        <p class="text-muted mb-4">
          Enter your registered email to reset your password.
        </p>

        <form @submit.prevent="handleForgotPassword">
          <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            placeholder="Enter your email"
          />
          </div>
          <button type="submit" class="btn w-100 btn-vaptfix" style="background-color: #422CE9;">
            Send Reset Link
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
import { forgotPassword } from "../../services/apiServices";

export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: ""
    };
  },
  methods: {
  async handleForgotPassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        timer: 3000, // auto close after 3 seconds
        showConfirmButton: false,
      });
      return;
    }

    try {
      const response = await forgotPassword({ email: this.email });
      console.log("Forgot Password response:", response);

      Swal.fire({
        icon: 'success',
        title: 'Reset Link Sent!',
        text: 'Check your email for the reset link.',
        timer: 5000, // auto close after 3 seconds
        showConfirmButton: false,
        position: 'center',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error || 'Something went wrong!',
        timer: 4000,
        showConfirmButton: false,
      });
    }
  },
},

};
</script>

<style scoped>
.card {
  border-radius: 15px;
}
</style>
