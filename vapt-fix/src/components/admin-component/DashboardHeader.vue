<template>
  <main>
    <!-- style="margin:0 !important;padding: 0 !important;" -->
   <div class="col-12 px-0 browser-header">
  <div class="browser-bar d-flex align-items-center py-2 px-3">
    <img src="@/assets/images/smaller-logo.png" alt="" class="mx-4">
    <!-- Mac-style traffic lights -->
    <div class="d-flex align-items-center me-4 ms-4">
      <span class="dashboard-circle bg-danger me-2"></span>
      <span class="dashboard-circle bg-warning me-2"></span>
      <span class="dashboard-circle bg-success me-2"></span>
    </div>

    <div class="me-4"><i class="bi bi-layout-sidebar"></i></div>

    <!-- Back / Forward -->
    <div class="d-flex align-items-center text-secondary me-3">
      <i class="bi bi-chevron-left me-3 cursor-pointer"></i>
      <i class="bi bi-chevron-right cursor-pointer"></i>
    </div>

    <!-- Address Bar -->
    <div class="d-flex justify-content-center w-100">
      <div class="my-1">
        <i class="bi bi-shield-shaded me-2" style="font-size: 18px; color: #6c757d;"></i>
      </div>

      <div class="address-bar d-flex align-items-center px-2 py-1 rounded bg-white border w-50">
        <div class="d-flex align-items-center me-2">
          <i class="bi bi-lock-fill text-muted"></i>
        </div>

        <input type="text" readonly class="form-control border-0 p-0 bg-transparent text-muted text-center"
          value="https://www.vaptfix.com/home" />
        <i class="bi bi-arrow-clockwise text-muted ms-2"></i>
      </div>
    </div>

    <!-- Right icons -->
    <div class="d-flex align-items-center ms-3 text-secondary">
      <i class="bi bi-upload me-4 cursor-pointer"></i>
      <i class="bi bi-plus-lg me-4 cursor-pointer"></i>
      <i class="bi bi-window cursor-pointer"></i>
    </div>
  </div>
  <hr class="m-0">
</div>

  </main>
</template>

<script>
export default {
  name: 'DashboardHeader',
};
</script>

<style scoped>
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
  height: 32px; /* optional: make logo smaller if needed */
}

.dashboard-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

</style>
