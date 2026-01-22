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
        <div class="d-flex justify-content-between">
          <div>
            <h1>Upload Targets for Assessment</h1>
            <p>Add IP addresses, URLs, or subnets to begin vulnerability testing and risk analysis.</p>
          </div>


          <!-- Testing Type (Unified UI) -->
          <div class="testing-type">
            <select v-model="selectedTestingType" class="form-select testing-select" :disabled="!showTestingDropdown">
              <option v-for="type in allowedTestingTypes" :key="type" :value="type">
                {{ formatTestingType(type) }}
              </option>
            </select>
          </div>
        </div>

        <!-- MAIN TWO-COLUMN ROW -->
        <div class="main-row">

          <!-- LEFT COLUMN -->
          <div class="left-column ">
            <!-- Pick Location -->
            <!-- <div class="card-box location-card">
            <strong>📍 Pick location to upload report</strong>
            <p class="mt-1">Pick a location and then add a vulnerability report for it.</p>

            <div class="d-flex gap-3 mt-3">
              <select v-model="location" class="form-select">
                <option disabled value="">Select Location</option>
                <option v-for="loc in availableLocations" :key="loc._id" :value="loc._id">
                    {{ loc.location_name }}
                  </option>
              </select>

              <select v-model="type" class="form-select">
                <option disabled value="">Select Type</option>
                <option value="Both" :disabled="disabledTypes.includes('both')">Both</option>
                <option value="External" :disabled="disabledTypes.includes('external')">External</option>
                <option value="Internal" :disabled="disabledTypes.includes('internal')">Internal</option>
              </select>
            </div>
          </div> -->




            <div class="upload-box ip-box">
              <h5>Enter target IPs / URLs</h5>
              <p>
                Paste IPs or URLs manually, or upload a CSV / Excel file.
                <br />
                (Only IPs & URLs will be extracted)
              </p>

              <!-- TEXTAREA -->


              <textarea class="form-control ip-textarea" v-model="ipInput" @keydown.enter.prevent="validateLastEntry"
                @blur="buildTargetCards" placeholder="Example:
192.168.1.1
https://example.com"></textarea>



              <!-- ACTIONS -->
              <div class="ip-actions">
                <input ref="fileInput" type="file" accept=".csv,.xlsx,.xls,.txt" hidden @change="handleFileUpload" />

                <button class="btn btn-primary" @click="$refs.fileInput.click()">
                  Upload CSV / Excel /Text File
                </button>

                <span class="ip-count">{{ extractedList.length }} targets</span>
              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN -->
          <div class="info-cards">
            <div class="info-card">
              <strong>Manual Entry</strong>
              <p>Enter one IP address or URL per line. Only valid entries are accepted.</p>
            </div>

            <div class="info-card">
              <strong>Excel / CSV /Text File Upload </strong>
              <p>Upload an Excel , CSV , Text file containing IP addresses or URLs in any column. Only valid targets
                will be
                extracted.</p>
            </div>

            <div class="info-card">
              <strong>Text Paste</strong>
              <p>Paste IP addresses or URLs, one per line. Invalid entries will be ignored.</p>
            </div>
          </div>

        </div>

        <!-- TARGET CARDS -->
        <div class="files-card-grid">

          <!-- INTERNAL -->
          <div class="files-card" v-if="internalTargets.length">

            <div class="card-header-title">
              Internal Targets
            </div>

            <table class="mt-3">
              <thead>
                <tr>
                  <th class="col-serial">S.No.</th>
                  <th class="col-value">IP Address</th>

                </tr>
              </thead>

              <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('internal')">

                <tr v-for="(item, index) in internalTargets" :key="'int-' + index" draggable="true"
                  @dragstart="onDragStart(item, 'internal')">

                  <td class="col-serial">{{ index + 1 }}</td>
                  <td class="col-value">
                    {{ item.ip }}
                    <span v-if="item.count" class="subnet-count">
                      ({{ item.count }})
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- EXTERNAL -->
          <div class="files-card" v-if="externalTargets.length">

            <div class="card-header-title">
              External Targets
            </div>

            <table class="mt-3" @dragover.prevent @drop="onDropTarget('external')">
              <thead>
                <tr>
                  <th class="col-serial">S.No.</th>
                  <th class="col-value">IP Address</th>

                </tr>
              </thead>

              <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('external')">
                <tr v-for="(item, index) in externalTargets" :key="'ext-' + index" draggable="true"
                  @dragstart="onDragStart(item, 'external')">
                  <!-- <td>{{ index + 1 }}</td>
                  <td>
                    {{ item.ip }}
                    <span v-if="item.count" class="text-muted">
                      ({{ item.count }})
                    </span>
                  </td> -->

                  <td class="col-serial">{{ index + 1 }}</td>
                  <td class="col-value">
                    {{ item.ip }}
                    <span v-if="item.count" class="subnet-count">
                      ({{ item.count }})
                    </span>
                  </td>



                </tr>
              </tbody>
            </table>
          </div>

          <!-- WEB APP -->
          <div class="files-card" v-if="webAppTargets.length">

            <div class="card-header-title">
              Web App Targets
            </div>

            <table class="mt-3">
              <thead>
                <tr>
                  <th class="col-serial">S.No.</th>
                  <th class="col-value">URL</th>

                </tr>
              </thead>

              <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('webapp')">
                <tr v-for="(item, index) in webAppTargets" :key="'web-' + index" draggable="true"
                  @dragstart="onDragStart(item, 'webapp')">
                  <td class="col-serial">{{ index + 1 }}</td>
                  <td class="col-value">
                    {{ item.url }}
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

          <!-- MOBILE APP -->
          <div class="files-card" v-if="mobileAppTargets.length">

            <div class="card-header-title">
              Mobile App Targets
            </div>

            <table class="mt-3">
              <thead>
                <tr>
                  <th class="col-serial">S.No.</th>
                  <th class="col-value">URL</th>

                </tr>
              </thead>
              <tbody class="scroll-body">
                <tr v-for="(item, index) in mobileAppTargets" :key="index">
                  <!-- <td>{{ index + 1 }}</td>
                  <td>{{ item.url }}</td> -->

                  <td class="col-serial">{{ index + 1 }}</td>
                  <td class="col-value">
                    {{ item.url }}

                  </td>


                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div class="cta">

          <button type="button" class="btn btn-primary" :disabled="!hasTargets" @click="handleUploadAndRedirect">
            {{ returnTo ? 'Back to Previous Page →' : 'Continue to Dashboard →' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Stepper from '@/components/admin-component/Stepper.vue';
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

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
      ipInput: "",
      extractedList: [],
      internalTargets: [],
      externalTargets: [],
      webAppTargets: [],
      mobileAppTargets: [],
      draggedItem: null,
      draggedFrom: null,
      testingType: "",
      allowedTestingTypes: [],   // from API
      selectedTestingType: "",   // final selected value
      showTestingDropdown: false
    };
  },
  watch: {

    location() {
      this.type = '';
    },

    uploadedFiles: {
      handler(files) {
        const hasSuccessfulUploads = files.some(f => f.status === 'success');
        if (hasSuccessfulUploads && this.authStore) {
          this.authStore.markStepCompleted(3);
        }
      },
      deep: true
    }
  },
  computed: {
    returnTo() {
      return this.$route.query.returnTo || null;
    },
    // Map: locationId → Set of used types
    usedTypesByLocation() {
      const map = {};
      for (const file of this.uploadedFiles) {
        if (!map[file.locationId]) {
          map[file.locationId] = new Set();
        }
        map[file.locationId].add(file.type.toLowerCase());
      }
      return map;
    },
    // Filter locations that already have both External AND Internal (or "Both") uploaded
    availableLocations() {
      return this.locations.filter(loc => {
        const used = this.usedTypesByLocation[loc._id];
        if (!used) return true; // No uploads yet - show it

        // Hide if "both" was uploaded
        if (used.has('both')) return false;

        // Hide if both internal AND external were uploaded separately
        if (used.has('internal') && used.has('external')) return false;

        return true; // Still needs files
      });
    },
    // Get disabled types for currently selected location
    disabledTypes() {
      if (!this.location) return [];
      const used = this.usedTypesByLocation[this.location];
      if (!used) return []; // First time - nothing disabled

      // If "both" was selected, disable everything
      if (used.has('both')) return ['both', 'external', 'internal'];

      // If both internal AND external uploaded, disable all
      if (used.has('internal') && used.has('external')) {
        return ['both', 'external', 'internal'];
      }

      // Disable what's already used + "Both" (since partial exists)
      const disabled = ['both']; // Can't select "Both" if any individual type exists
      if (used.has('internal')) disabled.push('internal');
      if (used.has('external')) disabled.push('external');

      return disabled;
    },
    // Check if there are any targets in the cards (for enabling Continue button)
    hasTargets() {
      return (
        this.internalTargets.length > 0 ||
        this.externalTargets.length > 0 ||
        this.webAppTargets.length > 0 ||
        this.mobileAppTargets.length > 0
      );
    },

  },

  uploadedFiles: {
    handler(files) {
      const hasSuccessfulUploads = files.some(f => f.status === 'success');
      if (hasSuccessfulUploads && this.authStore) {
        this.authStore.markStepCompleted(3);
      }
    },
    deep: true
  },
  async mounted() {
    this.authStore = useAuthStore();
    const user = JSON.parse(localStorage.getItem("user"));
    this.adminId = user?.id;

    await this.fetchLocations();
    await this.fetchUploadedReports();

    if (this.adminId) {
      await this.fetchTestingTypes();
    }
    // ✅ Check if step 3 should be marked completed on page load
    if (this.uploadedFiles.some(f => f.status === 'success')) {
      this.authStore.markStepCompleted(3);
    }
  },
  methods: {
    async fetchTestingTypes() {
      const res = await this.authStore.getAdminTestingTypes(this.adminId);

      if (!res.status) {
        Swal.fire(
          "Error",
          res.message || "Unable to fetch testing types",
          "error"
        );
        return;
      }

      this.allowedTestingTypes = res.testingTypes || [];

      // 🔥 RULES IMPLEMENTATION
      if (this.allowedTestingTypes.length === 1) {
        // Only one → auto select, no dropdown
        this.selectedTestingType = this.allowedTestingTypes[0];
        this.showTestingDropdown = false;
      } else if (this.allowedTestingTypes.length > 1) {
        // Two or more → dropdown, first selected
        this.selectedTestingType = this.allowedTestingTypes[0];
        this.showTestingDropdown = true;
      }
    },

    formatTestingType(type) {
      return type
        .replace("_", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
    },
    onDragStart(item, from) {
      this.draggedItem = item;
      this.draggedFrom = from;
    },
    onDropTarget(to) {
      if (!this.draggedItem) return;

      const from = this.draggedFrom;

      // 🟢 SAME SOURCE DROP → JUST RE-ADD SAFELY
      if (from === to) {
        if (to === 'external' && this.draggedItem.ip) {
          if (!this.externalTargets.some(t => t.ip === this.draggedItem.ip)) {
            this.externalTargets.push(this.draggedItem);
          }
        }
        this.draggedItem = null;
        this.draggedFrom = null;
        return;
      }

      // 🔹 REMOVE FROM SOURCE
      if (from === 'internal') {
        this.internalTargets = this.internalTargets.filter(
          t => t.ip !== this.draggedItem.ip
        );
      } else if (from === 'external') {
        this.externalTargets = this.externalTargets.filter(
          t => t.ip !== this.draggedItem.ip
        );
      } else if (from === 'webapp') {
        this.webAppTargets = this.webAppTargets.filter(
          t => t.url !== this.draggedItem.url
        );
      }

      // 🔹 ADD TO DESTINATION
      if (to === 'internal' && this.draggedItem.ip) {
        if (!this.internalTargets.some(t => t.ip === this.draggedItem.ip)) {
          this.internalTargets.push(this.draggedItem);
        }
      }

      else if (to === 'external' && this.draggedItem.ip) {
        if (!this.externalTargets.some(t => t.ip === this.draggedItem.ip)) {
          this.externalTargets.push(this.draggedItem);
        }
      }

      else if (to === 'webapp') {
        const newUrl = this.draggedItem.url
          ? this.draggedItem.url
          : `http://${this.draggedItem.ip}`;

        if (!this.webAppTargets.some(t => t.url === newUrl)) {
          this.webAppTargets.push({ url: newUrl });
        }
      }

      // 🔄 RESET
      this.draggedItem = null;
      this.draggedFrom = null;
    },
    buildTargetCards() {
      this.internalTargets = [];
      this.externalTargets = [];
      this.webAppTargets = [];
      this.mobileAppTargets = [];
      this.extractedList = [];

      const targets = this.ipInput
        .split(/\n|,/)
        .map(v => v.trim())
        .filter(Boolean);

      targets.forEach(value => {

        // ✅ SUBNET
        if (this.isValidSubnet(value)) {
          const count = this.getSubnetCount(value);

          const target = { ip: value, count };
          this.extractedList.push(value);

          if (this.isPrivateIP(value)) {
            this.internalTargets.push(target);
          } else {
            this.externalTargets.push(target);
          }
        }

        // ✅ SINGLE IP
        else if (this.isValidIP(value)) {
          const target = { ip: value };
          this.extractedList.push(value);

          if (this.isPrivateIP(value)) {
            this.internalTargets.push(target);
          } else {
            this.externalTargets.push(target);
          }
        }

        // ✅ URL
        else if (this.isValidURL(value)) {
          this.webAppTargets.push({ url: value });
          this.extractedList.push(value);
        }
      });
    },
    isPrivateIP(value) {
      return (
        value.startsWith("10.") ||
        value.startsWith("192.168.") ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(value)
      );
    },
    isValidSubnet(value) {
      const cidrRegex =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}\/([0-9]|[1-2][0-9]|3[0-2])$/;
      return cidrRegex.test(value);
    },
    // ✅ COUNT IPs IN SUBNET (ADD THIS HERE)
    getSubnetCount(cidr) {
      const mask = parseInt(cidr.split("/")[1], 10);
      return Math.pow(2, 32 - mask);
    },
    viewInternalTarget(index) {
      console.log("View internal target:", this.internalTargets[index]);
    },
    viewExternalTarget(index) {
      console.log("View external target:", this.externalTargets[index]);
    },
    viewWebTarget(index) {
      window.open(this.webAppTargets[index].url, "_blank");
    },
    viewMobileTarget(index) {
      window.open(this.mobileAppTargets[index].url, "_blank");
    },
    validateLastEntry() {
      const lines = this.ipInput.split("\n").filter(l => l.trim() !== "");
      if (!lines.length) return;

      const lastValue = lines[lines.length - 1].trim();

      // ✅ IP / Subnet / URL accepted
      if (
        this.isValidIP(lastValue) ||
        this.isValidSubnet(lastValue) ||
        this.isValidURL(lastValue)
      ) {
        this.ipInput += "\n";
        this.buildTargetCards();
        return;
      }

      // ❌ Invalid
      lines.pop();
      this.ipInput = lines.join("\n") + (lines.length ? "\n" : "");

      Swal.fire({
        icon: "error",
        title: "Invalid entry",
        text: `"${lastValue}" is not a valid IP, subnet, or URL.`,
        confirmButtonColor: "#5a44ff"
      });
    },
    sanitizeIpInput() {
      const values = this.ipInput.split(/\n|,/);
      const validTargets = this.extractValidTargets(values);

      if (!validTargets.length) {
        Swal.fire({
          icon: "warning",
          title: "No valid targets",
          text: "Please enter at least one valid IP or URL.",
        });
        return;
      }

      this.ipInput = validTargets.join("\n");
    },
    // 🔹 Extract IPs & URLs from textarea
    extractTargetsFromText() {
      const ipRegex =
        /\b((25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)\b/g;

      const urlRegex =
        /\bhttps?:\/\/[^\s,]+|\bwww\.[^\s,]+/gi;

      const text = this.ipInput;

      const ips = text.match(ipRegex) || [];
      const urls = text.match(urlRegex) || [];

      this.extractedList = [...new Set([...ips, ...urls])];
    },
    extractValidTargets(values) {
      const validTargets = [];

      values.forEach(v => {
        const value = String(v).trim();
        if (!value) return;

        if (
          this.isValidIP(value) ||
          this.isValidSubnet(value) ||
          this.isValidURL(value)
        ) {
          validTargets.push(value);
        }
      });

      return [...new Set(validTargets)];
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      const fileName = file.name.toLowerCase();

      // Handle plain text files
      if (fileName.endsWith('.txt')) {
        reader.onload = e => {
          const text = e.target.result;
          const lines = text.split(/\r?\n/);
          const validTargets = this.extractValidTargets(lines);

          // Append to textarea
          this.ipInput = [...new Set([
            ...this.ipInput.split(/\n|,/).map(v => v.trim()).filter(Boolean),
            ...validTargets
          ])].join("\n");

          // Build cards
          this.buildTargetCards();
        };
        reader.readAsText(file);
      }
      // Handle Excel/CSV files
      else {
        reader.onload = e => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const flatValues = rows.flat();

          const validTargets = this.extractValidTargets(flatValues);

          // Append to textarea
          this.ipInput = [...new Set([
            ...this.ipInput.split(/\n|,/).map(v => v.trim()).filter(Boolean),
            ...validTargets
          ])].join("\n");

          // Build cards
          this.buildTargetCards();
        };
        reader.readAsArrayBuffer(file);
      }

      event.target.value = "";
    },
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
    isValidIP(value) {
      const ipRegex =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
      return ipRegex.test(value);
    },

    isValidURL(value) {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
      return urlRegex.test(value);
    },


    /* ---------------- ASYNC UPLOAD (BACKGROUND) ---------------- */
    async uploadFileAsync(file, locationId, memberType, fileIndex) {
      try {
        const res = await this.authStore.uploadVulnerabilityReport({
          locationId,
          memberType,
          file
        });

        // ❌ DUPLICATE FILE
        if (!res.status && res.isDuplicate) {
          this.uploadedFiles[fileIndex].status = 'error';
          this.uploadedFiles[fileIndex].errorMsg = res.message;
          Swal.fire({
            icon: "warning",
            title: "Duplicate File",
            text: res.message,
            confirmButtonColor: "#5a44ff"
          });
          return;
        }

        // ❌ OTHER ERROR
        if (!res.status) {
          this.uploadedFiles[fileIndex].status = 'error';
          this.uploadedFiles[fileIndex].errorMsg = res.message || "Upload failed";
          Swal.fire({
            icon: "error",
            title: "Upload failed",
            text: res.message || "Something went wrong while uploading.",
          });
          return;
        }

        // ✅ SUCCESS - update status and reportId
        this.uploadedFiles[fileIndex].status = 'success';
        this.uploadedFiles[fileIndex].reportId = res.data?.results?.[0]?._id || res.data?.id;

      } catch (err) {
        this.uploadedFiles[fileIndex].status = 'error';
        this.uploadedFiles[fileIndex].errorMsg = "Something went wrong";
        Swal.fire({
          icon: "error",
          title: "Upload failed",
          text: "Something went wrong while uploading.",
        });
      }
    },
    /* ---------------- FINAL CONTINUE BUTTON ---------------- */
    // handleUploadAndRedirect() {
    //   // 🟢 CASE 2: Came from another page
    //   if (this.returnTo) {
    //     this.$router.push(this.returnTo);
    //     return;
    //   }

    //   this.$router.push("/admindashboardonboarding");
    // },

    handleUploadAndRedirect() {
      // 🔐 Mark dashboard as locked
      localStorage.setItem("dashboardTestingInProgress", "true");
      localStorage.setItem("testingInProgress", "true");
      localStorage.setItem("testingStartTime", Date.now().toString());

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
    },
    async deleteFile(index) {
      const report = this.uploadedFiles[index];

      // 🔄 If still uploading or errored without reportId, just remove from list
      if (report.status === 'uploading' || report.status === 'error') {
        const confirm = await Swal.fire({
          icon: "warning",
          title: report.status === 'uploading' ? "Cancel Upload?" : "Remove Entry?",
          text: report.status === 'uploading'
            ? "This file is still uploading. Remove it from the list?"
            : "Remove this failed upload from the list?",
          showCancelButton: true,
          confirmButtonText: "Yes, remove",
          cancelButtonText: "Cancel",
          confirmButtonColor: "#d33",
        });

        if (confirm.isConfirmed) {
          this.uploadedFiles.splice(index, 1);
        }
        return;
      }

      // 🔐 Safety check for completed uploads
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
        status: 'success',                  // Already uploaded = success
        parsedCount: report.parsed_count,
        uploadedAt: report.uploaded_at,
      }));
    },

  },
};
</script>

<style scoped>
.testing-select:disabled {
  background-color: #f1f3f5;
  color: #333;
  cursor: default;
  opacity: 1;
  /* remove faded look */
}

.testing-type {
  min-width: 200px;
}

.testing-select {
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
}

/* ===== Card Header ===== */
.card-header-title {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #111827;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e9f2;
}

/* ===== Table ===== */
.files-card table {
  width: 100%;
  border-collapse: collapse;
}

/* Column widths */
.col-serial {
  width: 80px;
  text-align: center;
  color: #6b7280;
}

.col-value {
  text-align: left;
  padding-left: 8px;
}

/* Header row */
.files-card thead th {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  padding: 12px 0;
}

/* Body rows */
.files-card tbody tr {
  height: 44px;
}

/* Row hover */
.files-card tbody tr:hover {
  background: #f6f8ff;
}

/* Subnet count */
.subnet-count {
  margin-left: 6px;
  font-size: 12px;
  color: #6b7280;
}

/* Drag cursor polish */
tr[draggable="true"] {
  cursor: grab;
}

tr[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.6;
}

/* Drop zone feedback */
.files-card tbody.drag-over,
.files-card tbody:hover {
  background: #f5f6ff;
}

/* Scroll polish */
.scroll-body {
  scrollbar-gutter: stable;
}




tr[draggable="true"] {
  cursor: grab;
}

tr[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.6;
}

.files-card tbody.drag-over {
  background: #f5f6ff;
}



/* ip input boxes */
.files-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .files-card-grid {
    grid-template-columns: 1fr;
  }
}


/* Scrollable table body */
.scroll-body {
  display: block;
  max-height: 220px;
  /* 👈 shows ~4–5 rows */
  overflow-y: auto;
}

/* Keep table header aligned */
.files-card table thead,
.files-card table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

/* Smooth scrollbar (optional polish) */
.scroll-body::-webkit-scrollbar {
  width: 6px;
}

.scroll-body::-webkit-scrollbar-thumb {
  background-color: #c7c7ff;
  border-radius: 10px;
}

.scroll-body::-webkit-scrollbar-track {
  background: transparent;
}



.ip-box {
  border: 2px dashed #c7c7ff;
  border-radius: 20px;
  padding: 32px;
  background: #ffffff;
}

.ip-textarea {
  margin-top: 16px;
  height: 180px;
  overflow-y: auto;
  resize: none;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.6;
  border: 1.5px dashed #c7c7ff;
  background-color: #fafbff;
}

.ip-textarea:focus {
  border-color: #5a44ff;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.15);
  outline: none;
}

.ip-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}

.ip-count {
  font-size: 13px;
  color: #6b7280;
}


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
  gap: 28px;
  /* spacing between cards */
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
  margin-left: 260px;
  /* space for stepper */
  margin-top: 64px;
  /* space for topbar */
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

.view {
  color: #5a44ff;
}

.delete {
  color: #dc2626;
}

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

/* ===== Status icon styles ===== */
.status-icon {
  font-size: 18px;
}

.text-success {
  color: #22c55e;
}

.text-danger {
  color: #ef4444;
}

/* ===== Loading spinner ===== */
.loader {
  width: 18px;
  height: 18px;
  border: 3px solid #e6e9f2;
  border-top: 3px solid #5a44ff;
  border-radius: 50%;
  display: inline-block;
  animation: loader-spin 0.8s linear infinite;
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* ===== Disabled action button ===== */
.action-disabled {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
}

/* ===== Upload warning message ===== */
.upload-warning {
  color: #f59e0b;
  font-size: 14px;
  margin-top: 12px;
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

/* Upload progress toast - top right */
.upload-toast {
  position: fixed;
  top: 80px;
  right: 24px;
  background: #22c55e;
  color: #fff;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease;
}

.upload-toast i {
  font-size: 18px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>