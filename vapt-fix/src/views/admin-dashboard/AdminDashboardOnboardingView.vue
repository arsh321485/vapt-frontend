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

          <div class="col-11 pt-2 pb-3 pe-4">
            <div class="d-flex flex-row align-items-center justify-content-between py-3">
              <h2 class="">Vulnerability Management Program</h2>
              
                
                  <div class="dropdown">
                      <div class="dropdown-btn"> Select location</div>
                      <div class="dropdown-content">
                          <a href="#">Greece</a>
                          <a href="#">Germany</a>
                          <a href="#">Bahrain</a>
                      </div>
                      </div>
                  </div>
           

            <div class="row">
              <div class="col-3">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total assets<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <h1 class="text-212">212</h1>
                    <p style="margin-top: 37px;">Avg. score: <span class="fw-bold">7.8</span></p>
                  </div>
                </div>
              </div>
              <div class="col-9 gx-5">
                <!-- Vulnerabilities -->
                <div class="row px-3 pb-3"
                  style="border: 1px solid rgba(217, 217, 217, 1);border-radius: 5px;padding-top: 15px;">
                  <div class="col-md-5">
                    <div class="d-flex flex-row justify-content-start gap-2">
                      <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                      </div>
                      <p class="assets-para">Vulnerabilities<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                    </div>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">87</div>
                        <div class="bar maroon vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: maroon;">● Critical</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">56</div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● High</small>
                      </div>
                      
                      <div class="text-center">
                        <div id="mediumAge" class="fs-5 fw-semibold">127</div>
                        <div class="bar yellow vul-bar mt-1"></div>
                        <small class="text-warning mt-1 d-block">● Medium</small>
                      </div>
                      <div class="text-center">
                        <div id="lowAge" class="fs-5 fw-semibold">42</div>
                        <div class="bar green vul-bar mt-1"></div>
                        <small class="text-success mt-1 d-block">● Low</small>
                      </div>
                    </div>
                  </div>

                  <!-- Divider -->
                  <div class="col-md-1 d-flex justify-content-center">
                    <div class="divider-vertical"></div>
                  </div>

                  <!-- Vulnerability aging -->
                  <div class="col-md-6">
                    <div class="mb-2">
                      <p class="assets-para">Mitigation Timeline<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-1">
                      <div class="text-center">
                        <div id="highCount" class="fs-4 fw-semibold">1d 10hrs</div>
                        <div class="bar maroon w-100 mt-1"></div>
                        <small class="mt-1 d-block" style="color: maroon;">● Critical</small>
                      </div>
                      <div class="text-center">
                        <div id="highCount" class="fs-4 fw-semibold">2d 11hrs</div>
                        <div class="bar red w-100 mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● High</small>
                      </div>
                      <div class="text-center">
                        <div id="mediumCount" class="fs-4 fw-semibold">3d 4hrs</div>
                        <div class="bar yellow w-100 mt-1"></div>
                        <small class="text-warning mt-1 d-block">● Medium</small>
                      </div>
                      <div class="text-center">
                        <div id="lowCount" class="fs-4 fw-semibold">2d 2hrs</div>
                        <div class="bar green w-100 mt-1"></div>
                        <small class="text-success mt-1 d-block">● Low</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-3">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Patch compliance rate<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2 py-3">
                    <h1 class="text-78">78%</h1>
                    <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Mean time to remediate<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2 py-3">
                    <h1 class="text-78">2d 11 hrs</h1>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Exceptions approved<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2 py-3">
                    <h1 class="text-78">32</h1>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Remediation Throughput<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2 py-3">
                    <h1 class="text-78">32</h1>
                    <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
                <div class="col-12">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row align-items-center justify-content-between py-3">
                    <h4 class="fw-semibold">Mitigation Strategy</h4>
                    <button type="button" class="btn pending-approval-btn rounded-pill">
                11 Compensatory controls pending approval
                <i class="bi bi-arrow-right ms-1 fs-5"></i>
              </button>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="d-flex gap-3">
                        <button class="btn btn-primary btn-pill active-tab fw-semibold">
                          Patch Management
                        </button>
                        <button class="btn btn-outline-secondary btn-pill other-btn">
                          Configuration Management
                        </button>
                        <button class="btn btn-outline-secondary btn-pill other-btn">
                          Network Security
                        </button>
                        <button class="btn btn-outline-secondary btn-pill other-btn">
                          Architectural flaws
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="row mx-2 my-4">
                    <div class="d-flex justify-content-between">
                        <div class="mt-2">
                          <span style="color: rgba(0, 0, 0, 0.87);">Assigned to Patch Management team </span> 
                        </div>
                      <div>
                        <router-link to="/mitigationstrategy">
                          <button class="btn border-0" style="color: rgba(49, 33, 177, 1); font-weight: 600;">More details <i class="bi bi-arrow-right"></i></button>
                        </router-link>
                      </div>
                    </div>

                    <div class="d-flex gap-4 my-3">
                      <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between">
                          <button class="btn btn-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100" style="color: maroon;">Critical</button>
                        
                        </div>
                        <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      10 Days 
                      <!-- <i class="bi bi-plus-circle text-danger"  style="cursor:pointer;" id="plusIcon"></i> -->
                        </button>

                        <!-- Inline Input (hidden by default) -->
<div id="inlineInput" class="mt-2" style="display: none;">
  <input type="text" class="form-control d-inline w-50" id="userInput" placeholder="Enter something...">
  <button class="btn btn-primary ms-2" id="saveBtn">Save</button>
</div>

                    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLabel">Reason for changing mitigation deadline to <span id="modalText"></span></h6>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <textarea class="form-control" style="border-radius: 8px;" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
      </div>
      
    </div>
  </div>
</div>
                   
                      </div>
                      <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between">
                      <button class="btn btn-outline-secondary btn-pill text-danger d-flex align-items-center justify-content-center w-100">High</button>
                      <div class="info-icon mt-1" style="position:  relative; display: inline-block;">
                          <i class="bi bi-question-circle ms-2 text-danger" style="font-size: 13px;font-weight: 600;"></i>
                          <span class="tooltip-text">Reason for changing mitigation timeline or deadline</span>
                        </div>
                      </div>
                      <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                    </button>
                      </div>
                      <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between">
                      <button class="btn btn-outline-secondary btn-pill text-warning d-flex align-items-center justify-content-center w-100">Medium</button>
                      <div class="info-icon mt-1" style="position:  relative; display: inline-block;">
                          <i class="bi bi-question-circle ms-2 text-danger" style="font-size: 13px;font-weight: 600;"></i>
                          <span class="tooltip-text">Reason for changing mitigation timeline or deadline</span>
                        </div>
                      </div>
                      <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                      </button>
                      </div>
                      <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between">
                      <button class="btn btn-outline-secondary btn-pill text-success d-flex align-items-center justify-content-center w-100">Low</button>
                      <div class="info-icon mt-1" style="position:  relative; display: inline-block;">
                          <i class="bi bi-question-circle ms-2 text-danger" style="font-size: 13px;font-weight: 600;"></i>
                          <span class="tooltip-text">Reason for changing mitigation timeline or deadline</span>
                      </div>
                      </div>
                      <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                    </button>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-5">
                    <div class="col-11">
                      <div class="row">
                        <div class="col-3">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">Missing security updates</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <!-- <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"
                                ></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"
                                ></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"
                                ></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"
                                ></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                            </div> -->
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">OS vulns. by version</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <!-- <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"
                                ></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"
                                ></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"
                                ></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"
                                ></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                            </div> -->
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">App vulns. by software packages</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <!-- <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"
                                ></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"
                                ></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"
                                ></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"
                                ></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                            </div> -->
                          </div>
                        </div>
                        <div class="col-3 me-auto">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">End of life systems</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <!-- <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"
                                ></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"
                                ></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"
                                ></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"
                                ></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                            </div> -->
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-1">
                      <!-- blank -->
                    </div>
                  </div>
                </div>
                </div>
            </div>

            <div class="row mt-3">
              <div class="col-12">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row align-items-center justify-content-between py-3">
                    <h5 class="fw-semibold vuln-heading">Open vulnerabilities</h5>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12">
                      <div class="d-flex gap-3">
                        <button class="btn btn-primary btn-pill active-tab fw-semibold">
                          Due this week
                        </button>
                        <button class="btn btn-outline-secondary btn-pill other-btn">
                          Steps <i class="bi bi-arrow-down"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-pill other-btn">High risk vulns</button>
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
                                            <th scope="col">Estimated effort</th>
                                            <th scope="col">Dependency</th>
                                            <th scope="col">Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr></tr>
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
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';

export default {
  name: 'AdminDashboardOnboardingView',
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
    
    const plusIcon = document.getElementById('plusIcon');
  const inlineInput = document.getElementById('inlineInput');
  const saveBtn = document.getElementById('saveBtn');
  const userInput = document.getElementById('userInput');
  const modalText = document.getElementById('modalText');

  // Show input when clicking plus icon
  plusIcon.addEventListener('click', () => {
    inlineInput.style.display = 'block';
  });

  // On Save -> show modal with text
  saveBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
      modalText.textContent = text; // Put text inside modal
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.show();
      userInput.value = ''; // clear input
      inlineInput.style.display = 'none'; // hide input after save
    } else {
      alert('Please enter something!');
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

.btn-pill:hover {
  background-color: transparent;
}

.active-tab {
  background-color: #EAE8FF;
  color: #3121B1;
  border: none;
  font-size: 13px;
}

.other-btn {
  color: #000000DE;
  border: 1px solid #00000029;
}

.raised-table tr th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
}

.raised-tbody tr td {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
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

.tooltip-text {
    visibility: hidden;
    width: max-content;
    max-width: 200px;
    background-color: #333;
    color: #fff;
    text-align: left;
    border-radius: 4px;
    padding: 6px 8px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    line-height: 1.3;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%; /* Arrow position */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }

  .info-icon:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
</style>