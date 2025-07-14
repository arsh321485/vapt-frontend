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
              

              <div class="row mt-4">
                <div class="col-lg-12 add-users py-4 px-4">
                   <div class="row">
                        <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                        <i class="bi bi-person-fill fs-4"></i>
                        </div>
                        <div class="col-lg-4">
                        <h5 class="fw-semibold">Add team members</h5>
                        <div class="d-flex justify-content-start align-items-center">
                            <div>
                            <p class="text-muted location-subtext">You can add upto 10 locations.</p>
                            </div>
                            <!-- <div class="mb-3 ms-3" style="margin-top: -20px;">
                                <img src="../assets/images/info.png" alt="">
                            </div> -->
                            <div class="position-relative">
    <!-- Info Icon -->
    <div class="mb-3 ms-3" style="margin-top: -20px;">
      <img
        src="../assets/images/info.png"
        alt="Info"
        class="info-icon"
        @click="showPopover = true"
      />
    </div>

    <!-- Popover Box -->
    <div
      v-if="showPopover"
      class="custom-popover shadow-sm"
    >
      <div class="popover-content">
        <span class="close-btn" @click="showPopover = false">&times;</span>
        <p class="mb-0">Text to give context to the client.</p>
      </div>
      <div class="popover-arrow"></div>
    </div>
  </div>
                        </div>
                        </div>    
                    </div>
                
        <div class="row mb-5 pb-5">
      <!-- Sidebar: Available Teams -->
      <div class="col-md-3 border-end px-3">
        <div class="bg-light p-2 fw-semibold">Available Teams</div>

        <div class="mt-3">
          <small class="text-muted d-block mb-2">Internal</small>
          <ul class="list-unstyled">
            <li :class="['team-tab', activeTab === 'internal-technical' ? 'active' : '']"
                @click="setActive('internal-technical')">Technical</li>
            <li :class="['team-tab', activeTab === 'internal-management' ? 'active' : '']"
                @click="setActive('internal-management')">Management</li>
          </ul>

          <small class="text-muted d-block mt-4 mb-2">External</small>
          <ul class="list-unstyled">
            <li :class="['team-tab', activeTab === 'external-technical' ? 'active' : '']"
                @click="setActive('external-technical')">Technical</li>
            <li :class="['team-tab', activeTab === 'external-management' ? 'active' : '']"
                @click="setActive('external-management')">Management</li>
          </ul>
        </div>
      </div>

      <!-- Right Content -->
      <div class="col-md-9">
        <table class="table align-middle fixed-table table-borderless">
  <thead class="table-light">
    <tr>
      <th class="col-role">Roles</th>
      <th class="col-member">Add members</th>
      <th class="col-location">Select location</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(member, index) in teamData[activeTab]" :key="index">
      <td class="col-role">{{ member.role }}</td>
      <td class="col-member">
        <div class="input-group">
          <input
            type="email"
            class="form-control rounded-input-form"
            :placeholder="member.email"
          />
          <span class="input-group-text bg-white border-start-0">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </td>
      <td class="col-location">
        <select class="form-select rounded-input-form">
          <option>{{ member.location }}</option>
        </select>
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
      activeTab: 'internal-technical',
      teamData: {
        'internal-technical': [
          { role: 'Security Analyst', email: 'email@company.com', location: 'Greece' },
          { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
          { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
          { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
          { role: 'Network Engineer', email: 'email@company.com', location: 'Greece' },
        ],
        'internal-management': [
          { role: 'Manager', email: 'manager@company.com', location: 'USA' },
        ],
        'external-technical': [
          { role: 'External Engineer', email: 'eng@vendor.com', location: 'Germany' },
        ],
        'external-management': [
          { role: 'Vendor Manager', email: 'vendor@company.com', location: 'France' },
        ]
      },
      showPopover: false
    };
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab;
    }
  },
  methods: {
    setActive(tab) {
      this.activeTab = tab;
    },
  },
};
</script>


<style scoped>
.info-icon {
  cursor: pointer;
  width: 20px;
}

.custom-popover {
  position: absolute;
  top: -27px;
  left: 50px;
  background-color: white;
  border-radius: 8px;
  padding: 12px 16px;
  width: 260px;
  height: 150px;
  z-index: 1000;
  border: 1px solid rgb(236, 234, 234);
}

.popover-content {
  position: relative;
}

.close-btn {
  position: absolute;
  top: 2px;
  right: 6px;
  cursor: pointer;
  font-size: 20px;
  color: #888;
}

.popover-arrow {
  position: absolute;
  top: 15px;            /* Aligns arrow vertically */
  left: -6px;           /* Moves arrow slightly outside the left edge */
  width: 12px;
  height: 12px;
  background: white;
  border-bottom: 1px solid rgb(236, 234, 234);
  border-left: 1px solid rgb(236, 234, 234);
  transform: rotate(45deg);
  z-index: -1;
  /* box-shadow: -4px 0 -4px rgba(0, 0, 0, 0.1); */
}
</style>