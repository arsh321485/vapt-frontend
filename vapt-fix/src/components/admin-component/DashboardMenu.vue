<template>
  <main>
    <div class="d-flex">
    <div class="sidebar d-flex flex-column align-items-center pt-3 ps-2">
      <div class="mb-4 mt-3 d-flex flex-column align-items-center">
        <img src="@/assets/images/smaller-logo.png" alt="">
      </div>

      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center gap-1 text-center">
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
          <p class="menu-heading">Exceptions</p></button>
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
      </div>

      <!-- Notification Button -->
<div>
  <button 
    class="btn border-0" 
    @click="toggleNotificationPanel"
  >
    <i class="bi bi-bell fs-5 nav-menu"></i>
    <p class="menu-heading">Notifications</p>
  </button>
</div>

      <!-- Bottom Profile Circle -->
      <div class="mt-auto d-flex flex-column align-items-center">
        <div class="circle-bottom mb-2">A</div>
      </div>
    </div>

    
    </div>

    <!-- Notification Panel -->
<div 
  class="notification-panel" 
  :class="{ 'open': showNotifications }"
>
  <div class="panel-header d-flex justify-content-between align-items-center p-2 border-bottom">
    <h5 class="mb-0">Notifications</h5>
    <button class="btn-close" @click="toggleNotificationPanel"></button>
  </div>
  
  <div class="panel-body p-3">
    <p>No new notifications</p>
    <!-- Example notifications -->
    <div class="alert alert-info">System update scheduled</div>
    <div class="alert alert-warning">New vulnerability found</div>
  </div>
</div>

  </main>
</template>

<script>
import { RouterLink, useRoute } from "vue-router";
export default {
  name: 'DashboardMenu',
  data() {
    return {
      showNotifications: false
    };
  },
   methods: {
    toggleNotificationPanel() {
      this.showNotifications = !this.showNotifications;
    }
  },
  setup() {
    const route = useRoute();
    const isActive = (path) => route.path === path;

    return { route, isActive };
  },
};
</script>

<style scoped>
.notification-panel {
  position: fixed;
  top: 0;
  right: -320px;
  width: 300px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1050;
}

.notification-panel.open {
  right: 0;
}

</style>