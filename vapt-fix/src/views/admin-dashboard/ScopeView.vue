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
                                        <th class="col-serial">S.No</th>
                                        <th class="col-value text-center">IP Address</th>
                                        <th class="text-end col-actions">Actions</th>


                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="(item, index) in internalTargets" :key="item.id">
                                        <td class="col-serial">{{ index + 1 }}</td>
                                        <td class="col-value text-center">
                                            {{ item.ip }}
                                            <span v-if="item.count" class="subnet-count">({{ item.count }})</span>
                                        </td>
                                        <td class="text-end col-actions actions">
                                            <i class="bi bi-pencil" title="Edit"
                                                @click="openEditModal(item, 'internal')"></i>

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
                                        <th class="text-end col-actions">Actions</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in externalTargets" :key="item.id">
                                        <td class="col-serial">{{ index + 1 }}</td>
                                        <td class="col-value text-center">{{ item.ip }}</td>
                                        <td class="text-end col-actions actions">
                                            <i class="bi bi-pencil" title="Edit"
                                                @click="openEditModal(item, 'internal')"></i>

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
                                        <th class="text-end col-actions">Actions</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in webAppTargets" :key="item.id">
                                        <td class="col-serial">{{ index + 1 }}</td>
                                        <td class="col-value text-center">{{ item.url }}</td>
                                        <td class="text-end col-actions actions">
                                            <i class="bi bi-pencil" title="Edit"
                                                @click="openEditModal(item, 'internal')"></i>

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
                    <button class="btn btn-secondary" @click="closeModal">
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

export default {
    name: "ScopeView",
    components: { DashboardMenu, DashboardHeader },

    data() {
        return {
            internalTargets: [
                { id: 1, ip: "192.168.1.10" },
                { id: 2, ip: "192.168.2.0/28", count: 16 },
            ],
            externalTargets: [
                { id: 3, ip: "8.8.8.8" },
            ],
            webAppTargets: [
                { id: 4, url: "https://example.com" },
            ],

            showModal: false,
            modalMode: "add",
            editingId: null,

            form: {
                type: "internal",
                value: "",
            },
        };
    },

    methods: {
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
.scope-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
}

/* Card */
.scope-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 22px 24px;
    border: 1px solid #e6e9f2;
    /* box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06); */
    box-shadow: 0 5px 10px #bbb7e1;
}

/* Card title */
.scope-card-title {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 18px;
}

/* Table */
.scope-table {
    width: 100%;
    font-size: 14px;
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
    margin-left: 14px;
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
    /* 👈 center heading only */
}

/* Keep body content readable (left aligned) */
.scope-table tbody td.col-value {
    text-align: left;
    padding-left: 28px;
}
</style>
