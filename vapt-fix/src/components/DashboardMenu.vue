<template>
  <main>
    <div class=" d-flex">
    <div class="sidebar d-flex flex-column align-items-center pt-3 ps-2">
      <!-- Mac-style buttons (optional) -->
      <div class="mb-4 mt-3 d-flex flex-column align-items-center">
        <!-- <span class="sidebar-dot bg-danger"></span> -->
        <img src="../assets/images/smaller-logo.png" alt="">
      </div>

      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center gap-1 text-center">
         <div>
          <router-link to="/onboarding1">
          <button class="btn border-0"><i class="bi bi-house-door fs-5"></i>
          <p class="menu-heading">Home</p></button>
          </router-link>
         </div>

         <div>
          <router-link to="/vulnerabilityregister">
          <button class="btn border-0"><i class="bi bi-list-ul fs-5"></i>
          <p class="menu-heading">Register</p></button>
          </router-link>
         </div>

        <div>
          <router-link to="/assets">
          <button class="btn border-0">
          <i class="bi bi-laptop fs-5"></i>
          <p class="menu-heading">Assets</p></button>
          </router-link>
        </div>

         <div>
          <router-link to="/exceptions">
          <button class="btn border-0">
          <i class="bi bi-exclamation-circle fs-5"></i>
          <p class="menu-heading">Exceptions</p></button>
          </router-link>
        </div>

        <!-- <div>
          <router-link to="/fixes">
          <button class="btn border-0">
          <i class="bi bi-magic fs-5"></i>
          <p class="menu-heading">Fixes</p></button>
          </router-link>
        </div> -->

        <!-- <div>
          <i class="bi bi-shield-lock fs-5"></i>
          <p class="menu-heading">Patches</p>
        </div> -->

        <div>
          <router-link to="/mitigationstrategy">
          <button class="btn border-0">
          <i class="bi bi-file-earmark fs-5"></i>
          <p class="menu-heading">Mitigation Strategy</p>
          </button>
          </router-link>
        </div>

        <div>
          <router-link to="/supportticket">
          <button class="btn border-0">
          <i class="bi bi-question-circle fs-5"></i>
          <p class="menu-heading">Tickets</p></button>
          </router-link>
        </div>

        <div>
          <router-link to="/yourteam">
          <button class="btn border-0">
          <i class="bi bi-people fs-5"></i>
          <p class="menu-heading">Teams</p></button>
          </router-link>
        </div>
      </div>

      <!-- Bottom Profile Circle -->
      <div class="mt-auto d-flex flex-column align-items-center">
        <div style="background-color: #eae8ff;height:50px;width:50px;border-radius: 50%;align-items: center;display: flex;justify-content: center;margin-bottom: 10px">
          <img src="../assets/images/robot.png" alt="" style="height: 40px;width: 40px;" class="mb-2"></img>
        </div>
          <i class="bi bi-info-circle fs-5"></i>
          <p class="menu-heading ms-2">How it Works</p>
        <div class="circle-bottom">A</div>
      </div>
    </div>

    
    </div>
  </main>
</template>

<script>
export default {
  name: 'DashboardMenu',
};
</script>