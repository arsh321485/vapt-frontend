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

          <div class="col-11 pt-2 pb-3 pe-5">
            <div class="d-flex flex-row align-items-center justify-content-between py-3">
              <div>
                <h2>Vulnerability Management Program</h2>
                <p style="color: rgba(0, 0, 0, 0.6);font-size:16px;font-weight: 500;">Patch management team</p>
              </div>
              <div class="d-flex flex-column gap-3">
                <div class="d-flex justify-content-end">
                  <div class="dropdown">
                          <div class="dropdown-btn"> Select location</div>
                          <div class="dropdown-content">
                              <a href="#">Greece</a>
                              <a href="#">Germany</a>
                              <a href="#">Bahrain</a>
                          </div>
                  </div>
                </div>
                <button type="button" class="btn pending-approval-btn rounded-pill">
                11 Compensatory controls requested
                <i class="bi bi-arrow-right ms-1 fs-5"></i>
              </button>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total assets assigned <i class="bi bi-info-circle" style="color: rgba(13, 0, 119, 1);font-size: 14px;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <h1 class="text-212">212</h1>
                    
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-between gap-2">
                    <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-green-icon text-center"><i class="bi bi-check2" style="color: rgba(0, 105, 0, 1);"></i>
                    </div>
                    <p class="assets-para">Fixed</p>
                  </div>
                  <router-link 
                    to="/fixedvulnerabilities" 
                    style="text-decoration: none; color: rgba(49, 33, 177, 1); font-weight: 600;"
                  >
                    Details <i class="bi bi-arrow-right"></i>
                  </router-link>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <h1 style="color: rgba(0, 105, 0, 1);font-weight: 500;font-size: 60px;">46</h1>
                    
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-between gap-2">
                    <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-yellow-icon text-center"><i class="bi bi-three-dots"></i>
                    </div>
                    <p class="assets-para">Pending</p>
                  </div>
                  <router-link 
                    to="/pendingvulnerabilities" 
                    style="text-decoration: none; color: rgba(49, 33, 177, 1); font-weight: 600;"
                  >
                    Details <i class="bi bi-arrow-right"></i>
                  </router-link>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <h1 style="color: rgba(195, 136, 0, 1);font-weight: 500;font-size: 60px;">81</h1>
                    
                  </div>
                </div>
              </div>
              <!-- <div class="col-3">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-between gap-2">
                    <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-red-icon text-center"><i class="bi bi-clock"></i>
                    </div>
                    <p class="assets-para">Delayed</p>
                  </div>
                  <router-link 
                    to="/delayedvulnerabilities" 
                    style="text-decoration: none; color: rgba(49, 33, 177, 1); font-weight: 600;"
                  >
                    Details <i class="bi bi-arrow-right"></i>
                  </router-link>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <h1 style="color: rgba(173, 0, 0, 1);font-weight: 500;font-size: 60px;">35</h1>
                    
                  </div>
                </div>
              </div> -->
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row align-items-center justify-content-between p-b3">
                    <h4>Vulnerabilities assigned to you</h4>
                     <router-link to="/userVulnerabilityregister" style="color: rgba(49, 33, 177, 1);font-weight: 500;text-decoration: none;">
                      View all
                     </router-link>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="d-flex gap-3">
                        <button class="btn btn-primary btn-pill active-tab fw-semibold">
                          Due this week
                        </button>
                        <button class="btn btn-outline-secondary btn-pill text-dark">
                          Steps <i class="bi bi-arrow-down"></i>
                        </button>
                        <button class="btn btn-pill btn-outline-secondary" style="color: maroon;">Critical</button>
                                <button class="btn btn-outline-secondary btn-pill text-danger">High</button>
                                <button class="btn btn-outline-secondary btn-pill text-warning">Medium</button>
                                <button class="btn btn-outline-secondary btn-pill text-success">Low</button>
                      </div>
                    </div>
                  </div>

                 <div class="row mt-5">
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Severity</th>
                                            <th scope="col">Assigned on</th>
                                            <!-- <th scope="col">Dependency</th> -->
                                            <th scope="col">Total steps</th>
                                            <th scope="col">Due on</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <!-- <td>23/06/2025 <i class="bi bi-plus-circle"></i></td> -->
                                            <td>
                                              <input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              />
                                            </td>
                                            <td><router-link to="/userVulnerabilityregister" class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">
                                              Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td class="text-warning">Medium</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td>
                                              <input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              />
                                            </td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td style="color: maroon;">Critical</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td>
                                              <input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              />
                                            </td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td class="text-success">Low</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td>
                                              <input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              />
                                            </td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td>
                                              <input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              />
                                            </td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row align-items-center justify-content-between p-b3">
                    <h4>Compensatory controls requested</h4>
                  </div>

                 <div class="row mt-2">
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Comment added</th>
                                            <th scope="col">Requested to</th>
                                            <th scope="col">Date requested</th>
                                            <th scope="col">Status</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td style="color: rgba(179, 122, 0, 1);">Pending action</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td style="color: rgba(179, 122, 0, 1);">Pending action</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td style="color: rgba(179, 122, 0, 1);">Pending action</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td style="color: rgba(179, 122, 0, 1);">Pending action</td>
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
import DashboardMenu from '@/components/user-component/DashboardMenu.vue';
import DashboardHeader from '@/components/user-component/DashboardHeader.vue';

export default {
  name: 'UserDashboard1View',
  components: {
    DashboardMenu,
    DashboardHeader
  },
  data() {
    return {
      selectedDate: "2025-06-23",
    };
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return "";
      const [year, month, day] = this.selectedDate.split("-");
      return `${day}/${month}/${year}`; 
    },
  },
  methods: {
    openCalendar() {
      this.$refs.dateInput.click();
    },
  },
   mounted() {
    const dropdown = document.querySelector('.dropdown');
    const btn = dropdown.querySelector('.dropdown-btn');
    const options = dropdown.querySelectorAll('.dropdown-content a');

    // Toggle dropdown open/close
    btn.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    // Set selected option
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        btn.textContent = option.textContent; // update button text
        dropdown.classList.remove('show'); // close dropdown
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  },
};
</script>

<style scoped>
.calender-para {
  color: #3121B1;
  font-size: 14px;
}

.vuln-heading {
  font-size: 18px;
}

.btn-pill {
  border-radius: 50px;
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  height: 36px;
}

.active-tab {
  background-color: #EAE8FF;
  color: #3121B1;
  border: none;
  font-size: 13px;
}
.raised-table tr th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
}

.raised-tbody tr td {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
}
.fixes-btn {
    color: rgba(49, 33, 177, 1);
    font-weight: 600;
}

.dropdown {
    position: relative;
    display: inline-block;
    width: 200px;
}

.dropdown-btn {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 50px;
    padding: 8px 40px 8px 16px; /* extra right padding for the arrow */
    cursor: pointer;
    position: relative;
}

.dropdown-btn::after {
    content: "▼"; /* arrow symbol */
    font-size: 12px;
    color: #333;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 100%;
    border-radius: 12px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
    z-index: 1;
    margin-top: 4px;
}

.dropdown-content a {
    padding: 8px 12px;
    display: block;
    text-decoration: none;
    color: black;
    border-radius: 8px;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown.show .dropdown-content {
    display: block;
}
</style>