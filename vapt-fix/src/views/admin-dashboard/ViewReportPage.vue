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

          <div class="col-11 pt-5 pb-5 pe-4 flex-grow-1">

            <!-- Page Header -->
            <div class="report-sticky-header d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <button class="btn btn-back" @click="$router.back()">
                  <i class="bi bi-arrow-left me-1"></i> Back
                </button>
                <div>
                  <h2 class="page-title mb-0">Vulnerability Management Report</h2>
                  <small class="text-muted">Ibdar_int_july_dpeeds</small>
                </div>
              </div>
              <button class="btn btn-download" @click="downloadReport">
                <i class="bi bi-download me-2"></i>Download Report
              </button>
            </div>

            <div class="report-page-wrap" ref="reportWrap">

              <!-- Summary Stat Cards -->
              <div class="stat-cards-row mb-4 mt-5">
                <div class="stat-card">
                  <div class="stat-label">Total Vulnerabilities</div>
                  <div class="stat-value">187</div>
                  <div class="stat-sub text-muted">Discovered this cycle</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Critical</div>
                  <div class="stat-value" style="color: maroon;">18</div>
                  <div class="stat-sub" style="color: maroon;">Immediate action required</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">High</div>
                  <div class="stat-value" style="color: red;">59</div>
                  <div class="stat-sub" style="color: red;">Urgent remediation needed</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Medium</div>
                  <div class="stat-value" style="color: goldenrod;">75</div>
                  <div class="stat-sub" style="color: goldenrod;">Scheduled for patching</div>
                </div>
                <div class="stat-card">
                  <div class="stat-label">Low</div>
                  <div class="stat-value" style="color: #16a34a;">35</div>
                  <div class="stat-sub" style="color: #16a34a;">Monitor and log</div>
                </div>
              </div>

              <!-- Executive Summary Charts -->
              <section class="mb-4">
                <h5 class="section-title"><i class="bi bi-bar-chart-fill me-2"></i>Executive Summary</h5>
                <div class="charts-row">
                  <div class="chart-card">
                    <div class="chart-card-title">Total Vulnerabilities Discovered</div>
                    <div class="total-vuln-number">187</div>
                    <canvas id="rTotalVulnsChart"></canvas>
                  </div>
                  <div class="chart-card">
                    <div class="chart-card-title">Severity Status Overview</div>
                    <canvas id="rCriticalityStatusChart"></canvas>
                  </div>
                  <div class="chart-card">
                    <div class="chart-card-title">Distribution by Team</div>
                    <canvas id="rTeamDistributionChart"></canvas>
                  </div>
                </div>
              </section>

              <!-- Team Performance -->
              <section class="mb-4">
                <h5 class="section-title"><i class="bi bi-people-fill me-2"></i>Team Performance Overview</h5>
                <div class="teams-grid">

                  <div class="team-card" style="border-left-color: #3b82f6;">
                    <div class="team-header">
                      <div class="team-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">🔗</div>
                      <div>
                        <div class="team-name">Network Security</div>
                        <div class="team-total" style="color: #3b82f6;">48 Total vulns assigned</div>
                      </div>
                    </div>
                    <div class="team-metrics">
                      <div class="metric-item"><div class="metric-value" style="color:#059669">38</div><div class="metric-label">Closed</div></div>
                      <div class="metric-item"><div class="metric-value" style="color:#dc2626">10</div><div class="metric-label">Open</div></div>
                      <div class="metric-item"><span class="sev-badge sev-maroon">3 Critical</span></div>
                      <div class="metric-item"><span class="sev-badge sev-red">15 High</span></div>
                      <div class="metric-item"><span class="sev-badge sev-orange">20 Medium</span></div>
                      <div class="metric-item"><span class="sev-badge sev-green">10 Low</span></div>
                    </div>
                    <div class="team-footer">79% Closure Rate | 4.2 days avg | 2 overdue</div>
                  </div>

                  <div class="team-card" style="border-left-color: #10b981;">
                    <div class="team-header">
                      <div class="team-icon" style="background: linear-gradient(135deg, #10b981, #059669);">🔧</div>
                      <div>
                        <div class="team-name">Patch Management</div>
                        <div class="team-total" style="color: #10b981;">62 Total vulns assigned</div>
                      </div>
                    </div>
                    <div class="team-metrics">
                      <div class="metric-item"><div class="metric-value" style="color:#059669">52</div><div class="metric-label">Closed</div></div>
                      <div class="metric-item"><div class="metric-value" style="color:#dc2626">8</div><div class="metric-label">Open</div></div>
                      <div class="metric-item"><span class="sev-badge sev-maroon">8 Critical</span></div>
                      <div class="metric-item"><span class="sev-badge sev-red">22 High</span></div>
                      <div class="metric-item"><span class="sev-badge sev-orange">25 Medium</span></div>
                      <div class="metric-item"><span class="sev-badge sev-green">7 Low</span></div>
                    </div>
                    <div class="team-footer">84% Closure Rate | 3.8 days avg | 0 overdue</div>
                  </div>

                  <div class="team-card" style="border-left-color: #f97316;">
                    <div class="team-header">
                      <div class="team-icon" style="background: linear-gradient(135deg, #f97316, #ea580c);">⚙️</div>
                      <div>
                        <div class="team-name">Configuration Management</div>
                        <div class="team-total" style="color: #f97316;">42 Total vulns assigned</div>
                      </div>
                    </div>
                    <div class="team-metrics">
                      <div class="metric-item"><div class="metric-value" style="color:#059669">35</div><div class="metric-label">Closed</div></div>
                      <div class="metric-item"><div class="metric-value" style="color:#dc2626">6</div><div class="metric-label">Open</div></div>
                      <div class="metric-item"><span class="sev-badge sev-maroon">2 Critical</span></div>
                      <div class="metric-item"><span class="sev-badge sev-red">12 High</span></div>
                      <div class="metric-item"><span class="sev-badge sev-orange">18 Medium</span></div>
                      <div class="metric-item"><span class="sev-badge sev-green">10 Low</span></div>
                    </div>
                    <div class="team-footer">83% Closure Rate | 5.1 days avg | 1 overdue</div>
                  </div>

                  <div class="team-card" style="border-left-color: #dc2626;">
                    <div class="team-header">
                      <div class="team-icon" style="background: linear-gradient(135deg, #dc2626, #b91c1c);">🏗️</div>
                      <div>
                        <div class="team-name">Architectural Flaws</div>
                        <div class="team-total" style="color: #dc2626;">35 Total vulns assigned</div>
                      </div>
                    </div>
                    <div class="team-metrics">
                      <div class="metric-item"><div class="metric-value" style="color:#059669">25</div><div class="metric-label">Closed</div></div>
                      <div class="metric-item"><div class="metric-value" style="color:#dc2626">11</div><div class="metric-label">Open</div></div>
                      <div class="metric-item"><span class="sev-badge sev-maroon">5 Critical</span></div>
                      <div class="metric-item"><span class="sev-badge sev-red">10 High</span></div>
                      <div class="metric-item"><span class="sev-badge sev-orange">12 Medium</span></div>
                      <div class="metric-item"><span class="sev-badge sev-green">8 Low</span></div>
                    </div>
                    <div class="team-footer">71% Closure Rate | 7.3 days avg | 4 overdue</div>
                  </div>

                </div>
              </section>

              <!-- SLA Compliance -->
              <!-- <section class="mb-4">
                <div class="sla-section-header">
                  <h5 class="section-title mb-0"><i class="bi bi-shield-check me-2"></i>SLA Compliance</h5>
                  <span class="sla-policy-badge"><i class="bi bi-info-circle me-1"></i>Policy: 95% on Critical &amp; High</span>
                </div>
                <div class="sla-grid">

                  <div class="sla-item-card sla-critical">
                    <div class="sla-item-top">
                      <div class="sla-dot" style="background: maroon;"></div>
                      <div>
                        <div class="sla-item-label">Critical</div>
                        <div class="sla-item-window">Response within 48h</div>
                      </div>
                      <span class="sla-status-badge sla-pass">PASS</span>
                    </div>
                    <div class="sla-item-pct" style="color: maroon;">92%</div>
                    <div class="sla-item-bar-wrap">
                      <div class="sla-item-bar" style="width: 92%; background: maroon;"></div>
                      <div class="sla-threshold-line"></div>
                    </div>
                    <div class="sla-item-footer">
                      <span>0%</span><span class="sla-threshold-label">95% threshold</span><span>100%</span>
                    </div>
                  </div>

                  <div class="sla-item-card sla-high">
                    <div class="sla-item-top">
                      <div class="sla-dot" style="background: #dc2626;"></div>
                      <div>
                        <div class="sla-item-label">High</div>
                        <div class="sla-item-window">Response within 7 days</div>
                      </div>
                      <span class="sla-status-badge sla-fail">BELOW</span>
                    </div>
                    <div class="sla-item-pct" style="color: #dc2626;">85%</div>
                    <div class="sla-item-bar-wrap">
                      <div class="sla-item-bar" style="width: 85%; background: #dc2626;"></div>
                      <div class="sla-threshold-line"></div>
                    </div>
                    <div class="sla-item-footer">
                      <span>0%</span><span class="sla-threshold-label">95% threshold</span><span>100%</span>
                    </div>
                  </div>

                  <div class="sla-item-card sla-medium">
                    <div class="sla-item-top">
                      <div class="sla-dot" style="background: goldenrod;"></div>
                      <div>
                        <div class="sla-item-label">Medium</div>
                        <div class="sla-item-window">Response within 30 days</div>
                      </div>
                      <span class="sla-status-badge sla-pass">PASS</span>
                    </div>
                    <div class="sla-item-pct" style="color: goldenrod;">98%</div>
                    <div class="sla-item-bar-wrap">
                      <div class="sla-item-bar" style="width: 98%; background: goldenrod;"></div>
                      <div class="sla-threshold-line"></div>
                    </div>
                    <div class="sla-item-footer">
                      <span>0%</span><span class="sla-threshold-label">95% threshold</span><span>100%</span>
                    </div>
                  </div>

                  <div class="sla-item-card sla-low">
                    <div class="sla-item-top">
                      <div class="sla-dot" style="background: #16a34a;"></div>
                      <div>
                        <div class="sla-item-label">Low</div>
                        <div class="sla-item-window">Response within 90 days</div>
                      </div>
                      <span class="sla-status-badge sla-pass">PASS</span>
                    </div>
                    <div class="sla-item-pct" style="color: #16a34a;">100%</div>
                    <div class="sla-item-bar-wrap">
                      <div class="sla-item-bar" style="width: 100%; background: #16a34a;"></div>
                      <div class="sla-threshold-line"></div>
                    </div>
                    <div class="sla-item-footer">
                      <span>0%</span><span class="sla-threshold-label">95% threshold</span><span>100%</span>
                    </div>
                  </div>

                </div>
              </section> -->

              <!-- Detailed Vulnerabilities -->
              <section>
                <h5 class="section-title"><i class="bi bi-table me-2"></i>Detailed Vulnerabilities</h5>
                <div class="filter-row mb-3">
                  <div class="filter-group">
                    <label>Team:</label>
                    <select v-model="teamFilter">
                      <option value="all">All Teams</option>
                      <option value="network">Network Security</option>
                      <option value="patch">Patch Management</option>
                      <option value="configuration">Configuration Management</option>
                      <option value="architectural">Architectural Flaws</option>
                    </select>
                  </div>
                  <div class="filter-group">
                    <label>Severity:</label>
                    <select v-model="severityFilter">
                      <option value="all">All</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div class="filter-group">
                    <label>Status:</label>
                    <select v-model="statusFilter">
                      <option value="all">All</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="vuln-table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Vulnerability Name</th>
                        <th>Asset</th>
                        <th>Team</th>
                        <th>Severity</th>
                        <th>Found Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in filteredData" :key="row.id">
                        <td><strong>{{ row.id }}</strong></td>
                        <td>{{ row.name }}</td>
                        <td><strong>{{ row.asset }}</strong></td>
                        <td><span :class="['team-badge', 'team-' + row.team]">{{ row.teamLabel }}</span></td>
                        <td><span :class="['sev-badge', 'sev-' + row.severity]">{{ row.severity.charAt(0).toUpperCase() + row.severity.slice(1) }}</span></td>
                        <td>{{ row.found }}</td>
                        <td><span :class="row.status === 'open' ? 'status-open' : 'status-closed'">{{ row.status === 'open' ? 'Open' : 'Closed' }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

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
import Chart from 'chart.js/auto';

export default {
  name: 'ViewReportPage',
  components: { DashboardMenu, DashboardHeader },

  data() {
    return {
      teamFilter: 'all',
      severityFilter: 'all',
      statusFilter: 'all',
      charts: [],
      tableData: [
        { id: 1, name: 'Unencrypted SNMPv2 Traffic', asset: 'Core-Switch-01', team: 'network', teamLabel: 'Network Security', severity: 'critical', found: '2026-02-23', status: 'open' },
        { id: 2, name: 'Unpatched Windows Server 2019', asset: 'WEB-SRV-Prod-01', team: 'patch', teamLabel: 'Patch Management', severity: 'high', found: '2026-02-24', status: 'closed' },
        { id: 3, name: 'Excessive File Permissions (777)', asset: 'DB-Server-Prod-02', team: 'configuration', teamLabel: 'Configuration Management', severity: 'medium', found: '2026-02-25', status: 'closed' },
        { id: 4, name: 'Hardcoded API Keys in Config', asset: 'App-Config-Repo', team: 'architectural', teamLabel: 'Architectural Flaws', severity: 'critical', found: '2026-02-23', status: 'open' },
        { id: 5, name: 'Firewall Rule Allows All Traffic', asset: 'FW-Edge-01', team: 'network', teamLabel: 'Network Security', severity: 'high', found: '2026-02-24', status: 'closed' },
        { id: 6, name: 'Apache HTTPD CVE-2025-1234', asset: 'WEB-SRV-02', team: 'patch', teamLabel: 'Patch Management', severity: 'critical', found: '2026-02-26', status: 'open' },
        { id: 7, name: 'Default Admin Passwords Active', asset: 'Cisco-Switch-03', team: 'configuration', teamLabel: 'Configuration Management', severity: 'high', found: '2026-02-25', status: 'open' },
        { id: 8, name: 'Insecure Direct Object Reference', asset: 'User-Mgmt-API', team: 'architectural', teamLabel: 'Architectural Flaws', severity: 'high', found: '2026-02-24', status: 'closed' },
        { id: 9, name: 'SSL Certificate Expired', asset: 'Mail-SRV-01', team: 'network', teamLabel: 'Network Security', severity: 'medium', found: '2026-02-25', status: 'open' },
        { id: 10, name: 'Outdated OpenSSL Library', asset: 'API-Gateway-01', team: 'patch', teamLabel: 'Patch Management', severity: 'high', found: '2026-02-26', status: 'open' },
        { id: 11, name: 'Weak Password Policy', asset: 'AD-Server-01', team: 'configuration', teamLabel: 'Configuration Management', severity: 'medium', found: '2026-02-27', status: 'closed' },
        { id: 12, name: 'Exposed Admin Panel', asset: 'CMS-Prod-01', team: 'architectural', teamLabel: 'Architectural Flaws', severity: 'high', found: '2026-02-27', status: 'open' },
      ],
    };
  },

  computed: {
    filteredData() {
      return this.tableData.filter(row =>
        (this.teamFilter === 'all' || row.team === this.teamFilter) &&
        (this.severityFilter === 'all' || row.severity === this.severityFilter) &&
        (this.statusFilter === 'all' || row.status === this.statusFilter)
      );
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },

  beforeUnmount() {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
  },

  methods: {
    initCharts() {
      const configs = [
        {
          id: 'rTotalVulnsChart',
          type: 'bar',
          data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{ label: 'Total Discovered', data: [18, 59, 75, 35], backgroundColor: ['maroon', 'red', 'goldenrod', '#16a34a'], borderRadius: 6 }]
          },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } } }
        },
        {
          id: 'rCriticalityStatusChart',
          type: 'doughnut',
          data: {
            labels: ['Critical Pending', 'High Pending', 'Medium Pending', 'Low Pending'],
            datasets: [{ data: [10, 20, 4, 1], backgroundColor: ['maroon', 'red', 'goldenrod', '#16a34a'] }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        },
        {
          id: 'rTeamDistributionChart',
          type: 'doughnut',
          data: {
            labels: ['Network Security', 'Patch Management', 'Configuration Management', 'Architectural Flaws'],
            datasets: [{ data: [48, 62, 42, 35], backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#dc2626'], borderWidth: 0 }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true } } } }
        },
      ];
      configs.forEach(cfg => {
        const canvas = document.getElementById(cfg.id);
        if (canvas) {
          const chart = new Chart(canvas.getContext('2d'), { type: cfg.type, data: cfg.data, options: cfg.options });
          this.charts.push(chart);
        }
      });
    },

    downloadReport() {
      const reportContent = this.$refs.reportWrap;
      if (!reportContent) return;

      // Clone DOM so we can modify without affecting the live page
      const clone = reportContent.cloneNode(true);

      // Convert canvas elements → <img> with base64 data URLs so charts are preserved
      const liveCanvases = reportContent.querySelectorAll('canvas');
      const clonedCanvases = clone.querySelectorAll('canvas');
      liveCanvases.forEach((canvas, i) => {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.width = '100%';
        img.style.height = 'auto';
        if (clonedCanvases[i]) {
          clonedCanvases[i].parentNode.replaceChild(img, clonedCanvases[i]);
        }
      });

      // Extract all CSS from page stylesheets and strip Vue scoped attribute selectors
      let cssText = '';
      Array.from(document.styleSheets).forEach(sheet => {
        try {
          Array.from(sheet.cssRules || []).forEach(rule => {
            cssText += rule.cssText.replace(/\[data-v-[a-zA-Z0-9]+\]/g, '') + '\n';
          });
        } catch (e) { /* cross-origin sheet, skip */ }
      });

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vulnerability Management Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
  <style>
    body { font-family: 'Inter', sans-serif; background: #f1f5f9; padding: 32px; margin: 0; }
    ${cssText}
  </style>
</head>
<body>${clone.outerHTML}</body>
</html>`;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vulnerability-management-report.html';
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
/* ── Fixed page header ── */
.report-sticky-header {
  position: fixed;
  top: 60px;
  left: 8.333%;
  right: 0;
  z-index: 200;
  background: #f3f5fa;
  border-bottom: 1px solid #e6e9f2;
  padding: 12px 24px;
}

/* ── Page header ── */
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
}

.btn-back {
  background: #3121b1;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  padding: 8px 16px;
}
.btn-back:hover { background: #e5e7eb; }

.btn-download {
  background: #3121b1;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 22px;
  font-weight: 600;
  font-size: 14px;
}
.btn-download:hover { background: #2418a0; color: #fff; }

/* ── Report content offset below fixed header ── */
.report-page-wrap {
  padding-top: 72px;
}

/* ── Stat Cards ── */
.stat-cards-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.stat-card {
  background: #fff;
  border-radius: 14px;
  padding: 20px 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-sub {
  font-size: 12px;
}

/* ── Section title ── */
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
}

/* ── Charts row ── */
.charts-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.chart-card {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.chart-card-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}
.total-vuln-number {
  font-size: 40px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 8px;
}

/* ── Teams grid ── */
.teams-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.team-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.team-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.team-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.team-name {
  font-weight: 600;
  font-size: 14px;
  color: #111827;
}
.team-total {
  font-size: 12px;
  font-weight: 500;
}
.team-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.metric-item {
  text-align: center;
}
.metric-value {
  font-size: 18px;
  font-weight: 700;
}
.metric-label {
  font-size: 11px;
  color: #6b7280;
}
.team-footer {
  font-size: 11px;
  color: #6b7280;
  border-top: 1px solid #f3f4f6;
  padding-top: 10px;
  margin-top: 4px;
}

/* ── Severity badges ── */
.sev-badge {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}
.sev-critical, .sev-maroon { background: #fde8e8; color: maroon; }
.sev-high, .sev-red { background: #fee2e2; color: #dc2626; }
.sev-medium, .sev-orange { background: #fff3cd; color: #b45309; }
.sev-low, .sev-green { background: #d1fae5; color: #059669; }

/* ── Team badges ── */
.team-badge {
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
}
.team-network { background: #dbeafe; color: #1d4ed8; }
.team-patch { background: #d1fae5; color: #059669; }
.team-configuration { background: #ffedd5; color: #c2410c; }
.team-architectural { background: #fee2e2; color: #b91c1c; }

/* ── SLA Compliance ── */
.sla-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.sla-policy-badge {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 4px 12px;
}
.sla-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.sla-item-card {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-top: 4px solid transparent;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sla-critical { border-top-color: maroon; }
.sla-high     { border-top-color: #dc2626; }
.sla-medium   { border-top-color: goldenrod; }
.sla-low      { border-top-color: #16a34a; }

.sla-item-top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.sla-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.sla-item-label {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}
.sla-item-window {
  font-size: 11px;
  color: #9ca3af;
}
.sla-status-badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 20px;
  letter-spacing: 0.5px;
}
.sla-pass { background: #d1fae5; color: #059669; }
.sla-fail { background: #fee2e2; color: #dc2626; }

.sla-item-pct {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
}
.sla-item-bar-wrap {
  position: relative;
  background: #f3f4f6;
  border-radius: 20px;
  height: 8px;
  overflow: visible;
}
.sla-item-bar {
  height: 100%;
  border-radius: 20px;
  transition: width 0.6s ease;
}
.sla-threshold-line {
  position: absolute;
  top: -4px;
  left: 95%;
  width: 2px;
  height: 16px;
  background: #374151;
  border-radius: 2px;
}
.sla-item-footer {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
}
.sla-threshold-label {
  font-weight: 600;
  color: #374151;
}
.critical-text { color: maroon; }
.high-text { color: #dc2626; }
.medium-text { color: goldenrod; }
.low-text { color: #16a34a; }

/* ── Filters ── */
.filter-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}
.filter-group select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  cursor: pointer;
}
.filter-group select:focus {
  outline: none;
  border-color: #3121b1;
}

/* ── Table ── */
.table-wrap {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-height: 480px;
  overflow-y: auto;
}
.table-wrap::-webkit-scrollbar {
  width: 6px;
}
.table-wrap::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 0 14px 14px 0;
}
.table-wrap::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 20px;
}
.table-wrap::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
.vuln-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.vuln-table thead {
  background: #f9fafb;
  position: sticky;
  top: 0;
  z-index: 1;
}
.vuln-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-bottom: 1px solid #e5e7eb;
}
.vuln-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}
.vuln-table tbody tr:hover {
  background: #f9fafb;
}
.vuln-table tbody tr:last-child td {
  border-bottom: none;
}
.status-open {
  background: #fee2e2;
  color: #dc2626;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.status-closed {
  background: #d1fae5;
  color: #059669;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .stat-cards-row { grid-template-columns: repeat(3, 1fr); }
  .teams-grid { grid-template-columns: repeat(2, 1fr); }
  .charts-row { grid-template-columns: repeat(2, 1fr); }
  .sla-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .stat-cards-row { grid-template-columns: repeat(2, 1fr); }
  .teams-grid { grid-template-columns: 1fr; }
  .charts-row { grid-template-columns: 1fr; }
  .sla-grid { grid-template-columns: 1fr; }
}
</style>
