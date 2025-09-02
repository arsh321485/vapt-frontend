<template>
  <main>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="row overflow-hidden w-100">
        <div class="col-lg-6 col-md-12 px-5 pt-4 pb-4 form-section">
            <img src="@/assets/images/logo2.png" alt="" class="mb-4">
            <h3 class="mb-4">Change Password</h3>
            
            <div class="mb-4">
                <label for="password" class="form-label">New Password</label>
                <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Enter new password"
                />
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Confirm New Password</label>
                <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Re-enter new password"
                />
            </div>
            
            <router-link to="/" class="btn w-100 btn-vaptfix" style="background-color: #422CE9;">
                Save Password
            </router-link>
            
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
  name: "ChangePasswordView",
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
