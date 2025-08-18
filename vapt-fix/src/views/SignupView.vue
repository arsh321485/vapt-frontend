<template>
    <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      
    <div class="row overflow-hidden w-100">
      <!-- Left Form Section --> 
      <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">
        <img src="../assets/images/logo2.png" alt="" class="mb-4">
        <h1 class="form-heading mb-2">Get started now</h1>
        <p class="form-subheading mb-4">Join vaptfix, fix your vulnerabilities now</p>

        <div class="mb-3 d-lg-flex d-md-flex gap-2">
          <button class="btn btn-google mb-2 mb-md-0 mb-lg-0 w-100"><img src="../assets/images/google-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Login with Google</button>
          <button class="btn btn-microsoft w-100"><img src="../assets/images/microsoft-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Login with Microsoft</button>
        </div>

        <form class="mt-5">
          <div class="row mb-3">
            <div class="col-12 col-md-6 mb-2 mb-md-0">
              <label class="form-label">First name</label>
              <input type="text" class="form-control" style="border: 1px solid #422CE9;" placeholder="Enter your first name">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label">Last name</label>
              <input type="text" class="form-control" placeholder="Enter your last name">
            </div>
          </div>
          <div class="mb-3 mt-4">
            <label class="form-label">Organisation name</label>
            <input type="text" class="form-control" placeholder="Enter your organisation name">
          </div>
          <div class="mb-3 mt-4">
            <label class="form-label">Organisation URL</label>
            <input type="url" class="form-control" placeholder="Enter your organisation URL">
          </div>
          <div class="mb-4 mt-4">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Enter your email">
          </div>
          <div class="mb-4 mt-4">
            <label class="form-label">Your password</label>
            <input type="password" class="form-control" placeholder="Pick a password">
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


          <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-3">Signup for vaptfix <i class="bi bi-arrow-right-circle-fill"></i></button>
        </form>
        <p class="text-center pt-3 mt-2">Already have an account? <span> <router-link to="/signin" class="text-decoration-none" tag="button" style="color: #422CE9;">Signin</router-link></span></p>


      </div>

      <!-- Right Image Section -->
      <div class="col-lg-6 image-section d-none d-lg-block pt-5">
        <img src="../assets/images/signup.jpg" alt="" style="width: 455px;height: 700px;border-radius: 15px;">
      </div>
    </div>
  </div>

    </main>
</template>

<script>

import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'SignupView',
  components: {
    Vue3Select
  }
};
</script>
