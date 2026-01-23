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

          <div class="col-11 pt-5 pb-3 px-4 pe-5">
            <div class="d-flex justify-content-between mt-4">
              <h2 class="ticket-head " style="font-size: 36px;">Your Teams</h2>
              <div class="d-flex flex-row gap-3">
                <div>
                  <button class="btn d-flex align-items-center px-3 py-2 text-light"
                    style="font-size: 14px;background-color: rgba(49, 33, 177, 1);border-radius: 20px;"
                    @click="showPopup = true">
                    <i class="bi bi-person-plus me-2"></i> Add a team member
                  </button>
                </div>
                <NotificationPanel />
              </div>
            </div>

            <!-- Add Team Member modal -->
            <div class="">
              <!-- Modal -->
              <div class="modal fade" tabindex="-1" :class="{ show: showPopup }" style="display: block;"
                v-if="showPopup">
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
                        <div class="row mb-3">
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">User Type</label>
                            <select class="form-select rounded-0 uniform-input">
                              <option selected disabled>Select type</option>
                              <option value="internal">Internal</option>
                              <option value="external">External</option>
                            </select>
                          </div>
                          <!-- <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Select Location</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select location</option>
                                                <option>Germany</option>
                                                <option>Delhi</option>
                                                <option>Bahrain</option>
                                                </select>
                                            </div> -->
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">Member Role</label>
                            <div class="modal-multi-select-dropdown" ref="roleDropdown3">
                              <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown3')">
                                <span>{{ selectedRoleText3 }}</span>
                                <span><i class="bi bi-chevron-down"></i></span>
                              </div>
                              <div class="dropdown-list" v-show="isOpen.dropdown3">
                                <label v-for="option in roleOptions" :key="option.short">
                                  <input type="checkbox" :value="option.short" v-model="selectedRoles3" />
                                  {{ option.full }}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mb-4">
                          <div class="col-12">
                            <label class="form-label fw-semibold text-center w-100">Copy Link</label>
                            <div class="position-relative w-100">
                              <textarea id="shareLink" class="form-control form-control-sm border-bottom rounded-0"
                                rows="2" readonly @click="copyLink"
                                style="resize: none; overflow: hidden; white-space: normal; height: 42px; padding: 0 8px;">https://secureitlabbh.sharepoint.com/:w:/s/SITLDevelopment/ETbmVY-X3_FLvyBDP7aVAvIB82tWReGJNHD6pIOGzuRurg?e=e16G1P
                                                </textarea>
                              <!-- Popup message -->
                              <div id="copyPopup" class="position-absolute px-2 py-1 rounded small text-white"
                                style="background: grey; top: -40px; left: 10px;" v-show="linkCopied">
                                Link Copied!
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <div class="modal-header mb-4">
                            <h5 class="modal-title w-100">
                              <div class="d-flex justify-content-center">
                                <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                                  <i class="bi bi-person-fill fs-5"></i>
                                </div>
                                <h5 class="fw-semibold ms-2 mt-2">Add users</h5>
                              </div>
                            </h5>

                          </div>
                          <!-- <div class="d-flex justify-content-start">
                      <div class="col-1 d-flex justify-content-center align-items-center location-icon me-2 mb-3">
                      <i class="bi bi-person-fill fs-5"></i>
                    </div>
                                            <h5 class="fw-semibold mt-2 ">Add users</h5></div> -->
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">User Type</label>
                            <select class="form-select rounded-0 uniform-input">
                              <option selected disabled>Select type</option>
                              <option value="internal">Internal</option>
                              <option value="external">External</option>
                            </select>
                          </div>
                          <!-- <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Select Location</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select location</option>
                                                <option>Germany</option>
                                                <option>Delhi</option>
                                                <option>Bahrain</option>
                                                </select>
                                            </div> -->
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">Member Role</label>
                            <div class="modal-multi-select-dropdown" ref="roleDropdown2">
                              <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown2')">
                                <span>{{ selectedRoleText2 }}</span>
                                <span><i class="bi bi-chevron-down"></i></span>
                              </div>
                              <div class="dropdown-list" v-show="isOpen.dropdown2">
                                <label v-for="option in roleOptions" :key="option.short">
                                  <input type="checkbox" :value="option.short" v-model="selectedRoles2" />
                                  {{ option.full }}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">First Name</label>
                            <input class="form-control uniform-input rounded-0" type="text">
                          </div>
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">Last Name</label>
                            <input class="form-control rounded-0" type="text">
                          </div>
                          <div class="col-md-4">
                            <label class="form-label fw-semibold text-center w-100">Email</label>
                            <input class="form-control rounded-0" type="email">
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-10">
                <div class="d-flex justify-content-between tab-wrapper position-relative">
                  <p v-for="(tab, index) in tabs" :key="index" class="nav-item" :class="{ active: activeTab === index }"
                    :style="{ width: '25%', color: activeTab === index ? 'rgba(49, 33, 177, 1)' : '#000' }"
                    @click="selectTab(index)">
                    {{ tab.name }}
                  </p>

                  <!-- Blue underline -->
                  <div class="tab-line" :style="{ width: '25%', left: 25 * activeTab + '%' }">
                  </div>
                </div>
              </div>
              <div class="col-2">
                <!-- blank -->
              </div>

              <div class="col-12 mt-4">
                <!-- Dynamic Content per Tab -->
                <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">

                  <!-- ================= INTERNAL SECTION ================= -->
                  <div class="team-section mb-5">
                    <div class="subtab-header">
                      <span class="subtab" :class="{ active: internalSubTab === 'list' }"
                        @click="internalSubTab = 'list'">
                        Internal Team Members({{ internalCount(tab.name) }})
                      </span>

                      <span class="subtab" :class="{
                        active: internalSubTab === 'assign',
                        disabled: internalCount(tab.name) === 0
                      }" @click="openInternalAssign(tab.name)">
                        Assign IP to Team (optional)
                      </span>

                    </div>

                    <!-- INTERNAL LIST -->
                    <div v-if="internalSubTab === 'list'">
                      <table class="table team-table align-middle">
                        <thead>
                          <tr>
                            <th style="width: 22%;">Name</th>

                            <th style="width: 25%;">Email</th>
                            <th style="width: 22%;">Role</th>
                            <th style="width: 13%;">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-if="filteredUsers(tab.name, 'Internal').length === 0">
                            <td colspan="5" class="text-center text-muted py-4">
                              No internal users found
                            </td>
                          </tr>
                          <tr v-for="user in filteredUsers(tab.name, 'Internal')" :key="user._id">

                            <td>
                              <div class="d-flex align-items-center">
                                <div class="user-avatar internal-avatar">
                                  {{ getInitials(user.first_name, user.last_name) }}
                                </div>
                                <span class="user-name">
                                  {{ user.first_name }} {{ user.last_name }}
                                </span>
                              </div>
                            </td>


                            <td class="email-cell">{{ user.email }}</td>


                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click="toggleDropdown(user._id)">
                                  <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div class="dropdown-list" v-show="isOpen[user._id]">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input type="checkbox" :value="option.short" v-model="selectedRoles[user._id]"
                                      @change="handleRoleChange($event, user, option)" />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                            </td>

                            <td>
                              <a href="#" class="remove-btn" @click.prevent="removeUserFromCurrentTab(user)">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    <!-- INTERNAL ASSIGN -->
                    <div v-if="internalSubTab === 'assign'">
                      <table class="table team-table">
                        <thead>
                          <tr>
                            <th style="width:30%">Asset</th>
                            <th style="width:30%">Name</th>
                            <th style="width:20%">Role</th>
                            <th style="width:20%">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <!-- ASSET DROPDOWN -->
                            <td>
                              <div class="hierarchy-dropdown">
                                <div class="dropdown-input" @click.stop="assetDropdownOpen = !assetDropdownOpen">
                                  {{ selectedAssetsText }}
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div v-if="assetDropdownOpen" class="dropdown-panel">
                                  <div v-for="box in assetHierarchy" :key="box.label" class="parent-item">
                                    <div class="parent-label" @click.stop="box.open = !box.open">
                                      {{ box.label }}
                                      <i class="bi bi-chevron-right" :class="{ rotate: box.open }"></i>
                                    </div>

                                    <div v-if="box.open" class="child-list">
                                      <label v-for="asset in box.items" :key="asset.value" class="child-item">
                                        <input type="checkbox" v-model="asset.checked" class="me-2" />
                                        {{ asset.value }}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>


                            <!-- NAME DROPDOWN -->
                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click="assignUsersOpen = !assignUsersOpen">
                                  {{ selectedUsersText }}
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div v-if="assignUsersOpen" class="dropdown-list">
                                  <label v-for="user in users" :key="user._id" class="d-flex align-items-center">
                                    <input type="checkbox" :value="user._id" v-model="selectedAssignUsers" class="me-2"
                                      @change="onAssignUserChange" />

                                    {{ user.first_name }} {{ user.last_name }}
                                  </label>
                                </div>
                              </div>
                            </td>

                            <!-- ROLE -->
                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click.stop="assignRoleOpen = !assignRoleOpen">
                                  <span>{{ assignRoleText }}</span>
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div class="dropdown-list" v-show="assignRoleOpen">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input type="checkbox" :value="option.short" v-model="assignRoles" />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                            </td>


                            <!-- ACTION -->
                            <td>
                              <a class="remove-btn gap-2">
                                <i class="bi bi-dash-circle"></i> Remove
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>


                  </div>

                  <div class="team-section">
                    <div class="subtab-header">
                      <span class="subtab" :class="{ active: externalSubTab === 'list' }"
                        @click="externalSubTab = 'list'">
                        External Team Members({{ externalCount(tab.name) }})
                      </span>

                      <span class="subtab" :class="{
                        active: externalSubTab === 'assign',
                        disabled: internalCount(tab.name) === 0
                      }" @click="openExternalAssign(tab.name)">
                        Assign IP to Team (optional)
                      </span>

                    </div>


                    <div v-if="externalSubTab === 'list'">
                      <table class="table team-table align-middle">
                        <thead>
                          <tr>
                            <th style="width: 22%;">Name</th>

                            <th style="width: 25%;">Email</th>
                            <th style="width: 22%;">Role</th>
                            <th style="width: 13%;">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr v-if="filteredUsers(tab.name, 'External').length === 0">
                            <td colspan="5" class="text-center text-muted py-4">
                              No external users found
                            </td>
                          </tr>
                          <tr v-for="user in filteredUsers(tab.name, 'External')" :key="user._id">
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="user-avatar external-avatar">
                                  {{ getInitials(user.first_name, user.last_name) }}
                                </div>
                                <span class="user-name">
                                  {{ user.first_name }} {{ user.last_name }}
                                </span>
                              </div>
                            </td>


                            <td class="email-cell">{{ user.email }}</td>

                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click="toggleDropdown(user._id)">
                                  <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div class="dropdown-list" v-show="isOpen[user._id]">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input type="checkbox" :value="option.short" v-model="selectedRoles[user._id]"
                                      @change="handleRoleChange($event, user, option)" />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                            </td>

                            <td>
                              <a href="#" class="remove-btn" @click.prevent="removeUserFromCurrentTab(user)">
                                <i class="bi bi-dash-circle me-1"></i> Remove
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- external -->
                    <div v-if="externalSubTab === 'assign'">
                      <table class="table team-table">
                        <thead>
                          <tr>
                            <th style="width:30%">Asset</th>
                            <th style="width:30%">Name</th>
                            <th style="width:20%">Role</th>
                            <th style="width:20%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <!-- ASSET DROPDOWN -->
                            <td>
                              <div class="hierarchy-dropdown">
                                <div class="dropdown-input" @click.stop="assetDropdownOpen = !assetDropdownOpen">
                                  {{ selectedAssetsText }}
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div v-if="assetDropdownOpen" class="dropdown-panel">
                                  <div v-for="box in assetHierarchy" :key="box.label" class="parent-item">
                                    <div class="parent-label" @click.stop="box.open = !box.open">
                                      {{ box.label }}
                                      <i class="bi bi-chevron-right" :class="{ rotate: box.open }"></i>
                                    </div>

                                    <div v-if="box.open" class="child-list">
                                      <label v-for="asset in box.items" :key="asset.value" class="child-item">
                                        <input type="checkbox" v-model="asset.checked" class="me-2" />
                                        {{ asset.value }}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>


                            <!-- NAME DROPDOWN -->
                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click="assignUsersOpen = !assignUsersOpen">
                                  {{ selectedUsersText }}
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div v-if="assignUsersOpen" class="dropdown-list">
                                  <label v-for="user in users" :key="user._id" class="d-flex align-items-center">
                                    <input type="checkbox" :value="user._id" v-model="selectedAssignUsers" class="me-2"
                                      @change="onAssignUserChange" />

                                    {{ user.first_name }} {{ user.last_name }}
                                  </label>
                                </div>
                              </div>
                            </td>

                            <!-- ROLE -->
                            <td>
                              <div class="multi-select-dropdown">
                                <div class="dropdown-input" @click.stop="assignRoleOpen = !assignRoleOpen">
                                  <span>{{ assignRoleText }}</span>
                                  <i class="bi bi-chevron-down"></i>
                                </div>

                                <div class="dropdown-list" v-show="assignRoleOpen">
                                  <label v-for="option in roleOptions" :key="option.short">
                                    <input type="checkbox" :value="option.short" v-model="assignRoles" />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                            </td>


                            <!-- ACTION -->
                            <td>
                              <a class="remove-btn gap-2">
                                <i class="bi bi-dash-circle"></i> Remove
                              </a>
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

        </div>
      </div>

    </section>
  </main>
</template>

<script>
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";
import { useAuthStore } from "@/stores/authStore";
import endpoint from "@/services/apiServices";

export default {
  name: 'YourTeamView',
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel
  },
  data() {
    return {
      dropdownRefs: {},
      showPopup: false,
      //   isOpen: {
      // dropdown3: false
      // },
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
      activeTab: 0,
      tabs: [
        { name: "Patch Management" },
        { name: "Configuration Management" },
        { name: "Network Security" },
        { name: "Architectural Flaws" }
      ],
      authStore: useAuthStore(),
      users: [],
      isOpen: {},
      selectedRoles: {},
      selectedRoleText: {},
      roleMapping: {
        "Patch Management": "PM",
        "Configuration Management": "CM",
        "Network Security": "NS",
        "Architectural Flaws": "AF"
      },



      assetDropdownOpen: false,

      assetHierarchy: [
        {
          label: "White Box",
          open: false,
          items: [
            { value: "192.168.1.10", checked: false },
            { value: "192.168.1.11", checked: false }
          ]
        },
        {
          label: "Black Box",
          open: false,
          items: [
            { value: "example.com", checked: false },
            { value: "api.example.com", checked: false }
          ]
        },
        {
          label: "Grey Box",
          open: false,
          items: [
            { value: "10.0.0.1", checked: false }
          ]
        },
        {
          label: "Cloud Assets",
          open: false,
          items: [
            { value: "cloud.example.com", checked: false }
          ]
        }
      ],
      internalSubTab: "list",
      externalSubTab: "list",
      assignUsersOpen: false,
      selectedAssignUsers: [],
      assignRoles: [],
      assignRoleOpen: false,


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

    selectedAssetsText() {
      const selected = [];

      this.assetHierarchy.forEach(box => {
        box.items.forEach(item => {
          if (item.checked) selected.push(item.value);
        });
      });

      if (selected.length === 0) return "Select Assets";
      if (selected.length <= 2) return selected.join(", ");
      return `${selected.length} assets selected`;
    },


    selectedUsersText() {
      if (this.selectedAssignUsers.length === 0) return "Select Users";

      const names = this.users
        .filter(u => this.selectedAssignUsers.includes(u._id))
        .map(u => `${u.first_name} ${u.last_name}`);

      if (names.length <= 2) return names.join(", ");
      return `${names.length} users selected`;
    },

    assignRoleText() {
      return this.assignRoles.length
        ? this.assignRoles.join(', ')
        : 'Select Role';
    },

  },
  methods: {
    onAssignUserChange() {
      // close dropdown after selection
      this.assignUsersOpen = false;
    },
    internalCount(roleName) {
      return this.filteredUsers(roleName, "Internal").length;
    },

    externalCount(roleName) {
      return this.filteredUsers(roleName, "External").length;
    },
    openInternalAssign(roleName) {
      const count = this.internalCount(roleName);

      if (count === 0) {
        Swal.fire({
          icon: "warning",
          title: "No Internal Members",
          text: "Please add internal members before assigning assets.",
        });
        return;
      }

      this.internalSubTab = "assign";
    },

    openExternalAssign(roleName) {
      const count = this.externalCount(roleName);

      if (count === 0) {
        Swal.fire({
          icon: "warning",
          title: "No External Members",
          text: "Please add external members before assigning assets.",
        });
        return;
      }

      this.externalSubTab = "assign";
    },
    selectTab(index) {
      this.activeTab = index;
      // ✅ RESET subtabs every time role changes
      this.internalSubTab = "list";
      this.externalSubTab = "list";
    },
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


    // onClickOutside(event) {
    //   const clickedInside =
    //     event.target.closest('.multi-select-dropdown') ||
    //     event.target.closest('.modal-multi-select-dropdown') ||
    //     event.target.closest('.hierarchy-dropdown');

    //   if (!clickedInside) {
    //     this.assetDropdownOpen = false;
    //     this.assignUsersOpen = false;

    //     Object.keys(this.isOpen).forEach(key => {
    //       this.isOpen[key] = false;
    //     });
    //   }
    // },

    onClickOutside(event) {
      const clickedInside =
        event.target.closest('.multi-select-dropdown') ||
        event.target.closest('.modal-multi-select-dropdown') ||
        event.target.closest('.hierarchy-dropdown');

      if (!clickedInside) {
        this.assetDropdownOpen = false;
        this.assignUsersOpen = false;
        this.assignRoleOpen = false; // ✅ ADD THIS

        Object.keys(this.isOpen).forEach(key => {
          this.isOpen[key] = false;
        });
      }
    },



    getInitials(first, last) {
      return (first?.[0] || '') + (last?.[0] || '');
    },
    toggleDropdown(id) {
      // Close all other dropdowns first
      Object.keys(this.isOpen).forEach(key => {
        if (key !== id) this.isOpen[key] = false;
      });
      // Toggle the clicked dropdown
      this.isOpen[id] = !this.isOpen[id];
    },
    filteredUsers(tabName, type) {
      if (!Array.isArray(this.users)) return [];

      return this.users.filter((user) => {
        // Match Internal / External
        const matchType =
          user.user_type?.toLowerCase() === type.toLowerCase();

        // Match Role (array check)
        const matchRole = Array.isArray(user.Member_role)
          ? user.Member_role.some(
            (role) => role.toLowerCase() === tabName.toLowerCase()
          )
          : false;

        return matchType && matchRole;
      });
    },
    async addUser() {
      try {
        // ✅ 1️⃣ Get admin ID
        const adminId = this.authStore.user?._id || this.authStore.user?.id;
        if (!adminId) {
          Swal.fire({
            icon: "error",
            title: "Missing Admin ID",
            text: "Please log in again.",
            timer: 3000,
            showConfirmButton: false,
          });
          return;
        }

        // ✅ 2️⃣ Map short role codes → full names
        const roleFullMap = {
          PM: "Patch Management",
          CM: "Configuration Management",
          NS: "Network Security",
          AF: "Architectural Flaws",
        };

        // ✅ 3️⃣ Prepare payload
        this.form.admin_id = adminId;
        this.form.Member_role = this.selectedRoles1.map(
          (short) => roleFullMap[short] || short
        );

        // ✅ 4️⃣ Call API
        const res = await endpoint.post(
          "/admin/users_details/add-user-detail/",
          this.form
        );

        if (res.data.message === "User detail created successfully") {
          console.log("✅ User created:", res.data.data);

          Swal.fire({
            icon: "success",
            title: "User Added",
            text: res.data.message,
            timer: 2500,
            showConfirmButton: false,
          });

          // ✅ 5️⃣ Add newly created user to UI immediately
          const newUser = res.data.data;

          // Initialize usersList if not exists
          if (!this.usersList) this.usersList = [];

          // Prevent duplicate (based on email)
          const exists = this.usersList.some(
            (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
          );

          if (!exists) {
            this.usersList.unshift(newUser); // show newly added user first
          }

          // ✅ 6️⃣ Save in localStorage for persistence
          localStorage.setItem("addedUsers", JSON.stringify(this.usersList));

          // ✅ 7️⃣ Reset form
          this.form = {
            admin_id: "",
            // location_id: "",
            first_name: "",
            last_name: "",
            user_type: "",
            email: "",
            // select_location: "",
            Member_role: [],
          };
          // this.selectedLocation = "";
          this.selectedRoles1 = [];
        }
      } catch (err) {
        console.error("❌ Error adding user:", err);
        Swal.fire({
          icon: "error",
          title: "Error Adding User",
          text: err.response?.data?.message || "Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    },
    //  Remove user from current role tab
    async removeUserFromCurrentTab(user) {
      const roleToRemove = this.tabs[this.activeTab].name; // now matches backend exactly

      try {
        console.log('Deleting role', { confirm: true, member_role: roleToRemove });

        const res = await endpoint.delete(
          `/admin/users_details/user-detail/${user._id}/delete-role/`,
          {
            data: {
              confirm: true,
              member_role: roleToRemove, // exact match from backend
            },
          }
        );

        if (res.status === 200) {
          user.Member_role = res.data.remaining_roles || [];

          Swal.fire({
            icon: "success",
            title: "Role Removed",
            text: `Role '${roleToRemove}' removed successfully from ${user.first_name}.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error("❌ Error removing user from role:", err);
        console.log('Response data:', err.response?.data);

        Swal.fire({
          icon: "error",
          title: "Failed to Remove Role",
          text: err.response?.data?.message || err.message || "Please try again.",
        });
      }
    },
    // Handle checkbox change - detect check/uncheck
    async handleRoleChange(event, user, option) {
      const isChecked = event.target.checked;
      const roleFullName = option.full; // e.g., "Patch Management"

      // Close dropdown before showing alert
      this.isOpen[user._id] = false;

      if (!isChecked) {
        // UNCHECKED - Call delete role API
        await this.deleteRoleFromUser(user, roleFullName);
      } else {
        // CHECKED - Call update roles API (add role)
        await this.updateSelectedRoleText(user._id);
      }
    },

    // Delete a specific role from user (called when checkbox unchecked)
    async deleteRoleFromUser(user, roleToRemove) {
      try {
        const res = await endpoint.delete(
          `/admin/users_details/user-detail/${user._id}/delete-role/`,
          {
            data: {
              confirm: true,
              member_role: roleToRemove,
            },
          }
        );

        if (res.status === 200) {
          // Update user's roles from response
          user.Member_role = res.data.remaining_roles || [];

          // Update display text
          this.selectedRoleText[user._id] = this.selectedRoles[user._id].join(", ");

          Swal.fire({
            icon: "success",
            title: "Role Removed",
            text: `Role '${roleToRemove}' removed successfully from ${user.first_name}.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error("❌ Error removing role:", err);

        // Revert checkbox state on error
        const shortCode = this.roleMapping[roleToRemove];
        if (shortCode && !this.selectedRoles[user._id].includes(shortCode)) {
          this.selectedRoles[user._id].push(shortCode);
        }

        Swal.fire({
          icon: "error",
          title: "Failed to Remove Role",
          text: err.response?.data?.message || "Please try again.",
        });
      }
    },

    async updateSelectedRoleText(userId) {
      this.selectedRoleText[userId] = this.selectedRoles[userId].join(", ");
      const fullRoles = this.selectedRoles[userId].map(short =>
        Object.keys(this.roleMapping).find(key => this.roleMapping[key] === short)
      );
      const res = await this.authStore.updateUserRoles(userId, fullRoles);

      if (res.status) {
        const user = this.users.find(u => u._id === userId);
        if (user) {
          user.Member_role = res.updated_roles;
        }

        Swal.fire({
          icon: "success",
          title: "Roles Updated",
          // text: res.message,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: res.message,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
  },
  async mounted() {
    document.addEventListener("click", this.onClickOutside);

    const res = await this.authStore.fetchUsersByAdmin();

    if (res.status) {
      this.users = res.data;

      this.users.forEach(user => {
        this.selectedRoles[user._id] =
          user.Member_role?.map(full => this.roleMapping[full]) || [];

        this.selectedRoleText[user._id] =
          this.selectedRoles[user._id].join(", ");

        this.isOpen[user._id] = false;
      });

      console.log("✅ Users loaded for admin:", this.users);
    } else {
      console.error("❌ Failed to load users:", res.message);
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }
};
</script>

<style scoped>
.hierarchy-dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: 110%;
  left: 0;
  width: 260px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 99999;
  /* VERY IMPORTANT */
  padding: 8px;
}

.parent-item {
  margin-bottom: 6px;
}

.parent-label {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
  padding: 6px 8px;
  border-radius: 6px;
}

.parent-label:hover {
  background: #f1f5f9;
}

.child-list {
  padding-left: 14px;
  margin-top: 4px;
}

.child-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 4px 0;
}

.bi-chevron-right {
  transition: transform 0.2s ease;
}

.bi-chevron-right.rotate {
  transform: rotate(90deg);
}


.subtab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.subtab-header {
  /* display: flex;
  gap: 54px;
  margin-bottom: 16px;
  font-weight: 500; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 58px;
  margin-bottom: 16px;
  font-weight: 500;
}

.subtab {
  cursor: pointer;
  padding-bottom: 4px;
  font-size: 16px;
}

.subtab.active {
  color: rgba(49, 33, 177, 1);
  border-bottom: 3px solid rgba(49, 33, 177, 1);
}

.multi-select-dropdown {
  position: relative;
  width: 250px;
}

.modal-multi-select-dropdown {
  position: relative;
  /* width: 250px; */
}

.dropdown-input {
  /* width: 100%; */
  width: 70%;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  background-color: rgba(49, 33, 177, 1);
  /* Active blue color */
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
  font-size: 18px;
}

.nav-item i {
  margin-right: 5px;
}

.uniform-input {
  height: 42px;
  line-height: 32px;
  padding: 0 8px;
}

/* ===== Team Section Styles ===== */
.team-section {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.10);
  overflow: visible;
}

.section-title {
  color: #1a1a1a;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  padding-bottom: 0;
  border-bottom: none;
}

/* ===== Team Table Styles ===== */
.table-responsive {
  overflow: visible !important;
}

.team-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  overflow: visible;
}

.team-table thead {
  background: #f8f9fc;
}

.team-table thead th {
  font-weight: 600;
  font-size: 13px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 12px;
  border: none;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}

.team-table tbody tr {
  transition: background 0.2s ease;
}

.team-table tbody tr:hover {
  background: #f8fafc;
}

.team-table tbody td {
  padding: 14px 12px;
  border: none;
  font-size: 14px;
  color: #334155;
  vertical-align: middle;
}

/* Remove first row top border and last row bottom border */
.team-table tbody tr:first-child td {
  border-top: none;
}

.team-table tbody tr:last-child td {
  border-bottom: none;
}

/* ===== User Avatar Styles ===== */
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  margin-right: 12px;
  flex-shrink: 0;
}

.internal-avatar {
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
}

.external-avatar {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
}

.user-name {
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== Email Cell ===== */
.email-cell {
  word-break: break-word;
  max-width: 200px;
}

/* ===== Remove Button ===== */
.remove-btn {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: rgba(49, 33, 177, 1);
  transition: color 0.2s ease, transform 0.2s ease;

}

.remove-btn:hover {
  color: #dc2626;
  transform: translateX(2px);
}

/* ===== Multi-select Dropdown (Updated) ===== */
.multi-select-dropdown {
  position: relative;
  width: 100%;
  max-width: 200px;
}

.multi-select-dropdown .dropdown-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.multi-select-dropdown .dropdown-input:hover {
  border-color: rgba(49, 33, 177, 0.5);
}

.multi-select-dropdown .dropdown-input span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 8px;
}

.multi-select-dropdown .dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: 200px;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;
  margin-top: 4px;
}

/* Ensure table rows don't clip the dropdown */
.team-table tbody {
  overflow: visible;
}

.team-table tbody tr {
  position: relative;
}

.team-table tbody td {
  position: relative;
  overflow: visible;
}

/* ===== Responsive Styles ===== */
@media (max-width: 1200px) {

  .team-table thead th,
  .team-table tbody td {
    padding: 12px 8px;
    font-size: 13px;
  }

  .multi-select-dropdown {
    max-width: 180px;
  }
}

@media (max-width: 992px) {
  .team-section {
    padding: 16px;
    margin-bottom: 20px;
  }

  .team-table {
    table-layout: auto;
  }

  .team-table thead th,
  .team-table tbody td {
    padding: 10px 6px;
    font-size: 12px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    font-size: 11px;
    margin-right: 8px;
  }

  .multi-select-dropdown {
    max-width: 150px;
  }

  .remove-btn {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .table-responsive {
    overflow-x: auto !important;
    overflow-y: visible !important;
    -webkit-overflow-scrolling: touch;
  }

  .team-table {
    min-width: 700px;
  }

  .section-title {
    font-size: 14px;
  }
}
</style>