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

          <div class="col-11 pt-5 pb-3 pe-4 flex-grow-1" >
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
                    <div class="dropdown">
  <div class="dropdown-btn" @click="showDropdown = !showDropdown">
    {{ locationName || "Select location" }}
  </div>

  <div class="dropdown-content" v-if="showDropdown">
    <!-- <a
      href="#"
      v-for="(loc, index) in authStore.reportLocations"
      :key="loc.id || index"
      @click.prevent="selectLocation(loc)"
      :class="{ active: loc.id === selectedLocation }"
    >
      {{ loc.name }}
    </a> -->
    <a
  v-for="(loc, index) in authStore.reportLocations"
  :key="loc.id || index"
>
  {{ loc.name }}
</a>

  </div>
</div>


                    <!-- <div class="dropdown">
                      <div  class="dropdown-btn"> Select location</div>
                        <div class="dropdown-content">
                        <a href="" v-for="(loc, index) in authStore.locations"
                              :key="loc._id || index"
                              :value="loc._id">{{ loc.location_name }}</a>
                        
                        </div>
                    </div> -->
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
                    <!-- <h1 class="text-78">2d 11 hrs</h1> -->
                     
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

export default {
  name: 'AdminDashboardOnboardingView',
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel
  },
  data() {
    return {
      authStore: useAuthStore(),
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
      reason: ""  ,
      mitigationTimeline: null,
      selectedLocation: "",
      locationName: "",
      showDropdown: false,
      filteredCountries: [],
    };
  },
  computed: {
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
    authStore() {
      return useAuthStore();
    },
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
  },
   methods: {
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
  },
  mounted() {
    const dropdown = document.querySelector('.dropdown');
    const btn = dropdown.querySelector('.dropdown-btn');
    const options = dropdown.querySelectorAll('.dropdown-content a');

    btn.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        btn.textContent = option.textContent; 
        dropdown.classList.remove('show');
      });
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
    
    this.authStore.fetchCountries();
    // 🟡 3️⃣ Fetch locations by admin id instead of old fetchLocations()
      const user =
        this.authStore.user ||
        JSON.parse(localStorage.getItem("user") || "null");

      if (user) {
        this.authStore.user = user; // keep store in sync
        const adminId =
          user.admin_id || user.id || user._id;

        if (adminId) {
          this.authStore.fetchLocationsByAdminId(adminId);
        }
      }
       // 🟡 4️⃣ Fetch locations if not loaded
      if (!this.authStore.locations.length) {
        this.authStore.fetchLocations();
      }

    const reportId = localStorage.getItem("reportId");
      if (!reportId) return;
      this.authStore.fetchTotalAssets(reportId);
      this.authStore.fetchAvgScore(reportId);
      this.authStore.fetchVulnerabilities(reportId);
      this.authStore.fetchMitigationTimeline(reportId);
      this.authStore.fetchMeanTimeToRemediate(reportId);

      this.authStore.fetchLocationsByReportId(reportId).then(() => {
    const selected = this.authStore.selectedReportLocation;
    if (selected) {
      this.selectedLocation = selected.id;
      this.locationName = selected.name;
    }
  });
    },
};
</script>

<style scoped>
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
</style>