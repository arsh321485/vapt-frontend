<template>
    <main>
        <section>
            <div class="container-fluid px-0">
                <div class="row gx-0 no-gutters">
                    <DashboardHeader />
                </div>
                <div class="row">
                    <div class="col-1 ps-0 menubar-col1">
                        <DashboardMenu />
                    </div>

                    <div class="col-11 pt-2 pb-3 px-4 pe-5">
                        <h2 class="ticket-head mt-4" style="font-size: 36px;">Your Teams</h2>
                        <div class="row my-4">
                            <div class="col-10">
                            <div class="d-flex justify-content-between tab-wrapper position-relative">
                                <p class="nav-item active" style="width: 25%;color: rgba(49, 33, 177, 1);">Patch management</p>
                                <p class="nav-item" style="width: 25%;">Configuration management</p>
                                <p class="nav-item" style="width: 25%;">Network security</p>
                                <p class="nav-item" style="width: 25%;">Architectural flaws</p>

                                <!-- Blue underline for active tab -->
                                <div class="tab-line" style="width: 25%; left: 0;"></div>
                            </div>
                            <div class="col-2">
                                <!-- blank -->
                            </div>
                            </div>
                        </div>
                        <p style="color: rgba(0, 0, 0, 1);font-size: 15px;font-weight: 500;">Technical(internal) (32)</p>
                        <div class="row mb-5">
                            <div class="col-8">
                                
                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                
                                <div class="multi-select-dropdown" ref="roleDropdown1">
                                <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown1')">
                                  <span>{{ selectedRoleText1 }}</span>
                                  <span><i class="bi bi-chevron-down"></i></span>
                                </div>
                                <div class="dropdown-list" v-show="isOpen.dropdown1">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input
                                      type="checkbox"
                                      :value="option.short"
                                      v-model="selectedRoles1"
                                    />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                                
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                   
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                    <div
                                        class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                        style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                        AB
                                    </div>
                                    <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                    
                                    
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                    
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                   
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">
                        <!-- Add Team Member Button -->
                            <div class="mt-5">
                                <button class="btn d-flex align-items-center px-3 py-2 text-light" style="font-size: 14px;background-color: rgba(49, 33, 177, 1);border-radius: 20px;" @click="showPopup = true">
                                <i class="bi bi-person-plus me-2"></i> Add a team member
                                </button>

                                <!-- Modal -->
                                <div
                                class="modal fade"
                                tabindex="-1"
                                :class="{ show: showPopup }"
                                style="display: block;"
                                v-if="showPopup"
                                >
                                <div class="modal-dialog modal-lg modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title w-100">
                                            <div class="d-flex justify-content-center">
                                            <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                                            <i class="bi bi-link-45deg fs-5"></i>
                                            </div>
                                            <h5 class="fw-semibold ms-2 mt-2">Create invite link</h5>
                                            </div>
                                            </h5>
                                        <button type="button" class="btn-close" @click="showPopup = false"></button>
                                    </div>
                                    <div class="modal-body my-4 ms-3 me-4">
                                        <div class="container">
                                            <!-- Row 1: Type, Location, Role -->
                                            <div class="row mb-3">
                                            <!-- User Type -->
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">User Type</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select type</option>
                                                <option value="internal">Internal</option>
                                                <option value="external">External</option>
                                                </select>
                                            </div>

                                            <!-- Location -->
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Select Location</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select location</option>
                                                <option>Germany</option>
                                                <option>Delhi</option>
                                                <option>Bahrain</option>
                                                </select>
                                            </div>

                                            <!-- Role -->
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Member Role</label>
                                                <div class="multi-select-dropdown" ref="roleDropdown3">
                                                <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown3')">
                                                    <span>{{ selectedRoleText3 }}</span>
                                                    <span><i class="bi bi-chevron-down"></i></span>
                                                </div>
                                                <div class="dropdown-list" v-show="isOpen.dropdown3">
                                                    <label v-for="option in roleOptions" :key="option.short">
                                                    <input 
                                                        type="checkbox"
                                                        :value="option.short"
                                                        v-model="selectedRoles3"
                                                    />
                                                    {{ option.full }}
                                                    </label>
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                                            <!-- Row 2: Copy Link (full width) -->
                                            <div class="row">
                                            <div class="col-12">
                                                <label class="form-label fw-semibold text-center w-100">Copy Link</label>
                                                <div class="position-relative w-100">
                                                <textarea
                                                    id="shareLink"
                                                    class="form-control form-control-sm border-bottom rounded-0"
                                                    rows="2"
                                                    readonly
                                                    @click="copyLink"
                                                    style="resize: none; overflow: hidden; white-space: normal; height: 42px; padding: 0 8px;"
                                                >https://secureitlabbh.sharepoint.com/:w:/s/SITLDevelopment/ETbmVY-X3_FLvyBDP7aVAvIB82tWReGJNHD6pIOGzuRurg?e=e16G1P
                                                </textarea>
                                                <!-- Popup message -->
                                                <div
                                                    id="copyPopup"
                                                    class="position-absolute px-2 py-1 rounded small text-white"
                                                    style="background: grey; top: -40px; left: 10px;"
                                                    v-show="linkCopied"
                                                >
                                                    Link Copied!
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    </div>
                                </div>
                                </div>

                            </div>

                            </div>
                        </div>

                        <!-- technical(external) -->
                        <p style="color: rgba(0, 0, 0, 1);font-size: 15px;font-weight: 500;">Technical(external) (5)</p>
                        <div class="row">
                            <div class="col-8">
                                
                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                
                                <div class="multi-select-dropdown" ref="roleDropdown2">
                                <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown2')">
                                  <span>{{ selectedRoleText2 }}</span>
                                  <span><i class="bi bi-chevron-down"></i></span>
                                </div>
                                <div class="dropdown-list" v-show="isOpen.dropdown2">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input
                                      type="checkbox"
                                      :value="option.short"
                                      v-model="selectedRoles2"
                                    />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                                
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                   
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                    <div
                                        class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                        style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                        AB
                                    </div>
                                    <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                    
                                    
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                    
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">

                            <!-- Repeat this block for each member -->
                            <div class="d-flex align-items-center justify-content-start mb-3 gap-5">
                                <div class="d-flex align-items-center">
                                <div
                                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;">
                                    AB
                                </div>
                                <span class="fw-medium text-dark">Aditi Bose</span>
                                </div>
                                <div class="d-flex align-items-center "><p class="mt-3">Germany</p></div>
                                <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                   
                                </select></div>
                                <a href="#" class="d-flex align-items-center ms-5 fw-semibold" style="font-size: 15px; text-decoration: none;color: rgba(49, 33, 177, 1);">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                                </a>
                            </div>
                            <hr class="my-2">
                        <!-- Add Team Member Button -->
                            <div class="mt-5">
                                <button class="btn d-flex align-items-center px-3 py-2 text-light" style="font-size: 14px;background-color: rgba(49, 33, 177, 1);border-radius: 20px;">
                                <i class="bi bi-person-plus me-2"></i> Add a team member
                                </button>
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
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';

export default {
    name: 'YourTeamView',
    components: {
        DashboardMenu,
        DashboardHeader
    },
    data() {
    return {
        showPopup: false,
      isOpen: {
        dropdown1: false,
        dropdown2: false,
        dropdown3: false
      },
      selectedRoles1: [],
      selectedRoles2: [],
      selectedRoles3: [],
      roleOptions: [
        { short: 'PM', full: 'Patch Management' },
        { short: 'CM', full: 'Configuration Management' },
        { short: 'NS', full: 'Network Security' },
        { short: 'AF', full: 'Architectural Flaws' }
      ],
      linkCopied: false,
    };
  },
  computed: {
    selectedRoleText1() {
      return this.selectedRoles1.length > 0 ? this.selectedRoles1.join(', ') : 'Select roles';
    },
    selectedRoleText2() {
      return this.selectedRoles2.length > 0 ? this.selectedRoles2.join(', ') : 'Select roles';
    },
    selectedRoleText3() {
      return this.selectedRoles3.length > 0 ? this.selectedRoles3.join(', ') : 'Select roles';
    },
  },
  methods: {
     copyLink() {
      const copyText = document.getElementById("shareLink");
      copyText.select();
      copyText.setSelectionRange(0, 99999); // for mobile
      navigator.clipboard.writeText(copyText.value);

      const popup = document.getElementById("copyPopup");
      popup.style.display = "block";

      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    },
    toggleDropdown(dropdownName) {
      for (const key in this.isOpen) {
        if (key !== dropdownName) {
          this.isOpen[key] = false;
        }
      }
      this.isOpen[dropdownName] = !this.isOpen[dropdownName];
    },
    onClickOutside(event) {
      const isClickInsideDropdown1 = this.$refs.roleDropdown1.contains(event.target);
      const isClickInsideDropdown2 = this.$refs.roleDropdown2.contains(event.target);
      if (!isClickInsideDropdown1) {
        this.isOpen.dropdown1 = false;
      }
      if (!isClickInsideDropdown2) {
        this.isOpen.dropdown2 = false;
      }
      if (!isClickInsideDropdown3) {
        this.isOpen.dropdown3 = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }
};
</script>

<style scoped>
.multi-select-dropdown {
    position: relative;
    width: 250px;
}

.dropdown-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-input span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.dropdown-list {
    position: absolute;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

.dropdown-list label {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}

.dropdown-list label:hover {
    background-color: #f0f0f0;
}

.dropdown-list input[type="checkbox"] {
    margin-right: 10px;
}

.tab-wrapper {
        position: relative;
        border-bottom: 1px solid #e0e0e0;
    }

    .tab-line {
        position: absolute;
        bottom: 0;
        height: 2px;
        background-color: rgba(49, 33, 177, 1); /* Active blue color */
        transition: all 0.3s ease;
    }

    .nav-item {
        text-align: center;
        cursor: pointer;
        padding: 8px 0;
        color: black;
        font-weight: 500;
        position: relative;
        z-index: 1;
    }

    .nav-item i {
        margin-right: 5px;
    }
</style>