<template>
  <main>
    <section>
    
      <div class="container-fluid">
        <div class="row">
          <DashboardHeader />
        </div>
        <div class="row">
          <div class="col-1">
            <DashboardMenu />
          </div>

          <div class="col-11 pt-5 pb-3 pe-4 flex-grow-1 position-relative">
            <!-- Testing overlay is now created via DOM manipulation in initTestingOverlay() -->

            <div class="d-flex flex-row align-items-center justify-content-between py-3">
              <div class="d-flex flex-row gap-2">
                <h2>Vulnerability Management Program</h2>
                  <div>
                    <!-- Calendar Button -->
                    <button class="btn border-0" @click="toggleCalendar">
                      <i class="bi bi-calendar3 fs-4"></i>
                    </button>
                    <div
                      v-if="showCalendar"
                      class="calendar border rounded p-3 shadow"
                      style="width: 320px; position: absolute; background: #fff; z-index: 1000;"
                    >
                      <div class="d-flex justify-content-between align-items-center mb-2">
                        <button class="btn btn-sm btn-light" @click="prevMonth">&lt;</button>
                        <h6 class="mb-0">
                          {{ monthYear }}
                        </h6>
                        <button class="btn btn-sm btn-light" @click="nextMonth">&gt;</button>
                      </div>
                      <div class="d-grid text-center fw-bold" style="grid-template-columns: repeat(7, 1fr);">
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
                    </div>
                  </div>
              </div>
              
              <div class="d-flex flex-row gap-3 mt-3">
                <div>
                <button class="btn fw-semibold px-3 py-2" style="border-radius: 20px;border: 1px solid rgba(0, 0, 0, 0.12);color: rgba(49, 33, 177, 1);" @click="showReport = true"><i class="bi bi-download me-2"></i> Download Report</button>
                </div>

                <!-- Overlay Popup -->
                  <div v-if="showReport" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style="background-color: rgba(0, 0, 0, 0.6); z-index: 1050;">
                  <div class="bg-white p-4 rounded shadow" style="width: 600px; max-height: 90vh; overflow-y: auto; position: relative;">
                  <!-- Close Button -->
                  <button @click="showReport = false"
                  class="btn-close position-absolute top-0 end-0 m-3"
                  aria-label="Close"></button>
                  <h2 class="mb-2 text-center">Download Report</h2>
                    <p class="mb-2 text-center" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Download report</p>
                    <button type="button" class="btn patch-btn rounded-pill text-nowrap ms-3 mb-3"> June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                    </button>

                    <!-- Accordion -->
                    <div class="accordion" id="globalReportAccordion">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >Assets(11) <span class="text-primary ms-2">4 selected</span>
                        </button>
                        </h2>
                        <div id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#globalReportAccordion">
                        <div class="accordion-body">
                         Assets
                        </div>
                        </div>
                        </div>

                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingTwo">
                                        <button
                                          class="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwo"
                                        >
                                          Vulnerabilities
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseTwo"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#globalReportAccordion"
                                      >
                                        <div class="accordion-body">
                                          Vulnerabilities
                                        </div>
                                      </div>
                                    </div>

                                    <div class="accordion-item">
                                      <h2 class="accordion-header" id="headingThree">
                                        <button
                                          class="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseThree"
                                          aria-expanded="false"
                                          aria-controls="collapseThree"
                                        >
                                          Team Role
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseThree"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#globalReportAccordion"
                                      >
                                        <div class="accordion-body">
                                          Team Roles
                                        </div>
                                      </div>
                                    </div>

                                    
                    </div>

                    <button class="btn download-btn btn-sm ms-3 mt-4"><i class="bi bi-download me-2"></i> Download report</button>

                    </div>
                    </div>
                    
                  <NotificationPanel />

                </div>
            </div>

            <div class="row">
              <div class="col-3">
                <router-link to="/assets" class="text-decoration-none">
                  <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total assets<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <!-- <h1 class="text-212">212</h1> -->
                      <h1 class="text-212">
                        {{ authStore.totalAssets }}
                      </h1>
                    <!-- <p style="margin-top: 37px;">Avg. score: <span class="fw-bold">7.8</span></p> -->
                    <!-- <p style="margin-top: 37px;">
                      Avg. score:<span class="fw-bold">
                        {{ authStore.avgScore }}</span>
                    </p> -->
                    <p style="margin-top: 37px;">
                      Avg. score:<span class="fw-bold">
                        {{ Number(authStore.avgScore).toFixed(2) }}</span>
                    </p>
                  </div>
                  </div>
                </router-link>
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
                        <!-- <div id="highAge" class="fs-5 fw-semibold">87</div> -->
                      <div id="highAge" class="fs-5 fw-semibold">
                        {{ authStore.vulnerabilities.critical }}
                      </div>
                        <div class="bar maroon vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: maroon;">● Critical</small>
                      </div>
                      <div class="text-center">
                        <!-- <div id="highAge" class="fs-5 fw-semibold">56</div> -->
                        <div id="highAge" class="fs-5 fw-semibold">
                          {{ authStore.vulnerabilities.high }}
                        </div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● High</small>
                      </div>
                      <div class="text-center">
                        <!-- <div id="mediumAge" class="fs-5 fw-semibold">127</div> -->
                        <div id="mediumAge" class="fs-5 fw-semibold">
                          {{ authStore.vulnerabilities.medium }}
                        </div>
                        <div class="bar yellow vul-bar mt-1"></div>
                        <small class="text-warning mt-1 d-block">● Medium</small>
                      </div>
                      <div class="text-center">
                        <!-- <div id="lowAge" class="fs-5 fw-semibold">42</div> -->
                        <div id="lowAge" class="fs-5 fw-semibold">
                          {{ authStore.vulnerabilities.low }}
                        </div>
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
    <div class="fs-5 fw-semibold">
      {{ formatTimeline(authStore.mitigationTimeline?.critical) }}
    </div>
    <div class="bar maroon w-100 mt-1"></div>
    <small style="color: maroon;">● Critical</small>
  </div>

  <div class="text-center">
    <div class="fs-5 fw-semibold">
      {{ formatTimeline(authStore.mitigationTimeline?.high) }}
    </div>
    <div class="bar red w-100 mt-1"></div>
    <small style="color: red;">● High</small>
  </div>

  <div class="text-center">
    <div class="fs-5 fw-semibold">
      {{ formatTimeline(authStore.mitigationTimeline?.medium) }}
    </div>
    <div class="bar yellow w-100 mt-1"></div>
    <small class="text-warning">● Medium</small>
  </div>

  <div class="text-center">
    <div class="fs-5 fw-semibold">
      {{ formatTimeline(authStore.mitigationTimeline?.low) }}
    </div>
    <div class="bar green w-100 mt-1"></div>
    <small class="text-success">● Low</small>
  </div>
</div>

                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-5">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total Vulnerabilities Fixed<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-5 ps-3">
                    <h1 class="text-78">00</h1>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar maroon vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: maroon;">● Critical<br> fixed</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● High <br> fixed</small>
                      </div>
                      
                      <div class="text-center">
                        <div id="mediumAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar yellow vul-bar mt-1"></div>
                        <small class="text-warning mt-1 d-block">● Medium<br> fixed</small>
                      </div>
                      <div class="text-center">
                        <div id="lowAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar green vul-bar mt-1"></div>
                        <small class="text-success mt-1 d-block">● Low<br> fixed</small>
                      </div>
                    </div>
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
                  <div class="d-flex flex-row justify-content-center gap-2 py-3">  
                <h1 class="">{{ meanRemediateHuman }}</h1>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <router-link to="/exceptions" class="text-decoration-none">
                  <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Support Requests<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row gap-5 py-3">
                    <h1 class="text-78">00</h1>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar dark-yellow vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: yellow;">● Pending</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">0</div>
                        <div class="bar light-green vul-bar mt-1" style="color: blue;"></div>
                        <small class="mt-1 d-block" style="color: rgb(71, 199, 71);">● Closed</small>
                      </div> 
                    </div>
                  </div>
                </div>
                </router-link>
              </div>
              
            </div>

            <div class="row mt-3">
                <div class="col-12">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row align-items-center justify-content-between py-3">
                    <h4 class="fw-semibold">Mitigation Strategy</h4>
              <router-link to="/exceptions" class="btn pending-approval-btn rounded-pill text-decoration-none">11 Support requests ongoing
                <i class="bi bi-arrow-right ms-1 fs-5"></i></router-link>
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

                  <div class="row  my-4">
                    <div class="d-flex justify-content-between">
                        <div class="mt-2 d-flex align-items-center">
                          <span style="color: rgba(0, 0, 0, 0.87);">
                            Assigned to Patch Management team
                          </span>
                          <span class="badge rounded-pill bg-primary ms-2 mt-1 d-flex align-items-center justify-content-center" style="width: 80px; height: 18px;">
                            4 Members
                          </span>
                          
                        </div>
                      <div>
                        <router-link to="/mitigationstrategy">
                          <button class="btn border-0" style="color: rgba(49, 33, 177, 1); font-weight: 600;">More details <i class="bi bi-arrow-right"></i></button>
                        </router-link>
                      </div>
                    </div>

                    <div class="d-flex gap-4 my-3">
                      
                      <div class="d-flex flex-column gap-2">
                        <button class="btn rounded-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100" style="color: maroon;">Critical</button>
                      <button class="btn patch-btn rounded-pill text-nowrap d-flex align-items-center justify-content-center w-100">
  {{ days }} Days
  <i class="bi bi-plus-circle text-danger ms-2" style="cursor:pointer;" @click.stop="openModal"></i>
</button></div>



                      <div class="d-flex flex-column gap-2">
                          <button class="btn rounded-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100 text-danger">High</button>
                          <button type="button" class="btn patch-btn rounded-pill text-nowrap">10 Days <i class="bi bi-plus-circle text-danger" style="cursor:pointer;" id="plusIcon"></i>
                        </button>
                      </div>
                      <div class="d-flex flex-column gap-2">
                          <button class="btn rounded-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100 text-warning">Medium</button>
                          <button type="button" class="btn patch-btn rounded-pill text-nowrap">10 Days <i class="bi bi-plus-circle text-danger" style="cursor:pointer;" id="plusIcon"></i>
                        </button>
                      </div>
                      <div class="d-flex flex-column gap-2">
                          <button class="btn rounded-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100 text-success">Low</button>
                          <button type="button" class="btn patch-btn rounded-pill text-nowrap">10 Days <i class="bi bi-plus-circle text-danger" style="cursor:pointer;" id="plusIcon"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-5">
                    <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <p style="font-weight: 
                      600;">Missing security updates</p>
                      <!-- <p style="cursor: pointer;color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View all</p>   -->
                    </div>
                    <div class="row">
                        <div class="col-3">
                          <div class="card py-4 px-3" style="border-radius: 12px;">
                                <div class="d-flex justify-content-between">
                                  <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">23 Assets</p>
                                    
                                </div>
                                <h4 class="truncated-text" title="VMware ESXi 7.0/8.0 Sandbox Escape">
                                  VMware ESXi 7.0/8.0 Sandbox Escape...
                                </h4>
                                <div class="d-flex justify-content-start mt-2">
                                    <i class="bi bi-microsoft me-2"></i>
                                     
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                 <div class="text-end">
                                  <router-link to="/missingsecurityupdates" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
                                      Details <i class="bi bi-arrow-right"></i>
                                    </router-link>
                                 </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-4 px-3" style="border-radius: 12px;">
                                <div class="d-flex justify-content-between">
                                  <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">23 Assets</p>
                                    
                                </div>
                                <h4 class="truncated-text" title="VMware ESXi 7.0/8.0 Sandbox Escape">
                                  VMware ESXi 7.0/8.0 Sandbox Escape...
                                </h4>
                                <div class="d-flex justify-content-start mt-2">
                                    <i class="bi bi-microsoft me-2"></i>
                                     
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                 <div class="text-end">
                                  <router-link to="/missingsecurityupdates" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
                                      Details <i class="bi bi-arrow-right"></i>
                                    </router-link>
                                 </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-4 px-3" style="border-radius: 12px;">
                                <div class="d-flex justify-content-between">
                                  <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">23 Assets</p>
                                    
                                </div>
                                <h4 class="truncated-text" title="VMware ESXi 7.0/8.0 Sandbox Escape">
                                  VMware ESXi 7.0/8.0 Sandbox Escape...
                                </h4>
                                <div class="d-flex justify-content-start mt-2">
                                    <i class="bi bi-microsoft me-2"></i>
                                     
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                 <div class="text-end">
                                  <router-link to="/missingsecurityupdates" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
                                      Details <i class="bi bi-arrow-right"></i>
                                    </router-link>
                                 </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-4 px-3" style="border-radius: 12px;">
                                <div class="d-flex justify-content-between">
                                  <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">23 Assets</p>
                                    
                                </div>
                                <h4 class="truncated-text" title="VMware ESXi 7.0/8.0 Sandbox Escape">
                                  VMware ESXi 7.0/8.0 Sandbox Escape...
                                </h4>
                                <div class="d-flex justify-content-start mt-2">
                                    <i class="bi bi-microsoft me-2"></i>
                                     
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                 <div class="text-end">
                                  <router-link to="/missingsecurityupdates" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
                                      Details <i class="bi bi-arrow-right"></i>
                                    </router-link>
                                 </div>
                          </div>
                        </div>
                    </div>
                    </div>

                    
                  </div>
                </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      <div v-if="showModal" class="custom-modal-backdrop">
  <div class="custom-modal-box">
    <h5 class="mb-3">Update Days</h5>

    <div class="mb-3">
      <label class="form-label">Add Days</label>
      <input type="number" class="form-control" style="border-radius: 10px;" v-model="addDays">
    </div>

    <div class="mb-3">
      <label class="form-label">Reason</label>
      <textarea class="form-control" style="border-radius: 10px;" rows="2" v-model="reason"></textarea>
    </div>

    <div class="d-flex justify-content-end gap-2">
      <button class="btn btn-secondary" @click="closeModal">Cancel</button>
      <button class="btn btn-primary" @click="submitForm">Submit</button>
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
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
  name: 'AdminDashboardOnboardingView',
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel,
  },
  data() {
    return {
      testingActive: false,
      remainingSeconds: 20,
      progressPercent: 100,
      testingTimer: null,
      showReport: false,
      showCalendar: false,
      currentDate: new Date(),
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      vulnerabilities: {
        12: "critical",
        15: "high",
        20: "medium",
        23: "low",
      },
      days: 10,              // default days
      showModal: false,      // modal visibility
      addDays: "",           // input: additional days
      reason: "",
      mitigationTimeline: null,
      selectedLocation: "",
      locationName: "",
      showDropdown: false,
      filteredCountries: [],
      // NEW DROPDOWN DATA
      showLocationDropdown: false,
      activeSubDropdown: null,
      selectedLocationData: null,
      selectedLocationType: null,
      // Temporary hardcoded locations (will be replaced with API later)
      tempLocations: [
        { id: 1, name: "India", types: ["Internal", "External"] },
        { id: 2, name: "China", types: ["Internal"] },
        { id: 3, name: "USA", types: ["External"] },
        { id: 4, name: "Germany", types: ["Internal", "External"] },
      ],
      // REPORT STATUS CHECK DATA
      reportStatusChecking: true,
      hasReport: false,
      reportStatusMessage: "",
      reportStatusInterval: null,
      currentReportId: null,
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
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
    // authStore() {
    //   return useAuthStore();
    // },
    //   meanRemediateHuman() {
    //   const mttr =
    //     this.authStore.meanTimeToRemediate?.mean_time_to_remediate;

    //   if (!mttr) return "0d 0 hrs";

    //   const days = mttr.days ?? 0;
    //   const hours = mttr.hours_remaining ?? 0;

    //   return `${days}d ${hours} hrs`;
    // },
    meanRemediateHuman() {
      const mttr =
        this.authStore.meanTimeToRemediate?.mean_time_to_remediate;

      if (!mttr) return "0w 0d 0hrs";

      const weeks = mttr.weeks ?? 0;
      const days = mttr.days ?? 0;
      const hours = mttr.hours_remaining ?? 0;

      return `${weeks}w ${days}d ${hours}hrs`;
    },
    // Display text for selected location
    selectedLocationDisplay() {
      if (!this.selectedLocationData) return "";
      if (this.selectedLocationType) {
        return `${this.selectedLocationData.name} - ${this.selectedLocationType}`;
      }
      return this.selectedLocationData.name;
    },
  },
  methods: {
    initTestingOverlay() {
      // ✅ Skip if report status overlay is already showing (report status takes priority)
      if (this.reportStatusChecking || !this.authStore.reportStatus.hasReport) {
        console.log("⏭️ Skipping testing overlay - report status check in progress or no report");
        return;
      }

      // Clear any existing timer and overlay
      if (this.testingTimer) {
        clearInterval(this.testingTimer);
        this.testingTimer = null;
      }
      this.removeOverlayFromDOM();

      const isTesting = localStorage.getItem("testingInProgress") === "true";
      const startTimeNum = Number(localStorage.getItem("testingStartTime") || 0);
      const elapsed = Date.now() - startTimeNum;
      const remainingMs = Math.max(20000 - elapsed, 0);

      console.log("initTestingOverlay - isTesting:", isTesting, "remainingMs:", remainingMs);

      if (isTesting && remainingMs > 0) {
        // Create overlay using DOM manipulation
        this.createOverlayInDOM();
        this.updateOverlayTimer(Math.ceil(remainingMs / 1000), (remainingMs / 20000) * 100);

        // Start countdown timer
        const self = this;
        this.testingTimer = setInterval(function () {
          const now = Date.now();
          const elapsedNow = now - startTimeNum;
          const remainingNow = Math.max(20000 - elapsedNow, 0);

          const seconds = Math.ceil(remainingNow / 1000);
          const percent = (remainingNow / 20000) * 100;
          self.updateOverlayTimer(seconds, percent);

          if (remainingNow <= 0) {
            self.clearTestingState();
          }
        }, 500);
      } else if (isTesting) {
        this.clearTestingState();
      }
    },

    createOverlayInDOM() {
      // Remove existing if any
      this.removeOverlayFromDOM();

      const overlay = document.createElement('div');
      overlay.id = 'testing-overlay-dom';
      overlay.innerHTML = `
        <div style="position: fixed; top: 60px; left: 90px; right: 0; bottom: 0; background: rgba(255,255,255,0.80); display: flex; align-items: center; justify-content: center; z-index: 900;">
          <div style="background: #fff; padding: 40px 60px; border-radius: 16px; box-shadow: 0 10px 40px rgba(49,33,177,0.25); text-align: center; border: 2px solid rgba(49,33,177,0.15);">
            <div style="font-size: 48px; color: rgba(49,33,177,1); margin-bottom: 16px;">
              <i class="bi bi-hourglass-split"></i>
            </div>
            <h4 style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 8px;">Please wait</h4>
            <p style="font-size: 16px; color: #6b7280; margin-bottom: 20px;">Testing in progress...</p>
            <div style="width: 200px; height: 8px; background: #e5e7eb; border-radius: 4px; margin: 0 auto 12px; overflow: hidden;">
              <div id="testing-progress-bar" style="width: 100%; height: 100%; background: linear-gradient(90deg, rgba(49,33,177,1), rgba(90,68,255,1)); border-radius: 4px; transition: width 0.3s linear;"></div>
            </div>
            <small id="testing-timer-text" style="color: #9ca3af; font-size: 14px;">20s remaining</small>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      console.log("Overlay created in DOM");
    },

    updateOverlayTimer(seconds, percent) {
      const timerText = document.getElementById('testing-timer-text');
      const progressBar = document.getElementById('testing-progress-bar');
      if (timerText) timerText.textContent = seconds + 's remaining';
      if (progressBar) progressBar.style.width = percent + '%';
    },

    removeOverlayFromDOM() {
      const existing = document.getElementById('testing-overlay-dom');
      if (existing) {
        existing.remove();
        console.log("Overlay removed from DOM");
      }
    },

    clearTestingState() {
      console.log("clearTestingState called!");
      this.testingActive = false;
      this.removeOverlayFromDOM();

      if (this.testingTimer) {
        clearInterval(this.testingTimer);
        this.testingTimer = null;
      }
      localStorage.removeItem("testingInProgress");
      localStorage.removeItem("testingStartTime");
      localStorage.removeItem("dashboardTestingInProgress");
    },

    // NEW DROPDOWN METHODS
    toggleLocationDropdown() {
      this.showLocationDropdown = !this.showLocationDropdown;
      if (!this.showLocationDropdown) {
        this.activeSubDropdown = null;
      }
    },
    toggleSubDropdown(locId) {
      this.activeSubDropdown = this.activeSubDropdown === locId ? null : locId;
    },
    selectLocationWithType(loc, type) {
      this.selectedLocationData = loc;
      this.selectedLocationType = loc.types.length > 1 ? type : null;
      this.showLocationDropdown = false;
      this.activeSubDropdown = null;
      // For now just log - later integrate with API
      console.log("Selected:", loc.name, type);
    },
    closeLocationDropdown(e) {
      const dropdown = this.$el.querySelector('.location-dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        this.showLocationDropdown = false;
        this.activeSubDropdown = null;
      }
    },

    // OLD METHODS (kept for reference)
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    selectLocation(loc) {
      this.selectedLocation = loc.id;
      this.locationName = loc.name;
      this.showDropdown = false;
    },
    formatTimeline(value) {
      if (!value || !value.raw) return "--";

      const raw = value.raw.toLowerCase();

      if (raw.includes("week")) {
        return `${value.days / 7}W`;
      }

      if (raw.includes("day")) {
        return `${value.days}D`;
      }

      return `${value.days}D`;
    },
    onLocationInput() {
      this.showDropdown = true;
      this.filterCountries();
    },
    filterCountries() {
      const input = this.locationName.toLowerCase().trim();

      if (!input) {
        this.filteredCountries = [];
        return;
      }

      const allCountries = this.authStore.countries || [];

      this.filteredCountries = allCountries.filter((country) =>
        country.toLowerCase().includes(input)
      );
    },
    selectCountry(country) {
      this.locationName = country;
      this.showDropdown = false;
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
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
        this.$router.push("/assets");
      }

    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.addDays = "";
      this.reason = "";
    },
    submitForm() {
      if (!this.addDays) {
        alert("Please enter number of days");
        return;
      }

      this.days += Number(this.addDays); // update UI days
      alert("Days updated successfully!");

      this.closeModal();
    },
    async loadMitigationTimeline() {
      const res = await this.authStore.fetchMitigationTimeline(this.reportId);
      if (res.status) {
        this.mitigationTimeline = res.data;
      }
    },

    // ==========================================
    // REPORT STATUS CHECK METHODS
    // ==========================================

    async checkReportStatus() {
      console.log("🔍 Checking report status...");
      const res = await this.authStore.getReportStatus();

      if (res.status) {
        this.hasReport = res.hasReport;
        this.reportStatusMessage = res.message;

        if (res.hasReport) {
          // Report is available
          console.log("✅ Report available:", res.reportId);
          this.currentReportId = res.reportId;
          localStorage.setItem("reportId", res.reportId);

          // Stop polling
          this.stopReportStatusPolling();

          // Remove overlay and show success
          this.removeReportStatusOverlay();
          this.showReportAvailableAlert();
          this.reportStatusChecking = false;

        } else {
          // Report not uploaded yet - keep showing overlay
          console.log("⏳ No report yet:", res.message);
          this.reportStatusChecking = true;
          this.updateReportStatusMessage(res.message);
        }
      } else {
        console.error("❌ Report status check failed:", res.message);
      }
    },

    startReportStatusPolling() {
      console.log("🔄 Starting report status polling...");

      // Poll every 5 seconds until report is available
      this.reportStatusInterval = setInterval(() => {
        // Check both local and store state
        if (!this.hasReport && !this.authStore.reportStatus.hasReport) {
          this.checkReportStatus();
        } else {
          this.stopReportStatusPolling();
          this.removeReportStatusOverlay();
        }
      }, 5000); // 5 seconds
    },

    stopReportStatusPolling() {
      if (this.reportStatusInterval) {
        clearInterval(this.reportStatusInterval);
        this.reportStatusInterval = null;
        console.log("⏹️ Stopped report status polling");
      }
    },

    createReportStatusOverlay() {
      // Remove existing if any
      this.removeReportStatusOverlay();

      const overlay = document.createElement('div');
      overlay.id = 'report-status-overlay';
      overlay.innerHTML = `
        <div style="position: fixed; top: 60px; left: 90px; right: 0; bottom: 0; background: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; z-index: 900;">
          <div style="background: #fff; padding: 40px 60px; border-radius: 16px; box-shadow: 0 10px 40px rgba(49,33,177,0.25); text-align: center; border: 2px solid rgba(49,33,177,0.15); max-width: 500px;">
            <div style="font-size: 48px; color: rgba(49,33,177,1); margin-bottom: 16px;">
              <i class="bi bi-hourglass-split" style="display: inline-block; animation: spin 2s linear infinite;"></i>
            </div>
            <h4 style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 8px;">Please Wait</h4>
            <p id="report-status-message" style="font-size: 16px; color: #6b7280; margin-bottom: 20px; line-height: 1.5;">
              ${this.reportStatusMessage || 'Checking report status...'}
            </p>
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-primary" role="status" style="width: 2rem; height: 2rem;">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <small style="color: #9ca3af; font-size: 13px; display: block; margin-top: 16px;">Checking every 5 seconds...</small>
          </div>
        </div>
        <style>
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(overlay);
      console.log("📋 Report status overlay created");
    },

    updateReportStatusMessage(message) {
      const messageEl = document.getElementById('report-status-message');
      if (messageEl) {
        messageEl.textContent = message;
      }
    },

    removeReportStatusOverlay() {
      const overlay = document.getElementById('report-status-overlay');
      if (overlay) {
        overlay.remove();
        console.log("📋 Report status overlay removed");
      }
    },

    showReportAvailableAlert() {
      Swal.fire({
        icon: 'success',
        title: 'Report Available',
        text: 'The report has been uploaded. Dashboard is now accessible.',
        toast: true,
        position: 'top-end',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.style.marginTop = '70px';
        }
      });
    },

    async initReportStatusCheck() {
      console.log("🚀 Initializing report status check...");

      // ✅ STEP 1: Check if we already know report exists (from store state)
      if (this.authStore.reportStatus.checked && this.authStore.reportStatus.hasReport) {
        console.log("✅ Report already confirmed from store");
        this.hasReport = true;
        this.currentReportId = this.authStore.reportStatus.reportId;
        this.reportStatusChecking = false;
        this.removeReportStatusOverlay();
        return;
      }

      // ✅ STEP 2: Show overlay IMMEDIATELY while checking
      this.reportStatusChecking = true;
      this.reportStatusMessage = "Checking report status...";
      this.createReportStatusOverlay();

      // ✅ STEP 3: Now call API to check
      const res = await this.authStore.getReportStatus();

      if (res.status && res.hasReport) {
        // Report already exists - remove overlay (no toast, report was already there)
        console.log("✅ Report already exists:", res.reportId);
        this.hasReport = true;
        this.currentReportId = res.reportId;
        this.reportStatusChecking = false;
        this.removeReportStatusOverlay();
        // Don't show toast here - report was already available, not a new upload
      } else {
        // No report yet - update overlay message and start polling
        console.log("⏳ No report yet, starting polling...");
        this.hasReport = false;
        this.reportStatusMessage = res.message || "No report uploaded yet. Please wait for Super Admin to upload a report.";
        this.reportStatusChecking = true;

        // Update overlay message (overlay already created above)
        this.updateReportStatusMessage(this.reportStatusMessage);

        // Start polling
        this.startReportStatusPolling();
      }
    },
  },

mounted() {
  console.log("=== DASHBOARD MOUNTED ===");

  // ✅ STEP 1: Check report status first
  this.initReportStatusCheck();

  setTimeout(() => {
    this.initTestingOverlay();
  }, 100);

  document.addEventListener("click", this.closeLocationDropdown);

  this.authStore.fetchCountries();

  const user =
    this.authStore.user ||
    JSON.parse(localStorage.getItem("user") || "null");

  if (user) {
    this.authStore.user = user;
    const adminId = user.admin_id || user.id || user._id;
    if (adminId) {
      this.authStore.fetchLocationsByAdminId(adminId);
    }
  }

  // ✅ DASHBOARD APIs
  Promise.all([
    this.authStore.fetchDashboardTotalAssets(),
    this.authStore.fetchDashboardAvgScore(),
    this.authStore.fetchDashboardVulnerabilities(),
    this.authStore.fetchDashboardMitigationTimeline(),
    this.authStore.fetchDashboardMeanTimeToRemediate(),
  ])
    .then(() => {
      console.log("✅ All dashboard APIs loaded");
    })
    .catch(err => {
      console.error("❌ Dashboard API error", err);
    });
},



  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('click', this.closeLocationDropdown);
    // Clear testing timer and remove overlay
    if (this.testingTimer) {
      clearInterval(this.testingTimer);
    }
    this.removeOverlayFromDOM();

    // ✅ Clean up report status polling
    this.stopReportStatusPolling();
    this.removeReportStatusOverlay();
  },
  // Handle component reactivation (if using keep-alive)
  activated() {
    console.log("=== ACTIVATED hook called ===");
    this.initTestingOverlay();
    // Re-check report status on reactivation
    this.initReportStatusCheck();
  },
};
</script>

<style scoped>

/* Testing Overlay - Only covers col-11 (right side of screen) */
.testing-overlay {
  position: fixed;
  top: 64px; 
  left: 100px; 
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.testing-alert-box {
  top: 64px;
  background: #fff;
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(49, 33, 177, 0.2);
  text-align: center;
  border: 2px solid rgba(49, 33, 177, 0.1);
}

.testing-icon {
  font-size: 48px;
  color: rgba(49, 33, 177, 1);
  margin-bottom: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.testing-alert-box h4 {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.testing-alert-box p {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 20px;
}

.progress-bar-container {
  width: 200px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  margin: 0 auto 12px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(49, 33, 177, 1), rgba(90, 68, 255, 1));
  border-radius: 3px;
  transition: width 0.1s linear;
}

.testing-alert-box small {
  color: #9ca3af;
  font-size: 13px;
}

.custom-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.custom-modal-box {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
}


.bg-maroon {
  background-color: maroon !important;
}
.bg-red {
  background-color: red !important;
}
.notification-panel {
  position: fixed;
  top: 0;
  right: -520px;
  width: 500px;
  height: 100%;
  background: #fff;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1050;
}

.notification-panel.open {
  right: 0;
}

.notification-panel.fullscreen {
  width: 100% !important;
  height: 100% !important;
  right: 0;
  top: 0;
}
.dropdown-menu .dropdown-item {
  cursor: pointer;
}
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
  .download-btn {
    font-weight: 600;
    font-size: 12px;
    padding: 8px 15px;
    color: white;
    background-color: rgba(49, 33, 177, 1);
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.12);
}

/* ===== NEW LOCATION DROPDOWN WITH SUB-DROPDOWN ===== */
.location-dropdown {
  position: relative;
  display: inline-block;
  width: 200px;
}

.location-dropdown-btn {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.location-dropdown-btn:hover {
  border-color: rgba(49, 33, 177, 0.5);
}

.location-dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 100%;
  border-radius: 12px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  padding: 8px 0;
  overflow: visible;
}

.location-item {
  position: relative;
}

.location-name {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  transition: background-color 0.2s;
}

.location-name:hover {
  background-color: #f5f5f5;
}

.location-item.has-submenu .location-name {
  padding-right: 12px;
}

/* Inline sub-options - appears below location name */
.sub-options {
  background-color: #f9f9f9;
  padding: 4px 0;
}

.sub-options a {
  display: block;
  padding: 8px 16px 8px 32px;
  text-decoration: none;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sub-options a:hover {
  background-color: #eef0ff;
  color: rgba(49, 33, 177, 1);
}
</style>