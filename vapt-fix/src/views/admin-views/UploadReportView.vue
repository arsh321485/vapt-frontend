<template>
  <main>
    <section class="bg-light">
      <div class="container-fluid">
        <div class="row">
          
          <div class="col-lg-12  welcome-bg">
            <div class="col-lg-10 offset-lg-2">
              <div class="container-fluid py-4">
                <div class="row">
                  <div class="d-flex flex-row align-items-start justify-content-between w-100">

                    <!-- LEFT (UNCHANGED) -->
                    <div class="d-flex flex-row">
                      <div class="mt-2">
                        <img src="@/assets/images/waving-hand.png" alt="" class="me-3">
                      </div>

                      <div>
                        <h1 class="fw-semibold welcome-head">Welcome to vaptfix!</h1>
                        <p class="welcome-subhead">Before we fix your information assets, ....</p>
                      </div>
                    </div>

                    

                  </div>
                </div>

                <div class="row">
                  <Stepper />
                </div>

                <div class="row mt-5">
                  <div class="col-lg-8 location-card py-5 px-4 mb-5">
                    <div class="row">
                      <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                        <i class="bi bi-geo-alt-fill fs-4"></i>
                      </div>
                      <div class="col-8 mb-3">
                        <h4 class="fw-semibold">Pick location to upload report for:</h4>
                        <p class="text-muted" style="font-size: 15px;">Pick a location and then add a vulnerability
                          report for it</p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-start gap-3">
                      <div>
                        <select v-model="selectedLocation" class="form-select" @change="checkLocation" :disabled="!!reportDetails">
                          <option selected disabled value="">Select Location</option>
                          <option v-if="authStore.locations && authStore.locations.length > 0" value="ALL">
                            Apply for all locations
                          </option>
                          <option v-for="loc in authStore.locations" :key="loc._id" :value="loc._id"
                            :disabled="isAlreadyUploaded(loc._id, selectedType)">
                            {{ loc.location_name }}
                          </option>
                        </select>
                      </div>
                      <div>
                        <select v-model="selectedType" class="form-select" :disabled="!!reportDetails">
                          <option selected disabled value="">Select type</option>
                          <option value="internal" :disabled="isTypeDisabled('internal')">Internal</option>
                          <option value="external" :disabled="isTypeDisabled('external')">External</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6 location-card text-center py-5">
                    <!-- Upload box -->
                    <div class="text-center py-5">
                      <!-- Before upload -->
                      <div v-if="!uploadingStarted">
                        <input type="file" ref="pdfFileInput" accept=".nessus,.html,text/html,application/octet-stream"
                          @change="handleFileUpload" style="display: none" />
                        
                        <button class="btn upload-report-btn" @click="triggerFileInput"
                          :disabled="!selectedLocation || !selectedType || uploadedFiles.length >= 1 || !!reportDetails">
                          <i class="bi bi-arrow-up-circle fs-5"></i>
                        </button>
                        <h4 class="fw-bold mt-3">Upload vulnerability report</h4>
                        <p class="text-muted location-subtext">
                          You can upload a Nessus file
                        </p>
                      </div>

                      <!-- Upload progress -->
                      <div v-if="uploadingStarted" class="upload-box mt-4">
                        <div class="progress-bar-container">
                          <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
                        </div>
                        <p class="text-muted mt-2">
                          {{ uploadProgress < 100 ? 'Uploading... (' + uploadProgress + '%)' : 'Uploaded ✅' }} </p>
                            <p class="fw-bold mt-1 small">{{ uploadedFileName }}</p>
                            <p class="text-muted">{{ uploadedFileSize }}</p>
                            <div v-if="uploadProgress === 100" class="d-flex justify-content-center gap-2 mt-3">

                              <button class="btn btn-sm btn-primary"
                                @click="viewFile(uploadedFiles[uploadedFiles.length - 1])">
                                <i class="bi bi-eye"></i> View
                              </button>
                              <button v-if="!reportDetails" class="btn btn-sm btn-danger"
                                @click="deleteProgressFile(uploadedFiles.length - 1)">
                                <i class="bi bi-trash"></i> Delete
                              </button>
                            </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div v-if="uploadedFiles.length > 0" class="card border-0 shadow-sm py-3 px-3"
                      style="border-radius: 18px;">
                      <h6 class="text-center my-2">Uploaded Files <i class="bi bi-cloud-check"></i></h6>
                      <table class="table table-bordered align-middle">
                        <thead class="table-light">
                          <tr>
                            <th>File Name</th>
                            <th>Type</th>
                            <th>Location</th>
                            <!-- <th>Actions</th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(file, index) in uploadedFiles" :key="index">
                            <td style="word-break: break-all; max-width: 200px;"><strong class="small">{{ file.fileName }}</strong></td>
                            <td>{{ file.type }}</td>
                            <td>{{ file.location }}</td>
                            <!-- <td>
                        <div class="d-flex gap-2">
                          <button class="btn btn-sm btn-primary" @click="viewFile(file)"><i class="bi bi-eye"></i></button>
                          <button class="btn btn-sm btn-danger" @click="deleteProgressFile(index)"> <i class="bi bi-trash"></i></button>
                        </div>
                      </td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div v-if="toastMessage" class="toast-message"> {{ toastMessage }}</div>
                </div>

                <div class="text-end">
                  <router-link :to="nextPath" class="btn stepper-btn mt-5" :class="{ disabled: !canGoNext }"
                    @click.prevent="!canGoNext && blockNext()">
                    {{ buttonLabel }}
                    <i class="bi bi-arrow-right-circle-fill ms-1"></i>
                  </router-link>
                  <!-- <button
  type="button"
  class="btn stepper-btn mt-5"
  :class="{ disabled: !canGoNext }"
  @click="handleNext"
>
  {{ buttonLabel }}
  <i class="bi bi-arrow-right-circle-fill ms-1"></i>
</button> -->

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
import Stepper from '@/components/admin-component/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
import { useAuthStore } from "@/stores/authStore";

export default {
  name: 'UploadReportView',
  components: {
    Stepper,
    Vue3Select
  },
  data() {
    return {
      selectedLocation: "",
      selectedLocations: [],
      authStore: useAuthStore(),
      selectedType: "",
      uploadedFiles: [],
      uploadingStarted: false,
      uploadProgress: 0,
      uploadedFileName: "",
      uploadedFileSize: "",
      uploadedFiles: [],
      toastMessage: "",
      loadingReportDetails: false,
      reportDetails: null
    };
  },
  computed: {
    canGoNext() {
      return (
        this.uploadedFiles.length > 0 &&
        this.uploadProgress === 100 &&
        !!localStorage.getItem("reportId")
      );
    },
    nextPath() {
      return "/admindashboardonboarding";
    },

    buttonLabel() {
      return this.$route.query.from === "dashboard"
        ? "Back to dashboard"
        : "Next";
    }
  },
  mounted() {
    const adminId =
      this.authStore.user?.admin_id ||
      this.authStore.user?.id ||
      this.authStore.user?._id;

    if (adminId && !this.authStore.locations.length) {
      this.authStore.fetchLocationsByAdminId(adminId);
    }

    // ✅ Fetch uploaded report details if reportId exists
    this.fetchUploadedReportDetails();
  },
  methods: {
    
    handleNext() {
      if (!this.canGoNext) {
        this.blockNext && this.blockNext();
        return;
      }

      const authStore = useAuthStore();

      // ✅ mark upload report as completed
      authStore.completeOnboardingStep("uploadreport");

      this.$router.push(this.nextPath);
    },
    checkLocation() {
      if (this.selectedLocation === "ALL") {
        this.selectedLocations = this.authStore.locations.map(
          (loc) => loc.location_name
        );
      } else {
        this.selectedLocations = [this.selectedLocation];
      }
      console.log("✅ Effective selected locations:", this.selectedLocations);
    },
    isAlreadyUploaded(locId, type) {
      if (!locId || !type) return false;
      return this.uploadedFiles.some(
        (file) => file.locationId === locId && file.type === type
      );
    },
    isTypeDisabled(type) {
      if (!this.selectedLocation || !type) return false;
      return this.isAlreadyUploaded(this.selectedLocation, type);
    },
    triggerFileInput() {
      if (this.uploadedFiles.length >= 1) {
        Swal.fire({
          icon: "info",
          title: "File already uploaded",
          text: "Only one report can be uploaded. Delete the existing file to upload a new one.",
        });
        return;
      }
      if (this.selectedLocation && this.selectedType) {
        this.$refs.pdfFileInput.click();
      }
    },
    async getFileHash(file) {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];

      if (!file || !this.selectedLocation || !this.selectedType) return;
      if (this.isAlreadyUploaded(this.selectedLocation, this.selectedType)) {
        Swal.fire({
          icon: "error",
          title: "Already uploaded",
          text: `A report for this location (${this.selectedType}) is already uploaded. Please change location or type.`,
        });
        if (this.$refs.pdfFileInput) {
          this.$refs.pdfFileInput.value = "";
        }
        return;
      }
      const fileHash = await this.getFileHash(file);
      const duplicate = this.uploadedFiles.some((f) => f.hash === fileHash);
      if (duplicate) {
        Swal.fire({
          icon: "error",
          title: "Duplicate File",
          text: "This file has already been uploaded (same content)!",
        });
        if (this.$refs.pdfFileInput) {
          this.$refs.pdfFileInput.value = "";
        }
        return;
      }

      this.uploadingStarted = true;
      this.uploadedFileName = file.name;
      this.uploadedFileSize = (file.size / 1024).toFixed(2) + " KB";
      this.uploadProgress = 20;
      const formData = new FormData();
      const locationToSend =
        this.selectedLocation === "ALL" ? "all" : this.selectedLocation;
      formData.append("location", locationToSend);
      formData.append("member_type", this.selectedType);
      formData.append("file", file);
      const res = await this.authStore.uploadReport(formData);

      if (!res.status) {
        console.error("❌ Upload report failed:", res);
        Swal.fire({
          icon: "error",
          title: "Upload failed",
          text: res.message || "Something went wrong. Please try again.",
        });

        this.uploadingStarted = false;
        this.uploadProgress = 0;
        if (this.$refs.pdfFileInput) {
          this.$refs.pdfFileInput.value = "";
        }
        return;
      }
      console.log("✅ Final upload response:", res.data);
      this.uploadProgress = 100;

      const reportId = res.reportId || res.data?.upload_report?._id || res.data?.upload_report?.id || null;

      if (reportId) {
        localStorage.setItem("reportId", reportId);
        await this.authStore.fetchTotalAssets(reportId);
        await this.authStore.fetchAvgScore(reportId);
        await this.authStore.fetchVulnerabilities(reportId);
      } else {
        console.warn("No reportId returned from upload response");
      }

      // update UI list as before (store values are now populated)
      const fileURL = URL.createObjectURL(file);

      const locationName =
        this.selectedLocation === "ALL"
          ? "All locations"
          : this.getLocationName(this.selectedLocation);

      this.uploadedFiles = [
        {
          locationId: this.selectedLocation,
          location: locationName,
          type: this.selectedType,
          fileName: this.uploadedFileName,
          fileURL,
          hash: fileHash,
          reportId,
        },
      ];

      this.showToast(
        `File "${this.uploadedFileName}" uploaded for ${locationName} (${this.selectedType}) ✅`
      );

      if (this.$refs.pdfFileInput) {
        this.$refs.pdfFileInput.value = "";
      }
    },
    getLocationName(id) {
      const loc = this.authStore.locations.find((l) => l._id === id);
      return loc ? loc.location_name : id;
    },
    viewFile(file) {
      let url = file.fileURL;

      // If fileURL is a backend path (starts with /), construct full URL
      if (url && url.startsWith('/')) {
        // Backend base URL without /api suffix
        const backendBase = 'https://vaptbackend.secureitlab.com';
        url = backendBase + url;
      }

      window.open(url, "_blank");
    },
    deleteProgressFile(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "This file will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          this.uploadedFiles.splice(index, 1);
          this.uploadingStarted = false;
          this.uploadProgress = 0;
          this.uploadedFileName = "";
          this.uploadedFileSize = "";
          this.selectedLocation = "";
          this.selectedType = "";
          this.$refs.pdfFileInput.value = "";

          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 5000);
    },
    blockNext() {
      Swal.fire({
        icon: "warning",
        title: "Upload required",
        text: "Please complete report upload before proceeding.",
      });
    },
    extractFileName(filePath) {
      if (!filePath) return "Unknown file";
      // Extract filename from path like "/media/reports/filename.html"
      const parts = filePath.split('/');
      return parts[parts.length - 1] || "Report file";
    },
    async fetchUploadedReportDetails() {
      try {
        const reportId = localStorage.getItem("reportId");

        if (!reportId) {
          console.log("ℹ️ No reportId found in localStorage");
          return;
        }

        this.loadingReportDetails = true;
        const res = await this.authStore.getUploadReportById(reportId);

        if (res.status && res.data?.upload_report) {
          this.reportDetails = res.data.upload_report;
          console.log("✅ Upload report details loaded:", this.reportDetails);

          // ✅ Pre-fill dropdowns with existing data
          this.selectedLocation = this.reportDetails.location;
          this.selectedType = this.reportDetails.member_type;

          // ✅ Populate uploadedFiles array to show in table
          this.uploadedFiles = [{
            locationId: this.reportDetails.location,
            location: this.reportDetails.location_name,
            type: this.reportDetails.member_type,
            fileName: this.extractFileName(this.reportDetails.file),
            fileURL: this.reportDetails.file, // Backend file path
            reportId: this.reportDetails._id
          }];

          // ✅ Mark as uploaded to show in UI
          this.uploadingStarted = true;
          this.uploadProgress = 100;
          this.uploadedFileName = this.extractFileName(this.reportDetails.file);

          console.log("🔒 Form locked with existing report data");
        } else if (!res.isNotFound) {
          // Only show error if it's NOT a 404 (real error occurred)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message || 'Failed to load upload report',
          });
        }
        // If it's a 404 (isNotFound = true), silently allow user to upload new
      } catch (error) {
        console.error("❌ Unexpected error fetching upload report:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred',
        });
      } finally {
        this.loadingReportDetails = false;
      }
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

.dropdown {
  position: relative;
  display: inline-block;
  width: 250px;
}

.dropdown-btn {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 50px;
  padding: 8px 40px 8px 16px;
  cursor: pointer;
  position: relative;
}

.dropdown-btn::after {
  content: "▼";
  font-size: 12px;
  color: #333;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 100%;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 4px;
}

.dropdown-content a {
  padding: 8px 12px;
  display: block;
  text-decoration: none;
  color: black;
  border-radius: 8px;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown.show .dropdown-content {
  display: block;
}

/* stepper */
.stepper {
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e4e4e4;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.step.active .step-circle {
  background-color: #6c47ff;
  color: white;
}

.label {
  margin-top: 6px;
  font-size: 0.875rem;
  color: #6c757d;
}

.step.active .label {
  color: #000;
  font-weight: 500;
}

.line {
  width: 2px;
  height: 70px;
  background-image: repeating-linear-gradient(to bottom,
      #ccc,
      #ccc 4px,
      transparent 4px,
      transparent 8px);
}

.line.active {
  background-image: repeating-linear-gradient(to bottom,
      #6c47ff,
      #6c47ff 4px,
      transparent 4px,
      transparent 8px);
}

/* Simple toast styling */
.toast-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #198754;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation: fadeInOut 3s forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  10% {
    opacity: 1;
    transform: translateY(0);
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>