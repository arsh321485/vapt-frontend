<template>
  <main>
   
    <div class="d-flex"> 
    <div class="sidebar d-flex flex-column align-items-center my-5 py-2">
      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center  text-center">
         <div>
          <router-link to="/admindashboardonboarding">
          <button class="btn border-0" :class="{ activeBtn: isActive('/admindashboardonboarding') }"><i class="bi bi-house-door nav-menu"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/scope">
          <button class="btn border-0" :class="{ activeBtn: isActive('/scope') }"><i class="bi bi-sliders nav-menu"></i>
          <p class="menu-heading">Scope</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/yourteam">
          <button class="btn border-0" :class="{ activeBtn: isActive('/yourteam') }">
          <i class="bi bi-people nav-menu"></i>
          <p class="menu-heading">Teams</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/vulnerabilityregister">
          <button class="btn border-0" :class="{ activeBtn: isActive('/vulnerabilityregister') }"><i class="bi bi-list-ul nav-menu"></i>
          <p class="menu-heading">Register</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/report">
          <button class="btn border-0" :class="{ activeBtn: isActive('/report') }"><i class="bi bi-file-earmark-text nav-menu"></i>
          <p class="menu-heading">Report</p></button>
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
          <router-link to="/exceptions">
          <button class="btn border-0" :class="{ activeBtn: isActive('/exceptions') }">
          <i class="bi bi-exclamation-circle nav-menu"></i>
          <p class="menu-heading">Support Requests</p></button>
          </router-link>
        </div>

        <div>
          
          <router-link
  :to="{
    name: 'supportticket',
    params: { reportId: activeReportId }
  }"
>
  <button
    class="btn border-0"
    :class="{ activeBtn: isActive('/supportticket') }"
  >
    <i class="bi bi-question-circle nav-menu"></i>
    <p class="menu-heading">Tickets</p>
  </button>
</router-link>

        </div>

       
        
      </div>
      
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
    activeReportId: localStorage.getItem("reportId") || ""
  };
}
  
};
</script>

