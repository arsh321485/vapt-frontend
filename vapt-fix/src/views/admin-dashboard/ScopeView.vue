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
            <div class="d-flex justify-content-between gap-3">

              <!-- project name -->
              <div class="testing-type">
    <select
      v-model="projectname"
      class="form-select testing-select"
    >
      <option value="" disabled>Select Project</option>

      <option
        v-for="(project, index) in projectList"
        :key="index"
        :value="project"
      >
        {{ project }}
      </option>
    </select>
  </div>

              <!-- Testing Type (Unified UI) -->
              <div class="testing-type">
                <select v-model="selectedTestingType" class="form-select testing-select"
                  :disabled="!showTestingDropdown">
                  <option v-for="type in allowedTestingTypes" :key="type" :value="type">
                    {{ formatTestingType(type) }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- TARGET CARDS -->
          <div class="scope-grid">

            <!-- INTERNAL TARGETS -->
            <div class="scope-card">
              <h3 class="scope-card-title">Internal Targets</h3>

              <!-- TABLE WRAPPER (SCROLL AFTER 5 ROWS) -->
              <div class="table-responsive internal-table-scroll">
                <table class="table table-light table-hover mb-0">
                  <thead class="sticky-top">
                    <tr>
                      <th style="width: 60px;">S.No</th>
                      <th>IP Address</th>
                      <th style="width: 100px;">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in internalTargets" :key="item.id">
                      <td>{{ index + 1 }}</td>

                      <td>
                        {{ item.ip }}
                        <span
                          v-if="item.count"
                          class="subnet-count ms-1"
                        >
                          ({{ item.count }})
                        </span>
                      </td>

                      <td class="text-center">
                        <i
                          class="bi bi-pencil me-3 action-icon"
                          @click="openEditModal(item, 'internal')"
                        ></i>

                        <i
                          class="bi bi-trash action-icon text-danger"
                          @click="deleteTarget(item.id)"
                        ></i>
                      </td>
                    </tr>

                    <!-- EMPTY STATE -->
                    <tr v-if="!internalTargets.length">
                      <td colspan="3" class="text-center text-muted py-4">
                        No internal targets defined
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- EXTERNAL TARGETS -->
            <div class="scope-card">
              <h3 class="scope-card-title">External Targets</h3>

              <div class="table-responsive internal-table-scroll">
                <table class="table table-light table-hover mb-0">
                  <thead class="sticky-top">
                    <tr>
                      <th style="width: 60px;">S.No</th>
                      <th>IP Address</th>
                      <th style="width: 100px;">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in externalTargets" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.ip }}</td>
                      <td class="text-center">
                        <i
                          class="bi bi-pencil me-3 action-icon"
                          @click="openEditModal(item, 'external')"
                        ></i>
                        <i
                          class="bi bi-trash action-icon text-danger"
                          @click="deleteTarget(item.id)"
                        ></i>
                      </td>
                    </tr>

                    <tr v-if="!externalTargets.length">
                      <td colspan="3" class="text-center text-muted py-4">
                        No external targets defined
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- WEB APP TARGETS -->
            <div class="scope-card">
              <h3 class="scope-card-title">Web App Targets</h3>

              <div class="table-responsive internal-table-scroll">
                <table class="table table-light table-hover mb-0">
                  <thead class="sticky-top">
                    <tr>
                      <th style="width: 60px;">S.No</th>
                      <th>URL</th>
                      <th style="width: 100px;">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in webAppTargets" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td class="text-break">{{ item.url }}</td>
                      <td class="text-center">
                        <i
                          class="bi bi-pencil me-3 action-icon"
                          @click="openEditModal(item, 'web')"
                        ></i>
                        <i
                          class="bi bi-trash action-icon text-danger"
                          @click="deleteTarget(item.id)"
                        ></i>
                      </td>
                    </tr>

                    <tr v-if="!webAppTargets.length">
                      <td colspan="3" class="text-center text-muted py-4">
                        No web app targets defined
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MOBILE APP TARGETS -->
            <div class="scope-card">
              <h3 class="scope-card-title">Mobile App Targets</h3>

              <div class="table-responsive internal-table-scroll">
                <table class="table table-light table-hover mb-0">
                  <thead class="sticky-top">
                    <tr>
                      <th style="width: 60px;">S.No</th>
                      <th>URL</th>
                      <th style="width: 100px;">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in mobAppTargets" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td class="text-break">{{ item.url }}</td>
                      <td class="text-center">
                        <i
                          class="bi bi-pencil me-3 action-icon"
                          @click="openEditModal(item, 'mobile')"
                        ></i>
                        <i
                          class="bi bi-trash action-icon text-danger"
                          @click="deleteTarget(item.id)"
                        ></i>
                      </td>
                    </tr>

                    <tr v-if="!mobAppTargets.length">
                      <td colspan="3" class="text-center text-muted py-4">
                        No mobile app targets defined
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
          <option value="mobile">Mobile App</option>
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
      internalTargets: [],
      externalTargets: [],
      webAppTargets: [],
      mobAppTargets: [],
      draggedItem: null,
      draggedFrom: null,
      showModal: false,
      modalMode: "add",
      editingId: null,
      form: {
        type: "internal",
        value: "",
      },
      projectname: "",
      projectList: [],
      adminId: null,
      isInitialLoad: true,
      scopeId: null,
    };
  },
  watch: {
    projectname: {
    immediate: true,
    async handler(newProject) {
      if (!newProject || !this.adminId) return;

      // await this.fetchTestingTypeByProject(newProject);
      await this.fetchFullScopeData(newProject);

    }
  },
  selectedTestingType: {
  async handler(newType) {
    if (!newType) return;
    if (this.isInitialLoad) return; // ⛔ skip on first load

    await this.fetchScopeTargets(newType);
  },
},

  },
  async mounted() {
  this.authStore = useAuthStore();

  const user = JSON.parse(localStorage.getItem("user"));
  this.adminId = user?.id || user?._id;

  if (this.adminId) {
    await this.fetchProjectNames(); // project → full scope
  } else {
    console.error("Admin ID missing.");
  }
  },
  methods: {
    async fetchFullScopeData(projectName) {
  const res = await this.authStore.getFullScopeData(
    this.adminId,
    projectName
  );

  if (!res.status) {
    Swal.fire("Error", res.message, "error");
    return;
  }

  const scope = res.data;
  this.scopeId = scope.id;
  // 🔄 RESET EVERYTHING
  this.internalTargets = [];
  this.externalTargets = [];
  this.webAppTargets = [];
  this.mobAppTargets = [];

  // 🔹 Testing Type (single source of truth)
  this.allowedTestingTypes = [scope.testing_type];
  this.selectedTestingType = scope.testing_type;
  this.showTestingDropdown = false;
  // this.isInitialLoad = false;

  // 🔹 Map entries → UI lists
  scope.entries.forEach(entry => {
    switch (entry.entry_type) {
      case "internal_ip":
        this.internalTargets.push({
          id: entry.id,
          ip: entry.value,
          count: entry.subnet_mask,
        });
        break;

      case "external_ip":
        this.externalTargets.push({
          id: entry.id,
          ip: entry.value,
        });
        break;

      case "web_url":
        this.webAppTargets.push({
          id: entry.id,
          url: entry.value,
        });
        break;

      case "mobile_url":
      case "mobile_app":
        this.mobAppTargets.push({
          id: entry.id,
          url: entry.value,
        });
        break;
    }
  });
  this.isInitialLoad = false;
},
    async fetchTestingTypeByProject(projectName) {
  const res = await this.authStore.getTestingTypeByScope(
    this.adminId,
    projectName
  );

  if (!res.status) {
    Swal.fire("Error", res.message, "error");
    return;
  }

  const testingType = res.data.testing_type;

  // 🔄 Reset first
  this.allowedTestingTypes = [];
  this.selectedTestingType = "";
  this.showTestingDropdown = false;

  // 🔥 Backend gives single testing type
  this.allowedTestingTypes = [testingType];
  this.selectedTestingType = testingType;
  this.showTestingDropdown = false; // single → no dropdown
},
    async fetchProjectNames() {
    const res = await this.authStore.fetchScopeProjectNames(this.adminId);

    if (res.status) {
      this.projectList = res.data.scope_names;

      // auto select first project
      if (this.projectList.length && !this.projectname) {
        this.projectname = this.projectList[0];
      }
    } else {
      console.error("Project name fetch failed:", res.message);
    }
  },
  //   async fetchScopeTargets(testingType) {
  // try {
  //   const res = await this.authStore.getScopeTargets(testingType);

  //   if (!res.status) {
  //     Swal.fire("Error", res.message || "Failed to fetch scope", "error");
  //     return;
  //   }

  //   const targets = res.data?.data || [];

  //   // 🔄 RESET
  //   this.internalTargets = [];
  //   this.externalTargets = [];
  //   this.webAppTargets = [];
  //   this.mobAppTargets = [];

  //   targets.forEach(t => {
  //     const value = t.target_value;

  //     switch (t.target_type) {
  //       case "internal_ip":
  //         this.internalTargets.push({
  //           id: t._id,
  //           ip: value,
  //           count: t.subnet_count || null,
  //         });
  //         break;

  //       case "external_ip":
  //         this.externalTargets.push({
  //           id: t._id,
  //           ip: value,
  //           count: t.subnet_count || null,
  //         });
  //         break;

  //       // 🔥 FIX HERE
  //       case "web_url":
  //         this.webAppTargets.push({
  //           id: t._id,
  //           url: value,
  //         });
  //         break;

  //       // 🔥 FIX HERE
  //       case "mobile_url":
  //       case "mobile_app":
  //         this.mobAppTargets.push({
  //           id: t._id,
  //           url: value,
  //         });
  //         break;
  //     }
  //   });

  // } catch (err) {
  //   Swal.fire("Error", "Something went wrong", "error");
  //   console.error(err);
  // }
  //   },
    // async fetchTestingTypes() {
    //   const res = await this.authStore.getAdminTestingTypes(this.adminId);

    //   if (!res.status) {
    //     Swal.fire(
    //       "Error",
    //       res.message || "Unable to fetch testing types",
    //       "error"
    //     );
    //     return;
    //   }

    //   this.allowedTestingTypes = res.testingTypes || [];

    //   // 🔥 RULES IMPLEMENTATION
    //   if (this.allowedTestingTypes.length === 1) {
    //     // Only one → auto select, no dropdown
    //     this.selectedTestingType = this.allowedTestingTypes[0];
    //     this.showTestingDropdown = false;
    //   } else if (this.allowedTestingTypes.length > 1) {
    //     // Two or more → dropdown, first selected
    //     this.selectedTestingType = this.allowedTestingTypes[0];
    //     this.showTestingDropdown = true;
    //   }
    // },
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
    },
    openAddModal() {
      this.modalMode = "add";
      this.form = { type: "internal", value: "" };
      this.showModal = true;
    },
    async openEditModal(item, type) {
  try {
    this.modalMode = "edit";
    this.editingId = item.id;
    this.showModal = true;

    // 🔄 Fetch latest data from backend
    const res = await this.authStore.getScopeTargetById(
      item.id,
      this.selectedTestingType
    );
    if (!res.status) {
      Swal.fire("Error", res.message, "error");
      this.showModal = false;
      return;
    }
    const data = res.data;
    let formType = "internal";
    if (data.target_type === "external_ip") {
  formType = "external";
} 
else if (data.target_type === "web_url") {
  formType = "web";
} 
else if (
  data.target_type === "mobile_url" ||
  data.target_type === "mobile_app"
) {
  formType = "mobile";
}

    // 🔹 Set form values
    this.form = {
      type: formType,
      value: data.target_value,
    };

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Unable to load target", "error");
    this.showModal = false;
  }
    },
    closeModal() {
      this.showModal = false;
    },
    async saveTarget() {
  // ADD MODE (local only – you already have this)
  if (this.modalMode === "add") {
    const id = Date.now();
    this.pushTarget(id);
    this.showModal = false;
    return;
  }

  // 🔥 EDIT MODE → PATCH API
  try {
    const payload = {};

    // We are editing VALUE only for now
    payload["target_value"] = this.form.value;

    // const res = await this.authStore.updateScopeTarget(
    //   this.editingId,
    //   this.selectedTestingType,
    //   payload
    // );
    const res = await this.authStore.updateScopeEntry(
  this.scopeId,
  this.editingId,
  payload
);

    if (!res.status) {
      Swal.fire("Error", res.message, "error");
      return;
    }

   
    await this.fetchScopeTargets(this.selectedTestingType);

    this.showModal = false;

  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Update failed", "error");
  }
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
   deleteTarget(entryId) {
  Swal.fire({
    title: "Delete Target?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete",
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    try {
      const res = await this.authStore.deleteScopeEntry(
        this.scopeId,
        entryId
      );

      if (!res.status) {
        Swal.fire("Error", res.message, "error");
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: res.message,
        timer: 1200,
        showConfirmButton: false,
      });

      // 🔄 Refresh FULL scope (single source of truth)
      await this.fetchFullScopeData(this.projectname);

    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Delete failed", "error");
    }
  });
},

  }
};
</script>

<style scoped>
/* Scroll after 5 rows */
.internal-table-scroll {
  max-height: 250px; /* ~5 rows */
  overflow-y: auto;
}

/* Sticky header */
.internal-table-scroll thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}

/* Action icons */
.action-icon {
  cursor: pointer;
  font-size: 16px;
}

.action-icon:hover {
  opacity: 0.8;
}

/* Subnet count */
.subnet-count {
  font-size: 12px;
  color: #c7c7ff;
}


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
  max-height: 240px;
  /* 👈 height for ~5 rows */
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
}

/* Table */
.scope-table {
  width: 100%;
  font-size: 14px;
  table-layout: fixed; 
  border-collapse: collapse;
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
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  /* padding-left: 170px; */
}

.actions i {
  font-size: 15px;
  /* margin-left: 8px; */
  cursor: pointer;
  /* padding-left: 50px; */
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
/* .url-cell {
  word-break: break-all;
} */
 .col-value {
  word-break: break-word;
  white-space: normal;
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
  /* padding-left: 14px; */
}

.col-value {
  text-align: left;
  padding-left: 24px;
  padding-right: 12px;
  word-break: break-word;
}

.col-actions {
  /* width: 90px;
  padding-right: 14px; */
   width: 229px;
  text-align: center;
}

.scope-table th.col-actions {
  width: 135px;        
  text-align: center; 
}

.scope-table td.col-actions {
  width: 196px;        
  text-align: center; 
}
/* Header alignment match */
.scope-table th.col-serial,
.scope-table td.col-serial {
  width: 60px;
  text-align: center;
}

.scope-table th.col-value {
  /* padding-left: 28px; */
  text-align: left;         
  padding-left: 24px;       
  padding-right: 12px;
  word-break: break-word;
}
.scope-table td.col-value {
  text-align: left;          
  padding-left: 24px;        
  /* padding-right: 12px; */
  word-break: break-word;
}

/* Header alignment */
.scope-table thead th.col-value {
  /* text-align: center; */
  text-align: left;
  padding-left: 24px;
}
</style>
