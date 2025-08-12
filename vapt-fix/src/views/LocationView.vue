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
                  <img src="../assets/images/waving-hand.png" alt="">
                </div>
                <div class="col-11">
                  <h1 class="fw-semibold welcome-head"> Welcome to VAPTfix!</h1>
                  <p class="welcome-subhead">Before we fix your information assets, ....</p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-9 location-card py-4 px-4">
                  <div class="row">
                    <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-geo-alt-fill fs-4"></i>
                    </div>
                    <div class="col-lg-7">
                      <h5 class="fw-semibold">Add location</h5>
                      <p class="text-muted location-subtext">You can add upto 10 locations.</p>
                      <!-- <small class="text-muted">You can add upto 10 locations.</small> -->
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-8">
                      <input type="text" class="form-control rounded-input" id="locationName"
                        placeholder="Enter the name of the location..." />
                    </div>
                    <div class="col-4">
                      <button class="btn py-2 px-4 add-location-btn text-light" type="submit"><i
                          class="bi bi-plus me-2"></i>Add location </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col-lg-12 add-users py-4 px-4">
                  <div class="row">
                    <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-person-fill fs-4"></i>
                    </div>
                    <div class="col-lg-4">
                      <h5 class="fw-semibold">Add users</h5>
                      <p class="text-muted location-subtext">You can add upto 10 locations.</p>
                    </div>
                    <div class="col-3">
                      <input type="file" ref="fileInput" accept=".csv" @change="handleFileUpload"
                        style="display: none" />
                      <button class="btn upload-btn" @click="triggerFileInput"><i class="bi bi-upload me-2"></i> Upload
                        CSV</button>
                    </div>
                  </div>
                  <form>

                    <div class="row px-3 g-3 mb-4">
                      <h5 class="text-dark d-block mb-2 mt-4">Internal</h5>
                      <table class="table align-middle table-borderless">
                        <thead class="table-light">
                          <tr>
                            <th class="col-2">First Name</th>
                            <th class="col-2">Last Name</th>
                            <th class="col-2">Email</th>
                            <th class="col-3">Select Location</th>
                            <th class="col-3">Member Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <td class="col-2 px-2"><input type="text"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="firstName" /></td>
                          <td class="col-2 px-2"><input type="text"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="lastName" /></td>
                          <td class="col-2 px-2"><input type="email"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="email" /></td>
                          <td class="col-3">
                            <Vue3Select v-model="location" :options="locationOptions" class="compact-select" />
                          </td>
                          <td class="col-3">
                            <Vue3Select v-model="role" :options="roleOptions" class="compact-select" />
                          </td>
                        </tbody>
                      </table>
                      <div class="row">
                        <div class="col-2">
                          <button class="btn btn-sm px-3 add-location-btn text-light" type="submit"><i
                              class="bi bi-plus me-2"></i>Add user </button>
                        </div>
                      </div>
                    </div>

                    <div class="row px-3 g-3 mb-4">
                      <h5 class="text-dark d-block mb-2 mt-4">External</h5>
                      <table class="table align-middle table-borderless">
                        <thead class="table-light">
                          <tr>
                            <th class="col-2">First Name</th>
                            <th class="col-2">Last Name</th>
                            <th class="col-2">Email</th>
                            <th class="col-3">Select Location</th>
                            <th class="col-3">Member Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          <td class="col-2 px-2"><input type="text"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="firstName" /></td>
                          <td class="col-2 px-2"><input type="text"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="lastName" /></td>
                          <td class="col-2 px-2"><input type="email"
                              class="form-control form-control-sm border-bottom rounded-0" v-model="email" /></td>
                          <td class="col-3">
                            <Vue3Select v-model="location" :options="locationOptions" class="compact-select" />
                          </td>
                          <td class="col-3">
                            <Vue3Select v-model="role" :options="roleOptions" class="compact-select" />
                          </td>
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

                  <div class="row">
                    <div class="col-7 pt-4">
                      <h6 class="fw-semibold">Added users list (12)</h6>
                    </div>
                    <div class="col-3">
                      <input type="text" class="form-control search-input" placeholder="Search for users..."
                        v-model="searchQuery" />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-10">
                      <table class="table">
                        <thead class="thead thead-bg">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody class="users-table">
                          <tr>
                            <td>Clarissa Ferry</td>
                            <td>clarissaferry@acmecorp.com</td>
                            <td><img src="../assets/images/bin.png" alt=""></td>
                          </tr>
                          <tr>
                            <td>Clarissa Ferry</td>
                            <td>clarissaferry@acmecorp.com</td>
                            <td><img src="../assets/images/bin.png" alt=""></td>
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
import Stepper from '../components/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'LocationView',
  components: {
    Stepper,
    Vue3Select
  },
  data() {
    return {
      location: '',
      locationOptions: ['New York', 'Los Angeles', 'Chicago', 'Bangalore', 'Delhi'],
      role: '',
      roleOptions: ['Patch Management', 'Configuration Management', 'Network Security', 'Architectural Flaws']
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        console.log("Selected file:", file.name);
      }
    }
  }
};
</script>

<style scoped>
::v-deep(.compact-select .vs__dropdown-toggle) {
  min-height: 40px;
  padding: 4px 8px;
  font-size: 0.875rem;
}

/* Optionally reduce the padding of options in dropdown */
::v-deep(.compact-select .vs__dropdown-menu li) {
  padding: 4px 8px;
  font-size: 0.875rem;
}

::v-deep(.compact-select .vs__dropdown-menu) {
  margin-left: 8px;
  width: 240px;
}
</style>