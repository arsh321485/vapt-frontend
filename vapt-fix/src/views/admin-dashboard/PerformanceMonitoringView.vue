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
            <div class="d-flex justify-content-between mt-4">
              <h2 class="ticket-head ">Performance Monitoring</h2>
                <NotificationPanel />
            </div>

            <!-- both section here  -->

            <!-- Main Chart -->
            <section class="charts-section">
                <div class="chart-card">
                    <div class="chart-title">Mitigated Vulnerabilities: Severity vs Team Performance</div>
                    <canvas id="mitigatedRadarChart" height="450"></canvas>
                </div>
            </section>

            <!-- Team Performance Overview - 2x2 Grid -->
            <section>
                <h2 class="section-h2"><i class="fas fa-users"></i> Team Performance Overview</h2>
                <div class="teams-grid">
                    <!-- Row 1: Network Security & Patch Management -->
                    <div class="team-card" style="border-left-color: #3b82f6;">
                        <div class="team-header">
                            <div class="team-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">🔗</div>
                            <div>
                                <div class="team-name">Network Security Team</div>
                                <div class="team-total" style="color: #3b82f6;">48 Total Vulnerabilities assigned</div>
                            </div>
                        </div>
                        <div class="team-metrics">
                            <div class="metric-item"><div class="metric-value" style="color: #059669;">38</div><div class="metric-label">Closed</div></div>
                            <div class="metric-item"><div class="metric-value" style="color: #dc2626;">10</div><div class="metric-label">Open</div></div>
                            <div class="metric-item"><div class="status-badge severity-maroon">3 critical</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-red">15 high</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-orange">20 medium</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-darkgreen">10 low</div><div class="metric-label"></div></div>
                        </div>
                        <div style="font-size: 0.95rem; color: #64748b; font-weight: 500;">79% Closure Rate | 4.2 days avg | 2 overdue</div>
                    </div>

                    <div class="team-card" style="border-left-color: #10b981;">
                        <div class="team-header">
                            <div class="team-icon" style="background: linear-gradient(135deg, #10b981, #059669);">🔧</div>
                            <div>
                                <div class="team-name">Patch Management Team</div>
                                <div class="team-total" style="color: #10b981;">62 Total Vulnerabilities assigned</div>
                            </div>
                        </div>
                        <div class="team-metrics">
                            <div class="metric-item"><div class="metric-value" style="color: #059669;">52</div><div class="metric-label">Closed</div></div>
                            <div class="metric-item"><div class="metric-value" style="color: #dc2626;">8</div><div class="metric-label">Open</div></div>
                            <div class="metric-item"><div class="status-badge severity-maroon">8 critical</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-red">22 high</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-orange">25 medium</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-darkgreen">7 low</div><div class="metric-label"></div></div>
                        </div>
                        <div style="font-size: 0.95rem; color: #64748b; font-weight: 500;">84% Closure Rate | 3.8 days avg | 0 overdue</div>
                    </div>

                    <!-- Row 2: Configuration Management & Architectural Flaws -->
                    <div class="team-card" style="border-left-color: #f97316;">
                        <div class="team-header">
                            <div class="team-icon" style="background: linear-gradient(135deg, #f97316, #ea580c);">⚙️</div>
                            <div>
                                <div class="team-name">Configuration Management Team</div>
                                <div class="team-total" style="color: #f97316;">42 Total Vulnerabilities assigned</div>
                            </div>
                        </div>
                        <div class="team-metrics">
                            <div class="metric-item"><div class="metric-value" style="color: #059669;">35</div><div class="metric-label">Closed</div></div>
                            <div class="metric-item"><div class="metric-value" style="color: #dc2626;">6</div><div class="metric-label">Open</div></div>
                            <div class="metric-item"><div class="status-badge severity-maroon">2 critical</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-red">12 high</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-orange">18 medium</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-darkgreen">10 low</div><div class="metric-label"></div></div>
                        </div>
                        <div style="font-size: 0.95rem; color: #64748b; font-weight: 500;">83% Closure Rate | 5.1 days avg | 1 overdue</div>
                    </div>

                    <div class="team-card" style="border-left-color: #dc2626;">
                        <div class="team-header">
                            <div class="team-icon" style="background: linear-gradient(135deg, #dc2626, #b91c1c);">🏗️</div>
                            <div>
                                <div class="team-name">Architectural Flaws Team</div>
                                <div class="team-total" style="color: #dc2626;">35 Total Vulnerabilities assigned</div>
                            </div>
                        </div>
                        <div class="team-metrics">
                            <div class="metric-item"><div class="metric-value" style="color: #059669;">25</div><div class="metric-label">Closed</div></div>
                            <div class="metric-item"><div class="metric-value" style="color: #dc2626;">11</div><div class="metric-label">Open</div></div>
                            <div class="metric-item"><div class="status-badge severity-maroon">5 critical</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-red">10 high</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-orange">12 medium</div><div class="metric-label"></div></div>
                            <div class="metric-item"><div class="status-badge severity-darkgreen">8 low</div><div class="metric-label"></div></div>
                        </div>
                        <div style="font-size: 0.95rem; color: #64748b; font-weight: 500;">71% Closure Rate | 7.3 days avg | 4 overdue</div>
                    </div>
                </div>
            </section>

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
export default {
  name: 'PerformanceMonitoringView',
  components: {
    DashboardMenu,
    DashboardHeader,
    NotificationPanel,
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      new Chart(document.getElementById('mitigatedRadarChart').getContext('2d'), {
        type: 'radar',
        data: {
          labels: ['Critical', 'High', 'Medium', 'Low'],
          datasets: [
            { label: 'Network Security', data: [25, 35, 45, 28], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.15)' },
            { label: 'Patch Mgmt', data: [45, 55, 62, 35], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.15)' },
            { label: 'Config Mgmt', data: [20, 30, 42, 32], borderColor: '#f97316', backgroundColor: 'rgba(249,115,22,0.15)' },
            { label: 'Arch Flaws', data: [15, 25, 30, 22], borderColor: '#dc2626', backgroundColor: 'rgba(220,38,38,0.15)' }
          ]
        },
        options: {
          responsive: true,
          scales: { r: { beginAtZero: true, max: 70, pointLabels: { font: { size: 12 } } } },
          plugins: { legend: { position: 'top' } }
        }
      });
    };
    document.head.appendChild(script);
  }
};
</script>

<style scoped>
.ticket-head {
  color: rgba(0, 0, 0, 1);
  font-weight: 500;
  font-size: 36px;
}

/* Section heading */
.section-h2 { font-size: 2rem; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }

/* Charts Section */
.charts-section { display: grid; grid-template-columns: 1fr; gap: 30px; margin-bottom: 40px; }
.chart-card { background: white; padding: 35px; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
.chart-title { font-size: 1.4rem; font-weight: 600; color: #1e293b; margin-bottom: 25px; text-align: center; }

/* Team Overview Cards - 2x2 Grid */
.teams-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px; }
@media (max-width: 1100px) { .teams-grid { grid-template-columns: 1fr; } }
.team-card { background: white; padding: 35px; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.1); border-left: 8px solid; height: 100%; }
.team-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.team-icon { font-size: 2.5rem; width: 70px; height: 70px; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: white; }
.team-name { font-size: 1.5rem; font-weight: 700; color: #1e293b; flex: 1; }
.team-total { font-size: 2rem; font-weight: 800; }
.team-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }
.metric-item { text-align: center; padding: 15px 10px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 14px; }
.metric-value { font-size: 1.4rem; font-weight: 700; margin-bottom: 5px; }
.metric-label { font-size: 0.85rem; color: #64748b; }
.status-badge { padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; display: inline-block; }
.severity-maroon { background: #dc2626; color: white; }
.severity-red { background: #ef4444; color: white; }
.severity-orange { background: #f97316; color: white; }
.severity-darkgreen { background: #008000; color: white; }
</style>
