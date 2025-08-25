<template>
  <main>
    <div class=" d-flex">
    <div class="sidebar d-flex flex-column align-items-center pt-3 ps-2">
      <div class="mb-4 mt-3 d-flex flex-column align-items-center">
        <img src="@/assets/images/smaller-logo.png" alt="">
      </div>

      <div class="flex-grow-1 d-flex flex-column align-items-center gap-1 text-center">
         <div>
          <router-link to="/userdashboard">
          <button class="btn border-0" :class="{ activeBtn: isActive('/userdashboard') }"><i class="bi bi-house-door fs-5 nav-menu"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/userVulnerabilityregister">
          <button class="btn border-0" :class="{ activeBtn: isActive('/userVulnerabilityregister') }"><i class="bi bi-list-ul fs-5 nav-menu"></i>
          <p class="menu-heading">Register</p></button>
          </router-link>
         </div>

        <div>
          <router-link to="/userassets">
          <button class="btn border-0" :class="{ activeBtn: isActive('/userassets') }">
          <i class="bi bi-laptop fs-5 nav-menu"></i>
          <p class="menu-heading">Assets</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/userexception">
          <button class="btn border-0" :class="{ activeBtn: isActive('/userexception') }">
          <i class="bi bi-exclamation-circle fs-5 nav-menu"></i>
          <p class="menu-heading">Exceptions</p></button>
          </router-link>
        </div>

        <div>
          <router-link to="/fixedvulnerabilities">
          <button class="btn border-0" :class="{ activeBtn: isActive('/fixedvulnerabilities') }">
          <i class="bi bi-check-circle fs-5 nav-menu"></i>
          <p class="menu-heading">Fixed</p>
          </button>
          </router-link>
        </div>

        <div>
          <router-link to="/pendingvulnerabilities">
          <button class="btn border-0" :class="{ activeBtn: isActive('/pendingvulnerabilities') }">
           <i class="bi bi-dash-circle-dotted fs-5 nav-menu"></i>
          <p class="menu-heading">Pending</p></button>
          </router-link>
        </div>

        <!-- <div>
          <router-link to="/delayedvulnerabilities">
          <button class="btn border-0" :class="{ activeBtn: isActive('/delayedvulnerabilities') }">
          <i class="bi bi-clock fs-5 nav-menu"></i>
          <p class="menu-heading">Delayed</p></button>
          </router-link>
        </div> -->
      </div>

      <!-- Bottom Profile Circle -->
      <div class="mt-auto d-flex flex-column align-items-center">
          <i class="bi bi-info-circle fs-5"></i>
          <p class="menu-heading ms-2">How it Works</p>
        <div class="circle-bottom">A</div>
      </div>
    </div>

    
    </div>
  </main>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  name: 'DashboardMenu',
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;

    return { route, isActive };
  },
};
</script>