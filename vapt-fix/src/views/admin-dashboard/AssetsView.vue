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
            <div class="row">
                <div class="col-4 p-3 border-end px-0">
                <div class="d-flex justify-content-between">
                  <h5 class="mb-0 fw-semibold ms-3" style="font-weight: 500;font-size: 32px;">Assets (210)</h5>
                  <div class="d-flex flex-row gap-3 me-3 mt-2">
                    <i class="bi bi-trash fs-5" style="cursor: pointer;" data-bs-toggle="tooltip"  :class="{ 'text-muted': activeAction !== '' && activeAction !== 'delete' }" @click="handleDeleteClick" title="Remove an asset"></i>
                    <i class="bi bi-eye-slash fs-5" style="cursor: pointer;" data-bs-toggle="tooltip" :class="{ 'text-muted': activeAction !== '' && activeAction !== 'hold' }"  @click="toggleHoldMode" title="Hold mitigation"></i>
                  </div>

                </div>
                <div class="d-flex justify-content-between align-items-center ms-3">
                    <div class="d-flex gap-2 my-3">
                    <form>
                      <select class="form-select" style="width: auto; border-radius: 20px; display: inline-block;">
                        <option value="" selected disabled>Sort by</option>
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                      </select>
                    </form>
                    <div class="filter-dropdown d-inline">
                    <!-- Filter Button -->
                    <button
                      class="btn btn-sm py-2 px-3 filter-btn dropdown-toggle"
                      style="border-radius: 20px; border-color: rgba(0, 0, 0, 0.12);"
                      data-bs-toggle="dropdown"
                    >
                      <i class="bi bi-funnel me-1"></i>
                      {{ filterLabel }}
                    </button>

                    <!-- Filter Options -->
                    <div class="dropdown-menu p-3 filter-content" style="min-width: 250px;">
                      <!-- Severity -->
                      <div class="mb-3">
                        <label class="form-label fw-bold">Severity</label>
                        <select class="form-select" v-model="selectedSeverity">
                          <option value="all">All</option>
                          <option value="critical">Critical</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <!-- IP Address -->
                      <div class="mb-3">
                        <label class="form-label fw-bold">IP Address</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter IP address"
                          v-model="ipAddress"
                          @input="formatIP"
                          @keypress="validateIPInput"
                        />
                      </div>
                      <!-- Apply Button -->
                      <button class="btn btn-primary w-100 btn-sm" @click="applyFilters">
                        Apply Filters
                      </button>
                    </div>
                    </div> 

                    </div>
                </div>

                <div class="mb-4 pe-3 ms-3">
                  <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style="padding-top: 6px;padding-bottom: 6px;">
                    <button class="btn btn-sm btn-secondary" type="submit">Search</button>
                  </form>
                </div>

                <!-- Asset List -->
                <div class="d-flex flex-column gap-3 mt-3">
                  <div
                    v-for="(asset, index) in assets"
                    :key="index"
                    class="asset-item border-bottom"
                    :class="{ active: activeIndex === index }"
              :style="activeIndex === index ? 'background: linear-gradient(90deg, #FFFFFF 0%, #F2F2F2 100%);' : ''"
              @click="setActive(index)"
                  >
                    <div class="d-flex justify-content-between">
                      <div class="d-flex justify-content-start gap-3">
                        <!-- Checkbox (only when showCheckboxes = true) -->
                        <input
                          v-if="showCheckboxes"
                          type="checkbox"
                          v-model="asset.selected"
                          class="form-check-input me-2"
                        />

                        <!-- Checkbox only when holdMode is true -->
      <input
        v-if="showHoldCheckboxes"
        type="checkbox"
        v-model="asset.selected"
        class="form-check-input me-2"
      />
      <span :class="{ 'text-muted': asset.held }">{{ asset.name }}</span>

                        <!-- Asset Title -->
                        <div
                          class="fw-semibold"
                          style="color: rgba(0, 0, 0, 0.87); font-size: 22px;"
                        >
                          {{ asset.ip }}
                        </div>
                        <div>
                          <span class="d-flex align-items-center badge-critical">
                          <span
                            class="rounded-circle me-1"
                            style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"
                          ></span>
                          <span>Critical</span>
                        </span>
                        </div>
                      </div>

                      <div class="align-items-end gap-2">
                        <div class="d-flex flex-row">
                          <div>
                          <i
                          class="bi bi-link-45deg me-1"
                          style="color: rgba(0, 0, 0, 0.6); font-size: 20px; vertical-align: -2px"
                        ></i>
                          </div>
                          <div>
                             <p @click="asset.isInternal = !asset.isInternal" style="cursor: pointer;">
  {{ asset.isInternal ? 'Internal' : 'External' }}
</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Status Row (unchanged design) -->
                    <div class="d-flex align-items-center gap-3 mt-3 mb-2 ms-3">
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
                    </div>
                  </div>
                </div>

                <!-- delete Modal -->
                <div
                  class="modal fade"
                  id="deleteModal"
                  tabindex="-1"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Confirm Delete</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        Are you sure you want to delete the selected assets?  
                        
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal" @click="cancelDelete"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          @click="confirmDelete"
                          data-bs-dismiss="modal"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- hold mitigation -->
    <div
      class="modal fade"
      id="holdConfirmModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <p>Do you want to hold to mitigation?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelHold">
              No
            </button>
            <button class="btn btn-primary" data-bs-dismiss="modal" @click="confirmHold">
              Yes
            </button>
          </div>
        </div>
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

                <!-- Held Vulnerabilities List -->
<div v-if="showHeld && heldAssets.length" class=" py-1 px-2 mt-5">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h4 class="mb-0">Mitigation on hold</h4>
    <i
      class="bi bi-eye fs-5"
      @click="toggleUnholdMode"
      title="Unhold"
      style="cursor: pointer;"
    ></i>
  </div>

  <div class="d-flex flex-column">
    <div
      v-for="(held, i) in heldAssets"
      :key="i"
      class="hold-asset border-bottom">
      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-start gap-1">
          <!-- Checkbox only in unhold mode -->
          <input
            v-if="showUnholdCheckboxes"
            type="checkbox"
            v-model="held.selected"
            class="form-check-input me-2"
          />

          <!-- Asset Name (grayed if held) -->
          <span :class="{ 'text-muted': held.held }">{{ held.name }}</span>

          <!-- Asset IP -->
          <div
            class="fw-semibold text-muted"
            style="color: rgba(0, 0, 0, 0.87); font-size: 18px;"
          >
            {{ held.ip }}
          </div>

          <!-- Badge -->
          <div>
            <span class="d-flex align-items-center badge-critical ms-2">
              <span
                class="rounded-circle me-1"
                style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"
              ></span>
              <span>Critical</span>
            </span>
          </div>
        </div>

        <div class="align-items-end gap-2">
          <div class="d-flex flex-row">
            <div>
              <i
                class="bi bi-link-45deg me-1"
                style="color: rgba(0, 0, 0, 0.6); font-size: 20px; vertical-align: -2px"
              ></i>
            </div>
            <div>
              <p class="mb-0">
  {{ held.isInternal ? 'Internal' : 'External' }}
</p>

            </div>
          </div>
        </div>
      </div>

      <!-- Status Row (same as assets) -->
      <div class="d-flex align-items-center gap-3 mt-3 mb-2 ms-3">
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
      </div>
    </div>
  </div>
</div>

                  
                </div>

                <div class="col-8">
                    <div class="row py-3 px-3">
                        <div class="d-flex justify-content-between">
                          <p class="mt-3" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Vulnerability card</p>
                          <NotificationPanel />
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex justify-content-start gap-3">
                            <p class="fw-semibold" style="color: rgba(0, 0, 0, 0.87);font-size: 18px;">fra-sto-shr-uat-lda-evt-mgr-dbmigration</p>
                        <div class="d-flex flex-row my-2 gap-2"><span class="d-flex align-items-center badge-critical">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>High</span>
                        </span>
                        <span class="d-flex align-items-center badge-open">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                            <span>Open</span>
                        </span></div>
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
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">fra-sto-shr-uat-lda-evt-mgr-dbmigration</p>
                        </div>
                        <div class="d-flex flex-column">
                            <p class="mb-0" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 13px;">Owner</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">fra-sto-shr-uat-evt-mgr-dbmigration<br>(Greece)</p>
                        </div>
                    </div>
                    </div>

                    <div class="row ps-3">
                      <ul class="nav nav-tabs custom-tabs">
                        <li class="nav-item">
                          <button 
                            class="nav-link" 
                            :class="{ active: activeTab === 'vulnerabilities' }" 
                            @click="activeTab = 'vulnerabilities'">
                            Vulnerabilities
                          </button>
                        </li>
                        <li class="nav-item">
                          <button 
                            class="nav-link" 
                            :class="{ active: activeTab === 'exceptions' }" 
                            @click="activeTab = 'exceptions'">
                            Support Requests <span class="badge rounded-circle bg-danger ms-1" style="font-size: 12px; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center;">
                      2
                    </span>
                          </button>
                        </li>
                        <li class="nav-item">
                          <button 
                            class="nav-link" 
                            :class="{ active: activeTab === 'related' }" 
                            @click="activeTab = 'related'">
                            Related
                          </button>
                        </li>
                      </ul>

                      <!-- Tab Content -->
                      <div class="tab-content mt-3">
                        <!-- Vulnerabilities -->
                        <div v-if="activeTab === 'vulnerabilities'">
                          <div class="d-flex gap-3">
                            <button class="btn btn-primary btn-pill active-tab fw-semibold">All</button>
                            <button class="btn btn-pill btn-outline-secondary" style="color: maroon;">Critical</button>
                            <button class="btn btn-outline-secondary btn-pill text-danger">High</button>
                            <button class="btn btn-outline-secondary btn-pill text-warning">Medium</button>
                            <button class="btn btn-outline-secondary btn-pill text-success">Low</button>                       
                          </div>
                          <div class="accordion border-0" id="accordionExample">
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              <div class="d-flex justify-content-start align-items-center gap-3">
                              <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">1</p>
                              <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">CVE-2024-22259 - org.springframework:spring-web</p>
                              <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                              <span>High</span>                           
                              </span>
                              <span class="d-flex align-items-center badge-open" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                              <span>Open</span>
                              </span>                      
                              </div> 
                             </button>
                              </h2>
                             <div id="collapseOne" class="accordion-collapse collapse show border-top-0" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div class="accordion-body border-top-0">
                              <div class="d-flex justify-content-between gap-3">
                              <div class="d-flex justify-content-start gap-2">
                              <div class="d-flex flex-column" style="width: 400px;">
                              <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Vendor fix available</p>
                              <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">Yes</p>
                              </div>
                              <div class="d-flex flex-column">
                                <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">CVSS Score</p>
                                <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">8.1</p>
                                </div>
                                                          </div>
                                  <div class="d-flex flex-column">
                                  <button class="btn rounded-pill px-3" style="background-color: rgba(49, 33, 177, 1);color: white;"><i class="bi bi-magic"></i> Fix Now</button> 
                                  </div>
                                                          
                                 </div>
                              <div class="d-flex flex-column">
                              <p class="mb-1" style="color: rgba(0, 0, 0, 0.6);font-weight: 500;font-size: 12px;">Description</p>
                              <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">Applications that use UriComponentsBuilder in Spring FrameworkÂ to parse an externally provided URL (e.g. through a query parameter) ANDÂ perform validation checks on the host of the parsed URL may be vulnerable to a open redirect https://cwe.mitre.org/data/definitions/601.html Â attack or to a SSRF attack if the URL is used after passing validation checks.This is the same as CVE-2024-22243 https://spring.io/security/cve-2024-22243 , but with different input.</p>
                              </div>
                            </div>
                            </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header" id="headingTwo">
                              <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                              <div class="d-flex justify-content-start align-items-center gap-3">
                               <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">2</p>
                                <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                <span>High</span>
                                </span>
                                <span class="d-flex align-items-center badge-open" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                              <span>Open</span>
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
                                                    <div class="d-flex justify-content-start align-items-center gap-3">
                                                      <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">3</p>
                                                      <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                                      <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                                          <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                                          <span>High</span>
                                                      </span>
                                                      <span class="d-flex align-items-center badge-open" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                              <span>Open</span>
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
                                                    <div class="d-flex justify-content-start align-items-center gap-3">
                                                      <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">4</p>
                                                      <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                                      <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                                          <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                                          <span>High</span>
                                                      </span>
                                                      <span class="d-flex align-items-center badge-open" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                              <span>Open</span>
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
                          <div class="row mt-3 pt-3 px-3">
                            <div class="card p-2 my-3">
                              <h4>Fixed</h4>
                              <div class="d-flex justify-content-start align-items-center gap-2 mt-2">
                                  <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">1</p>
                                  <p class="text-muted" style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                  <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                  <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                  <span>High</span>
                                  </span>
                                  <span class="d-flex align-items-center badge-close" style="margin-top: -17px;">
                                  <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                                  <span>Close</span>
                                  </span>
                                  <router-link to="/vulnerabilitycard" class="btn btn-sm text-decoration-none rounded-pill text-light px-3 mb-3" style="background-color:rgba(49, 33, 177, 1) ;">View detail</router-link>
                                </div> 
                                
                                <div class="d-flex justify-content-start align-items-center gap-2">
                                  <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">5</p>
                                  <p class="text-muted" style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                                  <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                                  <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                  <span>High</span>
                                  </span>
                                  <span class="d-flex align-items-center badge-close" style="margin-top: -17px;">
                                  <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: white;"></span>
                                  <span>Close</span>
                                  </span>
                                  <router-link to="/vulnerabilitycard" class="btn btn-sm text-decoration-none rounded-pill text-light px-3 mb-3" style="background-color:rgba(49, 33, 177, 1) ;">View detail</router-link>
                                </div>
                            </div>
                          </div>
                        </div>

                        <!-- Exception Requests -->
                        <div v-if="activeTab === 'exceptions'">
                          <div class="d-flex justify-content-start align-items-center gap-3">
                            <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">1</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                            <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>High</span>
                            </span>
                            <button class="btn btn-sm fixes-btn" data-bs-toggle="modal" data-bs-target="#viewRequestsModal">
                              View raised requests
                            </button>
                          </div> 
                          
                          <!-- view Requests Modal -->
                      <div class="modal fade" id="viewRequestsModal" tabindex="-1" aria-labelledby="viewRequestsModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            
                            <!-- Modal Header -->
                            <div class="modal-header">
                              <h5 class="modal-title" id="viewRequestsModalLabel">Issues Raised for Support</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <!-- Modal Body -->
                            <div class="modal-body">
                              <div class="row g-2">
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 2: Code review</span>
                                </div>
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 4: Code review</span>    
                                </div>
                              </div>

                              <h6 class="mt-3 fw-semibold">Description</h6>
                              <textarea class="form-control rounded-0" rows="4" readonly>The issue has been reviewed, but the current explanation is not sufficient. Please provide additional justification to proceed further.
                              </textarea>
                            </div>
                            
                            <!-- Modal Footer -->
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                          </div>
                        </div>
                      </div>

                          <div class="d-flex justify-content-start align-items-center gap-3">
                            <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">5</p>
                            <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</p>
                            <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                            <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                            <span>High</span>
                            </span>
                            <button class="btn btn-sm fixes-btn" data-bs-toggle="modal" data-bs-target="#viewRequestsModal">
                              View raised requests
                            </button>
                          </div>
                        </div>

                        <!-- Related -->
                        <div v-if="activeTab === 'related'">
                          <div class="accordion border-0" id="accordionExample">
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header" id="headingOne">
                              <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              <div class="d-flex justify-content-start align-items-center gap-3">
                              <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">1</p>
                              <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">CVE-2024-22259 - org.springframework:spring-web</p>
                              <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                <span>High</span>
                              </span>
                            </div> 
                              </button>
                              </h2>
                              <div id="collapseOne" class="accordion-collapse collapse show border-top-0" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              <div class="accordion-body border-top-0">
                                  <table class="table table-bordered table-striped">
                                                        <tbody>
                                                          <tr>
                                                            <th scope="row">Resource ID</th>
                                                            <td>arn:aws:lambda:eu-central-1:211125372003:function:fra-sto-shr-uat-lda-evt-mgr-dbmigration:$LATEST</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Region</th>
                                                            <td>eu-central-1</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Affected Packages</th>
                                                            <td>org.springframework:spring-web</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Vendor Advisory</th>
                                                            <td><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Reference Url</th>
                                                            <td>
                                                              <ul class="list-unstyled lh-base">
                                                                <li><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></li>
                                                                <li><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></li>
                                                              </ul>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header" id="headingTwo">
                              <button class="accordion-button border-bottom-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                              <div class="d-flex justify-content-start align-items-center gap-3">
                              <p style="background-color: black;height: 30px;width: 30px;color: white;border-radius: 50%;display: grid;place-items: center;">2</p>
                              <p style="color: rgba(0, 0, 0, 0.87);font-weight: 500;font-size: 16px;">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22226)</p>
                              <span class="d-flex align-items-center badge-critical" style="margin-top: -17px;">
                              <span class="rounded-circle me-1" style="width: 6px; height: 6px; background-color: rgba(173, 0, 0, 1)"></span>
                                <span>High</span>
                              </span>
                            </div> 
                              </button>
                              </h2>
                              <div id="collapseTwo" class="accordion-collapse collapse show border-top-0" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                              <div class="accordion-body border-top-0">
                                <table class="table table-bordered table-striped">
                                                        <tbody>
                                                          <tr>
                                                            <th scope="row">Resource ID</th>
                                                            <td>arn:aws:lambda:eu-central-1:211125372003:function:fra-sto-shr-uat-lda-evt-mgr-dbmigration:$LATEST</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Region</th>
                                                            <td>eu-central-1</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Affected Packages</th>
                                                            <td>org.springframework:spring-web</td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Vendor Advisory</th>
                                                            <td><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></td>
                                                          </tr>
                                                          <tr>
                                                            <th scope="row">Reference Url</th>
                                                            <td>
                                                              <ul class="list-unstyled lh-base">
                                                                <li><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></li>
                                                                <li><a href="https://nvd.nist.gov/vuln/detail/CVE-2024-22259" target="_blank">https://nvd.nist.gov/vuln/detail/CVE-2024-22259</a></li>
                                                              </ul>
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
  name: "AssetsView",
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel
  },
   data() {
    return {
      selectedSeverity: "",
      ipAddress: "",
      activeTab: "vulnerabilities",
      showCheckboxes: false,
      //  assets: [
      //   { ip: "192.168.1.42" },
      //   { ip: "192.168.1.43" },
      //   { ip: "192.168.1.44" },
      //   { ip: "192.168.1.45" },
      //   { ip: "192.168.1.46" },
      //   { ip: "192.168.1.47" },
      // ],
      activeIndex: 0,
       assets: [
        { ip: "192.168.1.42",isInternal: true, selected: false, held: false },
        { ip: "192.168.1.43",isInternal: false, selected: false, held: false },
        { ip: "192.168.1.44",isInternal: false, selected: false, held: false },
        { ip: "192.168.1.45",isInternal: true, selected: false, held: false },
        { ip: "192.168.1.46",isInternal: false, selected: false, held: false },
        { ip: "192.168.1.47",isInternal: true, selected: false, held: false },
      ],
      
      heldAssets: [],
      showHoldCheckboxes: false,
      activeAction: "",
      showHeld: true, 
      isInternal: true, 
      showUnholdCheckboxes: false,
      activeIndex: null
    };
  },
  computed: {
    filterLabel() {
      if (this.selectedSeverity && this.ipAddress) {
        return `Filter: ${this.selectedSeverity}, ${this.ipAddress}`;
      } else if (this.selectedSeverity) {
        return `Filter: ${this.selectedSeverity}`;
      } else if (this.ipAddress) {
        return `Filter: ${this.ipAddress}`;
      }
      return "Filter";
    },
  },
  methods: {
    applyFilters() {
      console.log("Filters applied:", {
        severity: this.selectedSeverity,
        ip: this.ipAddress,
      });
    },
     validateIPInput(event) {
    const char = String.fromCharCode(event.which);
    // Allow only digits and dots
    if (!/[0-9.]/.test(char)) {
      event.preventDefault();
      alert("Only numbers and dots are allowed!");
    }
  },
  formatIP() {
    // Remove all non-digit characters first
    let digits = this.ipAddress.replace(/\D/g, "");

    // Insert a dot after every group of up to 3 digits
    let formatted = digits.match(/.{1,3}/g)?.join(".") || "";

    // Limit to 4 groups (IPv4 style)
    let parts = formatted.split(".").slice(0, 4);

    this.ipAddress = parts.join(".");
  },
   handleDeleteClick() {
    // ❌ Prevent if hold is already active
    if (this.activeAction === "hold") {
      return;
    }

    // Mark delete as active
    this.activeAction = "delete";

    if (!this.showCheckboxes) {
      this.showCheckboxes = true;
    } else {
      const selectedAssets = this.assets.filter((a) => a.selected);
      if (selectedAssets.length > 0) {
        // Show delete confirmation modal
        const modal = new bootstrap.Modal(
          document.getElementById("deleteModal")
        );
        modal.show();
      } else {
        this.showCheckboxes = false;
        this.activeAction = ""; // reset if cancelled
      }
    }
  },
    confirmDelete() {
      this.assets.forEach((a) => (a.selected = false));
      this.showCheckboxes = false;
      // console.log("Deleting selected assets...");
      this.resetActions(); 
    },
    cancelDelete() {
    this.assets.forEach((a) => (a.selected = false));
    this.showCheckboxes = false;
    this.resetActions();
  },
  setActive(index) {
      this.activeIndex = index;
  },
  toggleHoldMode() {
  // ❌ Prevent if delete is already active
  if (this.activeAction === "delete") {
    return;
  }

  // Mark hold as active
  this.activeAction = "hold";

  if (this.showHoldCheckboxes) {
    const selectedAssets = this.assets.filter(a => a.selected);

    if (selectedAssets.length > 0) {
      // ✅ Show confirmation only if something is selected
      let modal = new bootstrap.Modal(
        document.getElementById("holdConfirmModal")
      );
      modal.show();
    } else {
      // ❌ No selection → just reset
      this.resetActions();
    }
  } else {
    // First click → show checkboxes
    this.showHoldCheckboxes = true;
  }
  },
  toggleUnholdMode() {
  if (this.activeAction === "hold" || this.activeAction === "delete") return;

  this.activeAction = "unhold";

  if (!this.showUnholdCheckboxes) {
    // First click → show checkboxes
    this.showUnholdCheckboxes = true;
    return;
  }

  // Second click → perform unhold
  const selected = this.heldAssets.filter(a => a.selected);

  if (selected.length > 0) {
    // ✅ Remove selected assets from held list
    this.heldAssets = this.heldAssets.filter(a => !a.selected);
  }

  // Reset after action
  this.resetActions();
},
  resetActions() {
  this.showCheckboxes = false;
  this.showHoldCheckboxes = false;
  this.activeAction = "";
  this.assets.forEach(a => (a.selected = false));
  this.heldAssets.forEach(a => (a.selected = false));
  },
    cancelHold() {
      // Hide checkboxes without moving anything
      this.showHoldCheckboxes = false;
      this.assets.forEach(a => (a.selected = false));
      this.resetActions();
    },
    confirmHold() {
  let selected = this.assets.filter(a => a.selected);
  selected.forEach(a => {
    a.held = true;
    this.heldAssets.push({ ...a }); // copies isInternal too ✅
  });

  this.assets = this.assets.map(a => ({ ...a, selected: false }));
  this.showHoldCheckboxes = false;
  this.resetActions();
},
    toggleText() {
      this.isInternal = !this.isInternal;
    },
  },
   mounted() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

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
        btn.textContent = option.textContent; 
        dropdown.classList.remove('show');
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

  .hold-asset {
    padding: 7px 10px;
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
    background-color: rgb(194, 60, 60);
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 8px;
  }

  .badge-close {
    background-color:green;
    color: white;
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

.custom-tabs {
  display: flex;
  justify-content: space-around; /* equal spacing */
  border-bottom: 1px solid #dee2e6; /* grey line */
}

.custom-tabs .nav-item {
  flex: 1; /* each tab takes equal width */
  text-align: center; /* center text */
}

.custom-tabs .nav-link {
  color: black;
  font-weight: 500;
  background: transparent !important;
  margin-bottom: -10px;
}

.custom-tabs .nav-link.active {
  color: rgba(49, 33, 177, 1);
  border: none;
  border-bottom: 2px solid rgba(49, 33, 177, 1); 
}
.fixes-btn {
    background-color:rgba(49, 33, 177, 1);
    border-radius: 15px;
    color: white;
}
.fixes-red-btn {
    background-color:rgba(170, 0, 0, 1);
    border-radius: 15px;
    color: white;
}

</style>