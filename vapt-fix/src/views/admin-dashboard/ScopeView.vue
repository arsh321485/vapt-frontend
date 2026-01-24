<template>
  <main>
    <DashboardHeader />

    <div class="container-fluid">
      <div class="row">
        <div class="col-1">
          <DashboardMenu />
        </div>

        <div class="col-11 pt-5 pb-3 pe-4">

          <!-- HEADER -->
          <div class="d-flex justify-content-between align-items-center mb-4 pt-4">
            <div>
              <h2>Scope</h2>
              <p class="text-muted">
                View and manage all scoped targets.
              </p>
            </div>
            <div>
              <!-- Testing Type (Unified UI) -->
            <div class="testing-type">
              <select v-model="selectedTestingType" class="form-select testing-select" :disabled="!showTestingDropdown">
                <option v-for="type in allowedTestingTypes" :key="type" :value="type">
                  {{ formatTestingType(type) }}
                </option>
              </select>
            </div>
            </div>

          </div>

          <!-- TARGET CARDS -->
          <div class="scope-grid">

            <!-- INTERNAL -->
            <div class="scope-card">
              <h3 class="scope-card-title">Internal Targets</h3>

              <table class="scope-table">
                <thead>
                  <tr>
                    <th class="col-serial ">S.No</th>
                    <th class="col-value text-center">IP Address</th>
                    <th class=" col-actions">Actions</th>


                  </tr>
                </thead>

                <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('internal')">
                  <tr v-for="(item, index) in internalTargets" :key="item.id" draggable="true"
                    @dragstart="onDragStart(item, 'internal')">

                    <td class="col-serial">{{ index + 1 }}</td>
                    <td class="col-value text-center">
                      {{ item.ip }}
                      <span v-if="item.count" class="subnet-count">({{ item.count }})</span>
                    </td>
                    <td class=" col-actions actions">
                      <i class="bi bi-pencil" title="Edit" @click="openEditModal(item, 'internal')"></i>

                      <i class="bi bi-trash" title="Delete" @click="deleteTarget(item.id)"></i>

                    </td>
                  </tr>


                  <tr v-if="!internalTargets.length">
                    <td colspan="3" class="empty-state">
                      No internal targets defined
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- EXTERNAL -->
            <div class="scope-card">
              <h3 class="scope-card-title">External Targets</h3>

              <table class="scope-table">
                <thead>
                  <tr>
                    <th class="col-serial">S.No</th>
                    <th class="col-value text-center">IP Address</th>
                    <th class=" col-actions">Actions</th>


                  </tr>
                </thead>
                <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('external')">
                  <tr v-for="(item, index) in externalTargets" :key="item.id" draggable="true"
                    @dragstart="onDragStart(item, 'external')">
                    <td class="col-serial">{{ index + 1 }}</td>
                    <td class="col-value text-center">{{ item.ip }}</td>
                    <td class="col-actions actions">
                      <i class="bi bi-pencil" title="Edit" @click="openEditModal(item, 'internal')"></i>

                      <i class="bi bi-trash" title="Delete" @click="deleteTarget(item.id)"></i>

                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <!-- WEB -->
            <div class="scope-card">
              <h3 class="scope-card-title">Web App Targets</h3>

              <table class="scope-table">
                <thead>
                  <tr>
                    <th class="col-serial">S.No</th>
                    <th class="col-value text-center">URL</th>
                    <th class="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('webapp')">
                  <tr v-for="(item, index) in webAppTargets" :key="item.url || index"  draggable="true"
  @dragstart="onDragStart(item, 'webapp')">
                    <td class="col-serial">{{ index + 1 }}</td>
                    <td class="col-value text-center">{{ item.url }}</td>
                    <td class=" col-actions actions">
                      <i class="bi bi-pencil" title="Edit" @click="openEditModal(item, 'internal')"></i>

                      <i class="bi bi-trash" title="Delete" @click="deleteTarget(item.id)"></i>

                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <!-- Mobile -->
            <div class="scope-card">
              <h3 class="scope-card-title">Mobile App Targets</h3>

              <table class="scope-table">
                <thead>
                  <tr>
                    <th class="col-serial">S.No</th>
                    <th class="col-value text-center">URL</th>
                    <th class="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody class="scroll-body" @dragover.prevent @drop="onDropTarget('mobile')">
                  <tr v-for="(item, index) in mobAppTargets" :key="item.url || index"
  draggable="true"
  @dragstart="onDragStart(item, 'mobile')">
                    <td class="col-serial">{{ index + 1 }}</td>
                    <td class="col-value text-center">{{ item.url }}</td>
                    <td class=" col-actions actions">
                      <i class="bi bi-pencil" title="Edit" @click="openEditModal(item, 'internal')"></i>

                      <i class="bi bi-trash" title="Delete" @click="deleteTarget(item.id)"></i>

                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- ADD / EDIT MODAL -->
    <div v-if="showModal" class="modal-backdrop-custom">
      <div class="modal-card">
        <h3 class="modal-title">
          {{ modalMode === 'add' ? 'Add Target' : 'Edit Target' }}
        </h3>

        <!-- TYPE -->
        <label class="form-label">Target Type</label>
        <select class="form-control" v-model="form.type" :disabled="modalMode === 'edit'">
          <option value="internal">Internal</option>
          <option value="external">External</option>
          <option value="web">Web App</option>
        </select>

        <!-- VALUE -->
        <label class="form-label mt-3">
          {{ form.type === 'web' ? 'URL' : 'IP / Subnet' }}
        </label>
        <input type="text" class="form-control" v-model="form.value" placeholder="Enter IP / Subnet / URL" />

        <!-- ACTIONS -->
        <div class="modal-actions">
          <button class="btn btn-danger" @click="closeModal">
            Cancel
          </button>
          <button class="btn btn-primary" @click="saveTarget">
            Save
          </button>
        </div>
      </div>
    </div>


  </main>
</template>


<script>
import DashboardMenu from "@/components/admin-component/DashboardMenu.vue";
import DashboardHeader from "@/components/admin-component/DashboardHeader.vue";
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "ScopeView",
  components: { DashboardMenu, DashboardHeader },

  data() {
    return {
      authStore: null,
      selectedTestingType: "",   
      showTestingDropdown: false,
      testingType: "",
      allowedTestingTypes: [], 
      internalTargets: [
        { id: 1, ip: "192.168.1.10" },
        { id: 2, ip: "192.168.2.0" },
        { id: 3, ip: "192.168.1.10" },
        { id: 4, ip: "192.168.2.0" },
        { id: 5, ip: "194.165.1.10" },
        { id: 6, ip: "192.164.2.5" },
      ],
      externalTargets: [
        { id: 3, ip: "192.168.1.19" },
        { id: 3, ip: "192.156.2.00" },
      ],
      webAppTargets: [
        { id: 4, url: "https://example.com" },
        { id: 4, url: "https://demo.com" },
        { id: 4, url: "https://test.com" },
      ],
      mobAppTargets: [
        { id: 4, url: "https://mobile.com" },
        { id: 4, url: "https://demo2.com" },
        { id: 4, url: "https://test1.com" },
      ],
      draggedItem: null,
      draggedFrom: null,

      showModal: false,
      modalMode: "add",
      editingId: null,

      form: {
        type: "internal",
        value: "",
      },
    };
  },
  async mounted() {
  this.authStore = useAuthStore();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER FROM STORAGE:", user);

  this.adminId = user?.id || user?._id;
  console.log("ADMIN ID:", this.adminId);

  if (this.adminId) {
    await this.fetchTestingTypes();
  } else {
    console.error("Admin ID missing. Testing types API not called.");
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
    // 🟣 DRAG START
    onDragStart(item, from) {
      this.draggedItem = item;
      this.draggedFrom = from;
    },
    onDropTarget(to) {
  if (!this.draggedItem || this.draggedFrom === to) return;

  // 🔹 Map source & destination lists
  const listMap = {
    internal: this.internalTargets,
    external: this.externalTargets,
    webapp: this.webAppTargets,
    mobile: this.mobAppTargets,
  };

  const fromList = listMap[this.draggedFrom];
  const toList = listMap[to];

  if (!fromList || !toList) return;

  // 🔹 Determine unique key (ip or url)
  const value =
    this.draggedItem.ip ||
    this.draggedItem.url;

  // 🔹 REMOVE from source
  const fromIndex = fromList.findIndex(item =>
    (item.ip || item.url) === value
  );
  if (fromIndex !== -1) {
    fromList.splice(fromIndex, 1);
  }

  // 🔹 PREVENT duplicates in destination
  const exists = toList.some(item =>
    (item.ip || item.url) === value
  );

  if (!exists) {
    // 🔹 Normalize data per destination
    if (to === "webapp" || to === "mobile") {
      toList.push({ id: Date.now(), url: value });
    } else {
      toList.push({ id: Date.now(), ip: value });
    }
  }

  // 🔹 RESET drag state
  this.draggedItem = null;
  this.draggedFrom = null;
}
,
//     onDropTarget(to) {
//   if (!this.draggedItem || this.draggedFrom === to) return;

//   const fromList =
//     this.draggedFrom === "internal"
//       ? this.internalTargets
//       : this.externalTargets;

//   const toList =
//     to === "internal"
//       ? this.internalTargets
//       : this.externalTargets;

//   const value = this.draggedItem.ip;

//   // 🔹 REMOVE from source (reactive)
//   const fromIndex = fromList.findIndex(item => item.ip === value);
//   if (fromIndex !== -1) {
//     fromList.splice(fromIndex, 1);
//   }

//   // 🔹 PREVENT duplicates
//   if (!toList.some(item => item.ip === value)) {
//     toList.push({ ...this.draggedItem });
//   }

//   // 🔹 RESET drag state
//   this.draggedItem = null;
//   this.draggedFrom = null;
// },
    openAddModal() {
      this.modalMode = "add";
      this.form = { type: "internal", value: "" };
      this.showModal = true;
    },

    openEditModal(item, type) {
      this.modalMode = "edit";
      this.editingId = item.id;
      this.form.type = type;
      this.form.value = item.ip || item.url;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    saveTarget() {
      if (this.modalMode === "add") {
        const id = Date.now();
        this.pushTarget(id);
      } else {
        this.updateTarget();
      }
      this.showModal = false;
    },

    pushTarget(id) {
      if (this.form.type === "internal")
        this.internalTargets.push({ id, ip: this.form.value });

      if (this.form.type === "external")
        this.externalTargets.push({ id, ip: this.form.value });

      if (this.form.type === "web")
        this.webAppTargets.push({ id, url: this.form.value });
    },

    updateTarget() {
      const list =
        this.form.type === "internal"
          ? this.internalTargets
          : this.form.type === "external"
            ? this.externalTargets
            : this.webAppTargets;

      const item = list.find(i => i.id === this.editingId);
      if (!item) return;

      if (this.form.type === "web") {
        item.url = this.form.value;
      } else {
        item.ip = this.form.value;
      }
    },


    deleteTarget(id) {
      Swal.fire({
        title: "Delete Target?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete",
      }).then((result) => {
        if (result.isConfirmed) {
          this.internalTargets = this.internalTargets.filter(i => i.id !== id);
          this.externalTargets = this.externalTargets.filter(i => i.id !== id);
          this.webAppTargets = this.webAppTargets.filter(i => i.id !== id);

          Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Target removed successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    },

  }
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
/* Scroll only table body */
.scroll-body {
  display: block;
  max-height: 240px;   /* 👈 height for ~5 rows */
  overflow-y: auto;
}

/* Keep table header fixed width */
.scope-table thead,
.scope-table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

/* Optional: smooth scrollbar */
.scroll-body::-webkit-scrollbar {
  width: 6px;
}

.scroll-body::-webkit-scrollbar-thumb {
  background: #bbb7e1;
  border-radius: 6px;
}

tr[draggable="true"] {
  cursor: grab;
}

tr[draggable="true"]:active {
  cursor: grabbing;
  opacity: 0.6;
}
.scope-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

/* Card */
.scope-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 22px 24px;
  border: 1px solid #e6e9f2;
  box-shadow: 0 5px 10px #bbb7e1;
  height: 380px;
  display: flex;
  flex-direction: column;
}

/* Card title */
.scope-card-title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 18px;
   border-bottom: 3px solid #a095f0;
   display: table;         
  margin: 0 auto 28px;
  padding-bottom: 4px;       
  /* margin-bottom: 18px; */
    /* box-shadow: 0 5px 5px #bbb7e1; */
}

/* Table */
.scope-table {
  width: 100%;
  font-size: 14px;
  flex: 1;
}

.scope-table th {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
  border-bottom: 1px solid #e6e9f2;
  padding-bottom: 10px;
}

.scope-table td {
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f7;
}

/* Actions */
.actions i {
  font-size: 15px;
  margin-left: 8px;
  cursor: pointer;
}

.actions i.bi-pencil {
  color: #5a44ff;
}

.actions i.bi-trash {
  color: #dc2626;
}

/* Subnet count */
.subnet-count {
  color: #6b7280;
  font-size: 12px;
  margin-left: 4px;
}

/* URL */
.url-cell {
  word-break: break-all;
}

/* Empty state */
.empty-state {
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  padding: 24px 0;
}

/* Responsive */
@media (max-width: 992px) {
  .scope-grid {
    grid-template-columns: 1fr;
  }
}


/* MODAL BACKDROP */
.modal-backdrop-custom {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* MODAL CARD */
.modal-card {
  width: 420px;
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  animation: scaleIn 0.2s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  margin-top: 6px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 22px;
}

.btn-primary {
  background: #5a44ff;
  border: none;
}

.btn-secondary {
  background: #e5e7eb;
  border: none;
}

/* Column sizing & alignment */
.col-serial {
  width: 60px;
  text-align: center;
  padding-left: 14px;
}

.col-value {
  padding-left: 28px;
  /* 👈 pushes IP / URL to right */
}

.col-actions {
  width: 90px;
  padding-right: 14px;
}

/* Header alignment match */
.scope-table th.col-serial {
  text-align: center;
}

.scope-table th.col-value {
  padding-left: 28px;
}

/* Header alignment */
.scope-table thead th.col-value {
  text-align: center;
  
}
</style>
