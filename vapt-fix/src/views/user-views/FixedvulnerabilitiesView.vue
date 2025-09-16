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
                                <h2 class="ticket-head mt-3">Fixed vulnerabilities</h2>
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
                                            <th scope="col">Fixed on</th>
                                            
                                            
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
                                            <td>23/06/2025</td>
                                            
                                            <td><router-link to="/pendingvulnerabilitycard">
                                                <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-warning">Medium</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td style="color: maroon;">Critical</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-success">Low</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-warning">Medium</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td class="text-danger">High</td>
                                            <td>23/06/2025</td>
                                            <td>23/06/2025</td>
                                            <td><button class="btn fw-semibold" style="color: rgba(49, 33, 177, 1);">View Now <i class="bi bi-arrow-right-circle-fill ms-2"></i></button></td>
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
    name: 'FixedvulnerabilitiesView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
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