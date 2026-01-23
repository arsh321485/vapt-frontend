<template>
  <main>

    <div class="d-flex">
    <div class="sidebar d-flex flex-column align-items-center my-5 py-2">
      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center  text-center">
         <!-- HOME - Always allowed -->
         <div>
          <router-link to="/admindashboardonboarding">
          <button class="btn border-0" :class="{ activeBtn: isActive('/admindashboardonboarding') }"><i class="bi bi-house-door nav-menu"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <!-- SCOPE - Always allowed -->
         <div>
          <router-link to="/scope">
          <button class="btn border-0" :class="{ activeBtn: isActive('/scope') }"><i class="bi bi-bullseye nav-menu"></i>
          <p class="menu-heading">Scope</p></button>
          </router-link>
         </div>

         <!-- TEAMS - Always allowed -->
         <div>
          <router-link to="/yourteam">
          <button class="btn border-0" :class="{ activeBtn: isActive('/yourteam') }">
          <i class="bi bi-people nav-menu"></i>
          <p class="menu-heading">Teams</p></button>
          </router-link>
        </div>

         <!-- REGISTER - Restricted during testing -->
         <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/vulnerabilityregister') }" @click="navigateTo('/vulnerabilityregister')">
          <i class="bi bi-list-ul nav-menu"></i>
          <p class="menu-heading">Register</p></button>
         </div>

         <!-- REPORT - Restricted during testing -->
         <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/report') }" @click="navigateTo('/report')">
          <i class="bi bi-file-earmark-text nav-menu"></i>
          <p class="menu-heading">Report</p></button>
         </div>

        <!-- ASSETS - Restricted during testing -->
        <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/assets') }" @click="navigateTo('/assets')">
          <i class="bi bi-laptop nav-menu"></i>
          <p class="menu-heading">Assets</p></button>
        </div>

        <!-- PENDING - Restricted during testing -->
        <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/pending') }" @click="navigateTo('/pending')">
          <i class="bi bi-dash-circle-dotted nav-menu"></i>
          <p class="menu-heading">Pending</p></button>
        </div>

         <!-- MITIGATION STRATEGY - Restricted during testing -->
         <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/mitigationstrategy') }" @click="navigateTo('/mitigationstrategy')">
           <i class="bi bi-diagram-3 nav-menu"></i>
          <p class="menu-heading">Mitigation Strategy</p>
          </button>
        </div>

         <!-- SUPPORT REQUESTS - Restricted during testing -->
         <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/exceptions') }" @click="navigateTo('/exceptions')">
          <i class="bi bi-exclamation-circle nav-menu"></i>
          <p class="menu-heading">Support Requests</p></button>
        </div>

        <!-- TICKETS - Restricted during testing -->
        <div>
          <button class="btn border-0" :class="{ activeBtn: isActive('/supportticket') }" @click="navigateToTickets()">
            <i class="bi bi-question-circle nav-menu"></i>
            <p class="menu-heading">Tickets</p>
          </button>
        </div>



      </div>

    </div>
    </div>

  </main>
</template>

<script>
import { RouterLink, useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: 'DashboardMenu',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const isActive = (path) => route.path === path;

    return { route, router, isActive };
  },
  data() {
    return {
      activeReportId: localStorage.getItem("reportId") || ""
    };
  },
  methods: {
    isTestingInProgress() {
      const isTesting = localStorage.getItem("testingInProgress") === "true";
      if (!isTesting) return false;

      // Check if 20 seconds have passed
      const startTime = Number(localStorage.getItem("testingStartTime"));
      const elapsed = Date.now() - startTime;

      if (elapsed >= 20000) {
        // Time elapsed, clear flags and allow navigation
        localStorage.removeItem("testingInProgress");
        localStorage.removeItem("testingStartTime");
        localStorage.removeItem("dashboardTestingInProgress");
        return false;
      }

      return true;
    },

    showTestingAlert() {
      // Use toast-style alert that doesn't block sidebar
      Swal.fire({
        title: "Testing in progress",
        text: "Please wait until testing completes",
        icon: "info",
        toast: true,
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.style.marginTop = '70px';
          // Set z-index on toast and its parent container
          toast.style.zIndex = '999999';
          if (toast.parentElement) {
            toast.parentElement.style.zIndex = '999999';
          }
          // Also set on swal2 container
          const swalContainer = document.querySelector('.swal2-container');
          if (swalContainer) {
            swalContainer.style.zIndex = '999999';
          }
        }
      });
    },

    navigateTo(path) {
      if (this.isTestingInProgress()) {
        this.showTestingAlert();
        return;
      }
      this.router.push(path);
    },

    navigateToTickets() {
      if (this.isTestingInProgress()) {
        this.showTestingAlert();
        return;
      }
      this.router.push({
        name: 'supportticket',
        params: { reportId: this.activeReportId }
      });
    }
  }

};
</script>
