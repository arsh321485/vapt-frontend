<template>
    <main>
    <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <div class="col-lg-2">
            <!-- <Stepper /> -->
            <section class="bg-light">
              <div class="container-fluid">
              <div class="row">
                  <div class="d-flex justify-content-center py-2">
                      <div class="stepper mt-3">
                          <!-- <a class="navbar-brand fs-3 fw-semibold" href="#">vaptfix</a> -->
                        <img src="@/assets/images/logo2.png" alt="">

                      <div class="step active">
                          <div class="step-circle">1</div>
                          <div class="label">Add location and users</div>
                      </div>

                      <div class="line active"></div>


                      <div class="step">
                          <div class="step-circle">2</div>
                          <div class="label">Risk Criteria</div>
                      </div> 

                      <div class="line"></div>

                      
                      <div class="step">
                          <div class="step-circle">3</div>
                          <div class="label">Vulnerability report</div>
                      </div>

                      <router-link to="/admindashboardonboarding" class="btn stepper-btn mt-5" tag="button">
            Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
          </router-link>

                      </div>
                      
                  </div>
              </div>
              </div>
            </section>
        </div>
        <div class="col-lg-10 my-3">
            <div class="container-fluid welcome-bg py-5 px-5">
              <div class="row ps-4">
                <div class="col-1 d-flex justify-content-center align-items-center mb-3">
                  <img src="@/assets/images/waving-hand.png" alt="">
                </div>
                <div class="col-11">
                  <h1 class="fw-semibold welcome-head"> Welcome to vaptfix!</h1>
                  <p class="welcome-subhead">Before we fix your information assets, ....</p>
                </div>
              </div>

              <div class="row ps-5">
                <div class="col-lg-8 location-card p-5 mb-5">
                  <div class="row">
                    <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-geo-alt-fill fs-4"></i>
                    </div>
                    <div class="col-8 mb-3">
                      <h4 class="fw-semibold">Pick location to upload report for:</h4>
                      <p class="text-muted" style="font-size: 15px;">Pick a location and then add a vulnerability report for it</p> 
                    </div>
                  </div> 
                  <div class="d-flex justify-content-start gap-3">
                      <div>
                          <select v-model="selectedLocation" class="form-select" @change="checkLocation">
                            <option selected disabled value="">Select Location</option>
                            
                            <option v-for="loc in locations" :key="loc" :value="loc" :disabled="isAlreadyUploaded(loc)">
                             {{ loc }}</option>
                          </select>
                      </div>
                  </div>
                </div>
              </div>
              
              <div class="row ps-5">
              <div class="col-lg-6 location-card text-center py-5">
                 <!-- Upload box -->
              <div class="text-center py-5">
                <!-- Before upload -->
                <div v-if="!uploadingStarted">
                  <input
                    type="file"
                    ref="pdfFileInput"
                    accept=".nessus,.xml,.csv,.pdf,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    @change="handleFileUpload"
                    style="display: none"
                  />
                  <button class="btn upload-report-btn" @click="triggerFileInput" :disabled="!selectedLocation">
                    <i class="bi bi-arrow-up-circle fs-5"></i>
                  </button>
                  <h4 class="fw-bold mt-3">Upload vulnerability report</h4>
                  <p class="text-muted location-subtext">
                    You can upload a PDF, CSV, Nessus, XML or Excel file
                  </p>
                </div>

                <!-- Upload progress -->
                <div v-if="uploadingStarted" class="upload-box mt-4">
                  <div class="progress-bar-container">
                    <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                  <p class="text-muted mt-2">
                    {{ uploadProgress < 100 ? 'Uploading... (' + uploadProgress + '%)' : 'Uploaded ✅' }}
                  </p>
                  <h5 class="fw-bold mt-1">{{ uploadedFileName }}</h5>
                  <p class="text-muted">{{ uploadedFileSize }}</p>
                  <div v-if="uploadProgress === 100" class="d-flex justify-content-center gap-2 mt-3">
                    
                    <button 
                      class="btn btn-sm btn-primary" 
                      @click="viewFile(uploadedFiles[uploadedFiles.length - 1])">
                      <i class="bi bi-eye"></i> View
                    </button>
                    <button 
                      class="btn btn-sm btn-danger" 
                      @click="deleteProgressFile(uploadedFiles.length - 1)">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
               </div>
                
              <div class="col-lg-6">
                <div v-if="uploadedFiles.length > 0" class="card border-0 shadow-sm py-3 px-3" style="border-radius: 18px;">
                <h6 class="text-center my-2">Uploaded Files <i class="bi bi-cloud-check"></i></h6>
                <table class="table table-bordered align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>File Name</th>
                      <th>Location</th>
                      <!-- <th>Actions</th> -->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(file, index) in uploadedFiles" :key="index">
                      <td><strong>{{ file.fileName }}</strong></td>
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
              
              <div
                v-if="toastMessage"
                class="toast-message"> {{ toastMessage }}</div>
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

export default {
  name: 'UploadReportView',
  components: {
    Stepper,
    Vue3Select
  },
  data() {
    return {
      selectedLocation: "",
      locations: ["Apply for all locations", "Greece", "Germany", "Bahrain", "Delhi"],
    uploadedFiles: [],
      uploadingStarted: false,
      uploadProgress: 0,
      uploadedFileName: "",
      uploadedFileSize: "",
      uploadedFiles: [],
      toastMessage: ""
    };
  },
 methods: {
  isAlreadyUploaded(location) {
    return this.uploadedFiles.some(file => file.location === location);
  },
  checkLocation() {
  if (this.isAlreadyUploaded(this.selectedLocation)) {
    alert(`File is already uploaded for "${this.selectedLocation}"`);
    this.selectedLocation = ""; // reset dropdown
  } else {
    // ✅ Reset upload state when user selects new location
    this.uploadingStarted = false;
    this.uploadProgress = 0;
    this.uploadedFileName = "";
    this.uploadedFileSize = "";
    this.$refs.pdfFileInput.value = "";
  }
},
  
    triggerFileInput() {
    this.$refs.pdfFileInput.click();
  },
  
  handleFileUpload(event) {
  const file = event.target.files[0];
  if (file && this.selectedLocation) {
    this.uploadingStarted = true;
    this.uploadedFileName = file.name;
    this.uploadedFileSize = (file.size / 1024).toFixed(2) + " KB";
    this.uploadProgress = 0;

    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);

        // ✅ Create URL for viewing
        const fileURL = URL.createObjectURL(file);

        this.uploadedFiles.push({
          location: this.selectedLocation,
          fileName: this.uploadedFileName,
          fileURL: fileURL   
        });

        this.showToast(`File "${this.uploadedFileName}" uploaded for ${this.selectedLocation} ✅`);

        // ❌ Don't reset here
        // Keep showing uploaded file in the progress card
      } else {
        progress += 20;
        this.uploadProgress = progress;
      }
    }, 500);
  }
},

  viewFile(file) {
    // ✅ Open the uploaded file in a new tab
    window.open(file.fileURL, "_blank");
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
      // Remove file from list
      this.uploadedFiles.splice(index, 1);

      // ✅ Reset upload bar + file info
      this.uploadingStarted = false;
      this.uploadProgress = 0;
      this.uploadedFileName = "";
      this.uploadedFileSize = "";
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
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
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
  background-image: repeating-linear-gradient(
    to bottom,
    #ccc,
    #ccc 4px,
    transparent 4px,
    transparent 8px
  );
}
.line.active {
  background-image: repeating-linear-gradient(
    to bottom,
    #6c47ff,
    #6c47ff 4px,
    transparent 4px,
    transparent 8px
  );
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  animation: fadeInOut 3s forwards;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateY(20px); }
}
</style>