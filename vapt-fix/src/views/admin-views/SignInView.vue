<template>
    <main>
     <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <!-- Left Form Section -->
      <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">
        <img src="@/assets/images/logo2.png" alt="" class="mb-4">
        <h1 class="form-heading mb-3">Welcome back!</h1>
        <p class="form-subheading mb-4">Login into your account to start fixing.</p>

        <button class="btn btn-outline-dark rounded-pill mb-2 mb-md-0 mb-lg-0 w-100"><img src="@/assets/images/google-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Login with Google</button>

                    <div class="d-flex align-items-center mt-3">
                      <hr class="flex-grow-1">
                      <span class="mx-2 text-muted">or</span>
                      <hr class="flex-grow-1">
                    </div>

        

        <form>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Enter your email" style="border: 1px solid #422CE9;">
          </div>
          <div class="mb-4 mt-4">
            <label class="form-label">Your password</label>
            <input type="password" class="form-control" placeholder="Enter your password">
            <!-- Forgot password link -->
  <div class="text-end mt-1">
    <router-link to="/forgotpassword" class="text-primary" style="font-size: 14px; text-decoration: none;">
      Forgot Password?
    </router-link>
  </div>
          </div>

          <div style="padding:10px;border:1px solid #ccc;border-radius:4px;
            width:300px;display:flex;align-items:center;justify-content:space-between;">
  
  <!-- Left side: tick box -->
  <div style="display:flex;align-items:center;gap:10px;">
    <input type="checkbox" id="captcha-check" style="width:20px;height:20px;cursor:pointer;">
    <label for="captcha-check" style="cursor:pointer;">I'm not a robot</label>
  </div>

  <!-- Right side: fake recaptcha logo -->
  <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
       alt="recaptcha" style="height:30px;">
</div>


          <router-link to="/home">
            <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-4">
            Login into vaptfix <i class="bi bi-arrow-right-circle-fill"></i>  
          </button>
          </router-link>
        </form>

        <p class="mt-4 text-center">Don’t have an account? <span>
          <router-link to="/signup" class="text-decoration-none" tag="button" style="color: #422CE9;">Signup</router-link>
        </span></p>
      </div>

      <!-- Right Image Section -->
      <div class="col-lg-6 d-none d-lg-block image-section pt-5">
        <img src="@/assets/images/signin.jpg" alt="" class="img-fluid" style="height: 500px;border-radius: 15px;">
      </div>
    </div>
  </div>


    </main>
</template>

<script>

import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'SigninView',
  components: {
    Vue3Select
  }
};
</script>
