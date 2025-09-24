<template>
  <main>
    <section class="bg-light">
      <div class="container-fluid">
        <div class="row">
          <!-- <div class="col-lg-2 welcome-bg"> -->
            <!-- <Stepper /> -->
          <!-- </div> -->
          <div class="col-lg-12 my-3  welcome-bg">
            <!-- <div class="col-lg-2 "></div> -->
            <div class="col-lg-10 offset-lg-2">
              <!-- <img src="@/assets/images/smaller-logo.png" alt="" class="ms-3"> -->
            <div class="container-fluid py-2">
              <div class="row">  
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
                <!-- <div class="col-1 d-flex justify-content-center align-items-center mb-3">
                  <img src="@/assets/images/waving-hand.png" alt="">
                </div>
                <div class="col-11">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h1 class="fw-semibold welcome-head"> Welcome to vaptfix!</h1>
                      <p class="welcome-subhead">Before we fix your information assets, ....</p>
                    </div>
                    <div>   
                    </div>
                  </div>

                </div> -->
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
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                         :style="{
        backgroundColor: notUsingPlatform 
          ? '#d3d3d3' 
          : (activePlatform === 'teams' ? 'aquamarine' : '')}"
                        style="aspect-ratio:1/1; cursor:pointer;">
                          <button class="btn border-0" @click="activatePlatform('teams')" :disabled="notUsingPlatform">
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
                        :style="{ backgroundColor: notUsingPlatform ? '#d3d3d3' : (activePlatform === 'slack' ? 'aquamarine' : '')}"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <button class="btn border-0"  @click="activatePlatform('slack')" :disabled="notUsingPlatform">
                            <div >
                            <img src="@/assets/images/slack.png" alt="Slack" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Slack</p>
                          </div>
                          </button>
                        </div>
                      </div>

                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-4" style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <!-- <button class="btn mt-2 mb-2 fw-semibold border-0" style="font-size: 12px;" @click="togglePlatformStatus"> {{ notUsingPlatform ? "I am using a platform" : "I'm not using any platform." }}</button> -->
                             <button class="btn mt-2 mb-2 fw-semibold border-0 fs-5"  @click="togglePlatformStatus"> {{ notUsingPlatform ? "select" : "None" }}</button>
                          </div>
                        </div>
                        
                      </div>

                      <!-- Jira -->
                      <!-- <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/jira.png" alt="Jira" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Jira</p>
                          </div>
                        </div>
                      </div> -->

                      <!-- Confluence -->
                      <!-- <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div class="d-flex flex-column align-items-center justify-content-center text-center">
                            <img src="@/assets/images/confluence.png" alt="Confluence" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Confluence</p>
                          </div>
                        </div>
                      </div> -->

                      <!-- Asana -->
                      <!-- <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/asana.png" alt="Asana" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Asana</p>
                          </div>
                        </div>
                      </div> -->
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
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"  :class="{
          'bg-aqua text-dark': selectedJiraAsana === 'jira' && !notUsingJiraAsana,
          'bg-grey': notUsingJiraAsana
        }"
                            style="aspect-ratio:1/1; cursor:pointer;" @click="handleJiraAsanaClick('jira')">
                          <div>
                            <img src="@/assets/images/jira.png" alt="Jira" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Jira</p>
                          </div>
                        </div>
                      </div>

                      <!-- Asana -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"  :class="{
          'bg-aqua text-dark': selectedJiraAsana === 'asana' && !notUsingJiraAsana,
          'bg-grey': notUsingJiraAsana
        }"
                            style="aspect-ratio:1/1; cursor:pointer;" @click="handleJiraAsanaClick('asana')">
                          <div>
                            <img src="@/assets/images/asana.png" alt="Asana" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Asana</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-4" style="aspect-ratio:1/1; cursor:pointer;">
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
                    <div class="col-5">
                      <input type="text" class="form-control rounded-0 uniform-input" id="locationName"
                        placeholder="Enter the name of the location..." />
                    </div>
                    <div class="col-3">
                      <button class="btn btn-sm mt-2 add-location-btn text-light" type="submit"><i
                          class="bi bi-plus me-2"></i>Add location </button>
                    </div>
                    <div class="col-4 pt-1">
                      <div class="avatar-container">
                        <!-- <div class="avatar ava-green">GM</div>
                        <div class="avatar ava-blue">DH</div>
                        <div class="avatar ava-yellow">BH</div> -->
                        <div class="avatar ava-green" ref="germany" :title="locations.germany">GM</div>
    <div class="avatar ava-blue" ref="delhi" :title="locations.delhi">DH</div>
    <div class="avatar ava-yellow" ref="bahrain" :title="locations.bahrain">BH</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                        <th class="text-center" style="width: 15%;">Select Location</th> 
                        <th class="text-center" style="width: 15%;">Member Role</th>
                      </tr>
                      </thead>    
                      <tbody>
                      <tr>
                        <td>
                          <select class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                            <option selected disabled>Select type</option>
                            <option value="internal">Internal</option>
                            <option value="external">External</option>
                          </select>
                        </td>
                        <td>
                          <input type="text" class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                        </td>
                        <td>
                          <input type="text" class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                        </td>
                        <td>
                          <input type="email" class="form-control form-control-sm border-bottom rounded-0 uniform-input fs-6" />
                        </td>
                        <td>
                          <select class="form-select form-select-sm border-bottom rounded-0 uniform-input fs-6">
                            <option selected disabled value="">Select locati</option>
                            <option value="">Germany</option>
                            <option value="">Delhi</option>
                            <option value="">Bahrain</option>
                          </select>
                        </td>
                        <td>
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
                        </td>
                      </tr>
                      </tbody>
                      </table>
                      <div class="row">
                        <div class="col-2">
                          <button class="btn btn-sm px-3 add-location-btn text-light" type="submit"><i
                              class="bi bi-plus me-2"></i>Add user </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  
                </div>
              </div>

              <div class="row mt-4">
                <div class="col-lg-12 add-users py-4 px-4 ms-3">
                    <div class="row mb-3">
                    <div class="d-flex justify-content-start">
                      <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-link-45deg fs-5"></i>
                    </div>
                    <h5 class="fw-semibold ms-2 mt-2">Create invite link</h5>
                    </div>
                    </div>
                    <table class="table align-middle table-borderless">
                        <thead class="table-light">
                          <tr>
                            <th class="col-2 text-center">User Type</th>                   
                            <th class="col-2 text-center">Select Location</th>
                            <th class="col-2 text-center">Member Role</th>
                            <th class="col-6 text-center">Copy Link</th>
                          </tr>
                        </thead>    
                        <tbody>
                          <tr>
                            <td class="col-2">
                              <select class="form-select rounded-0 uniform-input">
                        <option selected disabled>Select type</option>
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                      </select>
                            </td>
                            <td class="col-2">
                              <select class="form-select rounded-0 uniform-input">
                                <option selected disabled>Select location</option>
                                <option value="">Germany</option>
                                <option value="">Delhi</option>
                                <option value="">Bahrain</option>
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
                                    <input
                                      type="checkbox"
                                      :value="option.short"
                                      v-model="selectedRoles2"
                                    />
                                    {{ option.full }}
                                  </label>
                                </div>
                              </div>
                            </td>
                            <td class="col-6">
                              <div class="position-relative w-100">
                            <textarea
                              id="shareLink"
                              class="form-control form-control-sm border-bottom rounded-0"
                              rows="2"
                              readonly
                              @click="copyLink"
                              style="resize: none; overflow: hidden;white-space: normal;height: 42px;padding: 0 8px;"
                            >
                      https://secureitlabbh.sharepoint.com/:w:/s/SITLDevelopment/ETbmVY-X3_FLvyBDP7aVAvIB82tWReGJNHD6pIOGzuRurg?e=e16G1P
                            </textarea>

                            <!-- Popup message -->
                            <div
                              id="copyPopup"
                              class="position-absolute px-2 py-1 rounded small text-white"
                              style="background: grey; top: -40px; left: 50px; display: none;"
                            >
                              Link Copied!
                            </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                    
                </div>
              </div>

              <div class="row mt-4" v-if="showData">
                <div class="col-lg-12 add-users py-4 px-4 ms-3">
                  <div class="row pb-4 pt-2 px-2" >
                  <div class="d-flex justify-content-start mb-3">
                    <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-microsoft-teams fs-5"></i>
                    </div>
                    <h5 class="fw-semibold ms-2 mt-2">Teams</h5>
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
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <img src="https://randomuser.me/api/portraits/men/11.jpg" class="rounded-circle me-2" width="40" height="40" />
                                Cameron Williamson
                              </td>
                              <td>curtis@example.com</td>
                              <!-- <td>Patch Management</td> -->
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
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>
              </div>


              <div class="text-end">
                <router-link to="/riskcriteria" class="btn stepper-btn mt-5">
                Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
                </router-link>
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

export default {
    name: 'LocationView',
    components: {
       Stepper
    },
    data() {
    return {
      showPlatforms: true,
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
      activePlatform: null,
      selectedJiraAsana: null, // 'jira' or 'asana'
      notUsingJiraAsana: false,
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
    initTooltips() {
      // Initialize bootstrap tooltips on refs
      Object.values(this.$refs).forEach((el) => {
        new bootstrap.Tooltip(el);
      });
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
    activatePlatform(platform) {
      if (this.notUsingPlatform) return;

      // If nothing selected yet → directly activate
      if (!this.activePlatform) {
        this.activePlatform = platform;
        this.showData = true;
        return;
      }

      // If same platform clicked again → do nothing
      if (this.activePlatform === platform) return;

      // If switching → ask confirmation
      Swal.fire({
        title: "Switch Platform?",
        text: `Do you want to switch to ${platform === "teams" ? "Teams" : "Slack"}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.activePlatform = platform;
          this.showData = true;

          Swal.fire({
            title: "Switched!",
            text: `You are now using ${platform === "teams" ? "Teams" : "Slack"}.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    },
    async handleJiraAsanaClick(platform) {
      if (this.notUsingJiraAsana) return;

      if (!this.selectedJiraAsana) {
        this.selectedJiraAsana = platform;
      } else if (this.selectedJiraAsana === platform) {
        return; // already selected
      } else {
        const result = await Swal.fire({
          title: `Do you want to switch to ${platform === "jira" ? "Jira" : "Asana"}?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        });

        if (result.isConfirmed) {
          this.selectedJiraAsana = platform;
        }
      }
    },
    toggleJiraAsanaUsage() {
      this.notUsingJiraAsana = !this.notUsingJiraAsana;

      if (this.notUsingJiraAsana) {
        this.selectedJiraAsana = null; // reset selection when disabled
      }
    },
 
  },
  mounted() {
    this.initTooltips();
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
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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