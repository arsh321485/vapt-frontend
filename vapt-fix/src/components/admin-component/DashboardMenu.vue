<template>
  <main>
    <div class="d-flex">
    <div class="sidebar d-flex flex-column align-items-center  ps-2">
      <!-- <div class=" d-flex flex-column align-items-center">
        <img src="@/assets/images/smaller-logo.png" alt="">
      </div> -->

      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center  text-center pt-5 mt-2">
         <div>
          <router-link to="/admindashboardonboarding">
          <button class="btn border-0" :class="{ activeBtn: isActive('/admindashboardonboarding') }"><i class="bi bi-house-door fs-5 nav-menu"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/vulnerabilityregister">
          <button class="btn border-0" :class="{ activeBtn: isActive('/vulnerabilityregister') }"><i class="bi bi-list-ul fs-5 nav-menu"></i>
          <p class="menu-heading">Register</p></button>
          </router-link>
         </div>

        <div>
          <router-link to="/assets">
          <button class="btn border-0" :class="{ activeBtn: isActive('/assets') }">
          <i class="bi bi-laptop fs-5 nav-menu"></i>
          <p class="menu-heading">Assets</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/exceptions">
          <button class="btn border-0" :class="{ activeBtn: isActive('/exceptions') }">
          <i class="bi bi-exclamation-circle fs-5 nav-menu"></i>
          <p class="menu-heading">Support Requests</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/pending">
          <button class="btn border-0" :class="{ activeBtn: isActive('/pending') }">
          <i class="bi bi-dash-circle-dotted fs-5 nav-menu"></i>
          <p class="menu-heading">Pending</p></button>
          </router-link>
        </div>

        <div>
          <router-link to="/mitigationstrategy">
          <button class="btn border-0" :class="{ activeBtn: isActive('/mitigationstrategy') }">
           <i class="bi bi-diagram-3 fs-5 nav-menu"></i>
          <p class="menu-heading">Mitigation Strategy</p>
          </button>
          </router-link>
        </div>

        <div>
          <router-link to="/supportticket">
          <button class="btn border-0" :class="{ activeBtn: isActive('/supportticket') }">
          <i class="bi bi-question-circle fs-5 nav-menu"></i>
          <p class="menu-heading">Tickets</p></button>
          </router-link>
        </div>

        <div>
          <router-link to="/yourteam">
          <button class="btn border-0" :class="{ activeBtn: isActive('/yourteam') }">
          <i class="bi bi-people fs-5 nav-menu"></i>
          <p class="menu-heading">Teams</p></button>
          </router-link>
        </div>
        <div class=" d-flex flex-column align-items-center">
        <div class="circle-bottom ">A</div>
        <button class="btn border-0" @click="confirmLogout">
          <i class="bi bi-box-arrow-right fs-5 nav-menu"></i><p class="menu-heading">Logout</p>
        </button>
      </div>
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
  methods: {
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
