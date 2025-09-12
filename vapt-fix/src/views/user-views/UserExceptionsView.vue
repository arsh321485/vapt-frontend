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
                        <div class="d-flex justify-content-between mt-4">
                            <div>
                                <h2 class="ticket-head">Support Requests</h2>
                            </div>
                            <div class="dropdown">
                            <div class="dropdown-btn"> Select location</div>
                            <div class="dropdown-content">
                              <a href="#">Greece</a>
                              <a href="#">Germany</a>
                              <a href="#">Bahrain</a>
                            </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="d-flex justify-content-start gap-3">
                                <button class="btn rounded-pill border px-4" style="background-color: rgba(230, 227, 255, 1);color: rgba(49, 33, 177, 1);">All</button>
                                
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-arrow-down-up me-1"></i>Sort by</button>
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-funnel me-1"></i>Filter</button>
                                <!-- <div><select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;color: rgba(130, 91, 0, 1);">
                                    <option style="font-size: 15px;color: rgba(130, 91, 0, 1);" selected disabled>Team</option>
                                    <option class="text-dark"style="font-size: 15px;" value="patch management">Patch Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Configuration Management</option>
                                    <option class="text-dark" style="font-size: 15px;">Network Security</option>
                                    <option class="text-dark" style="font-size: 15px;" value="architectural flaws">Architectural Flaws</option>
                                </select></div> -->
                            </div>
                        </div>
                        
                        <div class="row mt-4">
                            <h6 class="fw-semibold mb-3">Requested earlier this week</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Comment by admin</th>
                                            <th scope="col">Date requested</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This issue is low risk in our environment</td>
                                            
                                            <td>23/06/25</td>
                                            <td><p style="color: rgba(179, 122, 0, 1);">Pending action</p></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Existing controls already mitigate the risk.</td>
                                            
                                            <td>23/06/25</td>
                                            <td>
                                            <div style="color: rgba(170, 0, 0, 1); display: flex; align-items: center;">
                                            <span>Declined</span>
                                            <div class="info-icon ms-2" style="position: relative; display: inline-block;">
                                            <i class="bi bi-info-circle text-danger" style="font-size: 13px; font-weight: 600;"></i>
                                            <span class="tooltip-text">Extended Support</span>
                                            </div>
                                            </div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            
                                            <td>23/06/25</td>
                                            <td><p style="color: rgba(0, 170, 14, 1);">Approved</p></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                           
                                            <td>23/06/25</td>
                                           <td><p style="color: rgba(170, 0, 0, 1)">Declined <i class="bi bi-info-circle"></i></p></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                          
                                            <td>23/06/25</td>
                                            <td><p style="color: rgba(0, 170, 14, 1);">Approved</p></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                           
                                            <td>23/06/25</td>
                                            <td><p style="color: rgba(0, 170, 14, 1);">Approved</p></td>
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

export default {
    name: 'UserExceptionsView',
    components: {
        DashboardMenu,
        DashboardHeader
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

.info-icon {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* Tooltip text */
.info-icon .tooltip-text {
  visibility: hidden;
  width: 150px;  /* adjust size as needed */
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* position above the icon */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  white-space: normal;
}

/* Arrow */
.info-icon .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%; /* arrow points down */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Show tooltip on hover */
.info-icon:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>