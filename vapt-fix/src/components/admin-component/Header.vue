<template>
    <main>
    <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
        
    <img src="@/assets/images/vaptfix_white.png" alt="logo" class="me-5">
     <!-- <div class="browser-bar" style="height: 40px;">
        <img src="@/assets/images/logo-capital.png" alt="">
      </div>  -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Left nav links -->
        <ul class="navbar-nav me-auto gap-4">
            <li class="nav-item">
              <router-link to="/home" class="nav-link active text-white text-decoration-none" style="font-size: 1rem;" aria-current="page" >
                Home
              </router-link>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" style="font-size: 1rem;" href="#">Features</a>
            </li>
            <li class="nav-item">
              <router-link to="/pricingplan" style="font-size: 1rem;" class="nav-link text-white text-decoration-none">
                Pricing
              </router-link>
            </li>
            <li class="nav-item">
            <a class="nav-link text-white" style="font-size: 1rem;" href="#">Partners</a>
            </li>
            <li class="nav-item">
              <router-link to="/vulnerabilityexplorer" style="font-size: 1rem;" class="nav-link text-white text-decoration-none">
                Vulnerability Explorer
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/usersignup" class="nav-link text-white text-decoration-none">
                Dashboard screen
              </router-link>
            </li> -->
            
        </ul>

       
          <div class="hero-div-btn">
            <button type="button" class="btn hero-btn text-light" @click="handleFixNow">
              Get Started
              <i class="bi bi-arrow-right-circle-fill fs-5 ms-1"></i>
            </button>
            </div>
        

        <!-- <div class="d-flex justify-content-start gap-2">
          
  <template v-if="!user">
    <router-link to="/signup" class="text-white text-decoration-none" tag="button">Signup /</router-link>
    <router-link to="/signin" class="text-white text-decoration-none" tag="button">Signin</router-link>
  </template>

         
  <template v-else>
    <router-link to="/profile" class="text-center text-decoration-none d-flex flex-column align-items-center">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/147/147144.png" 
        alt="Profile" 
        class="rounded-circle" 
        width="25" 
        height="25"
      />
      <p class="text-light mb-0" style="font-size: 14px;">
  {{ user.firstname }} {{ user.lastname }}
</p>
    </router-link>
  </template>
        </div> -->

        </div>
    </div>
    </nav>
    </main>
</template>

<script>
export default {
  name: 'Header',
  data() {
  return {
    user: null, 
  };
},
methods: {
   handleFixNow() {
    this.$router.push("/auth");
  }
},
mounted() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  },
};
</script>


<style scoped>
.hero-btn {
  background-color: #5A44FF;
  border-radius: 999px;
  /* padding: 0.8rem 1.5rem; */
  padding: 4px 12px;
  color: #FFFFFF;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hero-btn:hover {
  background-color: #4836d6;
  color: white;
}
</style>
