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
                                    <button class="btn d-flex align-items-center px-3 py-2 text-light" style="font-size: 14px;background-color: rgba(49, 33, 177, 1);border-radius: 20px;" @click="showPopup = true">
                                <i class="bi bi-person-plus me-2"></i> Add a team member
                                </button>
                                </div>
                                <NotificationPanel />
                            </div>
                        </div>

                        <!-- Add Team Member modal -->
                            <div class="">
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
                                            <div class="row mb-3">
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">User Type</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select type</option>
                                                <option value="internal">Internal</option>
                                                <option value="external">External</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Select Location</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select location</option>
                                                <option>Germany</option>
                                                <option>Delhi</option>
                                                <option>Bahrain</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Member Role</label>
                                                <div class="modal-multi-select-dropdown" ref="roleDropdown3">
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
                                            <div class="row mb-4">
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
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Select Location</label>
                                                <select class="form-select rounded-0 uniform-input">
                                                <option selected disabled>Select location</option>
                                                <option>Germany</option>
                                                <option>Delhi</option>
                                                <option>Bahrain</option>
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label class="form-label fw-semibold text-center w-100">Member Role</label>
                                                <div class="modal-multi-select-dropdown" ref="roleDropdown2">
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
        <p 
          v-for="(tab, index) in tabs" 
          :key="index" 
          class="nav-item"
          :class="{ active: activeTab === index }"
          :style="{ width: '25%', color: activeTab === index ? 'rgba(49, 33, 177, 1)' : '#000' }"
          @click="selectTab(index)"
        >
          {{ tab.name }}
        </p>

        <!-- Blue underline -->
        <div 
          class="tab-line" 
          :style="{ width: '25%', left: 25 * activeTab + '%' }">
        </div>
      </div>
    </div>
    <div class="col-2">
      <!-- blank -->
    </div>

    <div class="col-12 mt-4">
        <!-- Dynamic Content per Tab -->
        <div v-for="(tab, index) in tabs" :key="index" v-show="activeTab === index">
        <!-- Internal Users -->
        <h5 style="color: rgba(0, 0, 0, 1); font-weight: 600;">
            Internal ({{ filteredUsers(tab.name, 'Internal').length }})
        </h5>

        <div class="row mb-4">
            <div class="col-8">
            <div
                v-for="user in filteredUsers(tab.name, 'Internal')"
                :key="user._id"
                class="d-flex align-items-center justify-content-start mb-3 gap-5"
            >
                <div class="d-flex align-items-center">
                <div
                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;"
                >
                    {{ getInitials(user.first_name, user.last_name) }}
                </div>
                <span class="fw-medium text-dark">{{ user.first_name }} {{ user.last_name }}</span>
                </div>

                <div class="d-flex align-items-center">
                <p class="mt-3">{{ user.select_location }}</p>
                </div>

                <!-- Dropdown for Roles -->
                <div class="multi-select-dropdown">
                <div class="dropdown-input rounded-0" @click="toggleDropdown(user._id)">
                    <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
                    <span><i class="bi bi-chevron-down"></i></span>
                </div>
                <div class="dropdown-list" v-show="isOpen[user._id]">
                    <label v-for="option in roleOptions" :key="option.short">
                    <input
                        type="checkbox"
                        :value="option.short"
                        v-model="selectedRoles[user._id]"
                    />
                    {{ option.full }}
                    </label>
                </div>
                </div>

                <!-- Remove Button -->
                <a
                href="#"
                class="d-flex align-items-center ms-5 fw-semibold"
                style="font-size: 15px; text-decoration: none; color: rgba(49, 33, 177, 1);"
                @click.prevent="removeUser(user._id)"
                >
                <i class="bi bi-dash-circle me-1"></i> Remove
                </a>
                <!-- <div v-for="role in user.Member_role.split(',')" :key="role" class="d-flex align-items-center align-items-center ms-3">
  <span>{{ role.trim() }}</span>
  <a
    href="#"
    class="ms-2 text-danger"
    @click.prevent="removeUserFromRole(user, role.trim())"
  >
    <i class="bi bi-dash-circle"></i> Remove
  </a>
</div> -->

            </div>
            <hr class="my-2" />
            </div>
        </div>

        <!-- External Users -->
        <h5 style="color: rgba(0, 0, 0, 1); font-weight: 600;">
            External ({{ filteredUsers(tab.name, 'External').length }})
        </h5>

        <div class="row">
            <div class="col-8">
            <div
                v-for="user in filteredUsers(tab.name, 'External')"
                :key="user._id"
                class="d-flex align-items-center justify-content-start mb-3 gap-5"
            >
                <div class="d-flex align-items-center">
                <div
                    class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
                    style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;"
                >
                    {{ getInitials(user.first_name, user.last_name) }}
                </div>
                <span class="fw-medium text-dark">{{ user.first_name }} {{ user.last_name }}</span>
                </div>

                <div class="d-flex align-items-center">
                <p class="mt-3">{{ user.select_location }}</p>
                </div>

                <!-- Dropdown -->
                <div class="multi-select-dropdown">
                <div class="dropdown-input rounded-0" @click="toggleDropdown(user._id)">
                    <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
                    <span><i class="bi bi-chevron-down"></i></span>
                </div>
                <div class="dropdown-list" v-show="isOpen[user._id]">
                    <label v-for="option in roleOptions" :key="option.short">
                    <input
                        type="checkbox"
                        :value="option.short"
                        v-model="selectedRoles[user._id]"
                    />
                    {{ option.full }}
                    </label>
                </div>
                </div>

                <!-- Remove Button -->
                <a
                href="#"
                class="d-flex align-items-center ms-5 fw-semibold"
                style="font-size: 15px; text-decoration: none; color: rgba(49, 33, 177, 1);"
                @click.prevent="removeUser(user._id)"
                >
                <i class="bi bi-dash-circle me-1"></i> Remove
                </a>
            </div>
            <hr class="my-2" />
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

export default {
    name: 'YourTeamView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    },
    data() {
    return {
      showPopup: false,
        isOpen: {
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
      activeTab: 0,
      tabs: [
        { name: "Patch management" },
        { name: "Configuration management" },
        { name: "Network security" },
        { name: "Architectural flaws" }
      ],
      authStore: useAuthStore(),
      users: [],
      isOpen: {},
      selectedRoles: {},
      selectedRoleText: {},
      roleMapping: {
      "Patch management": "PM",
      "Configuration management": "CM",
      "Network security": "NS",
      "Architectural flaws": "AF"
    }
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
    selectTab(index) {
      this.activeTab = index;
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
      const isClickInsideDropdown3 = this.$refs.roleDropdown3.contains(event.target);
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
    getInitials(first, last) {
      return (first?.[0] || '') + (last?.[0] || '');
    },
    removeUser(userId) {
    const removedUser = this.users.find(u => u._id === userId);
    if (removedUser) {
      console.log(`🗑 User removed completely: ${removedUser.first_name} ${removedUser.last_name}`);
    }

    this.users = this.users.filter(u => u._id !== userId);
    localStorage.setItem('users', JSON.stringify(this.users));

    // Clean up dropdown states
    delete this.selectedRoles[userId];
    delete this.selectedRoleText[userId];
    delete this.isOpen[userId];
    },
    toggleDropdown(id) {
      this.$set(this.isOpen, id, !this.isOpen[id]);
    },
    filteredUsers(tabName, type) {
      if (!Array.isArray(this.users)) return [];

      const roleCode = this.roleMapping[tabName]; 
      return this.users.filter(user => {
        const matchType = user.user_type?.toLowerCase() === type.toLowerCase();
        if (!user.Member_role) return false;

        // handle multiple roles (comma-separated) just in case
        const roles = user.Member_role.split(',').map(r => r.trim());
        const matchRole = roles.includes(roleCode);

        return matchType && matchRole;
      });
    },
    removeUserFromRole(user, roleToRemove) {
  roleToRemove = roleToRemove.trim().toUpperCase();

  // Get current roles of user
  const originalRoles = user.Member_role
    ? user.Member_role.split(',').map(r => r.trim().toUpperCase())
    : [];

  // Only remove the selected role
  const filteredRoles = originalRoles.filter(r => r !== roleToRemove);

  if (filteredRoles.length > 0) {
    // Update user with remaining roles
    const updatedUser = { ...user, Member_role: filteredRoles.join(', ') };
    
    // Replace user in users array
    this.users = this.users.map(u => (u._id === user._id ? updatedUser : u));

    console.log(`✂ Role removed: ${roleToRemove} from ${user.first_name} ${user.last_name}`);
  } else {
    // No roles left → remove user completely
    this.users = this.users.filter(u => u._id !== user._id);
    console.log(`🗑 User removed completely (no roles left): ${user.first_name} ${user.last_name}`);
  }

  // Update localStorage
  localStorage.setItem('users', JSON.stringify(this.users));

  // Clean up dropdown state for that role
  delete this.selectedRoles[user._id];
  delete this.selectedRoleText[user._id];
  delete this.isOpen[user._id];
    },
    async addUser() {
    try {
      const adminId = this.authStore.user?._id || this.authStore.user?.id;
      if (!adminId) {
        alert("Admin ID not found. Please login again.");
        return;
      }

      const roleFullMap = {
        PM: "Patch Management",
        CM: "Configuration Management",
        NS: "Network Security",
        AF: "Architectural Flaws"
      };

      this.form.admin_id = adminId;
      this.form.location_id = this.selectedLocation;
      this.form.Member_role = this.selectedRoles1
        .map(short => roleFullMap[short] || short)
        .join(", ");

      const res = await endpoint.post("/admin/users_details/add-user-detail/", this.form);

      if (res.data.message === "User detail created successfully") {
        console.log("✅ User created:", res.data.data);
      }
    } catch (err) {
      console.error("❌ Error adding user:", err);
    }
    }
  },
  
  async mounted() {
  document.addEventListener('click', this.onClickOutside);

  const storedUsers = JSON.parse(localStorage.getItem('users'));
  if (storedUsers && storedUsers.length > 0) {
    this.users = storedUsers;
    console.log("✅ Users loaded from localStorage:", this.users);
    return;
  }

  try {
    const res = await this.authStore.fetchAllUsers();
    if (res.status) {
      let usersArray = Array.isArray(res.data) ? res.data : res.data.data;

      // ✅ Normalize Member_role from full name → short code
      const roleReverseMap = {
        "Patch Management": "PM",
        "Configuration Management": "CM",
        "Network Security": "NS",
        "Architectural Flaws": "AF"
      };

      usersArray = usersArray.map(u => ({
        ...u,
        Member_role: roleReverseMap[u.Member_role?.trim()] || u.Member_role
      }));

      this.users = usersArray;
      localStorage.setItem('users', JSON.stringify(this.users));
      console.log("✅ Users loaded & normalized:", this.users);
    } else {
      console.error("❌ Failed to load users:", res.message);
    }
  } catch (err) {
    console.error("⚠️ Error fetching users:", err);
  }
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

.modal-multi-select-dropdown {
    position: relative;
    /* width: 250px; */
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
    .uniform-input {
  height: 42px; 
  line-height: 32px;
  padding: 0 8px; 
   
}
</style>