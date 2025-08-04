<template>
  <main>
    <div class="d-flex">
    <div class="sidebar d-flex flex-column align-items-center py-3">
      <!-- Mac-style buttons (optional) -->
      <div class="mb-4 mt-3 d-flex flex-column align-items-center">
        <!-- <span class="sidebar-dot bg-danger"></span> -->
        <img src="../assets/images/smaller-logo.png" alt="">
      </div>

      <!-- Navigation Icons -->
      <div class="flex-grow-1 d-flex flex-column align-items-center gap-3 text-center">
         <div>
          <i class="bi bi-house-door fs-5"></i>
          <p class="menu-heading">Home</p>
         </div>
         <div>
          <i class="bi bi-list-ul fs-5"></i>
          <p class="menu-heading">Register</p>
         </div>
        <div>
          <i class="bi bi-laptop fs-5"></i>
          <p class="menu-heading">Assets</p>
        </div>
        <div>
          <i class="bi bi-magic fs-5"></i>
          <p class="menu-heading">Fixes</p>
        </div>
        <div>
          <i class="bi bi-shield-lock fs-5"></i>
          <p class="menu-heading">Patches</p>
        </div>
        <div>
          <i class="bi bi-exclamation-circle fs-5"></i>
          <p class="menu-heading">Exceptions</p>
        </div>
        <div>
          <i class="bi bi-file-earmark fs-5"></i>
          <p class="menu-heading">Mitigation Strategy</p>
        </div>
        <div>
          <i class="bi bi-question-circle fs-5"></i>
          <p class="menu-heading">Tickets</p>
        </div>
      </div>

      <!-- Bottom Profile Circle -->
      <div class="mt-auto d-flex flex-column align-items-center">
          <i class="bi bi-info-circle fs-5"></i>
          <p class="menu-heading">How it Works</p>
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