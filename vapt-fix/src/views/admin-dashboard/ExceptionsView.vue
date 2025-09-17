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

                    <div class="col-11 pt-2 pb-3 px-4 pe-5">
                        <div class="d-flex justify-content-between">
                            <div><h2 class="ticket-head mt-4">Support Requests</h2></div>
                            <div class="d-flex flex-row gap-3 mt-4">
                                
                                <button type="button" class="btn pending-approval-btn rounded-pill">Go premium and get exclusive support
                                <!-- Go premium and get exclusive support control request from us -->
                                <i class="bi bi-arrow-right ms-1 fs-5"></i>
                                </button>
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

                        <div class="row mt-3">
                            <div class="d-flex justify-content-start gap-3">
                                <button class="btn rounded-pill border px-4" style="background-color: rgba(230, 227, 255, 1);color: rgba(49, 33, 177, 1);">All</button>
                                <!-- <button class="btn rounded-pill border px-4" style="color: rgba(0, 115, 12, 1);">Approved</button>
                                <button class="btn rounded-pill border px-4" style="color: rgba(170, 0, 0, 1);">Declined</button> -->
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-arrow-down-up me-1"></i>Sort by</button>
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-funnel me-1"></i>Filter</button>
                            </div>
                        </div>

                        <div class="row mt-5">
                            
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Requested by</th>
                                            <th scope="col">Date requested</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            
                                             <td style="cursor: pointer;" 
                                                data-bs-toggle="modal" data-bs-target="#viewRequestsModal">The issue has been reviewed.
                                             </td>
                                             
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Reviewed, more justification required.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Reviewed, more justification required.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                           <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- view Requests Modal -->
                      <div class="modal fade" id="viewRequestsModal" tabindex="-1" aria-labelledby="viewRequestsModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            
                            <!-- Modal Header -->
                            <div class="modal-header">
                              <h5 class="modal-title" id="viewRequestsModalLabel">Issues Raised for Support</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <!-- Modal Body -->
                            <div class="modal-body">
                              <div class="row g-2">
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 2: Code review</span>
                                </div>
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 4: Code review</span>    
                                </div>
                              </div>

                              <h6 class="mt-3 fw-semibold">Description</h6>
                              <textarea class="form-control rounded-0" rows="4" readonly>The issue has been reviewed, but the current explanation is not sufficient. Please provide additional justification to proceed further.
                              </textarea>
                            </div>
                            
                            <!-- Modal Footer -->
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

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

export default {
    name: 'ExceptionsView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    },
    data() {
    return {
      showNotifications: false,
      isFullscreen: false,
      filterType: "",
    showAll: false,
      notifications: [
        { type: "report", icon: "bi bi-file-text", color: "text-info", message: "A <b>new report</b> was added for vulnerability <b>VMware ESXi 7.0/8.0 Sandbox Escape</b> from Patch Management.", time: "2 min ago"  },
        { type: "fixed", icon: "bi bi-check-circle", color: "text-success", message: "Vulnerability <b>VMware ESXi 7.0/8.0 Sandbox Escape</b> has been <span class='fw-semibold'>fixed</span> from Configuration Management.", time: "10 min ago" },
        { type: "assigned", icon: "bi bi-person-check", color: "text-primary", message: "A new vulnerability <b>VMware ESXi 7.0/8.0 Sandbox Escape</b> was <span class='fw-semibold'>assigned</span> to you from Network Security.", time: "15 min ago" },
        { type: "exception", icon: "bi bi-exclamation-triangle", color: "text-warning", message: "An <span class='fw-semibold'>exception</span> was raised for vulnerability <b>VMware ESXi 7.0/8.0 Sandbox Escape</b> from Architectural Flaws.", time: "30 min ago" },
        { type: "download", icon: "bi bi-download", color: "text-primary", message: "Your report has been downloaded successfully.", time: "10 min ago" },
        
  { type: "mitigated", icon: "bi bi-shield-check", color: "text-success", message: "Vulnerability <b>Apache Struts RCE</b> has been successfully <span class='fw-semibold'>mitigated</span> by Security Team.", time: "5 min ago" },

  { type: "deadline", icon: "bi bi-clock-history", color: "text-warning", message: "The <span class='fw-semibold'>deadline</span> for vulnerability <b>OpenSSL Buffer Overflow</b> has been <span class='fw-semibold'>extended</span> by Admin.", time: "12 min ago" },

  { type: "exception-request", icon: "bi bi-journal-text", color: "text-primary", message: "An <span class='fw-semibold'>exception request</span> was submitted for <b>Windows SMBv1 Remote Exploit</b>.", time: "20 min ago" },

  { type: "exception-approved", icon: "bi bi-check-circle", color: "text-success", message: "Exception request for <b>Oracle WebLogic RCE</b> has been <span class='fw-semibold'>approved</span>.", time: "45 min ago" },

  { type: "exception-denied", icon: "bi bi-x-circle", color: "text-danger", message: "Exception request for <b>Apache Log4j JNDI Exploit</b> has been <span class='fw-semibold'>denied</span>.", time: "1 hour ago" },

  { type: "ticket", icon: "bi bi-ticket-detailed", color: "text-info", message: "A new <b>ticket</b> was raised for vulnerability <b>MySQL Privilege Escalation</b>.", time: "2 hours ago" },

  { type: "user-added", icon: "bi bi-person-plus", color: "text-success", message: "A <b>new user</b> was <span class='fw-semibold'>added</span> to the <b>Incident Response Team</b>.", time: "3 hours ago" },

  { type: "user-deleted", icon: "bi bi-person-dash", color: "text-danger", message: "User <b>John Doe</b> was <span class='fw-semibold'>removed</span> from the <b>Patch Management Team</b>.", time: "5 hours ago" },

  { type: "user-team-change", icon: "bi bi-people", color: "text-primary", message: "User <b>Alice Smith</b> was <span class='fw-semibold'>moved</span> to <b>Configuration Management</b>.", time: "6 hours ago" },

  { type: "control-request", icon: "bi bi-shield-plus", color: "text-warning", message: "A <span class='fw-semibold'>compensatory control</span> request was raised for <b>Linux Kernel Privilege Escalation</b>.", time: "8 hours ago" },

  { type: "asset-removed", icon: "bi bi-dash-circle", color: "text-secondary", message: "Asset <b>Legacy Server 192.168.1.25</b> was <span class='fw-semibold'>removed</span> from the vulnerability list.", time: "10 hours ago" }

      ],
    };
},
computed: {
    filteredNotifications() {
    let list = this.filterType
      ? this.notifications.filter(n => n.type === this.filterType)
      : this.notifications;

    // If not showing all, limit to visibleCount
    return this.showAll ? list : list.slice(0, 4);
  }
},
methods: {
    toggleNotificationPanel() {
    this.showNotifications = !this.showNotifications;
  },
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  },
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
  },
  toggleShowAll() {
    this.showAll = !this.showAll;
  }
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
    color:rgba(49, 33, 177, 1);
    font-weight: 600;
}
.fixes-red-btn {
    color:rgba(170, 0, 0, 1);
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