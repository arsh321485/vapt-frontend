<template>
  <main>
    <section class="bg-light">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-2">
            <Stepper />
          </div>
          <div class="col-lg-10 my-3">
            <div class="container-fluid welcome-bg py-5 px-5">
              <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-center mb-3">
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
                </div>
              </div>

              <div class="row mt-3 mb-4" v-if="showPlatforms">
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
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/teams.png" alt="Teams" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Teams</p>
                          </div>
                        </div>
                      </div>

                      <!-- Slack -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/slack.png" alt="Slack" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Slack</p>
                          </div>
                        </div>
                      </div>

                      <!-- Jira -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/jira.png" alt="Jira" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Jira</p>
                          </div>
                        </div>
                      </div>

                      <!-- Confluence -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div class="d-flex flex-column align-items-center justify-content-center text-center">
                            <img src="@/assets/images/confluence.png" alt="Confluence" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Confluence</p>
                          </div>
                        </div>
                      </div>

                      <!-- Asana -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/asana.png" alt="Asana" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Asana</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Second row: 3 cards -->
                    <div class="row g-4 mt-2">
                      <!-- Monday.com -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div class="d-flex flex-column align-items-center justify-content-center text-center">
                            <img src="@/assets/images/monday.png" alt="Monday.com" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Monday.com</p>
                          </div>
                        </div>
                      </div>

                      <!-- Notion -->
                      <div class="col-2">
                        <div class="card shadow border-0 d-flex align-items-center justify-content-center p-2"
                            style="aspect-ratio:1/1; cursor:pointer;">
                          <div>
                            <img src="@/assets/images/notion.png" alt="Notion" style="width:40px; height:40px;">
                            <p class="mt-2 fw-semibold mb-0">Notion</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-5 mt-5">
                        <button class="btn text-light rounded-pill mt-3" @click="showPlatforms = false" style="background-color: rgba(90, 68, 255, 1);">I'm not using any platform.</button>
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
      },
      selectedRoles1: [],
      selectedRoles2: [],
      roleOptions: [
        { short: 'PM', full: 'Patch Management' },
        { short: 'CM', full: 'Configuration Management' },
        { short: 'NS', full: 'Network Security' },
        { short: 'AF', full: 'Architectural Flaws' }
      ]
    };
  },
  computed: {
    selectedRoleText1() {
      return this.selectedRoles1.length > 0 ? this.selectedRoles1.join(', ') : 'Select roles';
    },
    selectedRoleText2() {
      return this.selectedRoles2.length > 0 ? this.selectedRoles2.join(', ') : 'Select roles';
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
      if (!isClickInsideDropdown1) {
        this.isOpen.dropdown1 = false;
      }
      if (!isClickInsideDropdown2) {
        this.isOpen.dropdown2 = false;
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
</style>