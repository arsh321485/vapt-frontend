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

          <div class="col-11 pt-5 mt-3 pb-3 pe-5">
            <div class="row">
                <div class="d-flex justify-content-between">
                    <router-link to="/mitigationstrategy">
                    <button class="my-4" style="color: rgba(49, 33, 177, 1);background-color: white;border: 0;"><i class="bi bi-arrow-left"></i> Back</button>
                    </router-link>
                    <div class="d-flex flex-row mt-3">
                        
                    <NotificationPanel />
                    </div>
                </div>
            </div>             
        
            <div class="row">
                <h2 class="ticket-head">Missing security updates</h2>
                        <div class="row mt-5">
                            <h6 class="fw-semibold mb-3"><i class="bi bi-microsoft me-1"></i> Microsoft(23 assets)</h6>
                            <div class="table-responsive">
                                <!-- <table class="table align-middle table-borderless"> -->
                                    <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Criticality</th>
                                            <th scope="col">Status</th>
                                            
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            
                                            <td>
                                                <router-link to="/Vulnerabilitycard">
                                                 <button class="btn fixes-btn border-0">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button> 
                                                </router-link> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            
                                            <td>Medium</td>
                                            <td>Close</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
            </div>

            <div class="row">
                        <div class="row mt-5">
                            <h6 class="fw-semibold mb-3"><i class="bi bi-microsoft me-1"></i> Apple(61 assets)</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-hover">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Criticality</th>
                                            <th scope="col">Status</th>
                                            
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>High</td>
                                            <td>Open</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
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
import DashboardMenu from "@/components/admin-component/DashboardMenu.vue";
import DashboardHeader from "@/components/admin-component/DashboardHeader.vue";
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";

export default {
  name: "MissingSecurityUpdatesView",
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
  }
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
