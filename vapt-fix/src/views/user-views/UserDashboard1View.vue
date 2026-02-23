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

          <div class="col-11 pt-5 pb-3 pe-5 mt-2">
            <div class="d-flex justify-content-between py-3">
              <div class="d-flex flex-row gap-2">
                <div>
                  <h2>Vulnerability Management Program</h2>
                  <p style="color: rgba(0, 0, 0, 0.6);font-size:16px;font-weight: 500;">Patch management team</p>
                </div>
                <div>
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
              <div class="d-flex flex-row gap-3">
                <div><button class="btn fw-semibold px-3 py-2" style="border-radius: 20px;border: 1px solid rgba(0, 0, 0, 0.12);color: rgba(49, 33, 177, 1);" @click="showReport = true"><i class="bi bi-download me-2"></i> Download Report</button></div>

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
                          <div class="dropdown-btn"> Select team</div>
                          <div class="dropdown-content">
                              <a href="#">Patch Management</a>
                              <a href="#">Configuration Management</a>
                              <a href="#">Network Security</a>
                              <a href="#">Architectural Flaws</a>
                          </div>
                </div>
                <NotificationPanel />
              </div>
            </div>
            

            <div class="row">
              <div class="col-3">
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
              <div class="col-5">
                <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total Vulnerabilities Fixed<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row justify-content-start gap-5 ps-3">
                    <h1 class="text-78">78</h1>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">87</div>
                        <div class="bar maroon vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: maroon;">● Critical<br> fixed</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">56</div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● High <br> fixed</small>
                      </div>
                      
                      <div class="text-center">
                        <div id="mediumAge" class="fs-5 fw-semibold">127</div>
                        <div class="bar yellow vul-bar mt-1"></div>
                        <small class="text-warning mt-1 d-block">● Medium<br> fixed</small>
                      </div>
                      <div class="text-center">
                        <div id="lowAge" class="fs-5 fw-semibold">42</div>
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
                    <h1 class="text-78">2d 11 hrs</h1>
                  </div>
                </div>
              </div>
              <div class="col-4">
                  <div class="card h-100 pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Support Requests<i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i></p>
                  </div>
                  <div class="d-flex flex-row gap-5 py-3">
                    <h1 class="text-78">32</h1>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">14</div>
                        <div class="bar dark-yellow vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: yellow;">● Pending</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">18</div>
                        <div class="bar light-green vul-bar mt-1" style="color: blue;"></div>
                        <small class="mt-1 d-block" style="color: rgb(71, 199, 71);">● Closed</small>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div class="row mt-4">
              <div class="d-flex justify-content-between">
                <h4>Patch Management</h4>
                <button type="button" class="btn pending-approval-btn rounded-pill">
                11 Support requests ongoing
                <i class="bi bi-arrow-right ms-1 fs-5"></i>
              </button>
              </div>
              <div class="d-flex gap-4 my-3">
                      <div class="d-flex flex-column gap-2">
                          <button class="btn rounded-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100" style="color: maroon;">Critical</button>
                          <button type="button" class="btn patch-btn rounded-pill text-nowrap">10 Days <i class="bi bi-plus-circle text-danger" style="cursor:pointer;" id="plusIcon"></i>
                        </button>
                      </div>
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
              <div class="row mt-2">
                <div class="">
                    <div class="d-flex justify-content-between">
                      <p style="color: rgba(0, 0, 0, 0.6);font-weight: 
                      600;font-size: 15px;">Missing security updates</p>
                      <p style="cursor: pointer;color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View all</p>
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
                                  <router-link to="" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
                                      Details <i class="bi bi-arrow-right"></i>
                                    </router-link>
                                 </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                  <!-- blank -->
                </div>
              </div>

            <div class="row my-5">
                <div class="">
                    <div class="d-flex justify-content-between">
                      <p style="color: rgba(0, 0, 0, 0.6);font-weight: 600;font-size: 15px;">Operating system vulnerabilities by version</p>
                    <p style="cursor: pointer;color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View all</p>
                    </div>
                    <div class="row">
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                  <!-- blank -->
                </div>
            </div>

            <div class="row">
                <div class="">
                    <div class="d-flex justify-content-between">
                      <p style="color: rgba(0, 0, 0, 0.6);font-weight: 600;font-size: 15px;">Application vulnerabilities by software packages</p>
                    <p style="cursor: pointer;color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View all</p>
                    </div>
                    <div class="row">
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="col-1">
                  <!-- blank -->
                </div>
            </div>

            <div class="row my-5">
                <div class="">
                    <div class="d-flex justify-content-between">
                      <p style="color: rgba(0, 0, 0, 0.6);font-weight: 600;font-size: 15px;">End of life systems requiring replacement</p>
                    <p style="cursor: pointer;color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View all</p>
                    </div>
                    <div class="row">
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="card py-3 px-3" style="border-radius: 12px;">
                                <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Assets</p>
                                <div class="d-flex justify-content-between">
                                    <h1 style="color: rgba(0, 0, 0, 0.87);font-size: 52px;">23</h1>
                                    <p class="mt-auto" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">Details <i class="bi bi-arrow-right"></i></p>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <i class="bi bi-microsoft me-2"></i>
                                    <h6 style="color: rgba(0, 0, 0, 1);font-weight: 500;font-size: 17px;margin-top: 2px">Microsoft</h6>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #b31c1c"></span>
                                <span class="text-danger fw-bold">11</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f44336"></span>
                                <span class="text-danger fw-bold">4</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #f6b100"></span>
                                <span class="text-warning fw-bold">8</span>
                              </span>
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: #4caf50"></span>
                                <span class="text-success fw-bold">0</span>
                              </span>
                                </div>
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
      </div>
    </section>
  </main>
</template>

<script>
import DashboardMenu from '@/components/user-component/DashboardMenu.vue';
import DashboardHeader from '@/components/user-component/DashboardHeader.vue';
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";

export default {
  name: 'UserDashboard1View',
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel
  },
  data() {
    return {
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
    width: 250px;
}

.dropdown-btn {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 50px;
    padding: 8px 40px 8px 16px; 
    cursor: pointer;
    position: relative;
    font-size: 14px;
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
    font-size: 15px;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown.show .dropdown-content {
    display: block;
}
</style>