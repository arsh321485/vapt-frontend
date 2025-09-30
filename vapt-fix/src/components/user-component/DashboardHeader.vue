<template>
  <main>
  <div class="row fixed-browser-bar pe-0 me-0 gx-0"> 
     <div class="col-12 pe-0">
  <div class="d-flex align-items-center justify-content-between gap-4 py-2 px-4">
    
      <div class="browser-bar">
        <img src="@/assets/images/logo-capital.png" alt="">
      </div>
  
    <!-- Right Section -->
    <div class="position-relative d-inline-block">
      <div 
        class="circle-bottom d-flex align-items-center justify-content-center fw-bold"
        style="cursor:pointer;"
        @click="toggleDropdown"
      >
        A
      </div>

      <!-- Dropdown -->
      <div 
        v-if="showDropdown" 
        class="dropdown-box shadow-lg p-3 rounded"
      >
        <!-- Email -->
        <div class="mb-2 text-muted text-center">
          {{ userEmail }}
        </div>

        <!-- Upgrade -->
        <router-link to="/pricingplan" class="btn btn-sm btn-outline-dark w-100 mb-2">
          Upgrade Plan
        </router-link>

        <!-- Logout -->
        <button class="btn btn-sm btn-danger w-100" @click="confirmLogout">
          Logout
        </button>
      </div>
    </div>
    
    </div>
    <hr class="m-0">
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: 'DashboardHeader',
  data() {
    return {
      showDropdown: false,
      userEmail: "user@email.com",
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    confirmLogout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout",
        cancelButtonText: "No",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/home";
        }
      });
    },
    handleClickOutside(e) {
      if (
        !e.target.closest(".circle-bottom") &&
        !e.target.closest(".dropdown-box")
      ) {
        this.showDropdown = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.dropdown-box {
  position: absolute;
  right: 40px;
  top: 10px;
  background: #fff;
  min-width: 220px;
  z-index: 1000;
}
.browser-header {
  position: fixed; /* Fix at top */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050; /* Keep it above other content */
  background-color: #f8f9fa; /* Ensure background stays visible */
}

body {
  padding-top: 100px; /* Add space so content doesn't go under header */
}

.browser-bar img {
  height: 40px; 
}

.dashboard-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

</style>
