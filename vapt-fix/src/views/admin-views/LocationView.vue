<template>
  <main>
    <section class="bg-light">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 my-3  welcome-bg">
            <div class="col-lg-10 offset-lg-2">
              <div class="container-fluid py-2">
                <!-- <div class="row">  
                <div class="d-flex flex-row">
                  <div class="mt-2">
                    <img src="@/assets/images/waving-hand.png" alt="" class="me-3">
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                    <div>
                      <h1 class="fw-semibold welcome-head"> Welcome to vaptfix!</h1>
                      <p class="welcome-subhead">Before we fix your information assets, ....</p>
                    </div>
                    <div>   
                    </div>
                    </div>
                  </div>
                </div>
              </div> -->
                <div class="row">
                  <div class="d-flex flex-row align-items-start justify-content-between w-100">

                    <!-- LEFT (UNCHANGED) -->
                    <div class="d-flex flex-row">
                      <div class="mt-2">
                        <img src="@/assets/images/waving-hand.png" alt="" class="me-3">
                      </div>

                      <div>
                        <h1 class="fw-semibold welcome-head">Welcome to vaptfix!</h1>
                        <p class="welcome-subhead">Before we fix your information assets, ....</p>
                      </div>
                    </div>

                    

                  </div>
                </div>

                <div class="row">
                  <Stepper />
                </div>

                <div class="row mt-5 mb-4" v-if="showPlatforms">
                  <div class="col-9 location-card py-4 px-4 ms-3">
                    <div class="row">
                      <div class="d-flex justify-content-start">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                          <i class="bi bi-ui-checks-grid fs-5"></i>
                        </div>
                        <h5 class="fw-semibold ms-2 mt-2">Choose your communication platform</h5>
                      </div>
                    </div>
                    <div class="card ps-2 py-4 border-0">
                      <!-- First row: 4 cards -->
                      <div class="row g-4">
                        <!-- Teams -->
                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2" :style="{
                            backgroundColor: notUsingPlatform
                              ? '#d3d3d3'
                              : (activePlatform === 'teams' ? 'aquamarine' : '')
                          }" style="aspect-ratio:1/1; cursor:pointer;">
                            <button class="btn border-0" @click="activatePlatform('teams')"
                              :disabled="notUsingPlatform">
                              <div>
                                <img src="@/assets/images/teams.png" alt="Teams" style="width:40px; height:40px;">
                                <p class="mt-2 fw-semibold mb-0">Teams</p>
                              </div>
                            </button>
                          </div>
                        </div>

                        <!-- Slack -->
                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            :style="{ backgroundColor: notUsingPlatform ? '#d3d3d3' : (activePlatform === 'slack' ? 'aquamarine' : '') }"
                            style="aspect-ratio:1/1; cursor:pointer;">
                            <!-- <button class="btn border-0" v-if="!user" @click="startSlackLogin"
                              :disabled="notUsingPlatform">
                              <div>
                                <img src="@/assets/images/slack.png" alt="Slack" style="width:40px; height:40px;">
                                <p class="mt-2 fw-semibold mb-0">Slack</p>
                              </div>
                            </button> -->
                            <button class="btn border-0" v-if="!user" @click="activatePlatform('slack')"
                              :disabled="notUsingPlatform">
                             <div>
                                <img src="@/assets/images/slack.png" alt="Slack" style="width:40px; height:40px;">
                                <p class="mt-2 fw-semibold mb-0">Slack</p>
                              </div></button>
                          </div>
                        </div>

                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-4"
                            style="aspect-ratio:1/1; cursor:pointer;">
                            <div>
                              <!-- <button class="btn mt-2 mb-2 fw-semibold border-0" style="font-size: 12px;" @click="togglePlatformStatus"> {{ notUsingPlatform ? "I am using a platform" : "I'm not using any platform." }}</button> -->
                              <button class="btn mt-2 mb-2 fw-semibold border-0 fs-5" @click="togglePlatformStatus"> {{
                                notUsingPlatform ? "select" : "None" }}</button>
                            </div>
                          </div>

                        </div>

                      </div>

                      <!-- Second row: 3 cards -->
                      <div class="row g-4 mt-2">
                        <div class="d-flex justify-content-start">
                          <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                            <i class="bi bi-ui-checks-grid fs-5"></i>
                          </div>
                          <h5 class="fw-semibold ms-2 mt-2">Choose your Project Management platform</h5>
                        </div>
                        <!-- Jira -->
                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2" :class="{
                            'bg-aqua text-dark': selectedJiraAsana === 'jira' && !notUsingJiraAsana,
                            'bg-grey': notUsingJiraAsana
                          }" style="aspect-ratio:1/1; cursor:pointer;" @click="handleJiraAsanaClick('jira')">
                            <div>
                              <img src="@/assets/images/jira.png" alt="Jira" style="width:40px; height:40px;">
                              <p class="mt-2 fw-semibold mb-0">Jira</p>
                            </div>
                          </div>
                        </div>

                        <!-- Asana -->
                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2" :class="{
                            'bg-aqua text-dark': selectedJiraAsana === 'asana' && !notUsingJiraAsana,
                            'bg-grey': notUsingJiraAsana
                          }" style="aspect-ratio:1/1; cursor:pointer;" @click="handleJiraAsanaClick('asana')">
                            <div>
                              <img src="@/assets/images/asana.png" alt="Asana" style="width:40px; height:40px;">
                              <p class="mt-2 fw-semibold mb-0">Asana</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-2">
                          <div class="card shadow border-0 d-flex align-items-center justify-content-center p-4"
                            style="aspect-ratio:1/1; cursor:pointer;">
                            <div>
                              <button class="btn mt-2 mb-2 fw-semibold fs-5 border-0" @click="toggleJiraAsanaUsage">
                                {{ notUsingJiraAsana ? 'Select' : 'None' }}
                              </button>
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                <!-- add location -->
                <div class="row">
                  <div class="col-lg-9 location-card py-4 px-4 ms-3">
                    <div class="row">
                      <div class="d-flex justify-content-start">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                          <i class="bi bi-geo-alt-fill fs-5"></i>
                        </div>
                        <h5 class="fw-semibold ms-2 mt-2">Add location <span class="text-danger">*</span></h5>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <!-- <div class="col-5">
                      <input type="text" class="form-control rounded-0 uniform-input" id="locationName" v-model="locationName"
                        placeholder="Enter the name of the location..." />
                    </div> -->
                      <div class="col-5 location-dropdown-wrapper" style="position: relative;">
                        <input type="text" class="form-control rounded-0 uniform-input" id="locationName"
                          v-model="locationName" placeholder="Enter the name of the location..."
                          @input="onLocationInput" @focus="onLocationInput" />
                        <!-- Dropdown -->
                        <ul v-if="showDropdown && filteredCountries.length" class="list-group"
                          style="position: absolute; top: 100%; left: 12; right: 10; z-index: 10; max-height: 200px; overflow-y: auto;width: 95%;">
                          <li v-for="country in filteredCountries" :key="country"
                            class="list-group-item list-group-item-action" @click="selectCountry(country)"
                            style="cursor: pointer;">
                            {{ country }}
                          </li>
                        </ul>
                      </div>


                      <div class="col-3">
                        <button class="btn btn-sm mt-2 add-location-btn text-light" type="button"
                          @click="handleAddLocation"><i class="bi bi-plus me-2"></i>Add location </button>
                      </div>
                      <div class="col-4 pt-1">
                        <div class="avatar-container">
                          <div v-for="(loc, index) in authStore.locations" :key="loc._id || index" class="avatar"
                            :class="getAvatarClass(index)" :title="loc.location_name">
                            {{ getInitials(loc.location_name) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- add users -->
                <div class="row mt-4">
                  <div class="col-lg-12 add-users py-4 px-4 ms-3">
                    <div class="row mb-3">
                      <div class="d-flex justify-content-start">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                          <i class="bi bi-person-fill fs-5"></i>
                        </div>
                        <h5 class="fw-semibold ms-2 mt-2">Add users</h5>
                      </div>
                    </div>
                    <form>
                      <div class="row px-3 g-3 mb-4">
                        <table class="table align-middle table-borderless">
                          <thead class="table-light">
                            <tr>
                              <th class="text-center" style="width: 15%;">User Type</th>
                              <th class="text-center" style="width: 15%;">First Name</th>
                              <th class="text-center" style="width: 15%;">Last Name</th>
                              <th class="text-center" style="width: 25%;">Email</th>
                              <th class="text-center" style="width: 15%;">Location</th>
                              <th class="text-center" style="width: 15%;">Member Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <select v-model="form.user_type"
                                  class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                                  <option selected disabled value="">Select</option>
                                  <option value="internal">Internal</option>
                                  <option value="external">External</option>
                                </select>
                              </td>
                              <td>
                                <input v-model="form.first_name" id="firstname" type="text"
                                  class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                              </td>
                              <td>
                                <input v-model="form.last_name" type="text" id="lastname"
                                  class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                              </td>
                              <td>
                                <input v-model="form.email" id="email" type="email"
                                  class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                              </td>
                              <td>
                                <select v-model="selectedLocation"
                                  class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                                  <option disabled value="">Select</option>
                                  <option v-for="(loc, index) in authStore.locations" :key="loc._id || index"
                                    :value="loc._id">
                                    {{ loc.location_name }}
                                  </option>
                                </select>
                              </td>
                              <td>
                                <div class="multi-select-dropdown" ref="roleDropdown1">
                                  <div class="dropdown-input rounded-0" @click="toggleDropdown('dropdown1')">
                                    <!-- <span>{{ selectedRoleText1 }}</span> -->
                                    <span>
                                      <!-- Display short forms only -->
                                      {{ selectedRolesShortDisplay }}
                                    </span>
                                    <span><i class="bi bi-chevron-down"></i></span>
                                  </div>
                                  <div class="dropdown-list" v-show="isOpen.dropdown1">
                                    <label v-for="option in roleOptions" :key="option.short">
                                      <input type="checkbox" :value="option.short" v-model="selectedRoles1" />
                                      {{ option.full }}
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="row">
                          <div class="col-2">
                            <button class="btn btn-sm px-3 add-location-btn text-light" type="button"
                              @click="addUser"><i class="bi bi-plus me-2"></i>Add user </button>
                          </div>
                        </div>
                      </div>
                    </form>


                  </div>
                </div>

                <!-- create invite link -->
                <div class="row mt-4">
                  <div class="col-lg-12 add-users py-4 px-4 ms-3">
                    <div class="row mb-3">
                      <div class="d-flex justify-content-start">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                          <i class="bi bi-link-45deg fs-5"></i>
                        </div>
                        <h5 class="fw-semibold ms-2 mt-2">Create invite link for external member</h5>
                      </div>
                    </div>
                    <table class="table align-middle table-borderless">
                      <thead class="table-light">
                        <tr>
                          <th class="col-2 text-center">Location</th>
                          <th class="col-2 text-center">Member Role</th>
                          <th class="col-6 text-center">Copy Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="col-2">
                            <select v-model="selectedLocation"
                              class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                              <option disabled value="">Select</option>
                              <option v-for="(loc, index) in authStore.locations" :key="loc._id || index"
                                :value="loc._id">
                                {{ loc.location_name }}
                              </option>
                            </select>
                          </td>
                          <td class="col-2">
                            <div class="multi-select-dropdown" ref="roleDropdown2">
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
                          </td>
                          <td class="col-6">
                            <div class="position-relative w-100"> 
                            <textarea
                              id="shareLink"
                              class="form-control form-control-sm border-bottom rounded-0 text-center"
                              rows="2"
                              readonly
                              @click="copyLink"
                              style="
                                resize: none;
                                overflow: hidden;
                                height: 42px;
                                padding: 0px 0px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                                
                              "
                            >
                            https://secureitlabbh.sharepoint.com/:w:/s/SITLDevelopment/ETbmVY-X3_FLvyBDP7aVAvIB82tWReGJNHD6pIOGzuRurg?e=e16G1P
                            </textarea>
                              <!-- Popup message -->
                              <div id="copyPopup" class="position-absolute px-2 py-1 rounded small text-white"
                                style="background: grey; top: -40px; left: 50px; display: none;">
                                Link Copied!
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

                <!-- slack users -->
                <div class="row mt-4" v-if="user">
                  <div class="col-lg-12 add-users py-4 px-4 ms-3">
                    <div class="row pb-4 pt-2 px-2">
                      <div class="d-flex justify-content-start mb-3">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                          <i class="bi bi-slack fs-5"></i>
                        </div>
                        <h5 class="fw-semibold ms-2 mt-2">Slack</h5>
                        <p class="ms-3 fw-semibold" style="font-size: 13px;margin-top: 12px;">(Add Internal Users)</p>
                      </div>
                      <div class="card border-0">
                        <table class="table table-striped table-hover align-middle">
                          <thead class="table-light">
                            <tr>
                              <th scope="col">S.No.</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Location</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <!-- <tbody> -->
                          <!-- <tr>
                              <td>1</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/men/11.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Cameron Williamson
                              </td>
                              <td>curtis@example.com</td>
                             
                               <td>
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
                               </td>
                              <td>
                                <select class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                                  <option selected disabled value="">location</option>
                                  <option value="">Germany</option>
                                  <option value="">Delhi</option>
                                  <option value="">Bahrain</option>
                                </select>
                              </td>
                              
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/men/22.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Wade Warren
                              </td>
                              <td>wade@example.com</td>
                              <td>Patch Management</td>
                              <td>UAE</td>
                              
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Marvin McKinney
                              </td>
                              <td>marvin@example.com</td>
                              <td>Network Security</td>
                              <td>Afghanistan</td>
                              
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Brooklyn Simmons
                              </td>
                              <td>brooklyn@example.com</td>
                              <td>Architectural Flaws</td>
                              <td>Antigua</td>
                              
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/men/55.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Leslie Alexander
                              </td>
                              <td>leslie@example.com</td>
                              <td>Network Security</td>
                              <td>Albania</td>
                              
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr> -->
                          <!-- </tbody> -->
                          <tbody>
                            <tr>
                              <td>{{ index + 1 }}</td>
                              <td>
                                <img :src="user.image || defaultImage" class="rounded-circle me-2" width="40"
                                  height="40" />
                                {{ user.name }}
                              </td>
                              <td>{{ user.email }}</td>
                              <td>—</td>
                              <td>—</td>
                              <td>
                                <button class="btn btn-sm btn-primary">Assign</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="text-end">

                  <router-link :to="nextPath" class="btn stepper-btn mt-5">
                    {{ buttonLabel }}
                    <i class="bi bi-arrow-right-circle-fill ms-1"></i>
                  </router-link>
                  <!-- <button class="btn stepper-btn mt-5" @click="handleNext">
  {{ buttonLabel }} <i class="bi bi-arrow-right-circle-fill ms-1"></i>
</button> -->



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
import Stepper from '@/components/admin-component/Stepper.vue';
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
  name: 'LocationView',
  components: {
    Stepper
  },
  data() {
    return {
      showPlatforms: true,
      selectedLocation: "",
      locations: {
        germany: "Germany",
        delhi: "Delhi",
        bahrain: "Bahrain",
      },
      isOpen: {
        dropdown1: false,
        dropdown2: false,
        dropdown3: false,
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
      showData: false,
      isTeamsActive: false,
      notUsingPlatform: false,
      isSlackActive: false,
      showSlack: false,
      activePlatform: "",
      selectedJiraAsana: null,
      notUsingJiraAsana: false,
      locationName: "",
      showDropdown: false,
      filteredCountries: [],
      authStore: useAuthStore(),
      form: {
        admin_id: "",
        location_id: "",
        first_name: "",
        last_name: "",
        user_type: "",
        email: "",
        select_location: "",
        Member_role: "",
      },
      usersList: [],
      activePlatform: null,
      slackUsers: [],
      slackAuthUrl: "",
      teamsUser: null,
      user: null,
      userShown: false,
      defaultImage:
        "https://a.slack-edge.com/80588/img/avatars/ava_0001-512.png",
      popupPollInterval: null,
      popupWindow: null,
      // backendBase: "https://vapt-backend.onrender.com",
      backendBase: "https://vaptbackend.secureitlab.com",
    };
  },
  computed: {
    selectedRolesShortDisplay() {
      return this.selectedRoles1.length > 0
        ? this.selectedRoles1.join(", ")
        : "Select Roles";
    },
    selectedRoleText2() {
      return this.selectedRoles2.length > 0 ? this.selectedRoles2.join(', ') : 'Select';
    },
    selectedRoleText3() {
      return this.selectedRoles3.length > 0 ? this.selectedRoles3.join(', ') : 'Select';
    },
    authStore() {
      return useAuthStore();
    },
    nextPath() {
      return this.$route.query.from === "dashboard"
        ? "/admindashboardonboarding"
        : "/riskcriteria";
    },
    buttonLabel() {
      return this.$route.query.from === "dashboard"
        ? "Back to dashboard"
        : "Next";
    },
  },
  methods: {
    
    // handleNext() {
    //   const authStore = useAuthStore(); // ✅ Options API way

    //   // ✅ Mark onboarding step completed
    //   authStore.completeOnboardingStep("location");

    //   // ✅ Navigate using your existing logic
    //   this.$router.push(this.nextPath);
    // },
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
      this.filteredCountries = allCountries.filter((country) =>
        country.toLowerCase().includes(input)
      );
    },
    selectCountry(country) {
      this.locationName = country;
      this.showDropdown = false;
    },
    handleOutsideClick(e) {
      // close dropdown when click outside input + dropdown wrapper
      if (!e.target.closest(".location-dropdown-wrapper")) {
        this.showDropdown = false;
      }
    },

    initTooltips() {
      Object.values(this.$refs).forEach((el) => {
        new bootstrap.Tooltip(el);
      });
    },
    toggleDropdown(drop) {
      this.isOpen[drop] = !this.isOpen[drop];
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
    togglePlatformStatus() {
      this.notUsingPlatform = !this.notUsingPlatform;
      if (this.notUsingPlatform) {
        this.activePlatform = null;
        this.showData = false;
      }
    },
    toggleTeams() {
      if (this.notUsingPlatform) return;
      this.showTeams = true;
      this.isTeamsActive = true;
    },
    activateTeams() {
      if (this.notUsingPlatform) return;
      this.isTeamsActive = true;
      this.isSlackActive = false;
      this.showTeams = true;
      this.showSlack = false;
    },
    activateSlack() {
      if (this.notUsingPlatform) return;

      if (this.isTeamsActive) {
        // Show SweetAlert confirmation
        Swal.fire({
          title: "Switch Platform?",
          text: "Do you want to switch to Slack?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.isTeamsActive = false;
            this.showTeams = false;
            this.isSlackActive = true;
            this.showSlack = true;

            Swal.fire({
              title: "Switched!",
              text: "You are now using Slack.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      } else {
        // Normal case → activate Slack directly
        this.isSlackActive = true;
        this.showSlack = true;
      }
    },
    async activatePlatform(platform) {
      if (this.notUsingPlatform) return;

      // First-time selection
      if (!this.activePlatform) {
        this.activePlatform = platform;
        this.showData = true;

        // Call respective login
        if (platform === "slack") {
          await this.startSlackLogin();
        } else if (platform === "teams") {
          await this.startTeamsLogin();
        }
        return;
      }

      // If same platform clicked again, do nothing
      if (this.activePlatform === platform) return;

      // If switching
      Swal.fire({
        title: "Switch Platform?",
        text: `Do you want to switch to ${platform === "teams" ? "Teams" : "Slack"}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.activePlatform = platform;
          this.showData = true;

          if (platform === "slack") {
            await this.startSlackLogin();
          } else if (platform === "teams") {
            await this.startTeamsLogin();
          }
        }
      });
    },
    // ✅ Teams OAuth flow (new)
    async startTeamsLogin() {
      try {
        console.log("🚀 Starting Microsoft Teams login...");

        const width = 600, height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        const popup = window.open("", "MicrosoftTeamsLogin", `width=${width},height=${height},top=${top},left=${left}`);

        if (!popup) {
          Swal.fire({ icon: "info", title: "Popup Blocked!", text: "Please allow popups for this site." });
          return;
        }

        const frontendRedirect = window.location.origin;
        const res = await fetch(
          `https://vaptbackend.secureitlab.com/api/admin/users/microsoft-teams/oauth-url/?redirect_uri=${encodeURIComponent(frontendRedirect)}`
        );

        const data = await res.json();
        if (!data?.auth_url) {
          popup.close();
          Swal.fire({ icon: "error", title: "Auth URL Missing", text: "Backend did not return OAuth URL." });
          return;
        }

        popup.location.href = data.auth_url + "&prompt=select_account";

        window.addEventListener("message", async (event) => {
          if (event.data?.code) {
            console.log("✅ Microsoft Teams login success:", event.data);
            popup.close();

            Swal.fire({
              icon: "success",
              title: "Microsoft Teams Connected!",
              timer: 1500,
              showConfirmButton: false,
            });

            // Save user info
            localStorage.setItem("teams_code", event.data.code);
            localStorage.setItem("teams_state", event.data.state);
          }
        });


      } catch (err) {
        console.error("❌ Teams login error:", err);
        Swal.fire("Error", "Microsoft Teams login failed.", "error");
      }
    },
    // 🧠 Slack OAuth flow
    async startSlackLogin() {
      const authStore = useAuthStore();

      try {
        // 1️⃣ Get Slack OAuth URL
        const { data: slackData } = await authStore.getSlackOAuthUrl(this.backendBase);
        const authUrl = slackData.auth_url;
        console.log("🔗 Slack Auth URL:", authUrl);

        // 2️⃣ Listen BEFORE opening popup
        const handler = (event) => {
          if (!event.data || event.data.type !== "slack-auth-success") return;

          const payload = event.data.payload;
          console.log("✅ Slack OAuth Payload:", payload);

          if (!payload.success) {
            Swal.fire("Error", payload.error || "Slack login failed", "error");
            return;
          }

          // ✅ Store Slack user info
          localStorage.setItem("slack_user_login", payload.bot_access_token);
          localStorage.setItem("slack_user_email", payload.user_email);
          localStorage.setItem("slack_user_name", payload.user_name);

          // ✅ Show Slack success popup
          Swal.fire({
            title: "🎉 Slack Login Successful!",
            html: `
            <b>Welcome, ${payload.user_name}!</b><br>
            <small>Logged in as <i>${payload.user_email}</i></small>
          `,
            icon: "success",
            confirmButtonText: "OK",
            background: "#fff",
            color: "#333",
            timer: 4000,
            timerProgressBar: true,
          });

          console.log("👤 Slack User Saved:", payload.user_name, payload.user_email);

          // ✅ Remove listener
          window.removeEventListener("message", handler);
        };

        window.addEventListener("message", handler, { once: true });

        // 3️⃣ Open popup after listener
        const popup = window.open(authUrl, "SlackAuth", "width=700,height=800");

        // 4️⃣ Fallback: check every 2s if user logged in
        const fallbackTimer = setInterval(() => {
          if (popup.closed) {
            clearInterval(fallbackTimer);
            console.log("Popup closed");
          }
        }, 2000);
      } catch (error) {
        console.error("Slack login error:", error);
        Swal.fire("Error", "Something went wrong during Slack login.", "error");
      }
    },
    async handleJiraAsanaClick(platform) {
      if (this.notUsingJiraAsana) return;

      this.selectedJiraAsana = platform;

      if (platform === "jira") {
        try {
          const authStore = useAuthStore();
          const res = await authStore.getJiraAuthUrl();

          if (res.status && res.url) {
            // ✅ Open Jira auth in a popup (like Google)
            const popup = window.open(res.url, "_blank", "width=700,height=800");

            if (!popup || popup.closed || typeof popup.closed === "undefined") {
              Swal.fire("Popup Blocked", "Please allow popups for Jira login.", "info");
              return;
            }

            // 🕒 (Optional) Poll to detect callback success (if backend updates session)
            const checkLogin = setInterval(() => {
              if (popup.closed) {
                clearInterval(checkLogin);
                Swal.fire(
                  "Success",
                  "Jira authorization completed ✅",
                  "success"
                );
                // You can now call your backend `/jira/login/` if needed
              }
            }, 1000);
          } else {
            Swal.fire("Error", res.message || "Failed to start Jira login ❌", "error");
          }
        } catch (err) {
          console.error("⚠️ Jira login error:", err);
          Swal.fire("Error", "Something went wrong during Jira login.", "error");
        }
      } else {
        Swal.fire("Info", "This button is for Jira login.", "info");
      }
    },
    toggleJiraAsanaUsage() {
      this.notUsingJiraAsana = !this.notUsingJiraAsana;

      if (this.notUsingJiraAsana) {
        this.selectedJiraAsana = null; // reset selection when disabled
      }
    },
    async handleAddLocation() {
      if (!this.locationName.trim()) return;

      const res = await this.authStore.addLocation(this.locationName.trim());

      if (res.status) {
        this.locationName = "";
      } else {
        console.error("Error:", res.message);
      }
    },
    getInitials(name) {
      if (!name) return "";
      return name.substring(0, 2).toUpperCase();
    },
    getAvatarClass(index) {
      const classes = ["ava-green", "ava-blue", "ava-yellow"];
      return classes[index % classes.length];
    },
    async addUser() {
      try {
        // ✅ 1️⃣ Get admin_id from logged-in user (stored in authStore)
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

        // ✅ 2️⃣ Prepare form data according to your backend structure
        this.form.admin_id = adminId;
        this.form.location_id = this.selectedLocation;

        // find location name
        const selectedLoc = this.authStore.locations.find(
          (loc) => loc._id === this.selectedLocation
        );
        this.form.select_location = selectedLoc ? selectedLoc.location_name : "";
        this.form.Member_role = this.selectedRoles1.map(
          (short) =>
            this.roleOptions.find((opt) => opt.short === short)?.full || short
        );

        // ✅ 3️⃣ Validate all required fields before API call
        if (
          !this.form.first_name ||
          !this.form.last_name ||
          !this.form.email ||
          !this.form.user_type ||
          !this.form.location_id ||
          this.form.Member_role.length === 0
        ) {
          Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill all required fields.",
            timer: 2500,
            showConfirmButton: false,
          });
          return;
        }

        // ✅ 3️⃣ Call API
        const response = await this.authStore.createUserDetail(this.form);

        if (response.status) {
          console.log("✅ User Added Successfully:", response.data);

          Swal.fire({
            icon: "success",
            title: "User Added Successfully",
            text: response.message,
            timer: 3000,
            showConfirmButton: false,
          });

          // ✅ 4️⃣ Save user to localStorage
          const existingUsers = JSON.parse(localStorage.getItem("addedUsers") || "[]");

          // prevent duplicate by email
          const userExists = existingUsers.some(
            (u) => u.email === response.data.email
          );
          if (!userExists) {
            existingUsers.push(response.data);
          }

          this.usersList = existingUsers;
          localStorage.setItem("addedUsers", JSON.stringify(this.usersList));

          // ✅ 5️⃣ Reset form
          this.form = {
            admin_id: "",
            location_id: "",
            first_name: "",
            last_name: "",
            user_type: "",
            email: "",
            select_location: "",
            // Member_role: "",
            Member_role: [],
          };
          this.selectedLocation = "";
          this.selectedRoles1 = [];
        } else {
          console.error("❌ Error:", response);

          // Extract error message from backend response
          let errorMessage = response.message || "Failed to add user";

          // Check for 'details.detail' field (backend validation errors)
          if (response.details && response.details.detail) {
            errorMessage = response.details.detail;

            // Extract clean message from Python ErrorDetail format
            // Format: "{'email': [ErrorDetail(string='message here', code='unique')]}"
            const match = errorMessage.match(/string='([^']+)'/);
            if (match && match[1]) {
              errorMessage = match[1];
            }
          }
          // Check for 'details.error' field
          else if (response.details && response.details.error) {
            errorMessage = response.details.error;
          }
          // Check for nested 'details.errors' structure
          else if (response.details && response.details.errors) {
            const errors = response.details.errors;
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey && Array.isArray(errors[firstErrorKey]) && errors[firstErrorKey].length > 0) {
              errorMessage = errors[firstErrorKey][0];
            }
          }

          // Show simple alert without icon
          Swal.fire({
            text: errorMessage,
            confirmButtonText: "OK"
          });
        }
      } catch (error) {
        console.error("❌ Add user failed:", error);
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: "Something went wrong. Please try again.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    },
  },
  mounted() {
    this.authStore.fetchCountries();
    const savedUsers = localStorage.getItem("addedUsers");
    if (savedUsers) {
      this.usersList = JSON.parse(savedUsers);
      console.log("📌 Loaded users from localStorage:", this.usersList);
    }
    // 🟡 3️⃣ Fetch locations by admin id instead of old fetchLocations()
    const user =
      this.authStore.user ||
      JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      this.authStore.user = user; // keep store in sync
      const adminId =
        user.admin_id || user.id || user._id;

      if (adminId) {
        this.authStore.fetchLocationsByAdminId(adminId);
      }
    }
    this.initTooltips();
    document.addEventListener('click', this.onClickOutside);
    try {
      // 🟢 1️⃣ Handle Microsoft Teams popup redirect
      if (window.opener && window.location.search.includes("code=")) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        console.log("📩 Received Teams code:", code);

        // ✅ Exchange code with backend for tokens & user info
        fetch("https://vaptbackend.secureitlab.com/api/admin/users/microsoft-oauth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, state }),
        })
          .then(async (res) => {
            const data = await res.json();
            console.log("✅ Teams OAuth response:", data);

            if (res.ok && data?.user_info) {
              // 🧩 Send full login success message to parent
              window.opener.postMessage(
                {
                  type: "teams-login-success",
                  code,
                  state,
                  token_data: data.token_data,
                  user_info: data.user_info,
                },
                window.location.origin
              );

              // Show confirmation in popup
              document.body.innerHTML = "<h2>Microsoft login successful! Closing...</h2>";
              setTimeout(() => window.close(), 1000);
            } else {
              console.error("❌ Microsoft OAuth failed:", data);
              document.body.innerHTML = "<h2>Failed to get user info</h2>";
            }
          })
          .catch((err) => {
            console.error("❌ Teams OAuth error:", err);
            document.body.innerHTML = "<h2>Login error</h2>";
          });

        return;
      }

      // 🟠 2️⃣ Handle Slack OAuth redirect
      // this.handleSlackRedirect();

      // 🟣 3️⃣ Load saved users (existing logic)
      const savedUsers = localStorage.getItem("addedUsers");
      if (savedUsers) this.usersList = JSON.parse(savedUsers);

      // 🟡 4️⃣ Fetch locations if not loaded
      if (!this.authStore.locations.length) {
        this.authStore.fetchLocations();
      }

      // 🟣 5️⃣ Initialize tooltips and click listeners
      this.initTooltips();
      document.addEventListener("click", this.onClickOutside);

    } catch (err) {
      console.error("Redirect page error:", err);
    }
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClickOutside);

    window.removeEventListener("message", this.handleSlackMessage);

    document.removeEventListener("click", this.handleOutsideClick);
  }
};
</script>

<style scoped>
.location-autocomplete {
  position: relative;
}

.location-autocomplete .country-dropdown {
  position: absolute;
  top: 100%;
  /* just below input */
  left: 0;
  right: 0;
  /* => same width as input */
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
  border-top: none;
  /* optional: so it looks attached to input */
}

.multi-select-dropdown {
  position: relative;
  width: 160px;
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
  font-size: 13px;
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
  padding: 5px;
  cursor: pointer;
}

.dropdown-list label:hover {
  background-color: #f0f0f0;
}

.dropdown-list input[type="checkbox"] {
  margin-right: 10px;
}

.uniform-input {
  height: 42px;
  line-height: 32px;
  padding: 0 8px;

}

.bg-aqua {
  background-color: aquamarine !important;
}

.bg-grey {
  background-color: #e0e0e0 !important;
  pointer-events: none;
  opacity: 0.7;
}
</style>