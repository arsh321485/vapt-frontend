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
            <div class="col-10">
              <!-- <table class="table align-middle table-hover">
                <thead class="table-light">
                  <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            <th scope="col"></th>
                                            
                                        </tr>
                </thead>
                <tbody class="raised-tbody">
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table> -->
            <table class="table align-middle table-hover">
  <thead class="table-light">
    <tr>
      <th class="text-center" scope="col">Name</th>
      <th class="text-center" scope="col">Location</th>
      <th class="text-center" scope="col">Email</th>
      <th class="text-center" scope="col">Role</th>
      <th class="text-center" scope="col"></th>
    </tr>
  </thead>

  <tbody class="raised-tbody">
    <tr
      v-for="user in filteredUsers(tab.name, 'Internal')"
      :key="user._id"
    >
      <!-- Name + initials -->
      <td>
        <div class="d-flex align-items-center">
          <div
            class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
            style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;"
          >
            {{ getInitials(user.first_name, user.last_name) }}
          </div>
          <span class="fw-medium text-dark">
            {{ user.first_name }} {{ user.last_name }}
          </span>
        </div>
      </td>

      <!-- Location -->
      <td>
        {{ user.select_location }}
      </td>

      <!-- Email -->
      <td>
        {{ user.email }}
      </td>

      <!-- Role dropdown -->
      <td>
        <div class="multi-select-dropdown">
          <div
            class="dropdown-input rounded-0"
            @click="toggleDropdown(user._id)"
          >
            <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
            <span><i class="bi bi-chevron-down"></i></span>
          </div>

          <div class="dropdown-list" v-show="isOpen[user._id]">
            <label v-for="option in roleOptions" :key="option.short">
              <input
                type="checkbox"
                :value="option.short"
                v-model="selectedRoles[user._id]"
                @change="updateSelectedRoleText(user._id)"
              />
              {{ option.full }}
            </label>
          </div>
        </div>
      </td>

      <!-- Remove button -->
      <td>
        <a
          href="#"
          class="d-flex align-items-center fw-semibold"
          style="font-size: 15px; text-decoration: none; color: rgba(49, 33, 177, 1);"
          @click.prevent="removeUserFromCurrentTab(user)"
        >
          <i class="bi bi-dash-circle me-1"></i> Remove
        </a>
      </td>
    </tr>
  </tbody>
</table>

              
            </div>
        </div>

        <!-- External Users -->
        <h5 style="color: rgba(0, 0, 0, 1); font-weight: 600;">
            External ({{ filteredUsers(tab.name, 'External').length }})
        </h5>

        <div class="row">
            <div class="col-10">
              <table class="table align-middle table-hover">
  <thead class="table-light">
    <tr>
      <th class="text-center" scope="col">Name</th>
      <th class="text-center" scope="col">Location</th>
      <th class="text-center" scope="col">Email</th>
      <th class="text-center" scope="col">Role</th>
      <th class="text-center" scope="col"></th>
    </tr>
  </thead>

  <tbody class="raised-tbody">
    <tr
      v-for="user in filteredUsers(tab.name, 'External')"
      :key="user._id"
    >
      <!-- Name + initials -->
      <td>
        <div class="d-flex align-items-center">
          <div
            class="rounded-circle bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center me-3"
            style="width: 32px; height: 32px; font-weight: 600; font-size: 14px;"
          >
            {{ getInitials(user.first_name, user.last_name) }}
          </div>
          <span class="fw-medium text-dark">
            {{ user.first_name }} {{ user.last_name }}
          </span>
        </div>
      </td>

      <!-- Location -->
      <td>
        {{ user.select_location }}
      </td>

      <!-- Email -->
      <td>
        {{ user.email }}
      </td>

      <!-- Role dropdown (external) -->
      <td>
        <div class="multi-select-dropdown">
          <div
            class="dropdown-input rounded-0"
            @click="toggleDropdown(user._id)"
          >
            <span>{{ selectedRoleText[user._id] || 'Select Role' }}</span>
            <span><i class="bi bi-chevron-down"></i></span>
          </div>

          <div class="dropdown-list" v-show="isOpen[user._id]">
            <label v-for="option in roleOptions" :key="option.short">
              <input
                type="checkbox"
                :value="option.short"
                v-model="selectedRoles[user._id]"
                @change="updateSelectedRoleText(user._id)"
              />
              {{ option.full }}
            </label>
          </div>
        </div>
      </td>

      <!-- Remove button -->
      <td>
        <a
          href="#"
          class="d-flex align-items-center fw-semibold"
          style="font-size: 15px; text-decoration: none; color: rgba(49, 33, 177, 1);"
          @click.prevent="removeUserFromCurrentTab(user)"
        >
          <i class="bi bi-dash-circle me-1"></i> Remove
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
    for (const key in this.isOpen) {
      const dropdown = document.getElementById(`dropdown-${key}`);
      if (dropdown && !dropdown.contains(event.target)) {
        this.isOpen[key] = false;
      }
    }
  },
    getInitials(first, last) {
      return (first?.[0] || '') + (last?.[0] || '');
    },
    toggleDropdown(id) {
    Object.keys(this.isOpen).forEach(key => {
      if (key !== id) this.isOpen[key] = false;
    });
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
    this.form.location_id = this.selectedLocation;

    const selectedLoc = this.authStore.locations.find(
      (loc) => loc._id === this.selectedLocation
    );
    this.form.select_location = selectedLoc ? selectedLoc.location_name : "";

    // Convert short codes to full names → array format (backend expects array)
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
        location_id: "",
        first_name: "",
        last_name: "",
        user_type: "",
        email: "",
        select_location: "",
        Member_role: [],
      };
      this.selectedLocation = "";
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
        text: res.message,
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
    document.addEventListener('click', this.onClickOutside);

    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && storedUsers.length > 0) {
      this.users = storedUsers;
      this.users.forEach(user => {
        this.selectedRoles[user._id] = user.Member_role?.map(
          full => this.roleMapping[full]   
        ) || [];

        this.selectedRoleText[user._id] = this.selectedRoles[user._id].join(", ");
        this.isOpen[user._id] = false;
      });

      console.log("Initial roles", this.selectedRoles);
      return;
    }
    const res = await this.authStore.fetchAllUsers();
    if (res.status) {
      this.users = res.data;
      this.users.forEach(user => {
        this.selectedRoles[user._id] = user.Member_role?.map(
          full => this.roleMapping[full]
        ) || [];

        this.selectedRoleText[user._id] = this.selectedRoles[user._id].join(", ");
        this.isOpen[user._id] = false;
      });

      console.log("Initial Roles", this.selectedRoles);
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