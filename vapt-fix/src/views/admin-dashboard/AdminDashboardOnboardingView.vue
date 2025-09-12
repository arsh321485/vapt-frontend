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
                      <div class="dropdown-btn"> Select location</div>
                        <div class="dropdown-content">
                        <a href="#">Greece</a>
                        <a href="#">Germany</a>
                        <a href="#">Bahrain</a>
                        </div>
                    </div>
                  <!-- Notification Button -->
                  <div>
                    <button 
                      class="btn border-0" 
                      @click="toggleNotificationPanel"
                    >
                      <i class="bi bi-bell fs-5 nav-menu"></i>
                    </button>
                  </div>
                   
                  <div class="notification-panel" :class="{ 'open': showNotifications, 'fullscreen': isFullscreen }">
                  <div class="card shadow-lg border-0 rounded-4 text-light h-100 d-flex flex-column" style="background-color: white;">
                  <!-- Header -->
                  <div class="card-header d-flex justify-content-between align-items-center border-0">
                  <h5 class="mb-0 fw-semibold my-3 mx-3 text-dark">Notifications</h5>
                  <div>
                  <!-- Filter -->
                  <div class="btn-group me-2">
                    <button 
                      class="btn btn-sm btn-light dropdown-toggle" 
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i class="bi bi-filter"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" @click="filterType = ''">All</a></li>
                      <li><a class="dropdown-item" @click="filterType = 'fixed'">Fixed Vulnerabilities</a></li>
                      <li><a class="dropdown-item" @click="filterType = 'exception'">Exception Raised</a></li>
                      <li><a class="dropdown-item" @click="filterType = 'assigned'">Assigned Vulnerabilities</a></li>
                      <li><a class="dropdown-item" @click="filterType = 'report'">Reports</a></li>
                    </ul>
                  </div>

                  <!-- Fullscreen -->
                  <button class="btn btn-sm btn-light me-2" @click="toggleFullscreen">
                    <i class="bi bi-arrows-fullscreen"></i>
                  </button>

                  <!-- Close -->
                  <button class="btn-close btn-close-dark" @click="toggleNotificationPanel"></button>
                </div>
              </div>

              <!-- Body -->
              <div class="card-body px-3 pt-2" style="max-height: 500px; overflow-y: auto;">
                <div 
                  v-for="(notification, index) in filteredNotifications" 
                  :key="index" 
                  class="d-flex align-items-start py-2 border-bottom text-dark"
                >
                  <i :class="['me-3 fs-5', notification.icon, notification.color]"></i>
                  <div>
                   
        <p 
          class="mb-2" 
          style="font-weight:100;" 
          v-html="notification.message"
          :class="{'text-secondary': notification.read}">
        </p>
             <small class="text-secondary">{{ notification.time }}</small>
                  </div>
                </div>

                <p v-if="filteredNotifications.length === 0" class="text-center text-muted mt-3">
                  No notifications found.
                </p>
              </div>
                    <!-- Footer -->
                    <div class="card-footer border-0 d-flex justify-content-between mt-auto">
                       <button class="btn btn-dark btn-sm" @click="toggleShowAll">
                       {{ showAll ? "View Less" : "View All Notifications" }}
                        </button>
                      <button class="btn btn-dark btn-sm" @click="markAllAsRead">Mark All as Read</button>
                    </div>
                  </div>
                  </div>

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
                    <h1 class="text-212">212</h1>
                    <p style="margin-top: 37px;">Avg. score: <span class="fw-bold">7.8</span></p>
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
                  <div class="d-flex flex-row justify-content-start gap-2 py-3">
                    <h1 class="text-78">2d 11 hrs</h1>
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
                    <h1 class="text-78">32</h1>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">14</div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="mt-1 d-block" style="color: red;">● Pending</small>
                      </div>
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">18</div>
                        <div class="bar blue vul-bar mt-1" style="color: blue;"></div>
                        <small class="mt-1 d-block" style="color: blue;">● Approved</small>
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
                    <button type="button" class="btn pending-approval-btn rounded-pill">
                11 Support controls pending approval
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
                      <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between">
                          <button class="btn btn-pill btn-outline-secondary d-flex align-items-center justify-content-center w-100" style="color: maroon;">Critical</button>
                        
                        </div>
                        <button type="button" class="btn patch-btn rounded-pill text-nowrap">
                      10 Days 
                      
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
                            <div class="d-flex justify-content-end">
                              <h1 class="text-212 mt-auto">212</h1>
                              <router-link :to="{ path: '/mitigationstrategy', hash: '#details' }" class="text-decoration-none ms-2" style="color: rgba(49, 33, 177, 1);margin-top: 37px;">
                                View details
                              </router-link>
                            </div>
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
  data() {
    return {
      showReport: false,
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
    filteredNotifications() {
    let list = this.filterType
      ? this.notifications.filter(n => n.type === this.filterType)
      : this.notifications;

    // If not showing all, limit to visibleCount
    return this.showAll ? list : list.slice(0, 4);
  }
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
        this.$router.push("/assets");
      }
    
    },
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