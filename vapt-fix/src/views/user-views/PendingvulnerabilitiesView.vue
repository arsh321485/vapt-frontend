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

                    <div class="col-11 pt-3 pb-3 px-4 pe-5">
                        <div class="d-flex justify-content-between">
                            <div>
                                <router-link to="/userdashboard" style="color: rgba(49, 33, 177, 1);text-decoration: none;">
                                <i class="bi bi-arrow-left"></i> Back to home
                                </router-link>
                                <h2 class="ticket-head mt-3">Pending mitigations</h2>
                            </div>
                            <div class="d-flex flex-row mt-2">
                              <div class="dropdown">
                            <div class="dropdown-btn"> Select location</div>
                            <div class="dropdown-content">
                              <a href="#">Greece</a>
                              <a href="#">Germany</a>
                              <a href="#">Bahrain</a>
                            </div>
                            </div>
                            <NotificationPanel />
                            </div>
                        </div>

                        <div class="row mt-4">  
                            <div class="d-flex gap-3">
                                <button class="btn btn-primary btn-pill active-tab fw-semibold">All</button>
                                <button class="btn btn-pill btn-outline-secondary" style="color: maroon;">Critical</button>
                                <button class="btn btn-outline-secondary btn-pill text-danger">High</button>
                                <button class="btn btn-outline-secondary btn-pill text-warning">Medium</button>
                                <button class="btn btn-outline-secondary btn-pill text-success">Low</button>
                                <button class="btn btn-outline-secondary btn-pill text-dark">June 1 - June 30 <i
                                        class="bi bi-calendar-minus ms-2"></i>
                                </button>
                                
                                
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Assets</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Severity</th>
                                            <th scope="col">Assigned on</th>
                                            <!-- <th scope="col">Fixed on</th>  -->
                                            <th scope="col">Delayed by</th> 
                                            <th scope="col"></th> 
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><div class="d-flex align-items-center gap-2">
                                        <span>20/07/2025</span> -->
                                       
                                        <!-- <button class="btn border-0" @click="toggleCalendar">
                                          <i class="bi bi-calendar3 fs-6"></i>
                                        </button>
                                      
                                        <div
                                          v-if="showCalendar"
                                          ref="calendar"
                                          class="calendar border rounded p-3 shadow"
                                          style="width: 320px; position: absolute; background: #fff; z-index: 1000;"
                                        >
                                       
                                          <div class="d-flex justify-content-between align-items-center mb-2">
                                            <button class="btn btn-sm btn-light" @click="prevMonth">&lt;</button>
                                            <h6 class="mb-0">{{ monthYear }}</h6>
                                            <div class="d-flex align-items-center">
                                              <button class="btn btn-sm btn-light me-2" @click="nextMonth">&gt;</button>
                                            
                                              <button class="btn btn-sm border-0" @click="closeCalendar">
                                                <i class="bi bi-x fs-3"></i>
                                              </button>
                                            </div>
                                          </div>

                                          
                                          <div
                                            class="d-grid text-center fw-bold"
                                            style="grid-template-columns: repeat(7, 1fr);"
                                          >
                                            <div v-for="day in weekDays" :key="day">{{ day }}</div>
                                          </div>

                                   
                                          <div
                                            class="d-grid text-center"
                                            style="grid-template-columns: repeat(7, 1fr); gap: 3px;"
                                          >
                                            <div v-for="n in firstDayOfMonth" :key="'empty-' + n"></div>
                                            <div
                                              v-for="date in daysInMonth"
                                              :key="date"
                                              class="p-2 border rounded"
                                              :class="getSeverityClass(date)"
                                              style="cursor: pointer;"
                                              @click="handleDateClick(date)"
                                            >
                                              {{ date }}
                                            </div>
                                          </div>
                                        </div> -->
                                      <!-- </div>
                                      </td> -->
                                            <td>3 days</td>
                                            <td>
                                              <div class="d-flex flex-row">
                                                <router-link to="/pendingvulnerabilitycard" class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1); text-decoration: none;">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></router-link>
                                              <router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link>
                                              </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-warning">Medium</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-success">Low</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td style="color: maroon;">Critical</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-warning">Medium</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <!-- <td><input
                                              class="border-0"
                                                type="date"
                                                ref="dateInput"
                                                v-model="selectedDate"
                                                @click="openCalendar"
                                              /></td> -->
                                            <td>3 days</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">Fix Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
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
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";

export default {
    name: 'PendingvulnerabilitiesView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    },
    data() {
    return {
      selectedDate: "2025-06-23",
      showCalendar: false,
      currentDate: new Date(),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      vulnerabilities: {
        12: "critical",
        15: "high",
        20: "medium",
        23: "low",
      },
    };
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return "";
      const [year, month, day] = this.selectedDate.split("-");
      return `${day}/${month}/${year}`; 
    },
    daysInMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      return new Date(year, month + 1, 0).getDate();
    },
    firstDayOfMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      return new Date(year, month, 1).getDay();
    },
    monthYear() {
      return this.currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    
    },
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
     closeCalendar() {
    this.showCalendar = false;
  },
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.currentDate = new Date(this.currentDate); 
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    getSeverityClass(date) {
      const severity = this.vulnerabilities[date];
      switch (severity) {
        case "critical":
          return "bg-maroon text-white";
        case "high":
          return "bg-red text-white";
        case "medium":
          return "bg-warning text-dark";
        case "low":
          return "bg-success text-white";
        default:
          return "";
      }
    },
    handleDateClick(date) {
      if (this.vulnerabilities[date]) {
        this.$router.push("/userassets");
      }
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
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
  document.removeEventListener("click", this.handleClickOutside);
},  
};
</script>

<style scoped>
.bg-maroon {
  background-color: maroon !important;
}
.bg-red {
  background-color: red !important;
}
.ticket-head {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
    font-size: 36px;
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

.fixes-btn {
    color: rgba(49, 33, 177, 1);
    font-weight: 600;
}

.btn-pill {
    border-radius: 50px;
    padding: 6px 20px;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    height: 36px;
}

.active-tab {
    background-color: #E6E3FF;
    color: #3121B1;
    border: none;
    font-size: 13px;
}

.btn-outline-secondary:hover {
    background-color: transparent;
}
.download-btn {
    font-weight: 600;
    font-size: 12px;
    padding: 8px 15px;
    color: white;
    background-color: rgba(49, 33, 177, 1);
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.12);
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
    padding: 8px 20px 8px 12px; /* extra right padding for the arrow */
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