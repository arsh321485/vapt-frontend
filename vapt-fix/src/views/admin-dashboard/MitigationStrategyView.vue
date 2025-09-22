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

          <div class="col-11 pt-5 pb-3 pe-5">
            <div class="row">
                <div class="col-12">
                <div class="d-flex justify-content-between my-4">
                <h2>Mitigation Strategy</h2>
                <div class="d-flex justify-content-between gap-3">
                  <button class="btn download-report-btn" @click="showPopup = true"><i class="bi bi-download me-2"></i> Download report</button>
                  <!-- Overlay Popup -->
                  <div
                    v-if="showPopup"
                    class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style="background-color: rgba(0, 0, 0, 0.6); z-index: 1050;"
                  >
                    <div
                      class="bg-white p-4 rounded shadow"
                      style="width: 600px; max-height: 90vh; overflow-y: auto; position: relative;"
                    >
                      <!-- Close Button -->
                      <button
                        @click="showPopup = false"
                        class="btn-close position-absolute top-0 end-0 m-3"
                        aria-label="Close"
                      ></button>

                      <!-- Heading -->
                      <h2 class="mb-2 text-center">Report</h2>
                      <p class="mb-2 text-center" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Create a report</p>
                      <div class="d-flex justify-content-between">
                        <div class="dropdown">
                        <div class="dropdown-btn"> Select location</div>
                        <div class="dropdown-content">
                            <a href="#">Greece</a>
                            <a href="#">Germany</a>
                            <a href="#">Bahrain</a>
                        </div>
                        </div>
                      <button type="button" class="btn patch-btn rounded-pill text-nowrap ms-3 mb-3" style="padding: 15px 18px;">
                        June 1 - June 30 <i class="bi bi-calendar-minus"></i>
                      </button>
                      </div>

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
                            >
                              Software vulnerabilities(11) <span class="text-primary ms-2">4 selected</span>
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#globalReportAccordion"
                          >
                            <div class="accordion-body">
                              Software vulnerabilities
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
                              Network vulnerabilities(6)
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#globalReportAccordion"
                          >
                            <div class="accordion-body">
                              Network vulnerabilities
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
                              Configuration vulnerabilities(11)
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#globalReportAccordion"
                          >
                            <div class="accordion-body">
                              Configuration vulnerabilities
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item">
                          <h2 class="accordion-header" id="headingFour">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              Human vulnerabilities(4)
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#globalReportAccordion"
                          >
                            <div class="accordion-body">
                              Human vulnerabilities
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
                   <NotificationPanel />
                </div>

                </div>
                </div>
                
            </div>

            <div class="row">
                <div class="col-10">
                <div class="d-flex justify-content-between tab-wrapper position-relative">
                    <p class="nav-item active" style="width: 25%;color: rgba(49, 33, 177, 1);"><i class="bi bi-shield-lock"></i> Patch management</p>
                    <p class="nav-item" style="width: 25%;"><i class="bi bi-wrench"></i> Configuration management</p>
                    <p class="nav-item" style="width: 25%;"><i class="bi bi-reception-4"></i> Network security</p>
                    <p class="nav-item" style="width: 25%;"><i class="bi bi-compass"></i> Architectural flaws</p>

                    <!-- Blue underline for active tab -->
                    <div class="tab-line" style="width: 25%; left: 0;"></div>
                </div>
                <div class="col-2">
                    <!-- blank -->
                </div>
                </div>
            </div>

            <div class="row my-4">
              <div>
                <span style="color: rgba(0, 0, 0, 0.87);">Assigned to Patch Management team </span> 
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
            </div>

            <section id="details">
            <div class="row">
                <div class="col-11">
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
                                  <router-link to="/missingsecurityupdates" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;text-decoration: none;">
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
            </section>

            <div class="row my-5">
                <div class="col-11">
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

            <div class="row my-5">
                <div class="col-11">
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
                <div class="col-11">
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
    </section>
  </main>
</template>

<script>
import DashboardMenu from "@/components/admin-component/DashboardMenu.vue";
import DashboardHeader from "@/components/admin-component/DashboardHeader.vue";
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";

export default {
  name: "MitigationStrategyView",
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel
  },
  data() {
    return {
      showPopup: false,
    };
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
  watch: {
    showPopup(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          const dropdown = this.$el.querySelector('.dropdown');
          const btn = dropdown.querySelector('.dropdown-btn');
          const options = dropdown.querySelectorAll('.dropdown-content a');

          // Toggle dropdown open/close
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
          });

          // Set selected option
          options.forEach(option => {
            option.addEventListener('click', (e) => {
              e.preventDefault();
              btn.textContent = option.textContent;
              dropdown.classList.remove('show');
            });
          });

          // Close dropdown when clicking outside
          document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
              dropdown.classList.remove('show');
            }
          }, { once: true });
        });
      }
    }
  }
};
</script>


<style scoped>
.download-report-btn {
    font-weight: 600;
    font-size: 15px;
    padding: 10px 15px;
    /* margin-right: 150px; */
    color: rgba(49, 33, 177, 1);
    background-color: white;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.12);
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

.tab-wrapper {
        position: relative;
        border-bottom: 1px solid #e0e0e0;
    }

    .tab-line {
        position: absolute;
        bottom: 0;
        height: 2px;
        background-color: rgba(49, 33, 177, 1); /* Active blue color */
        transition: all 0.3s ease;
    }

    .nav-item {
        text-align: center;
        cursor: pointer;
        padding: 8px 0;
        color: black;
        font-weight: 500;
        position: relative;
        z-index: 1;
    }

    .nav-item i {
        margin-right: 5px;
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
    padding: 4px 20px 4px 12px; /* extra right padding for the arrow */
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

.truncated-text {
    color: rgba(0, 0, 0, 0.87);
    white-space: nowrap;       /* Keep text in one line */
    overflow: hidden;          /* Hide overflowing text */
    text-overflow: ellipsis;   /* Show "..." */
    width: 200px;              /* Adjust width as needed */
    cursor: pointer;           /* Show pointer on hover */
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

  .rounded-pill:hover {
    background-color: transparent;
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
