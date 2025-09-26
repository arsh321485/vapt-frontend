<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <div class="col-lg-6 col-md-12 px-5 pb-4 form-section">
        <img src="@/assets/images/vapt-logo.png" alt="" class="mb-4" style="height: 40px;">
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
export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    async handleForgotPassword() {
      // ✅ Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const body = {
        email: this.email
      };

      try {
        const res = await fetch("https://vapt-backend.onrender.com/api/admin/users/forgot-password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log("Forgot Password response:", data);

        if (res.ok) {
          alert("Reset link sent to your email ✅");
          // Optionally, redirect to some confirmation page
        } else {
          alert("Error: " + (data.error || JSON.stringify(data)));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Request failed. Please try again.");
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
