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
            <strong>📍 Pick location to upload report</strong>
            <p class="mt-1">Pick a location and then add a vulnerability report for it.</p>

            <div class="d-flex gap-3 mt-3">
              <select v-model="location" class="form-select">
                <option disabled value="">Select Location</option>
                <option v-for="loc in locations" :key="loc._id" :value="loc._id">
                    {{ loc.location_name }}
                  </option>
              </select>

              <select v-model="type" class="form-select">
                <option disabled value="">Select Type</option>
                <option>Both</option>
                <option>External</option>
                <option>Internal</option>
              </select>
            </div>
          </div>

          <div class="upload-box" :class="{ dragover }" @dragover.prevent="dragover = true"
              @dragleave="dragover = false" @drop.prevent="onDrop">
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
                      <td class="text-capitalize">{{ item.type }}</td>
                      <td>{{ item.locationName }}</td>
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
          
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!uploadedFiles.length"
            @click="handleUploadAndRedirect"
          >
            {{ returnTo ? 'Back to Previous Page →' : 'Continue to Dashboard →' }}
          </button>
          <p v-if="showSlowUploadMsg" class="upload-warning">
            ⏳ Upload is taking longer than usual.
            Large vulnerability reports may take a few minutes.
            Please don’t refresh the page.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Stepper from '@/components/admin-component/Stepper.vue';
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
  name: "UploadReportView",
  components: { Stepper },

  data() {
    return {
      location: "",
      type: "",
      uploadedFiles: [],
      dragover: false,
      locations: [],
      authStore: null,
      adminId: "",
      isUploading: false,
    };
  },
  computed: {
  returnTo() {
    return this.$route.query.returnTo || null;
  }
},
  async mounted() {
    this.authStore = useAuthStore();
    const user = JSON.parse(localStorage.getItem("user"));
    this.adminId = user?.id;

    await this.fetchLocations();
    await this.fetchUploadedReports();
  },
  methods: {
    async fetchLocations() {
      const res = await this.authStore.fetchLocationsByAdminId(this.adminId);
      if (res.status) {
        this.locations = this.authStore.locations;
      }
    },
    openFilePicker() {
      if (!this.location || !this.type) {
        Swal.fire({
          icon: "warning",
          title: "Selection required",
          text: "Please select location and type first",
        });
        return;
      }
      this.$refs.fileInput.click();
    },
    onFileChange(e) {
      this.handleFiles([...e.target.files]);
      e.target.value = "";
    },
    onDrop(e) {
      this.dragover = false;
      this.handleFiles([...e.dataTransfer.files]);
    },
    /* ---------------- HANDLE FILES (UPLOAD HERE) ---------------- */
    async handleFiles(files) {
      for (const file of files) {
        const selectedLocation = this.locations.find(
          loc => loc._id === this.location
        );
        this.isUploading = true;
        Swal.fire({
          title: "Uploading report...",
          html: `
        <p style="font-size:14px;color:#6b7280">
          Large vulnerability reports may take a few minutes.<br/>
          Please don’t refresh the page.
        </p>
      `,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => Swal.showLoading(),
        });
        try {
      const res = await this.authStore.uploadVulnerabilityReport({
  locationId: this.location,
  memberType: this.type.toLowerCase(),
  file
});

Swal.close();
this.isUploading = false;

// ❌ DUPLICATE FILE
if (!res.status && res.isDuplicate) {
  Swal.fire({
    icon: "warning",
    title: "Duplicate File",
    text: res.message, // 👈 backend message
    confirmButtonColor: "#5a44ff"
  });
  continue; // 🔥 skip adding file
}

// ❌ OTHER ERROR
if (!res.status) {
  Swal.fire({
    icon: "error",
    title: "Upload failed",
    text: res.message || "Something went wrong while uploading.",
  });
  continue;
}

// ✅ SUCCESS ONLY
this.uploadedFiles.push({
  file,
  reportId: res.data?.results?.[0]?._id || res.data?.id,
  locationId: this.location,
  locationName: selectedLocation?.location_name || "",
  type: this.type,
});

// reset selection
this.location = "";
this.type = "";


    } catch (err) {
      Swal.close();
      this.isUploading = false;

      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Something went wrong while uploading.",
      });
    }
      }
    },
    /* ---------------- FINAL CONTINUE BUTTON ---------------- */
    handleUploadAndRedirect() {
      // 🟢 CASE 2: Came from another page
  if (this.returnTo) {
    this.$router.push(this.returnTo);
    return;
  }

      this.$router.push("/admindashboardonboarding");
    },
    /* ---------------- FILE PREVIEW ---------------- */
    async viewFile(index) {
  const item = this.uploadedFiles[index];

  try {
    // 1️⃣ Call View API (this is already authenticated via Axios interceptor)
    const res = await this.authStore.getUploadReportById(item.reportId);

    if (!res.status || !res.data?.file) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to retrieve report",
      });
      return;
    }

    // 2️⃣ Open file directly (NO TOKEN)
    window.open(res.data.file, "_blank");

  } catch (error) {
    console.error("View file error:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to open the report.",
    });
  }
}



,
    async deleteFile(index) {
  const report = this.uploadedFiles[index];

  // 🔐 Safety check
  if (!report?.reportId) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Report ID not found",
    });
    return;
  }

  // 🟡 Confirm delete
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Delete Report?",
    text: "Are you sure you want to delete this uploaded report?",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
  });

  if (!confirm.isConfirmed) return;

  // 🔥 Call API
  const res = await this.authStore.deleteUploadReport(report.reportId);

  if (!res.status) {
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: res.message,
    });
    return;
  }

  // ✅ Remove from table
  this.uploadedFiles.splice(index, 1);

  Swal.fire({
    icon: "success",
    title: "Deleted",
    text: "Upload report deleted successfully",
    timer: 1500,
    showConfirmButton: false,
  });
    },
    async fetchUploadedReports() {
  const res = await this.authStore.getAllUploadReports();

  if (!res.status) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to fetch uploaded reports",
    });
    return;
  }

  // 🔁 Map backend response to table format
  this.uploadedFiles = res.data.map(report => ({
    reportId: report._id,               // 👈 REQUIRED for delete
    fileUrl: report.file,               // backend file URL
    file: { name: report.file.split("/").pop() }, // fake File name for table
    locationId: report.location,
    locationName: report.location_name,
    type: report.member_type,
    status: report.status,
    parsedCount: report.parsed_count,
    uploadedAt: report.uploaded_at,
  }));
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
/* .left-column .upload-box {
  max-width: 100%;
} */

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

/* Right cards container */
.info-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
}

/* Individual info card */
.info-card {
  /* background: #fff; */
  box-shadow: 0 4px 20px rgba(90, 68, 255, 0.18);
  border-left: 4px solid #5a44ff;
  background: linear-gradient(135deg, rgba(117, 100, 248, 0.12) 0%, rgba(117, 100, 248, 0.08) 100%);
  border-radius: 16px;
  padding: 18px 20px;
  /* border: 1px solid #e6e9f2; */
  /* box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08); */
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
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.info-card p {
  /* font-size: 15px; */
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
  .main-row {
    display: flex;
    gap: 45px;
    max-width: 1520px;
    align-items: flex-start;
  }
  .info-cards {
    gap: 30px;
    margin-top: 40px;
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
  .info-cards {
  gap: 7px;
  margin-top: 8px;
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
  .info-cards {
  gap: 7px;
  margin-top: 0px;
}
}
</style>
