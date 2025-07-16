<template>
    <main>
    <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <div class="col-lg-2">
            <Stepper />
        </div>
        <div class="col-lg-10 my-3">
            <div class="container-fluid welcome-bg py-5 px-5">
              <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-center mb-3">
                  <img src="../assets/images/waving-hand.png" alt="">
                </div>
                <div class="col-11">
                  <h1 class="fw-semibold welcome-head"> Welcome to VAPTfix!</h1>
                  <p class="welcome-subhead">Before we fix your information assets, ....</p>
                </div>
              </div>
              
              <div class="row">
                <div class="col-lg-8 location-card text-center py-5">
  <!-- File Upload UI (only shown if not uploading) -->
  <div v-if="!uploadingStarted">
    <!-- Hidden File Input -->
    <input
      type="file"
      ref="fileInput"
      accept=".csv,application/pdf"
      @change="handleFileUpload"
      style="display: none"
    />

    <!-- Trigger Button -->
    <button class="btn upload-report-btn" @click="triggerFileInput">
      <i class="bi bi-arrow-up-circle fs-5"></i>
    </button>

    <!-- Heading -->
    <h4 class="fw-bold mt-3">Upload vulnerability report</h4>
    <p class="text-muted location-subtext">You can upload a PDF or a CSV file</p>
  </div>

  <!-- Upload Progress UI (only shown after file selected) -->
  <div v-if="uploadingStarted" class="upload-box mt-4">
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
    </div>
    <p class="text-muted mt-2">Uploading... ({{ uploadProgress }}%)</p>
    <h5 class="fw-bold mt-1">{{ uploadedFileName }}</h5>
    <p class="text-muted">{{ uploadedFileSize }}</p>
  </div>
</div>

              </div>
              
            </div>
        </div>

    </div>
    </div>
    </section>
        
    </main>
</template>

<script>
import Stepper from '../components/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'UploadReportView',
  components: {
    Stepper,
    Vue3Select
  },
   data() {
    return {
      uploadProgress: 0,
      uploadingStarted: false,
      uploadedFileName: '',
      uploadedFileSize: ''
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Hide file UI and show progress
      this.uploadingStarted = true;
      this.uploadedFileName = file.name;
      this.uploadedFileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

      // Simulate upload
      this.simulateUpload();
    },
    simulateUpload() {
      this.uploadProgress = 0;
      const interval = setInterval(() => {
        if (this.uploadProgress < 100) {
          this.uploadProgress += 1;
        } else {
          clearInterval(interval);
        }
      }, 50); // Simulated speed
    }
  }
};
</script>

<style>
.upload-box {
  background: #f9f9f9;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  margin: auto;
}

.progress-bar-container {
  background-color: #e0e0e0;
  height: 6px;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 6px;
  background: linear-gradient(to right, #4d47ff, #a58dff);
  transition: width 0.2s ease;
}
</style>