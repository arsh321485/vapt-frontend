<template>
  <main>
    <div class="d-flex">
    <div class="sidebar d-flex flex-column align-items-center ps-2">
      <!-- <div class=" d-flex flex-column align-items-center">
        <img src="@/assets/images/smaller-logo.png" alt="">
      </div> -->

      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center  text-center pt-4 mb-3">
         <div>
          <router-link to="/admindashboardonboarding">
          <button class="btn border-0" :class="{ activeBtn: isActive('/admindashboardonboarding') }"><i class="bi bi-house-door nav-menu"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/vulnerabilityregister">
          <button class="btn border-0" :class="{ activeBtn: isActive('/vulnerabilityregister') }"><i class="bi bi-list-ul nav-menu"></i>
          <p class="menu-heading">Register</p></button>
          </router-link>
         </div>

        <div>
          <router-link to="/assets">
          <button class="btn border-0" :class="{ activeBtn: isActive('/assets') }">
          <i class="bi bi-laptop nav-menu"></i>
          <p class="menu-heading">Assets</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/exceptions">
          <button class="btn border-0" :class="{ activeBtn: isActive('/exceptions') }">
          <i class="bi bi-exclamation-circle nav-menu"></i>
          <p class="menu-heading">Support Requests</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/pending">
          <button class="btn border-0" :class="{ activeBtn: isActive('/pending') }">
          <i class="bi bi-dash-circle-dotted nav-menu"></i>
          <p class="menu-heading">Pending</p></button>
          </router-link>
        </div>

        <div>
          <router-link to="/mitigationstrategy">
          <button class="btn border-0" :class="{ activeBtn: isActive('/mitigationstrategy') }">
           <i class="bi bi-diagram-3 nav-menu"></i>
          <p class="menu-heading">Mitigation Strategy</p>
          </button>
          </router-link>
        </div>

        <div>
          <router-link to="/supportticket">
          <button class="btn border-0" :class="{ activeBtn: isActive('/supportticket') }">
          <i class="bi bi-question-circle nav-menu"></i>
          <p class="menu-heading">Tickets</p></button>
          </router-link>
        </div>

        <div class="mt-auto d-flex align-items-center position-relative">
    <!-- Profile Circle -->
    <div 
      class="circle-bottom "
      @click="toggleMenu" style="cursor: pointer;"
     
    >
      A
    </div>

    <!-- White Box on Right -->
    <div 
      v-if="showMenu" 
      class="dropdown-box shadow"
    >
      <button class="btn btn-sm w-100 text-start border-0" @click="confirmLogout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
  </div>

        <!-- <div class="mt-auto d-flex flex-column align-items-center">
        <div class="circle-bottom ">A</div>
        <button class="btn border-0" @click="confirmLogout">
          <i class="bi bi-box-arrow-right nav-menu"></i><p class="menu-heading">Logout</p>
        </button>
        </div> -->
      </div>


      <!-- Bottom Profile Circle -->
      
    </div>  
    </div>

  </main>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
export default {
  name: 'DashboardMenu',
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;

    return { route, isActive };
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
     toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    confirmLogout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout",
        cancelButtonText: "No, stay"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/home"); 
        }
      });
    }
  }
};
</script>

<style scoped>
.dropdown-box {
  position: absolute;
  bottom: 40px;   /* move it above "A" */
  right: -25px;        /* align with "A" horizontally */
  background: #dad9d9;
  border-radius: 6px;
  padding: 4px;
  min-width: 90px;
  z-index: 1050;   /* keep it above text */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>