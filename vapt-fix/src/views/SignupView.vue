<template>
    <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
    <!-- <img src="../assets/images/smaller-logo.png" alt="" style="height: 25px;width: 40px;"> -->
      <!-- Left Form Section --> 
      <div class="col-lg-6 p-5 form-section">
        <h1 class="form-heading mb-2">Get started now</h1>
        <p class="form-subheading mb-4">Join VAPTfix, fix your vulnerabilities now</p>

        <div class="mb-3 d-flex gap-2">
          <button class="btn btn-google"><img src="../assets/images/google-icon.png" style="height: 20px;width: 20px;margin-top: -1px;"/> Login with Google</button>
          <button class="btn btn-microsoft"><img src="../assets/images/microsoft-icon.png" style="height: 23px;width: 23px;margin-top: -1px;"/> Login with Microsoft</button>
        </div>

        <form class="mt-5">
          <div class="row mb-3">
            <div class="col">
              <label class="form-label">First name</label>
              <input type="text" class="form-control" style="border: 1px solid #422CE9;" placeholder="Enter your first name">
            </div>
            <div class="col">
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
            <label class="form-label">Your password</label>
            <input type="password" class="form-control" placeholder="Pick a password">
          </div>
          <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-3">Signup for VAPTfix <i class="bi bi-arrow-right-circle-fill"></i></button>
        </form>
        <p class="text-center pt-3 mt-2">Already have an account? <span> <router-link to="/signin" class="text-decoration-none" tag="button" style="color: #422CE9;">Signin</router-link></span></p>


      </div>

      <!-- Right Image Section -->
      <div class="col-lg-6 image-section d-lg-block pt-5">
        <img src="../assets/images/signup.jpg" alt="" style="width: 500px;height: 700px;border-radius: 15px;">
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


<style scoped>
  .form-control{
    border-radius: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
  }

  .form-control:focus {
    box-shadow: 0 0 0 0.2rem rgba(105, 108, 255, 0.25);
  }

    .btn-google {
      border: 1px solid #ddd;
      border-radius: 50px;
      color: rgba(0, 0, 0, 0.87);
      width: 200px;
    }

    .btn-microsoft {
      border: 1px solid #ddd;
      border-radius: 50px;
      color: rgba(0, 0, 0, 0.87);
      width: 250px;
    }

    .btn-vaptfix {
      background-color: #422CE9;
      color: #fff;
      border: none;
      border-radius: 50px;
    }
    .btn-vaptfix:hover{
      background-color: #1c09ab;
      color: #fff;
    }

    .form-heading {
      font-weight: 500;
      font-size: 40px;
      color: #000000;
    }

    .form-subheading {
      color: #00000099;
      font-size: 14px;
    }

    .form-label {
      font-weight: 500; 
    }
</style>