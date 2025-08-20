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

          <div class="col-11 pt-2 pb-3 pe-5">
            <div class="row">
                <div class="col-4 p-3 border-end px-0">
                <h5 class="mb-0 fw-semibold" style="font-weight: 500;font-size: 32px;">Assets (210)</h5>
                <div class="d-flex justify-content-between align-items-center gap-2 mb-3 me-2">
                    <div class="d-flex gap-2 my-3">
                    <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-arrow-down-up me-1"></i>Sort by</button>
                    <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-funnel me-1"></i>Filter</button>
                    </div>
                  
                    <!-- <div class="d-flex">
                    <input class="form-control form-control-sm" style="padding-top: 7px;padding-bottom: 7px;" type="search" placeholder="Search" aria-label="Search">
                    </div> -->
                    <div class="position-relative">
  <input 
    class="form-control form-control-sm" 
    style="padding-top: 7px; padding-bottom: 7px; border-radius: 20px;" 
    type="search" 
    placeholder="Search vul. by name" 
    aria-label="Search"
  >
  <i class="bi bi-search position-absolute top-50 end-0 translate-middle-y me-2 text-secondary"></i>
</div>
                  
                </div>
                <!-- Asset List -->
                <div class="d-flex flex-column gap-3">
                    <!-- Active Asset Item -->
                    <div class="asset-item active border-bottom" style="background: linear-gradient(90deg, #FFFFFF 0%, #F2F2F2 100%);">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.42</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                        </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                    <!-- Other Items -->
                    <div class="asset-item border-bottom">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.43</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                    </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                    <div class="asset-item border-bottom">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.44</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                    </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                    <div class="asset-item border-bottom">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.45</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                    </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                    <div class="asset-item border-bottom">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.46</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                    </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                    <div class="asset-item border-bottom">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.47</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                    </div>
                    <div class="align-items-end gap-2">
                        <i class="bi bi-link-45deg me-1" style="color: rgba(0, 0, 0, 0.6);font-size: 20px;vertical-align:-2px"></i>
                        <span style="color: rgba(0, 0, 0, 0.87);font-size: 15px;font-weight: 500;">Internal</span>
                    </div>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2">
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
                    <!-- <a href="#" class="view-link d-block mt-4 text-decoration-none" style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 15px;">View details →</a> -->
                    </div>

                </div>
                <!-- Pagination -->
                <nav class="mt-4 position-relative custom-pagination-wrapper">
  <ul class="pagination pagination-sm mb-0 custom-pagination">
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">6</a></li>
  </ul>
                </nav>
                </div>

                <div class="col-8">
                    <div class="row py-4 px-3">
                        <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Vulnerability card</p>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex justify-content-start gap-3">
                        <div class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 22px;">192.168.1.42</div>
                        <span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>Critical</span>
                        </span>
                        <span class="d-flex align-items-center badge-open">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(49, 33, 177, 1)"></span>
                            <span>Open</span>
                        </span>
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
                    </div>

                    <div class="row px-3 pt-4">
                    <div class="d-flex justify-content-start gap-5">
                        <div class="d-flex flex-column">
                            <p class="mb-0" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Exposure</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">Internal</p>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="mb-0" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Hostname</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">mickeymouse</p>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="mb-0" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Owner</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">mickeymouse2</p>
                        </div>
                    </div>
                    </div>

                    <div class="row px-3 py-4">
                    <div class="d-flex justify-content-between tab-wrapper position-relative">
                    <p class="nav-item active" style="width: 25%;color: rgba(49, 33, 177, 1);"> Vulnerabilities</p>
                    
                    <p class="nav-item" style="width: 25%;"> Exception Requests</p>
                    <p class="nav-item" style="width: 25%;"> Related</p>

                    <!-- Blue underline for active tab -->
                    <div class="tab-line" style="width: 25%; left: 0;"></div>
                </div>
                    </div>

                    <div class="row">
                        <div class="d-flex gap-3">
                                <button class="btn btn-primary btn-pill active-tab fw-semibold">All</button>
                                <button class="btn btn-pill btn-outline-secondary" style="color: maroon;">Critical</button>
                                <button class="btn btn-outline-secondary btn-pill text-danger">High</button>
                                <button class="btn btn-outline-secondary btn-pill text-warning">Medium</button>
                                <button class="btn btn-outline-secondary btn-pill text-success">Low</button>
                                
                            </div>
                    </div>

                    <div class="row py-4">
                        <div class="accordion border-0" id="accordionExample">

                            <div class="accordion-item border-0 border-bottom">
                                <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                   <div class="d-flex justify-content-start align-items-center gap-3">
                                    <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">1</p>
                                    <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                    <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                        <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                        <span>High</span>
                                        
                                    </span>
                                    
                                   </div> 
                                </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show border-top-0" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body border-top-0">
                                    <div class="d-flex justify-content-start gap-3">
                                        
                                    </div>
                                    <div class="d-flex justify-content-start gap-5">
                                        <div class="d-flex flex-column" style="width: 400px;">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Findings</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a sandbox escape vulnerability.</p>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">CVSS Score</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">6.8</p>
                                        </div>
                                        
                                        <div>
                                          <router-link to="/vulnerabilitycard" class="btn border-0" style="color: rgba(49, 33, 177, 1);font-weight: 600">fix now <i class="bi bi-arrow-right"></i></router-link>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Description</p>
                                        <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a sandbox escape vulnerability.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                                <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                   <div class="d-flex justify-content-start align-items-center gap-4">
                                    <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">2</p>
                                    <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                    <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                        <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                        <span>High</span>
                                    </span>
                                   </div> 
                                </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse border-top-0" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body border-top-0">
                                    <div class="d-flex justify-content-start gap-3">
                                        <p style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 16px;">View fix(5 steps) <i class="bi bi-arrow-right"></i></p>
                                        <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 14px;">Estimated effort: 2 days 11 hours</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-5">
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Findings</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a<br> sandbox escape vulnerability.</p>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">CVSS Score</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">6.8</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Description</p>
                                        <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a sandbox escape vulnerability.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                                <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                   <div class="d-flex justify-content-start align-items-center gap-4">
                                    <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">3</p>
                                    <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                    <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                        <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                        <span>High</span>
                                    </span>
                                   </div> 
                                </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse border-top-0" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body border-top-0">
                                    <div class="d-flex justify-content-start gap-3">
                                        <p style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 16px;">View fix(5 steps) <i class="bi bi-arrow-right"></i></p>
                                        <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 14px;">Estimated effort: 2 days 11 hours</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-5">
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Findings</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a<br> sandbox escape vulnerability.</p>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">CVSS Score</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">6.8</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Description</p>
                                        <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a sandbox escape vulnerability.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                                <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                   <div class="d-flex justify-content-start align-items-center gap-4">
                                    <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">4</p>
                                    <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                    <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                        <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                        <span>High</span>
                                    </span>
                                   </div> 
                                </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse border-top-0" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                <div class="accordion-body border-top-0">
                                    <div class="d-flex justify-content-start gap-3">
                                        <p style="color: rgba(49, 33, 177, 1);font-weight: 600;font-size: 16px;">View fix(5 steps) <i class="bi bi-arrow-right"></i></p>
                                        <p style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 14px;">Estimated effort: 2 days 11 hours</p>
                                    </div>
                                    <div class="d-flex justify-content-start gap-5">
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Findings</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a<br> sandbox escape vulnerability.</p>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">CVSS Score</p>
                                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">6.8</p>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Description</p>
                                        <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">The remote VMware ESXi host is affected by a sandbox escape vulnerability.</p>
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
    </section>
  </main>
</template>

<script>
import DashboardMenu from "@/components/DashboardMenu.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";

export default {
  name: "AssetsView",
  components: {
    DashboardMenu,
    DashboardHeader,
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
  .asset-item {
    padding: 12px 16px;
    position: relative;
  }

  .asset-item.active::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0px;
    width: 3px;
    height: 100%;
    background-color: #3f37c9; 
  }

  .badge-critical {
    background-color: rgba(255, 225, 225, 1);
    color: rgba(173, 0, 0, 1);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 8px;
  }

  .badge-open {
    background-color: rgba(230, 227, 255, 1);
    color: rgba(49, 33, 177, 1);
    font-weight: 600;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 8px;
  }

  .view-link {
    font-size: 0.85rem;
    color: #3f37c9;
    font-weight: 500;
    text-decoration: none;
  }

  .view-link:hover {
    text-decoration: underline;
  }

  .custom-pagination .page-link {
  color: rgba(49, 33, 177, 1);
  background-color: transparent;
  border: none;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 50%;
  margin: 0 8px;
}

.custom-pagination .page-item.active .page-link {
  background-color: rgba(49, 33, 177, 1);
  color: white;
  height: 35px;
  width:35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.custom-pagination-wrapper {
  display: inline-block;
  position: relative;
  padding-right: 10px;
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
.accordion-button:not(.collapsed) {
    background-color: white;
}
.accordion-button:focus {
    box-shadow: none;
}
.accordion {
     --bs-accordion-border-color: none;
     --bs-accordion-body-padding-y: 0;
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

</style>