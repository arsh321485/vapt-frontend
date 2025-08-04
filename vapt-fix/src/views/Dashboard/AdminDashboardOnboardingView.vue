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

          <div class="col-11 pt-2 pb-3">
            <div class="d-flex flex-row align-items-center justify-content-between py-3">
              <h2 class="">Vulnerability Management Program</h2>
              <button type="button" class="btn pending-approval-btn rounded-pill">
                11 Compensatory controls pending approval
                <i class="bi bi-arrow-right ms-1 fs-5"></i>
              </button>
            </div>

            <div class="row">
              <div class="col-3">
                <div class="card pb-2 pt-3 px-3">
                  <div class="d-flex flex-row justify-content-start gap-2">
                    <div class="assets-icon text-center"><i class="bi bi-laptop"></i>
                    </div>
                    <p class="assets-para">Total assets</p>
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
                      <p class="assets-para">Vulnerabilities</p>
                    </div>
                    <div class="d-flex justify-content-center align-items-end mb-1">
                      <div class="text-center">
                        <div id="highAge" class="fs-5 fw-semibold">56</div>
                        <div class="bar red vul-bar mt-1"></div>
                        <small class="text-danger mt-1 d-block">● High</small>
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
                      <p class="assets-para">Vulnerability aging</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-end mb-1">
                      <div class="text-center">
                        <div id="highCount" class="fs-4 fw-semibold">2d 11hrs</div>
                        <div class="bar red w-100 mt-1"></div>
                        <small class="text-danger mt-1 d-block">● High</small>
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
                    <p class="assets-para">Patch compliance rate</p>
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
                    <p class="assets-para">Mean time to remediate</p>
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
                    <p class="assets-para">Exceptions approved</p>
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
                    <p class="assets-para">Remediation Throughput</p>
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
                      <div class="d-flex justify-content-between gap-5">
                        <div class="avatar-container">
                        <p style="color: rgba(0, 0, 0, 0.6); font-weight: 500; margin-top: 15px">
                          Assigned to :
                        </p>
                        <div class="avatar ava-green">AB</div>
                        <p style="margin-top: 18px;font-weight: 500;">Aditi Bose</p>
                        <div class="avatar ava-blue"><i class="bi bi-plus-lg"></i></div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <p style="color: rgba(0, 0, 0, 0.6); font-weight: 500; margin-top: 15px">
                          Deadline: <span style="color: rgba(0, 0, 0, 1);">24th July, 2025</span>
                        </p>
                        <p style="color: rgba(49, 33, 177, 1);margin-top: 13px;">Edit</p>
                      </div>
                      </div>
                      <div class="mt-3">
                        <p style="color: rgba(49, 33, 177, 1); font-weight: 600;">
                          More details <i class="bi bi-arrow-right"></i>
                        </p>
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
                            <div class="d-flex align-items-center gap-3">
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
                        <div class="col-3">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">OS vulns. by version</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <div class="d-flex align-items-center gap-3">
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
                        <div class="col-3">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">App vulns. by software packages</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <div class="d-flex align-items-center gap-3">
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
                        <div class="col-3 me-auto">
                          <div class="card p-4 h-100" style="border-radius: 12px">
                            <p class="estimated-text">End of life systems</p>
                            <h1 class="text-212 mt-auto">212</h1>
                            <div class="d-flex align-items-center gap-3">
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

<script lang="ts">
import DashboardMenu from '@/components/DashboardMenu.vue';
import DashboardHeader from '@/components/DashboardHeader.vue';

export default {
  name: 'AdminDashboardOnboardingView',
  components: {
    DashboardMenu,
    DashboardHeader
  }
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
</style>