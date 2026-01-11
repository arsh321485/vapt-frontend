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
        <h1>Add location and users</h1>
        <p>Align your team and tools for a seamless build.</p>

        <!-- Communication -->
        <div class="section">
          <div class="section-title">Communication platform</div>
          <div class="chip-group selectable">
            <div v-for="platform in communicationPlatforms" :key="platform.value" class="chip"
              :class="{ active: selectedCommunication === platform.value }" @mousedown.prevent
              @click.stop="handleCommunicationClick(platform.value)">
              <img v-if="platform.icon" :src="platform.icon" />
              {{ platform.label }}
            </div>

          </div>
        </div>

        <!-- Project -->
        <div class="section">
          <div class="section-title">Project management</div>
          <div class="chip-group selectable">
            <div v-for="tool in projectPlatforms" :key="tool.value" class="chip"
              :class="{ active: selectedProject === tool.value }" @mousedown.prevent
              @click.stop="handleProjectClick(tool.value)">
              <img v-if="tool.icon" :src="tool.icon" />
              {{ tool.label }}
            </div>

          </div>
        </div>

        <!-- Location -->
        <div class="section">
          <div class="section-title">Location</div>

          <div class="d-flex gap-3 flex-wrap align-items-start">
            <!-- INPUT + DROPDOWN -->
            <div style="position: relative; width: 50%;">
              <input class="form-control" placeholder="e.g. India, Bahrain" v-model="locationName"
                @input="onLocationInput" @focus="onLocationInput" />

              <!-- COUNTRY DROPDOWN -->
              <ul v-if="showDropdown && filteredCountries.length" class="list-group" style="
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 20;
          max-height: 200px;
          overflow-y: auto;
        ">
                <li v-for="country in filteredCountries" :key="country" class="list-group-item list-group-item-action"
                  @click="selectCountry(country)" style="cursor: pointer;">
                  {{ country }}
                </li>
              </ul>
            </div>

            <!-- ADD BUTTON -->
            <button class="btn btn-primary" @click="handleAddLocation">
              Add location
            </button>

            <!-- AVATAR CIRCLES -->
            <div class="d-flex gap-2 align-items-center flex-wrap location-circle">
              <div v-for="(loc, index) in authStore.locations" :key="loc._id || index"
                class="rounded-circle d-flex align-items-center justify-content-center" :style="{
                  width: '42px',
                  height: '42px',
                  background: avatarColors[index % avatarColors.length],
                  color: '#fff',
                  fontWeight: '600'
                }" :title="loc.location_name">
                {{ getInitials(loc.location_name) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Users -->
        <div class="section">
          <div class="section-title">Users</div>

          <div class="row-users">
            <!-- User Type -->
            <select v-model="form.user_type" class="form-select">
              <option disabled value="">User type</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>

            <!-- First Name -->
            <input class="form-control" placeholder="First name" v-model="form.first_name" />

            <!-- Last Name -->
            <input class="form-control" placeholder="Last name" v-model="form.last_name" />

            <!-- Email -->
            <input class="form-control" placeholder="Email" type="email" v-model="form.email" />

            <!-- Location -->
            <select v-model="selectedLocation" class="form-select">
              <option disabled value="">Location</option>
              <option v-for="loc in authStore.locations" :key="loc._id" :value="loc._id">
                {{ loc.location_name }}
              </option>
            </select>

            <!-- Member Role (Multi Select) -->
            <div class="position-relative" ref="roleDropdown">
              <div class="form-select" @click="isRoleOpen = !isRoleOpen">
                {{ selectedRoles.length ? selectedRoles.join(", ") : "Role" }}
              </div>

              <div v-if="isRoleOpen" class="dropdown-list">
                <label v-for="role in roleOptions" :key="role.short">
                  <input type="checkbox" :value="role.short" v-model="selectedRoles" />
                  {{ role.full }}
                </label>
              </div>
            </div>
          </div>

          <div class="row-users-btn mt-4">
            <button class="btn btn-primary" @click="addUser">
              Add User
            </button>
          </div>
        </div>

        <div class="cta">
          <!-- <button class="btn btn-primary" @click="handleContinue">
            Continue to Risk Criteria →
          </button> -->
           <button class="btn btn-primary" @click="handleContinue">
    {{ returnTo ? 'Back to Previous Page →' : 'Continue to Risk Criteria →' }}
  </button>

        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Stepper from "@/components/admin-component/Stepper.vue";
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";
import teamsIcon from "@/assets/images/teams.png";
import slackIcon from "@/assets/images/slack.png";
import jiraIcon from "@/assets/images/jira.png";
import asanaIcon from "@/assets/images/asana.png";

export default {
  name: "LocationView",

  components: {
    Stepper
  },

  data() {
    return {
      authStore: useAuthStore(),
      locationName: "",
      showDropdown: false,
      filteredCountries: [],
      avatarColors: ["#13b561", "#efbe34", "#ea4544"],
      selectedLocation: "",
      externalLocation: "",
      selectedRoles: [],
      isRoleOpen: false,
      selectedSecondaryRoles: [],
      isSecondaryRoleOpen: false,
      form: {
        admin_id: "",
        location_id: "",
        first_name: "",
        last_name: "",
        user_type: "",
        email: "",
        Member_role: []
      },
      roleOptions: [
        { short: "PM", full: "Patch Management" },
        { short: "CM", full: "Configuration Management" },
        { short: "NS", full: "Network Security" },
        { short: "AF", full: "Architectural Flaws" }
      ],
      selectedCommunication: null,
      pendingCommunication: null,
      communicationNoneSelected: false,
      communicationPlatforms: [
        { value: "teams", label: "Microsoft Teams", icon: teamsIcon },
        { value: "slack", label: "Slack", icon: slackIcon },
        { value: "none", label: "None" }
      ],
      selectedProject: null,
      pendingProject: null,
      projectNoneSelected: false,
      projectPlatforms: [
        { value: "jira", label: "Jira", icon: jiraIcon },
        { value: "asana", label: "Asana", icon: asanaIcon },
        { value: "none", label: "None" }
      ]
    };
  },
  computed: {
  returnTo() {
    return this.$route.query.returnTo || null;
  },

  isFromOnboarding() {
    return !this.returnTo;
  }
},
  methods: {
    initChipSelection() {
      document
        .querySelectorAll(".chip-group.selectable")
        .forEach(group => {
          group.querySelectorAll(".chip").forEach(chip => {
            chip.addEventListener("click", () => {
              group.querySelectorAll(".chip").forEach(c =>
                c.classList.remove("active")
              );
              chip.classList.add("active");
            });
          });
        });
    },
    async addUser() {
      // 1️⃣ Get admin id
      const adminId =
        this.authStore.user?._id ||
        this.authStore.user?.id;

      if (!adminId) {
        Swal.fire("Error", "Please login again", "error");
        return;
      }

      // 2️⃣ Find selected location object
      const selectedLoc = this.authStore.locations.find(
        l => l._id === this.selectedLocation
      );

      if (!selectedLoc) {
        Swal.fire("Error", "Please select a location", "error");
        return;
      }

      // 3️⃣ Build payload EXACTLY as backend expects
      const payload = {
        admin_id: adminId,                                // ✅ correct
        location_id: this.selectedLocation,               // ✅ correct
        select_location: selectedLoc.location_name,        // ✅ REQUIRED
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        user_type: this.form.user_type,
        Member_role: this.selectedRoles.map(
          r => this.roleOptions.find(o => o.short === r)?.full
        )                                                  // ✅ FULL role names
      };

      // 🧪 Debug once
      console.log("FINAL PAYLOAD 👉", payload);

      // 4️⃣ API call
      const res = await this.authStore.createUserDetail(payload);

      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "User added successfully",
          timer: 1800,
          showConfirmButton: false,
          allowOutsideClick: false
        });

        // reset form
        this.form.first_name = "";
        this.form.last_name = "";
        this.form.email = "";
        this.form.user_type = "";
        this.selectedLocation = "";
        this.selectedRoles = [];
        this.isRoleOpen = false;

      } else {
        let errorMessage = "User detail with this email already exists";

        if (
          res.details &&
          res.details.detail &&
          res.details.detail.email &&
          Array.isArray(res.details.detail.email)
        ) {
          errorMessage = "User detail with this email already exists";
        } else if (res.message && !res.message.includes("500")) {
          errorMessage = res.message;
        }

        Swal.fire({
          icon: "warning",
          title: "User already exists",
          text: errorMessage,
          confirmButtonColor: "#5a44ff"
        });
      }
    },
    onLocationInput() {
      this.showDropdown = true;
      this.filterCountries();
    },
    filterCountries() {
      const input = this.locationName.toLowerCase().trim();
      if (!input) {
        this.filteredCountries = [];
        return;
      }

      const allCountries = this.authStore.countries || [];
      this.filteredCountries = allCountries.filter(country =>
        country.toLowerCase().includes(input)
      );
    },
    selectCountry(country) {
      this.locationName = country;
      this.showDropdown = false;
    },
    // async handleAddLocation() {
    //   if (!this.locationName.trim()) return;

    //   const res = await this.authStore.addLocation(this.locationName.trim());

    //   if (res.status) {
    //     this.locationName = "";
    //     this.filteredCountries = [];
    //     this.showDropdown = false;
    //   } else {
    //     Swal.fire("Error", res.message || "Failed to add location", "error");
    //   }
    // },
    async handleAddLocation() {
  if (!this.locationName.trim()) return;

  const res = await this.authStore.addLocation(this.locationName.trim());

  // ❌ DUPLICATE LOCATION (Backend validation error)
  if (
    res.status === false &&
    res.details?.location_name?.length
  ) {
    Swal.fire({
      icon: "warning", // ⚠️ exclamation icon
      title: "Duplicate Location",
      text: res.details.location_name[0],
      confirmButtonColor: "#5a44ff"
    });
    return;
  }

  // ❌ Other backend error
  if (res.status === false) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: res.message || "Failed to add location",
      confirmButtonColor: "#5a44ff"
    });
    return;
  }

  // ✅ SUCCESS (ONLY HERE)
  this.locationName = "";
  this.filteredCountries = [];
  this.showDropdown = false;

  Swal.fire({
    icon: "success",
    title: "Location added",
    text: "Location has been added successfully",
    confirmButtonColor: "#5a44ff"
  });
    },
    getInitials(name) {
      if (!name) return "";
      return name.substring(0, 2).toUpperCase();
    },
    closeOnOutside(e) {
      const role = this.$refs.roleDropdown;
      const secondary = this.$refs.secondaryRoleDropdown;
      if (
        role && !role.contains(e.target) &&
        secondary && !secondary.contains(e.target)
      ) {
        this.isRoleOpen = false;
        this.isSecondaryRoleOpen = false;
      }
    },
    async handleCommunicationClick(value) {
      // NONE logic
      if (value === "none") {
        this.communicationNoneSelected = !this.communicationNoneSelected;
        this.selectedCommunication = this.communicationNoneSelected ? "none" : null;
        return;
      }

      // If NONE active → block others
      if (this.communicationNoneSelected) return;

      // First-time selection → apply immediately
      if (!this.selectedCommunication) {
        this.selectedCommunication = value;
        return;
      }

      // Clicking same platform → do nothing
      if (this.selectedCommunication === value) return;

      // Switching platform → ask confirmation FIRST
      this.pendingCommunication = value;

      const res = await Swal.fire({
        title: "Switch platform?",
        text: "Are you sure you want to switch the communication platform?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (res.isConfirmed) {
        // ✅ Apply active ONLY now
        this.selectedCommunication = this.pendingCommunication;
      }

      // Cleanup
      this.pendingCommunication = null;
    },
    async handleProjectClick(value) {
      // NONE logic
      if (value === "none") {
        this.projectNoneSelected = !this.projectNoneSelected;
        this.selectedProject = this.projectNoneSelected ? "none" : null;
        return;
      }

      // If NONE active → block others
      if (this.projectNoneSelected) return;

      // First-time selection → apply immediately
      if (!this.selectedProject) {
        this.selectedProject = value;
        return;
      }

      // Clicking same tool → do nothing
      if (this.selectedProject === value) return;

      // Switching tool → ask confirmation FIRST
      this.pendingProject = value;

      const res = await Swal.fire({
        title: "Switch platform?",
        text: "Are you sure you want to switch the project management tool?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (res.isConfirmed) {
        // ✅ Apply active ONLY after Yes
        this.selectedProject = this.pendingProject;
      }

      // Cleanup
      this.pendingProject = null;
    },
    handleContinue() {
      // 🟢 CASE 1: Came from dashboard / assets / tickets / etc
  if (this.returnTo) {
    this.$router.push(this.returnTo);
    return;
  }
      // Check if at least 1 location exists
      if (!this.authStore.locations || this.authStore.locations.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No Location Added',
          text: 'Please add at least one location before proceeding to Risk Criteria.',
          confirmButtonColor: '#5a44ff'
        });
        return;
      }

      // Mark step 1 as completed
      this.authStore.markStepCompleted(1);

      // Navigate to next page
      this.$router.push('/riskcriteria');
    },
  },

  mounted() {
    document.addEventListener("click", this.closeOnOutside);
    console.log("Route query:", this.$route.query);
    this.initChipSelection();

    // fetch countries for autocomplete
    this.authStore.fetchCountries();

    // fetch locations for avatars
    const user =
      this.authStore.user ||
      JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      this.authStore.user = user;
      const adminId = user._id || user.id;
      if (adminId) {
        this.authStore.fetchLocationsByAdminId(adminId);
      }
    }
  },

  beforeUnmount() {
    document.removeEventListener("click", this.closeOnOutside);
  },

};
</script>


<style scoped>
  .invite-link.disabled {
  cursor: default;
  /* pointer-events: none; */
  background: #f9fafb;
  color: #9ca3af;
}

.chip.disabled {
  opacity: 0.45;
  pointer-events: none;
  background: #f3f4f6;
  border-color: #d1d5db;
  box-shadow: none;
}

.invite-link {
  cursor: pointer;
  background: #f9fafb;
}

.invite-link:focus {
  box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.25);
}

/* new add css */
.dropdown-list {
  position: absolute;
  background: #fff;
  border: 1px solid #e6e9f2;
  border-radius: 12px;
  padding: 8px;
  width: 100%;
  z-index: 20;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
}

.dropdown-list label {
  display: flex;
  gap: 8px;
  font-size: 13px;
  padding: 6px;
  cursor: pointer;
}

.dropdown-list label:hover {
  background: #f5f6ff;
}

/* existing css */

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

/* ===== CONTENT ===== */

.content {
  margin-left: 260px;
  /* space for stepper */
  margin-top: 64px;
  /* space for topbar */
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 48px 64px;
}

.content h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

.content p {
  color: #6b7280;
  margin-bottom: 48px;
}

/* ===== SECTION ===== */
.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

/* ===== INTEGRATION CHIPS ===== */
.chip-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.chip {
  padding: 14px 22px;
  border-radius: 14px;
  border: 1.5px solid #e6e9f2;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 210px;
  justify-content: center;
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
  /* box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08); */
  box-shadow: 10px 10px 22px rgba(15, 23, 42, 0.08);
}


.chip:hover {
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
  transform: translateY(-2px);
}


.chip.active {
  border-color: #5a44ff;
  background: rgba(90, 68, 255, 0.06);
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(90, 68, 255, 0.2);
}

.chip img {
  width: 22px;
  height: 22px;
}

.location-circle {
  margin-top: 4px;
}

/* ===== FORMS ===== */
.form-control,
.form-select {
  border-radius: 12px;
  padding: 14px;
  font-size: 14px;
  box-shadow: 10px 10px 22px rgba(15, 23, 42, 0.08);
}

.form-control:focus,
.form-select:focus {
  border-color: #5a44ff;
  /* box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.15); */
  box-shadow: 10px 10px 22px rgba(15, 23, 42, 0.08);
}

.row-users {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.6fr 1fr 1.2fr;
  gap: 14px;
}

.row-invite {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 14px;
}

/* ===== CTA ===== */
.cta {
  margin-top: 64px;
  text-align: right;
}

.btn-primary {
  background: #5a44ff;
  border: none;
  border-radius: 14px;
  padding: 16px 36px;
  font-weight: 600;
  font-size: 15px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 22px rgba(90, 68, 255, 0.28);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(90, 68, 255, 0.38);
}

.chip,
.form-control,
.form-select,
.btn-primary {
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
}
.chip:hover {
  transform: translateY(-2px);
}

/* ===== RESPONSIVE ===== */
/* iPad Air */
@media (max-width: 992px) {
  .app {
    grid-template-columns: 720px;
    justify-content: center;
  }
  .content {
    margin-left: 0;
    margin-top: 180px;
    height: auto;
    padding: 20px 40px;
  }
  .row-invite {
    grid-template-columns: 1fr;
  }
  .row-users {
    grid-template-columns:
      minmax(95px, 2fr)
      minmax(70px, 2fr)
      minmax(70px, 2fr)
      minmax(125px, 3fr)
      minmax(118px, 3fr)
      minmax(110px, 2.5fr);
    gap: 5px;
  }
  .btn-primary {
    padding: 13px 29px;
  }
  .row-invite[data-v-9a2bf7bb] {
    grid-template-columns: 1fr 1fr 2fr;
    gap: 5px;
  }
  .location-circle {
    margin-top: 3px;
  }
}

/* iPad Pro */
@media (max-width: 1200px) {
  .chip-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .content {
    margin-left: 10px;
    margin-top: 210px;
    height: auto;
  }
  .cta {
    margin-top: 174px;
  }
}


/* iPad Mini */
@media (max-width: 768px) {
  .chip-group {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }
}

</style>