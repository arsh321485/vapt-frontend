<template>
  <main>
    <!-- TOP BAR -->
    <div class="topbar">
      <img src="@/assets/images/logo-capital.png" alt="" class="h-50">
    </div>

    <div class="app">
      <!-- STEPPER -->
      <Stepper />

      <!-- CONTENT -->
      <div class="content">
        <h1>Upload Vulnerability Report</h1>
        <p>Upload findings to generate prioritized insights based on your defined risk criteria.</p>

        <!-- MAIN TWO-COLUMN ROW -->
      <div class="main-row">

        <!-- LEFT COLUMN -->
        <div class="left-column">
          <!-- Pick Location -->
          <div class="card-box location-card">
            <strong>📍 Pick location to upload report for</strong>
            <p class="mt-1">Pick a location and then add a vulnerability report for it.</p>

            <div class="d-flex gap-3 mt-3">
              <select v-model="location" class="form-select">
                <option value="">Select Location</option>
                <option>Bahrain</option>
                <option>UAE</option>
              </select>

              <select v-model="type" class="form-select">
                <option value="">Select Type</option>
                <option>External</option>
                <option>Internal</option>
              </select>
            </div>
          </div>

          <!-- Upload Box (directly below) -->
          <div
            class="upload-box"
            :class="{ dragover }"
            @dragover.prevent="dragover = true"
            @dragleave="dragover = false"
            @drop.prevent="onDrop"
          >
            <input ref="fileInput" type="file" multiple hidden @change="onFileChange" />
            <h5>Upload vulnerability report</h5>
            <p>You can upload multiple Nessus / HTML files</p>
            <button class="upload-btn" @click="openFilePicker">
              Choose files
            </button>
          </div>

          <!-- FILES TABLE -->
              <div class="files-card" v-if="uploadedFiles.length">
                <strong>Uploaded Files</strong>
                <table class="mt-3">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in uploadedFiles" :key="index">
                      <td>{{ item.file.name }}</td>
                      <td>{{ item.type }}</td>
                      <td>{{ item.location }}</td>
                      <td>
                        <i
                          class="bi bi-eye action-btn view"
                          @click="viewFile(index)"
                        ></i>
                        <i
                          class="bi bi-trash action-btn delete"
                          @click="deleteFile(index)"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="info-cards">
          <div class="info-card">
            <strong>HTML Export</strong>
            <p>When exporting HTML files, select <span class="fw-bold">“Detailed Vulnerabilities by Host”</span>.</p>
          </div>

          <div class="info-card">
            <strong>CSV Export</strong>
            <p>When exporting CSV files, ensure <span class="fw-bold">all columns are selected.</span></p>
          </div>

          <div class="info-card">
            <strong>.Nessus Export</strong>
            <p>For .nessus exports, choose the <span class="fw-bold"> Nessus option.</span></p>
          </div>
        </div>

      </div>

        <div class="cta">
          <router-link to="/admindashboardonboarding" class="btn btn-primary text-decoration-none">Next →</router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Stepper from '@/components/admin-component/Stepper.vue';

export default {
  name: "UploadReportView",
  components: { Stepper },

  data() {
    return {
      location: "",
      type: "",
      uploadedFiles: [],
      dragover: false,
    };
  },

  methods: {
    openFilePicker() {
      this.$refs.fileInput.click();
    },

    onFileChange(e) {
      this.handleFiles(e.target.files);
      e.target.value = "";
    },

    onDrop(e) {
      this.dragover = false;
      this.handleFiles(e.dataTransfer.files);
    },

    handleFiles(files) {
      if (!this.location || !this.type) {
        alert("Please select location and type first");
        return;
      }

      [...files].forEach(file => {
        this.uploadedFiles.push({
          file,
          location: this.location,
          type: this.type,
        });
      });
    },

    viewFile(index) {
      const file = this.uploadedFiles[index].file;
      const reader = new FileReader();

      reader.onload = e => {
        const blob = new Blob([e.target.result], {
          type: file.type || "text/html",
        });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      };

      reader.readAsText(file);
    },

    deleteFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
  },
};
</script>

<style scoped>
  /* ===== MAIN ROW ===== */
.main-row {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  align-items: flex-start;
}

/* ===== LEFT COLUMN ===== */
.left-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 28px; /* spacing between cards */
}

/* Upload box width = Pick location card */
.left-column .upload-box {
  max-width: 100%;
}

/* ===== RIGHT COLUMN ===== */
.info-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 992px) {
  .main-row {
    flex-direction: column;
  }

  .info-cards {
    flex-direction: row;
  }
}

@media (max-width: 576px) {
  .info-cards {
    flex-direction: column;
  }
}

/*  
.location-row {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin-bottom: 28px;
  align-items: flex-start; 
}
.location-card {
  flex: 2;
  align-self: flex-start;
} */

/* Right cards container */
.info-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Individual info card */
.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid #e6e9f2;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
}
.info-card {
  transition: 
    box-shadow 0.25s ease,
    transform 0.25s ease;
}
.info-card:hover {
  transform: translateY(-3px);
}

.info-card strong {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.info-card p {
  font-size: 13px;
  color: #6b7280;
  margin: 6px 0 0;
  line-height: 1.5;
}


.cta {
      margin-top: 48px;
      text-align: right;
    }

    .btn-primary {
      background: #5a44ff;
      border: none;
      border-radius: 14px;
      padding: 16px 36px;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 50px;
    }
    .topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #F3F5FA;
  border-bottom: 1px solid #e6e9f2;
  display: flex;
  align-items: center;
  padding: 0 32px;
  z-index: 1000;
}

 .app {
  display: flex;
}
 .content {
  margin-left: 260px;      /* space for stepper */
  margin-top: 64px;        /* space for topbar */
  height: calc(100vh - 64px);
  padding: 48px 64px;
}

    h1 {
      font-size: 26px;
      font-weight: 700;
    }

    p {
      color: #6b7280;
      margin-bottom: 28px;
    }

    .card-box {
      background: #fff;
      border-radius: 18px;
      padding: 24px;
      border: 1px solid #e6e9f2;
      max-width: 900px;
      margin-bottom: 28px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
    }

    .form-select {
      border-radius: 12px;
      padding: 12px;
      max-width: 220px;
    }

    .upload-box {
      border: 2px dashed #cfd5e3;
      border-radius: 18px;
      padding: 48px;
      text-align: center;
      max-width: 900px;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
    }

    .upload-box.dragover {
      border-color: #5a44ff;
      background: #f5f6ff;
    }

    .upload-btn {
      background: #5a44ff;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 10px 22px;
      font-weight: 600;
    }

    .files-card {
      background: #fff;
      border-radius: 18px;
      padding: 20px;
      border: 1px solid #e6e9f2;
      max-width: 900px;
      margin-top: 28px;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
    }

    table {
      width: 100%;
      font-size: 14px;
    }

    th {
      color: #6b7280;
      font-weight: 600;
      border-bottom: 1px solid #e6e9f2;
      padding-bottom: 10px;
    }

    td {
      padding: 12px 0;
      border-bottom: 1px solid #f1f3f7;
      
    }

    .action-btn {
      cursor: pointer;
      margin-right: 12px;
      font-size: 16px;
    }

    .view { color: #5a44ff; }
    .delete { color: #dc2626; }
    /* ===== Smooth global transitions ===== */
.card-box,
.upload-box,
.files-card {
  transition: 
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

/* ===== Card hover effect ===== */
.card-box:hover,
.files-card:hover {
  /* box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08); */
  transform: translateY(-3px);
}

/* ===== Upload box hover ===== */
.upload-box:hover {
  box-shadow: 0 14px 32px rgba(90, 68, 255, 0.12);
  transform: translateY(-4px);
}

/* ===== Button hover (subtle) ===== */
.upload-btn,
.btn-primary {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.upload-btn:hover,
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(90, 68, 255, 0.25);
}

/* ===== Table row hover ===== */
.files-card tbody tr {
  transition: background 0.2s ease;
}

.files-card tbody tr:hover {
  background: #f6f8ff;
}

/* ===== Icon hover polish ===== */
.action-btn {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.action-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

/* larger screen */
@media screen and (min-width: 1920px) {
  .app {
    display: block;
  }
  .cta {
    margin-top: 300px;
  }
}

/* iPad Pro */
@media (max-width: 1200px) {
  .content {
    margin-left: 0px;
    margin-top: 200px;
    height: auto;
    padding: 38px 55px;
  }
  .cta {
    margin-top: 430px;
  }
}

/* iPad Air */
@media (max-width: 992px) {
  .main-row {
    flex-direction: row;
    gap: 10px;
  }
  .left-column {
    gap: 0;
  }
  .cta {
    margin-top: 245px;
  }
}

/* iPad Mini */
@media (max-width: 768px) {
  .content {
    padding: 32px 32px;
  }
  .cta {
    margin-top: 140px;
    margin-bottom: 0;
  }
}
</style>
