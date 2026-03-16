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

          <div class="col-11 pt-0 pb-5">
            <!-- Top Hero Banner -->
            <div ref="heroBannerRef" class="hero-banner px-5 py-3 mb-0">
              <!-- Decorative circles -->
              <div class="hero-deco-circle hero-deco-1"></div>
              <div class="hero-deco-circle hero-deco-2"></div>
              <div class="d-flex justify-content-between align-items-center" style="position:relative; z-index:1;">
                <div>
                  <div class="d-flex align-items-center gap-2 mb-1">
                    <!-- <div class="hero-shield-icon">
                      <i class="bi bi-shield-shaded" style="color:#a5b4fc; font-size:14px;"></i>
                    </div>
                    <span class="hero-tag">VAPTFIX</span>
                    <span style="color:rgba(255,255,255,0.4); font-size:12px;">›</span>
                    <span style="color:rgba(255,255,255,0.5); font-size:12px; font-weight:500;">Scoping Form</span> -->
                  </div>
                  <h4 class="mb-1 fw-bold" style="color:#fff; font-size:17px; letter-spacing:-0.3px; white-space:nowrap;">
                    Security Engagement Blueprint
                    <span style="color:#a5b4fc;">& Authorization Charter</span>
                  </h4>
                  <!-- Subtitle + Stats inline -->
                  <div class="d-flex align-items-center gap-4 mt-1">
                    <p class="mb-0" style="color:rgba(255,255,255,0.5); font-size:11px; line-height:1.5;">
                      Map your attack surface, define the rules of battle, and authorize your security team to strike
                    </p>
                    <div class="hero-stat-divider" style="height:28px;"></div>
                    <div class="d-flex align-items-center gap-3">
                      <div class="hero-stat">
                        <span class="hero-stat-val">5</span>
                        <span class="hero-stat-label">Sections</span>
                      </div>
                      <div class="hero-stat-divider" style="height:20px;"></div>
                      <div class="hero-stat">
                        <span class="hero-stat-val">4</span>
                        <span class="hero-stat-label">Completed</span>
                      </div>
                      <div class="hero-stat-divider" style="height:20px;"></div>
                      <div class="hero-stat">
                        <span class="hero-stat-val" style="color:#34d399;">73%</span>
                        <span class="hero-stat-label">Progress</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <div class="text-center">
                    <div class="completion-ring">
                      <svg width="72" height="72" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="6"/>
                        <circle cx="36" cy="36" r="30" fill="none" stroke="#34d399" stroke-width="6"
                          stroke-dasharray="188" stroke-dashoffset="50" stroke-linecap="round"
                          transform="rotate(-90 36 36)" style="filter:drop-shadow(0 0 6px rgba(52,211,153,0.6));"/>
                      </svg>
                      <span class="ring-label">73%</span>
                    </div>
                    <p class="mb-0 mt-1" style="color:rgba(255,255,255,0.4); font-size:10px; letter-spacing:0.05em;">COMPLETE</p>
                  </div>
                  <div class="d-flex flex-column gap-2">
                    <button class="btn btn-sm hero-btn-outline">
                      <i class="bi bi-file-earmark-pdf me-1"></i> Export PDF
                    </button>
                    <button class="btn btn-sm hero-btn-solid">
                      <i class="bi bi-send-check me-1"></i> Submit Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Placeholder to prevent content jump when banner becomes fixed -->
            <div :style="{ height: bannerHeight + 'px' }"></div>

            <!-- Body: Sidebar + Content -->
            <div class="d-flex" style="min-height:80vh;">
              <!-- Left Sidebar TOC -->
              <div class="sidebar-toc pt-4 px-3 mt-5">
                <p class="toc-heading">SECTIONS</p>
                <div v-for="(sec, i) in sections" :key="i"
                  class="toc-item"
                  :class="{ 'active': activeSection === i }"
                  @click="activeSection = i">
                  <div class="toc-dot" :class="{ 'done': sec.done, 'active': activeSection === i }">
                    <i v-if="sec.done" class="bi bi-check2" style="font-size:9px; color:#fff;"></i>
                    <span v-else style="font-size:10px; font-weight:600;">{{ i + 1 }}</span>
                  </div>
                  <div>
                    <p class="mb-0 toc-label">{{ sec.label }}</p>
                    <p class="mb-0 toc-sub">{{ sec.sub }}</p>
                  </div>
                </div>

                <div class="mt-4 p-3 rounded" style="background:#f0fdf4; border:1px solid #bbf7d0;">
                  <p class="mb-1 fw-semibold" style="font-size:11px; color:#16a34a;">Form Progress</p>
                  <div class="progress mb-1" style="height:5px; border-radius:10px; background:#d1fae5;">
                    <div class="progress-bar" style="width:73%; background:#22c55e; border-radius:10px;"></div>
                  </div>
                  <p class="mb-0" style="font-size:10px; color:rgba(0,0,0,0.4);">4 of 5 sections done</p>
                </div>
              </div>

              <!-- Main Content Area -->
              <div class="flex-fill px-4 pt-4">

                <!-- ── SECTION 0: Project Details ── -->
                <div v-show="activeSection === 0">
                  <div class="section-title-row mb-4 mt-5">
                    <div class="num-badge" style="background:#0f172a;">1</div>
                    <div>
                      <h6 class="mb-0 fw-bold" style="font-size:16px;">Project Details</h6>
                      <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.4);">Engagement overview and client information</p>
                    </div>
                  </div>

                  <!-- Two-column info cards -->
                  <div class="row g-3 mb-3">
                    <div class="col-md-6">
                      <div class="info-card p-3">
                        <p class="info-card-label">Project Name</p>
                        <input type="text" class="flat-input" placeholder="e.g. Q1 2025 External VAPT" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-card p-3">
                        <p class="info-card-label">Reference / Engagement ID</p>
                        <input type="text" class="flat-input" placeholder="e.g. ENG-2025-042" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="info-card p-3">
                        <p class="info-card-label">Client / Organization</p>
                        <input type="text" class="flat-input" placeholder="Organization full name" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="info-card p-3">
                        <p class="info-card-label">Industry</p>
                        <select class="flat-input">
                          <option value="" disabled selected>Select</option>
                          <option>Banking & Finance</option>
                          <option>Healthcare</option>
                          <option>E-Commerce</option>
                          <option>Government</option>
                          <option>Telecom</option>
                          <option>Manufacturing</option>
                          <option>Education</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="info-card p-3">
                        <p class="info-card-label">Country</p>
                        <input type="text" class="flat-input" placeholder="e.g. India" />
                      </div>
                    </div>
                  </div>

                  <!-- Timeline strip -->
                  <div class="timeline-strip p-4 mb-3">
                    <p class="mb-3 fw-semibold" style="font-size:13px; color:#0f172a;">Engagement Timeline</p>
                    <div class="row g-3">
                      <div class="col-md-3">
                        <label class="flat-label">Kick-off Date</label>
                        <input type="date" class="flat-input" />
                      </div>
                      <div class="col-md-3">
                        <label class="flat-label">Testing Start</label>
                        <input type="date" class="flat-input" />
                      </div>
                      <div class="col-md-3">
                        <label class="flat-label">Testing End</label>
                        <input type="date" class="flat-input" />
                      </div>
                      <div class="col-md-3">
                        <label class="flat-label">Report Delivery</label>
                        <input type="date" class="flat-input" />
                      </div>
                    </div>
                  </div>

                  <!-- Contacts -->
                  <div class="row g-3">
                    <div class="col-12">
                      <p class="mb-2 fw-semibold" style="font-size:13px; color:#0f172a;">Key Contacts</p>
                    </div>
                    <div v-for="contact in contactTypes" :key="contact.role" class="col-md-4">
                      <div class="contact-card p-3">
                        <div class="d-flex align-items-center gap-2 mb-2">
                          <div class="contact-avatar" :style="{ background: contact.bg }">
                            <i :class="contact.icon" :style="{ color: contact.color }"></i>
                          </div>
                          <span class="fw-semibold" style="font-size:12px;">{{ contact.role }}</span>
                        </div>
                        <input type="text" class="flat-input mb-2" placeholder="Full name" />
                        <input type="email" class="flat-input mb-2" placeholder="Email address" />
                        <input type="tel" class="flat-input" placeholder="Phone number" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ── SECTION 1: Methodology ── -->
                <div v-show="activeSection === 1">
                  <div class="section-title-row mb-4 mt-5">
                    <div class="num-badge" style="background:#4f46e5;">2</div>
                    <div>
                      <h6 class="mb-0 fw-bold" style="font-size:16px;">Testing Methodology</h6>
                      <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.4);">Define the approach and type of assessment</p>
                    </div>
                  </div>

                  <!-- Knowledge Level Visual Cards -->
                  <p class="flat-label mb-2">Tester Knowledge Level</p>
                  <div class="row g-3 mb-4">
                    <div v-for="kl in knowledgeLevels" :key="kl.value" class="col-md-4">
                      <div class="knowledge-card"
                        :class="{ 'selected': selectedKnowledge === kl.value }"
                        @click="selectedKnowledge = kl.value"
                        :style="selectedKnowledge === kl.value ? `border-color:${kl.color}; background:${kl.bg}` : ''">
                        <div class="kb-icon mb-2" :style="{ background: kl.iconBg }">
                          <i :class="kl.icon" :style="{ color: kl.color, fontSize: '18px' }"></i>
                        </div>
                        <p class="mb-1 fw-bold" style="font-size:14px;">{{ kl.label }}</p>
                        <p class="mb-2" style="font-size:11px; color:rgba(0,0,0,0.5); line-height:1.5;">{{ kl.desc }}</p>
                        <div class="kb-tag" :style="{ background: kl.tagBg, color: kl.color }">{{ kl.tag }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Category Grid -->
                  <div class="field-section-card mb-4">
                    <div class="field-section-header">
                      <i class="bi bi-grid-3x3-gap-fill me-2" style="color:#4f46e5;"></i>
                      <span>Assessment Categories</span>
                      <span class="ms-2" style="font-weight:400; color:rgba(0,0,0,0.35); font-size:11px;">(select all that apply)</span>
                    </div>
                    <div class="row g-2 mb-3">
                      <div v-for="cat in categories" :key="cat.value" class="col-md-3 col-6">
                        <div class="cat-tile"
                          :class="{ 'selected': selectedCats.includes(cat.value) }"
                          @click="toggleCat(cat.value)">
                          <div class="cat-icon-wrap" :style="{ background: selectedCats.includes(cat.value) ? cat.color + '20' : '#f5f5f5' }">
                            <i :class="cat.icon" :style="{ color: selectedCats.includes(cat.value) ? cat.color : 'rgba(0,0,0,0.35)', fontSize: '18px' }"></i>
                          </div>
                          <p class="mb-0 mt-2" style="font-size:12px; font-weight:500;">{{ cat.label }}</p>
                          <div v-if="selectedCats.includes(cat.value)" class="cat-check">
                            <i class="bi bi-check2" style="color:#fff; font-size:10px;"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label class="flat-label mb-1">
                      <i class="bi bi-pencil-square me-1" style="color:rgba(0,0,0,0.35);"></i>
                      Additional Notes / Specify Categories Manually
                    </label>
                    <textarea class="flat-textarea" rows="2"
                      placeholder="e.g. Include thick client application testing, IoT firmware analysis, custom scope details..."></textarea>
                  </div>

                  <!-- Approach toggles -->
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="field-section-card h-100">
                        <div class="field-section-header">
                          <i class="bi bi-diagram-3 me-2" style="color:#0284c7;"></i>
                          <span>Network Perspective</span>
                        </div>
                        <div class="toggle-group">
                          <div v-for="p in ['Internal', 'External', 'Both']" :key="p"
                            class="toggle-item"
                            :class="{ 'active': selectedPerspective === p }"
                            @click="selectedPerspective = p">{{ p }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="field-section-card h-100">
                        <div class="field-section-header">
                          <i class="bi bi-server me-2" style="color:#059669;"></i>
                          <span>Environment</span>
                        </div>
                        <div class="toggle-group">
                          <div v-for="e in ['Production', 'Staging', 'Dev']" :key="e"
                            class="toggle-item"
                            :class="{ 'active': selectedEnv === e }"
                            @click="selectedEnv = e">{{ e }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="field-section-card">
                        <div class="field-section-header">
                          <i class="bi bi-award me-2" style="color:#7c3aed;"></i>
                          <span>Compliance Standards</span>
                          <span class="ms-2" style="font-weight:400; color:rgba(0,0,0,0.35); font-size:11px;">(select all that apply)</span>
                        </div>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                          <span v-for="s in standards" :key="s"
                            class="std-chip"
                            :class="{ 'active': selectedStds.includes(s) }"
                            @click="toggleStd(s)">{{ s }}</span>
                        </div>
                        <label class="flat-label mb-1">
                          <i class="bi bi-pencil-square me-1" style="color:rgba(0,0,0,0.35);"></i>
                          Additional Compliance Notes / Specify Standards Manually
                        </label>
                        <textarea class="flat-textarea" rows="2"
                          placeholder="e.g. CIS Benchmarks v8, RBI Cybersecurity Framework, SEBI Cybersecurity Guidelines, custom internal policies..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ── SECTION 2: Scope ── -->
                <div v-show="activeSection === 2">
                  <div class="section-title-row mb-4 mt-5">
                    <div class="num-badge" style="background:#059669;">3</div>
                    <div>
                      <h6 class="mb-0 fw-bold" style="font-size:16px;">Scope Definition</h6>
                      <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.4);">Specify in-scope and out-of-scope targets</p>
                    </div>
                  </div>

                  <!-- Scope Tabs -->
                  <div class="scope-tabs mb-4">
                    <div v-for="tab in scopeTabs" :key="tab"
                      class="scope-tab"
                      :class="{ 'active': activeScopeTab === tab }"
                      @click="activeScopeTab = tab">{{ tab }}</div>
                  </div>

                  <div v-show="activeScopeTab === 'Network'">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="flat-label">IP Addresses / CIDR Ranges</label>
                        <textarea class="flat-textarea mt-1" rows="5" placeholder="192.168.1.0/24&#10;10.0.0.1 - 10.0.0.100&#10;203.0.113.45"></textarea>
                      </div>
                      <div class="col-md-6">
                        <label class="flat-label">Network Devices</label>
                        <textarea class="flat-textarea mt-1" rows="5" placeholder="List routers, switches, firewalls..."></textarea>
                      </div>
                      <div class="col-12">
                        <label class="flat-label">Excluded IPs / Subnets</label>
                        <textarea class="flat-textarea mt-1" rows="3" placeholder="IPs that must NOT be tested..."></textarea>
                      </div>
                    </div>
                  </div>

                  <div v-show="activeScopeTab === 'Web & API'">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="flat-label">Domains / Subdomains</label>
                        <textarea class="flat-textarea mt-1" rows="4" placeholder="https://app.company.com&#10;api.company.com&#10;admin.company.com"></textarea>
                      </div>
                      <div class="col-md-6">
                        <label class="flat-label">API Endpoints</label>
                        <textarea class="flat-textarea mt-1" rows="4" placeholder="REST: https://api.company.com/v1&#10;GraphQL: /graphql&#10;SOAP: /ws"></textarea>
                      </div>
                      <div class="col-md-6">
                        <label class="flat-label">Authentication Methods</label>
                        <div class="d-flex flex-wrap gap-2 mt-1">
                          <span v-for="auth in authMethods" :key="auth"
                            class="std-chip"
                            :class="{ 'active': selectedAuth.includes(auth) }"
                            @click="toggleAuth(auth)">{{ auth }}</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label class="flat-label">Tech Stack</label>
                        <input type="text" class="flat-input mt-1" placeholder="e.g. React, Node.js, PostgreSQL, AWS" />
                      </div>
                    </div>
                  </div>

                  <div v-show="activeScopeTab === 'Mobile'">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="flat-label">iOS Application</label>
                        <input type="text" class="flat-input mt-1" placeholder="Bundle ID: com.company.app (v2.1)" />
                        <div class="d-flex gap-2 mt-2">
                          <span class="std-chip active">App Store</span>
                          <span class="std-chip">TestFlight</span>
                          <span class="std-chip">Enterprise</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label class="flat-label">Android Application</label>
                        <input type="text" class="flat-input mt-1" placeholder="Package: com.company.app (v2.1)" />
                        <div class="d-flex gap-2 mt-2">
                          <span class="std-chip active">Play Store</span>
                          <span class="std-chip">APK</span>
                          <span class="std-chip">MDM</span>
                        </div>
                      </div>
                      <div class="col-12">
                        <label class="flat-label">Backend APIs (for mobile)</label>
                        <textarea class="flat-textarea mt-1" rows="3" placeholder="List backend APIs consumed by the mobile app..."></textarea>
                      </div>
                    </div>
                  </div>

                  <div v-show="activeScopeTab === 'Cloud'">
                    <div class="row g-3">
                      <div class="col-md-4">
                        <label class="flat-label">Cloud Provider</label>
                        <div class="d-flex flex-wrap gap-2 mt-1">
                          <span v-for="cp in cloudProviders" :key="cp"
                            class="std-chip"
                            :class="{ 'active': selectedCloud.includes(cp) }"
                            @click="toggleCloud(cp)">{{ cp }}</span>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label class="flat-label">Services in Scope</label>
                        <textarea class="flat-textarea mt-1" rows="4" placeholder="EC2, S3, RDS, Lambda..."></textarea>
                      </div>
                      <div class="col-md-4">
                        <label class="flat-label">Account / Project IDs</label>
                        <textarea class="flat-textarea mt-1" rows="4" placeholder="AWS Account: 123456789&#10;GCP Project: my-project-id"></textarea>
                      </div>
                    </div>
                  </div>

                  <!-- Asset count summary -->
                  <div class="asset-summary-row mt-4">
                    <p class="mb-2 fw-semibold" style="font-size:12px; color:#0f172a;">Asset Count Summary</p>
                    <div class="d-flex gap-3 flex-wrap">
                      <div v-for="a in assetTypes" :key="a.label" class="asset-count-chip">
                        <span class="asset-count-icon" :style="{ background: a.bg }">
                          <i :class="a.icon" :style="{ color: a.color, fontSize: '12px' }"></i>
                        </span>
                        <input type="number" class="asset-num-input" min="0" placeholder="0" />
                        <span style="font-size:11px; color:rgba(0,0,0,0.5);">{{ a.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ── SECTION 3: Rules of Engagement ── -->
                <div v-show="activeSection === 3">
                  <div class="section-title-row mb-4 mt-5">
                    <div class="num-badge" style="background:#0284c7;">4</div>
                    <div>
                      <h6 class="mb-0 fw-bold" style="font-size:16px;">Rules of Engagement</h6>
                      <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.4);">Testing boundaries, permissions and restrictions</p>
                    </div>
                  </div>

                  <div class="row g-4">
                    <!-- Schedule -->
                    <div class="col-md-6">
                      <div class="roe-block p-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                          <div style="width:32px;height:32px;background:#e0f2fe;border-radius:8px;display:flex;align-items:center;justify-content:center;">
                            <i class="bi bi-clock-fill" style="color:#0284c7; font-size:14px;"></i>
                          </div>
                          <span class="fw-semibold" style="font-size:13px;">Testing Schedule</span>
                        </div>

                        <!-- Duration -->
                        <div class="schedule-field-row mb-3">
                          <label class="flat-label mb-1">
                            <i class="bi bi-hourglass-split me-1" style="color:#7c3aed; font-size:11px;"></i>
                            Duration
                          </label>
                          <div class="d-flex gap-2">
                            <div class="flex-fill">
                              <input type="number" class="flat-input" min="1" placeholder="e.g. 5" />
                              <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:2px;">Number of days</div>
                            </div>
                            <div class="flex-fill">
                              <select class="flat-input">
                                <option>Days</option>
                                <option>Weeks</option>
                                <option>Hours</option>
                              </select>
                              <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:2px;">Unit</div>
                            </div>
                          </div>
                        </div>

                        <!-- Time window -->
                        <div class="mb-3">
                          <label class="flat-label mb-1">
                            <i class="bi bi-alarm me-1" style="color:#0284c7; font-size:11px;"></i>
                            Please Specify Time
                          </label>
                          <div class="row g-2">
                            <div class="col-6">
                              <input type="time" class="flat-input" value="09:00" />
                              <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:2px;">Start time</div>
                            </div>
                            <div class="col-6">
                              <input type="time" class="flat-input" value="18:00" />
                              <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:2px;">End time</div>
                            </div>
                          </div>
                        </div>

                        <!-- Timezone -->
                        <div class="mb-3">
                          <label class="flat-label mb-1">
                            <i class="bi bi-globe2 me-1" style="color:#059669; font-size:11px;"></i>
                            Time Zone
                          </label>
                          <select class="flat-input">
                            <option value="" disabled selected>Select time zone</option>
                            <optgroup label="Asia">
                              <option value="IST">IST — India Standard Time (UTC+5:30)</option>
                              <option value="SGT">SGT — Singapore Time (UTC+8:00)</option>
                              <option value="GST">GST — Gulf Standard Time (UTC+4:00)</option>
                            </optgroup>
                            <optgroup label="Europe">
                              <option value="GMT">GMT — Greenwich Mean Time (UTC+0:00)</option>
                              <option value="CET">CET — Central European Time (UTC+1:00)</option>
                            </optgroup>
                            <optgroup label="Americas">
                              <option value="EST">EST — Eastern Standard Time (UTC-5:00)</option>
                              <option value="PST">PST — Pacific Standard Time (UTC-8:00)</option>
                              <option value="CST">CST — Central Standard Time (UTC-6:00)</option>
                            </optgroup>
                            <optgroup label="Pacific">
                              <option value="AEST">AEST — Australia Eastern Time (UTC+10:00)</option>
                            </optgroup>
                          </select>
                        </div>

                        <label class="flat-label mb-2">
                          <i class="bi bi-calendar3 me-1" style="color:#d97706; font-size:11px;"></i>
                          Permitted Days
                        </label>
                        <div class="d-flex flex-wrap gap-1">
                          <div v-for="d in days" :key="d"
                            class="day-chip"
                            :class="{ 'active': selectedDays.includes(d) }"
                            @click="toggleDay(d)">{{ d }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Communication -->
                    <div class="col-md-6">
                      <div class="roe-block p-4">
                        <div class="d-flex align-items-center gap-2 mb-3">
                          <i class="bi bi-chat-dots" style="color:#7c3aed; font-size:15px;"></i>
                          <span class="fw-semibold" style="font-size:13px;">Communication & Escalation</span>
                        </div>
                        <label class="flat-label">Primary Channel</label>
                        <select class="flat-input mt-1 mb-3">
                          <option>Email</option>
                          <option>Slack</option>
                          <option>Microsoft Teams</option>
                          <option>Jira</option>
                          <option>Phone</option>
                        </select>
                        <label class="flat-label">Escalation Contact</label>
                        <input type="text" class="flat-input mt-1 mb-2" placeholder="Name" />
                        <input type="tel" class="flat-input" placeholder="Phone / WhatsApp" />
                      </div>
                    </div>

                    <!-- Permitted -->
                    <div class="col-12">
                      <p class="flat-label mb-2">Permitted Testing Activities</p>
                      <div class="row g-2">
                        <div v-for="act in activities" :key="act.value" class="col-md-3 col-6">
                          <div class="activity-chip"
                            :class="{ 'allowed': selectedActs.includes(act.value) }"
                            @click="toggleAct(act.value)">
                            <i :class="act.icon" style="font-size:13px; margin-right:6px;"
                              :style="{ color: selectedActs.includes(act.value) ? '#059669' : 'rgba(0,0,0,0.3)' }"></i>
                            <span style="font-size:12px; font-weight:500;">{{ act.label }}</span>
                            <i v-if="selectedActs.includes(act.value)" class="bi bi-check-circle-fill ms-auto" style="color:#059669; font-size:12px;"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Prohibited -->
                    <div class="col-12">
                      <p class="flat-label mb-2">Prohibited Activities</p>
                      <div class="prohibited-box p-3">
                        <div class="row g-2">
                          <div v-for="p in prohibited" :key="p" class="col-md-4 col-6">
                            <div class="d-flex align-items-center gap-2">
                              <i class="bi bi-ban" style="color:#dc2626; font-size:12px; flex-shrink:0;"></i>
                              <span style="font-size:12px; color:rgba(0,0,0,0.6);">{{ p }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="flat-label">Additional Restrictions / Notes</label>
                      <textarea class="flat-textarea mt-1" rows="3"
                        placeholder="Any special constraints or testing limitations..."></textarea>
                    </div>
                  </div>
                </div>

                <!-- ── SECTION 4: Authorization ── -->
                <div v-show="activeSection === 4">
                  <div class="section-title-row mb-4 mt-5">
                    <div class="num-badge" style="background:#7c3aed;">6</div>
                    <div>
                      <h6 class="mb-0 fw-bold" style="font-size:16px;">Authorization & Sign-Off</h6>
                      <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.4);">Legal authorization and NDA confirmation</p>
                    </div>
                  </div>

                  <div class="auth-statement-card p-4 mb-4">
                    <div class="d-flex gap-3">
                      <div class="auth-icon-wrap">
                        <i class="bi bi-shield-lock-fill" style="color:#7c3aed; font-size:20px;"></i>
                      </div>
                      <div>
                        <p class="fw-semibold mb-1" style="font-size:13px;">Authorization Statement</p>
                        <p style="font-size:12px; color:rgba(0,0,0,0.6); line-height:1.7; margin-bottom:0;">
                          I, the undersigned, confirm that I have the legal authority to authorize penetration testing
                          and vulnerability assessment on the systems, networks, and applications described in this
                          scoping document. I accept responsibility for ensuring that proper permissions and legal
                          agreements are in place before testing commences.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row g-3 mb-4">
                    <div class="col-md-4">
                      <label class="flat-label">Authorized Person (Full Name)</label>
                      <input type="text" class="flat-input mt-1" placeholder="Legal full name" />
                    </div>
                    <div class="col-md-4">
                      <label class="flat-label">Title / Designation</label>
                      <input type="text" class="flat-input mt-1" placeholder="e.g. Chief Information Security Officer" />
                    </div>
                    <div class="col-md-4">
                      <label class="flat-label">Date</label>
                      <input type="date" class="flat-input mt-1" />
                    </div>
                    <div class="col-12">
                      <label class="flat-label">Signature</label>
                      <div class="sig-canvas mt-1">
                        <div class="text-center">
                          <i class="bi bi-pen-fill" style="font-size:20px; color:rgba(0,0,0,0.15);"></i>
                          <p class="mb-0 mt-2" style="font-size:12px; color:rgba(0,0,0,0.3);">
                            Click to draw signature or type initials
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Agreements -->
                  <div class="d-flex flex-column gap-3 mb-4">
                    <div class="agreement-row" v-for="ag in agreements" :key="ag.title">
                      <input type="checkbox" class="form-check-input mt-1" style="min-width:16px;" />
                      <div>
                        <p class="mb-0 fw-semibold" style="font-size:13px;">{{ ag.title }}</p>
                        <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.45); line-height:1.6;">{{ ag.desc }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Final submit block -->
                  <div class="final-submit-block p-4">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <p class="fw-bold mb-1" style="font-size:14px; color:#0f172a;">Ready to submit?</p>
                        <p class="mb-0" style="font-size:12px; color:rgba(0,0,0,0.5);">
                          Review all sections before final submission. Once submitted, the scoping form will be sent to the assessment team for review.
                        </p>
                      </div>
                      <div class="col-md-4 text-end">
                        <button class="btn submit-btn px-4 py-2">
                          <i class="bi bi-send-check me-2"></i> Submit Scoping Form
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section nav -->
                <div class="d-flex justify-content-between mt-5">
                  <button v-if="activeSection > 0"
                    class="btn btn-outline-secondary px-4"
                    style="border-radius:8px; font-size:13px;"
                    @click="activeSection--">
                    <i class="bi bi-arrow-left me-1"></i> Back
                  </button>
                  <div v-else></div>
                  <button v-if="activeSection < sections.length - 1"
                    class="btn px-4"
                    style="background:#0f172a; color:#fff; border-radius:8px; font-size:13px; border:none;"
                    @click="activeSection++">
                    Continue <i class="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue'
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue'

const activeSection = ref(0)
const heroBannerRef = ref<HTMLElement | null>(null)
const bannerHeight = ref(0)

function updateBannerFixed() {
  const el = heroBannerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  // Measure left/width from actual DOM position
  el.style.position = 'fixed'
  el.style.top = '50px'
  el.style.left = rect.left + 'px'
  el.style.width = el.parentElement?.offsetWidth + 'px'
  el.style.zIndex = '99'
  bannerHeight.value = el.offsetHeight
}

onMounted(() => {
  updateBannerFixed()
  window.addEventListener('resize', updateBannerFixed)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBannerFixed)
})

const sections = [
  { label: 'Project Details', sub: 'Client & timeline', done: true },
  { label: 'Methodology', sub: 'Type & approach', done: true },
  { label: 'Scope Definition', sub: 'Targets & assets', done: true },
  { label: 'Rules of Engagement', sub: 'Permissions & limits', done: true },
  { label: 'Authorization', sub: 'Sign-off & NDA', done: false }
]

const contactTypes = [
  { role: 'Primary Contact', icon: 'bi bi-person-fill', color: '#4f46e5', bg: '#ede9fe' },
  { role: 'Technical Contact', icon: 'bi bi-tools', color: '#059669', bg: '#dcfce7' },
  { role: 'Emergency Contact', icon: 'bi bi-telephone-fill', color: '#dc2626', bg: '#fee2e2' }
]

const selectedKnowledge = ref('grey')
const knowledgeLevels = [
  {
    value: 'black', label: 'Black Box', tag: 'No prior knowledge',
    desc: 'Tester has no knowledge of the internal systems. Simulates a real-world external attack.',
    icon: 'bi bi-square-fill', color: '#1e293b', bg: '#f8fafc', iconBg: '#e2e8f0', tagBg: '#f1f5f9'
  },
  {
    value: 'grey', label: 'Grey Box', tag: 'Partial knowledge',
    desc: 'Tester has limited knowledge — some credentials or documentation are provided.',
    icon: 'bi bi-circle-half', color: '#4f46e5', bg: '#fafbff', iconBg: '#ede9fe', tagBg: '#ede9fe'
  },
  {
    value: 'white', label: 'White Box', tag: 'Full knowledge',
    desc: 'Tester has full access — source code, architecture diagrams, and credentials.',
    icon: 'bi bi-square', color: '#059669', bg: '#f0fdf4', iconBg: '#dcfce7', tagBg: '#dcfce7'
  }
]

const selectedCats = ref<string[]>(['web', 'api'])
const categories = [
  { value: 'network', label: 'Network', icon: 'bi bi-hdd-network', color: '#0284c7' },
  { value: 'web', label: 'Web App', icon: 'bi bi-globe', color: '#4f46e5' },
  { value: 'mobile', label: 'Mobile App', icon: 'bi bi-phone', color: '#7c3aed' },
  { value: 'api', label: 'API', icon: 'bi bi-braces', color: '#059669' },
  { value: 'cloud', label: 'Cloud', icon: 'bi bi-cloud', color: '#0284c7' },
  { value: 'social', label: 'Social Eng.', icon: 'bi bi-people', color: '#db2777' },
  { value: 'wireless', label: 'Wireless', icon: 'bi bi-wifi', color: '#d97706' },
  { value: 'iot', label: 'IoT / OT', icon: 'bi bi-cpu', color: '#dc2626' }
]

const selectedPerspective = ref('External')
const selectedEnv = ref('Staging')
const standards = ['OWASP', 'NIST', 'ISO 27001', 'PCI-DSS', 'HIPAA', 'SOC 2', 'GDPR']
const selectedStds = ref<string[]>(['OWASP', 'PCI-DSS'])

const scopeTabs = ['Network', 'Web & API', 'Mobile', 'Cloud']
const activeScopeTab = ref('Web & API')

const authMethods = ['JWT', 'OAuth 2.0', 'Basic Auth', 'API Key', 'SAML', 'Cookie', 'mTLS']
const selectedAuth = ref<string[]>(['JWT', 'OAuth 2.0'])

const cloudProviders = ['AWS', 'Azure', 'GCP', 'Oracle', 'IBM']
const selectedCloud = ref<string[]>(['AWS'])

const assetTypes = [
  { label: 'Servers', icon: 'bi bi-server', color: '#4f46e5', bg: '#ede9fe' },
  { label: 'Web Apps', icon: 'bi bi-globe', color: '#059669', bg: '#dcfce7' },
  { label: 'Mobile', icon: 'bi bi-phone', color: '#7c3aed', bg: '#f3e8ff' },
  { label: 'Databases', icon: 'bi bi-database', color: '#0284c7', bg: '#e0f2fe' },
  { label: 'APIs', icon: 'bi bi-braces', color: '#d97706', bg: '#fef3c7' },
  { label: 'Network Devices', icon: 'bi bi-router', color: '#dc2626', bg: '#fee2e2' }
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const selectedDays = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])

const activities = [
  { value: 'portscan', label: 'Port Scanning', icon: 'bi bi-radar' },
  { value: 'vulnscan', label: 'Vuln Scanning', icon: 'bi bi-search' },
  { value: 'exploit', label: 'Exploitation', icon: 'bi bi-lightning' },
  { value: 'privesc', label: 'Privilege Escalation', icon: 'bi bi-arrow-up-circle' },
  { value: 'recon', label: 'OSINT Recon', icon: 'bi bi-eye' },
  { value: 'phishing', label: 'Phishing Sim', icon: 'bi bi-envelope' },
  { value: 'fuzzing', label: 'Fuzzing', icon: 'bi bi-shuffle' },
  { value: 'lateral', label: 'Lateral Movement', icon: 'bi bi-arrows-move' }
]
const selectedActs = ref<string[]>(['portscan', 'vulnscan', 'exploit', 'recon'])

const prohibited = [
  'Full-scale DoS / DDoS',
  'Data exfiltration beyond PoC',
  'Destructive payloads',
  'Out-of-scope targets',
  'Executive social engineering',
  'Physical access bypass'
]


const agreements = [
  {
    title: 'Non-Disclosure Agreement (NDA)',
    desc: 'I confirm that an NDA is in place between both parties and that all findings will be treated with strict confidentiality.'
  },
  {
    title: 'Rules of Engagement Accepted',
    desc: 'I have read and accepted the rules of engagement, including testing windows, permitted activities, and escalation procedures.'
  },
  {
    title: 'Legal Authorization Confirmed',
    desc: 'I confirm that I am legally authorized to permit penetration testing on all systems listed in this scoping form.'
  }
]

function toggleCat(v: string) {
  const i = selectedCats.value.indexOf(v)
  i === -1 ? selectedCats.value.push(v) : selectedCats.value.splice(i, 1)
}
function toggleStd(v: string) {
  const i = selectedStds.value.indexOf(v)
  i === -1 ? selectedStds.value.push(v) : selectedStds.value.splice(i, 1)
}
function toggleAuth(v: string) {
  const i = selectedAuth.value.indexOf(v)
  i === -1 ? selectedAuth.value.push(v) : selectedAuth.value.splice(i, 1)
}
function toggleCloud(v: string) {
  const i = selectedCloud.value.indexOf(v)
  i === -1 ? selectedCloud.value.push(v) : selectedCloud.value.splice(i, 1)
}
function toggleDay(v: string) {
  const i = selectedDays.value.indexOf(v)
  i === -1 ? selectedDays.value.push(v) : selectedDays.value.splice(i, 1)
}
function toggleAct(v: string) {
  const i = selectedActs.value.indexOf(v)
  i === -1 ? selectedActs.value.push(v) : selectedActs.value.splice(i, 1)
}
</script>

<style scoped>
/* Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0f2d47 100%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
}
.hero-deco-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-deco-1 {
  width: 280px; height: 280px;
  background: radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 70%);
  top: -80px; right: 200px;
}
.hero-deco-2 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%);
  bottom: -60px; right: 60px;
}
.hero-shield-icon {
  width: 28px; height: 28px;
  background: rgba(79,70,229,0.25);
  border: 1px solid rgba(165,180,252,0.2);
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
}
.hero-tag {
  background: rgba(79,70,229,0.35);
  color: #a5b4fc;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.08em;
  border: 1px solid rgba(165,180,252,0.2);
}
.hero-stat { display: flex; flex-direction: column; gap: 1px; }
.hero-stat-val { font-size: 16px; font-weight: 700; color: #fff; line-height: 1; }
.hero-stat-label { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.04em; }
.hero-stat-divider { width: 1px; background: rgba(255,255,255,0.12); align-self: stretch; }
.hero-btn-outline {
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  font-size: 12px;
  padding: 6px 16px;
  backdrop-filter: blur(4px);
}
.hero-btn-outline:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.3); }
.hero-btn-solid {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  padding: 6px 16px;
  box-shadow: 0 4px 12px rgba(79,70,229,0.4);
}
.hero-btn-solid:hover { background: linear-gradient(135deg, #4338ca, #6d28d9); color: #fff; }
.completion-ring { position: relative; display: inline-flex; }
.ring-label {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

/* Sidebar */
.sidebar-toc {
  width: 220px;
  min-width: 220px;
  border-right: 1px solid #ebebf0;
  background: #fafbff;

}
.toc-heading {
  font-size: 10px;
  font-weight: 700;
  color: rgba(0,0,0,0.3);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
  padding: 0 4px;
}

/* Field section cards */
.field-section-card {
  background: #fff;
  border: 1.5px solid #ebebf0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.field-section-header {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0,0,0,0.75);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f8;
}
.toc-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2px;
  transition: background 0.15s;
}
.toc-item:hover { background: #f0f0f8; }
.toc-item.active { background: linear-gradient(135deg, #ede9fe, #f0f4ff); border-left: 3px solid #4f46e5; padding-left: 5px; }
.toc-dot {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 10px;
  color: rgba(0,0,0,0.5);
  font-weight: 700;
  margin-top: 1px;
}
.toc-dot.done { background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 2px 6px rgba(34,197,94,0.3); }
.toc-dot.active { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #fff; box-shadow: 0 2px 6px rgba(79,70,229,0.35); }
.toc-label { font-size: 12px; font-weight: 600; color: rgba(0,0,0,0.75); }
.toc-sub { font-size: 10px; color: rgba(0,0,0,0.38); }

/* Section title */
.section-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  border-bottom: 2px solid #f0f0f5;
  margin-bottom: 4px;
}
.num-badge {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

/* Flat inputs */
.flat-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(0,0,0,0.55);
  display: block;
}
.flat-input {
  width: 100%;
  border: none;
  border-bottom: 1.5px solid #e5e7eb;
  border-radius: 0;
  padding: 7px 0;
  font-size: 13px;
  color: rgba(0,0,0,0.75);
  background: transparent;
  outline: none;
  transition: border-color 0.2s;
}
.flat-input:focus { border-bottom-color: #4f46e5; }
.flat-textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: rgba(0,0,0,0.75);
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  background: #fafafa;
}
.flat-textarea:focus { border-color: #4f46e5; background: #fff; }

/* Info cards */
.info-card {
  border: 1.5px solid #ebebf0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s, border-color 0.2s;
}
.info-card:focus-within {
  border-color: #c7d2fe;
  box-shadow: 0 0 0 3px rgba(79,70,229,0.07);
}
.info-card-label {
  font-size: 10px;
  font-weight: 700;
  color: rgba(0,0,0,0.4);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Timeline strip */
.timeline-strip {
  background: linear-gradient(135deg, #fafbff 0%, #f5f3ff 100%);
  border: 1px solid #e8e5ff;
  border-radius: 12px;
}

/* Contact cards */
.contact-card {
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  background: #fff;
}
.contact-avatar {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
}

/* Knowledge cards */
.knowledge-card {
  border: 2px solid #ebebf0;
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.knowledge-card:hover { border-color: #a5b4fc; box-shadow: 0 4px 16px rgba(79,70,229,0.08); transform: translateY(-1px); }
.knowledge-card.selected { box-shadow: 0 6px 20px rgba(79,70,229,0.15); transform: translateY(-2px); }
.kb-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.kb-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

/* Category tiles */
.cat-tile {
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
  text-align: center;
  position: relative;
}
.cat-tile:hover { border-color: #a5b4fc; }
.cat-tile.selected { border-color: #4f46e5; }
.cat-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto;
}
.cat-check {
  position: absolute;
  top: 6px; right: 6px;
  width: 18px; height: 18px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

/* Toggle group */
.toggle-group {
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.toggle-item {
  flex: 1;
  text-align: center;
  padding: 7px 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(0,0,0,0.5);
  transition: all 0.15s;
  border-right: 1px solid #e5e7eb;
}
.toggle-item:last-child { border-right: none; }
.toggle-item:hover { background: #f5f3ff; color: #4f46e5; }
.toggle-item.active { background: #4f46e5; color: #fff; }

/* Standards chips */
.std-chip {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  border: 1.5px solid #e5e7eb;
  color: rgba(0,0,0,0.5);
  background: #fff;
  transition: all 0.15s;
  display: inline-block;
}
.std-chip:hover { border-color: #a5b4fc; color: #4f46e5; }
.std-chip.active { background: #4f46e5; color: #fff; border-color: #4f46e5; }

/* Scope tabs */
.scope-tabs {
  display: flex;
  border-bottom: 2px solid #f0f0f0;
}
.scope-tab {
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  color: rgba(0,0,0,0.45);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.15s;
}
.scope-tab:hover { color: #4f46e5; }
.scope-tab.active { color: #4f46e5; border-bottom-color: #4f46e5; font-weight: 600; }

/* Asset summary */
.asset-summary-row {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 16px;
}
.asset-count-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 10px;
}
.asset-count-icon {
  width: 24px; height: 24px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.asset-num-input {
  width: 40px;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  outline: none;
  padding: 2px 0;
}

/* ROE blocks */
.roe-block {
  background: #fff;
  border: 1.5px solid #eef0f5;
  border-radius: 14px;
  height: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

/* Day chips */
.day-chip {
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid #e5e7eb;
  color: rgba(0,0,0,0.5);
  transition: all 0.15s;
}
.day-chip:hover { border-color: #a5b4fc; }
.day-chip.active { background: #0f172a; color: #fff; border-color: #0f172a; }

/* Activity chips */
.activity-chip {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: #fff;
  gap: 4px;
}
.activity-chip:hover { border-color: #6ee7b7; }
.activity-chip.allowed { border-color: #059669; background: #f0fdf4; }

/* Prohibited */
.prohibited-box {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
}

/* Schedule field row */
.schedule-field-row {
  background: #f8fafc;
  border: 1px solid #e8edf2;
  border-radius: 8px;
  padding: 10px 12px;
}

/* Auth */
.auth-statement-card {
  background: #faf8ff;
  border: 1.5px solid #e0d9ff;
  border-radius: 12px;
}
.auth-icon-wrap {
  width: 44px; height: 44px;
  background: #ede9fe;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sig-canvas {
  border: 2px dashed #d1d5db;
  border-radius: 10px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sig-canvas:hover { border-color: #4f46e5; }
.agreement-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
}
.final-submit-block {
  background: linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0f2d47 100%);
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}
.final-submit-block::before {
  content: '';
  position: absolute;
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%);
  top: -60px; right: 100px;
  pointer-events: none;
}
.submit-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(79,70,229,0.45);
  position: relative;
  z-index: 1;
}
.submit-btn:hover { background: linear-gradient(135deg, #4338ca, #6d28d9); color: #fff; box-shadow: 0 6px 18px rgba(79,70,229,0.55); }
</style>
