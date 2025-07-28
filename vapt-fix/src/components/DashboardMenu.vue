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
      <div class="flex-grow-1 d-flex flex-column align-items-center gap-3">
        <i class="bi bi-house-door-fill fs-5"></i>
        <i class="bi bi-list-ul fs-5"></i>
        <i class="bi bi-laptop fs-5"></i>
        <i class="bi bi-magic fs-5"></i>
        <i class="bi bi-clock fs-5"></i>
        <i class="bi bi-info-circle flipped-info-icon fs-5"></i>
        <i class="bi bi-question-circle fs-5"></i>
      </div>

      <!-- Bottom Profile Circle -->
      <div class="mt-auto">
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