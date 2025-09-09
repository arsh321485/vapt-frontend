<template>
    <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
      <div class="col-lg-7 col-md-12 px-5 pt-4 pb-4 form-section">
        <img src="@/assets/images/logo2.png" alt="" class="mb-4">
        <h1 class="form-heading mb-2">Get started now</h1>
        <p class="form-subheading mb-4">Join vaptfix, fix your vulnerabilities now</p>

                     <div class="d-flex justify-content-center align-items-center gap-3 px-3">

                        <button class="social-icon-btn">

                            <img src="@/assets/images/google-icon.png" alt="google" />

                        </button>

                        <button class="social-icon-btn">

                            <img src="@/assets/images/teams.png" alt="microsoftteams" />

                        </button>

                        <button class="social-icon-btn">

                            <img src="@/assets/images/slack.png" alt="slack" />

                        </button>

                        <button class="social-icon-btn">

                            <img src="@/assets/images/jira.png" alt="jira" />

                        </button>
                        <button class="social-icon-btn">

                            <img src="@/assets/images/confluence.png" alt="Confluence " />

                        </button>
                        <button class="social-icon-btn">

                            <img src="@/assets/images/asana.png" alt="asana" />

                        </button>
                        <button class="social-icon-btn">

                            <img src="@/assets/images/monday.png" alt="monday.com" />

                        </button>
                        <button class="social-icon-btn">

                            <img src="@/assets/images/notion.png" alt="notion" />

                        </button>

                    </div> 
                    <div class="d-flex align-items-center mt-3">
                      <hr class="flex-grow-1">
                      <span class="mx-2 text-muted">or</span>
                      <hr class="flex-grow-1">
                    </div>

        <form class="mt-3">
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

          <div class="mb-4">
            <label class="form-label">Confirm password</label>
            <input type="password" class="form-control" placeholder="Re-enter your password">
          </div>

          <div style="padding:10px;border:1px solid #ccc;border-radius:4px;
            width:300px;display:flex;align-items:center;justify-content:space-between;">
  
            <div style="display:flex;align-items:center;gap:10px;">
              <input type="checkbox" id="captcha-check" style="width:20px;height:20px;cursor:pointer;">
              <label for="captcha-check" style="cursor:pointer;">I'm not a robot</label>
            </div>
            <!-- Right side: fake recaptcha logo -->
            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                alt="recaptcha" style="height:30px;">
          </div>
          <router-link to="/">
            <button type="submit" class="btn btn-vaptfix w-100 py-2 mt-3">Signup for vaptfix <i class="bi bi-arrow-right-circle-fill"></i></button>
          </router-link>
        </form>
        <p class="text-center pt-3 mt-2">Already have an account? <span> <router-link to="/signin" class="text-decoration-none" tag="button" style="color: #422CE9;">Signin</router-link></span></p>
      </div>

      <!-- Right Image Section -->
      <div class="col-lg-5 image-section d-none d-lg-block pt-5">
        <img src="@/assets/images/signup.jpg" alt="" style="width: 455px;height: 700px;border-radius: 15px;">
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
.social-icon-btn {

    width: 50px;

    height: 50px;

    border-radius: 50%;

    border: 1px solid #ddd;

    background-color: #fff;

    display: flex;

    align-items: center;

    justify-content: center;

    transition: 0.3s;

}

.social-icon-btn img {

    height: 22px;

    width: auto;

}

.social-icon-btn:hover {

    background-color: #f8f8f8;

    border-color: #aaa;

    transform: scale(1.05);

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

}
</style>
