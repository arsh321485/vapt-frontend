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
                      <input type="text" class="form-control rounded-input" id="locationName"
                        placeholder="Enter the name of the location..." />
                    </div>
                    <div class="col-3">
                      <button class="btn btn-sm mt-2 add-location-btn text-light" type="submit"><i
                          class="bi bi-plus me-2"></i>Add location </button>
                    </div>
                    <div class="col-4 pt-1">
                      <div class="avatar-container">
                        <div class="avatar ava-green">GM</div>
                        <div class="avatar ava-blue">DH</div>
                        <div class="avatar ava-yellow">BH</div>
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
                        <th style="width: 15%;">User Type</th>
                        <th style="width: 15%;">First Name</th>
                        <th style="width: 15%;">Last Name</th>
                        <th style="width: 25%;">Email</th> 
                        <th style="width: 15%;">Select Location</th> 
                        <th style="width: 15%;">Member Role</th>
                      </tr>
                      </thead>    
                      <tbody>
                      <tr>
                            <td>
                              <select class="form-select">
                                <option selected disabled>Select type</option>
                                <option value="internal">Internal</option>
                                <option value="external">External</option>
                              </select>
                            </td>
                            <td>
                              <input type="text"
                                class="form-control form-control-sm border-bottom rounded-0"
                                />
                            </td>
                            <td>
                              <input type="text"
                                class="form-control form-control-sm border-bottom rounded-0" />
                            </td>
                            <td>
                              <input type="email"
                                class="form-control form-control-sm border-bottom rounded-0"
                                />
                            </td>
                            <td>
                              <select class="form-select">
                                <option selected disabled value="">Select location</option>
                                <option value="">Germany</option>
                                <option value="">Delhi</option>
                                <option value="">Bahrain</option>
                              </select>
                            </td>
                            <td>
                              <div class="multi-select-dropdown" ref="roleDropdown1">
                                <div class="dropdown-input" @click="toggleDropdown('dropdown1')">
                                  <span>{{ selectedRoleText1 }}</span>
                                  <span>&#9660;</span>
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
                            <th class="col-2">User Type</th>                   
                            <th class="col-2">Select Location</th>
                            <th class="col-2">Member Role</th>
                            <th class="col-2"></th>
                            <th class="col-2"></th>
                          </tr>
                        </thead>    
                        <tbody>
                          <tr>
                            <td class="col-2">
                              <select class="form-select">
                        <option selected disabled>Select type</option>
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                      </select>
                            </td>
                            <td class="col-2">
                              <select class="form-select">
                                <option selected disabled>Select location</option>
                                <option value="">Germany</option>
                                <option value="">Delhi</option>
                                <option value="">Bahrain</option>
                              </select>
                            </td>
                            <td class="col-2">
                             <div class="multi-select-dropdown" ref="roleDropdown2">
                                <div class="dropdown-input" @click="toggleDropdown('dropdown2')">
                                  <span>{{ selectedRoleText2 }}</span>
                                  <span>&#9660;</span>
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
                            <td class="col-2"> <button class="btn btn-primary" @click="copyInviteLink">Copy Link</button>
                            </td>
                            <td class="col-2" v-if="inviteUrl">
                              <a :href="inviteUrl" target="_blank">{{ inviteUrl }}</a>
                            </td>
                            <td class="col-2" v-else>
                              <!-- empty initially -->
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
      ],
      inviteUrl: "",
      copied: false,
      staticLink: "https://secureitlabbh.sharepoint.com/:w:/s/SITLDevelopment/ETbmVY-X3_FLvyBDP7aVAvIB82tWReGJNHD6pIOGzuRurg?e=L8C4sn"
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
    async copyInviteLink() {
      this.inviteUrl = this.staticLink;

      try {
        await navigator.clipboard.writeText(this.staticLink);
        Swal.fire({
          icon: "success",
          title: "Link Copied!",
          html: ` <p>The invite link has been copied:</p>
            <a href="${this.staticLink}" 
               target="_blank" 
               style="text-decoration:underline;">
               ${this.staticLink}
            </a>`,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to copy link!",
        });
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

</style>