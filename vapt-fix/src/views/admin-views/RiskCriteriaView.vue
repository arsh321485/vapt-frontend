<template>
  <main>
    <!-- TOP BAR -->
    <div class="topbar">
      <img src="@/assets/images/logo-capital.png" alt="" class="h-50">
    </div>

    <div class="app">
      <!-- STEPPER -->
      <Stepper />

      <!-- CONTENT -->
      <div class="content">
        <h1>Risk Criteria</h1>
        <p>Define the governance framework for timely vulnerability mitigation and risk reduction.</p>

        <div class="risk-layout">
          <div class="risk-left">
            <div class="risk-card area-critical risk-card-bg">
              <div class="risk-header">
                <span class="dot critical-bg"></span>
                Critical<span class="text-danger">*</span>
                <span class="info-tooltip">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">
                    Please choose the remediation timeframe corresponding to the assigned
                    Critical according to best practices (2 or 5 days).
                  </span>
                </span>
              </div>
              <select class="form-select">
                <option>Select</option>
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks</option>
                <option>5 Weeks</option>
              </select>
            </div>
            <div class="risk-card area-high risk-card-bg">
              <div class="risk-header">
                <span class="dot high-bg"></span>
                High<span class="text-danger">*</span>
                <span class="info-tooltip">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">
                    High-risk vulnerabilities should be remediated within defined SLA timelines.
                  </span>
                </span>
              </div>
              <select class="form-select">
                <option>Select</option>
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks</option>
                <option>5 Weeks</option>
              </select>
            </div>
            <div class="risk-card area-medium risk-card-bg">
              <div class="risk-header">
                <span class="dot medium-bg"></span>
                Medium<span class="text-danger">*</span>
                <span class="info-tooltip">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">
                    Medium vulnerabilities have moderate impact and flexible remediation windows.
                  </span>
                </span>
              </div>
              <select class="form-select">
                <option>Select</option>
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks</option>
                <option>5 Weeks</option>
              </select>
            </div>
            <div class="risk-card area-low risk-card-bg">
              <div class="risk-header">
                <span class="dot low-bg"></span>
                Low<span class="text-danger">*</span>
                <span class="info-tooltip">
                  <span class="info-icon">i</span>
                  <span class="tooltip-text">
                    Low-risk vulnerabilities can be remediated during routine maintenance cycles.
                  </span>
                </span>
              </div>
              <select class="form-select">
                <option>Select</option>
                <option>1 Day</option>
                <option>2 Days</option>
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>3 Weeks</option>
                <option>4 Weeks</option>
                <option>5 Weeks</option>
              </select>
            </div>
          </div>

          <div class="risk-card security-card area-security">
  <h5 class="mb-2">Security Level</h5>

  <div class="security-grid">

    <div class="security-item">
      <div class="security-title critical">
        <span class="dot"></span>
        <strong class="critical-text">Critical</strong>
      </div>
      <p>
        Assets essential for the organisation to operate; their loss can cause
        severe operational, legal, or financial damage.
      </p>
    </div>

    <div class="security-item">
      <div class="security-title high">
        <span class="dot"></span>
        <strong class="high-text">High</strong>
      </div>
      <p>
        Important assets whose compromise would significantly disrupt operations
        or result in financial loss.
      </p>
    </div>

    <div class="security-item">
      <div class="security-title medium">
        <span class="dot"></span>
        <strong class="medium-text">Medium</strong>
      </div>
      <p>
        Assets with moderate importance that may cause inconvenience or delays if
        lost or exposed.
      </p>
    </div>

    <div class="security-item">
      <div class="security-title low">
        <span class="dot"></span>
        <strong class="low-text">Low</strong>
      </div>
      <p>
        Assets whose loss or exposure has little to no impact on business
        operations.
      </p>
    </div>

  </div>
</div>


        </div>

        <div class="cta">
          <router-link to="/uploadreport" class="btn btn-primary text-decoration-none">Continue to Vulnerability Report →</router-link>
        </div>

      </div>

    </div>
  </main>
</template>

<script>
import Stepper from '@/components/admin-component/Stepper.vue';

export default {
  name: "RiskCriteriaView",
  components: {
    Stepper,
  },
};
</script>

<style scoped>
  .security-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.security-title .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* COLORS – SAME AS LEFT */
.security-title.critical .dot {
  background: maroon; /* maroon */
}

.security-title.high .dot {
  background: red; /* red/orange */
}

.security-title.medium .dot {
  background: orange; /* yellow */
}

.security-title.low .dot {
  background: #22c55e; /* green */
}

.security-item p {
  margin-bottom: 0;
  font-size: 13px;
  line-height: 1.45;
  color: #374151;
}

/* MAIN LAYOUT */
.risk-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}


/* LEFT SIDE: keeps your old grid */
.risk-left {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

/* RIGHT SIDE */
.risk-right {
  display: flex;
}

/* Security card fills empty vertical space */
.security-card {
  width: 100%;
  box-shadow: 8px 10px 28px rgba(117, 100, 248, 0.35);
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* gap: 14px; */
  gap: 16px 24px;
}

/* Each block aligns like left risk cards */
.security-item {
  font-size: 13px;
  line-height: 1.5;
  color: #374151;
}

/* .security-item p {
  margin-bottom: 0;
  font-size: 15px;
} */


.security-item strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
}

/* Text colors */
.critical-text {
  /* color: #dc2626; */
  color: maroon;
}

.high-text {
  color: red;
}

.medium-text {
  color: orange;
}

.low-text {
  color: #16a34a;
}

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #F3F5FA;
  border-bottom: 1px solid #e6e9f2;
  display: flex;
  align-items: center;
  padding: 0 32px;
  z-index: 1000;
}

.app {
  display: flex;
}

/* ===== CONTENT ===== */
.content {
  margin-left: 260px;
  margin-top: 64px;
  height: calc(100vh - 20px);
  padding: 48px 64px;
}


.content h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 6px;
}

.content p {
  color: #6b7280;
}

/* ===== RISK GRID ===== */
.risk-card {
  background: #FFFFFF;
  /* border: 1.5px solid #e6e9f2; */
  border-radius: 18px;
  padding: 24px;
  /* box-shadow: 8px 10px 28px rgba(117, 100, 248, 0.35); */
}

.risk-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.critical-bg {
  background: maroon;
}

.high-bg {
  background: red;
}

.medium-bg {
  background: orange;
}

.low-bg {
  background: #22c55e;
}

.risk-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}

select.form-select {
  border-radius: 12px;
  padding: 12px;
  /* font-size: 14px; */
}

/* ===== INFO TOOLTIP ===== */
.info-tooltip {
  position: relative;
  display: inline-block;
}

.info-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #5a44ff;
  color: #5a44ff;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 140%;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #ffffff;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.4;
  width: 260px;
  z-index: 20;
  transition: opacity 0.2s ease;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #111827 transparent transparent transparent;
}

.info-tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* ===== CTA ===== */
.cta {
  margin-top: 64px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
}


.btn-secondary {
  border-radius: 14px;
  padding: 14px 28px;
  font-weight: 600;
  background: #e5e7eb;
  border: none;
}

.btn-primary {
  background: #5a44ff;
  border: none;
  border-radius: 14px;
  padding: 16px 36px;
  font-weight: 600;
  font-size: 15px;
}

/* ===== Smooth transitions ===== */
.risk-card,
.btn-primary,
.btn-secondary {
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.risk-card-bg {
  background-color: rgba(117, 100, 248, 0.10);
}

/* ===== Risk card hover ===== */
.risk-card:hover {
 
  transform: translateY(-3px);
}

/* ===== Select hover focus polish ===== */
select.form-select {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

select.form-select:focus {
  border-color: #5a44ff;
  box-shadow: 0 0 0 3px rgba(90, 68, 255, 0.15);
}

/* ===== CTA button hover ===== */
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(90, 68, 255, 0.28);
}

/* ===== Secondary button (if used later) ===== */
.btn-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
}

/* ===== Tooltip micro animation ===== */
.tooltip-text {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.info-tooltip:hover .tooltip-text {
  transform: translateX(-50%) translateY(-4px);
}

.security-card p {
  line-height: 1.3;
  color: #374151;
  font-size: 13px;
}

.security-card h5 {
  font-weight: 700;
}

/* iPad Mini */
@media (max-width: 768px) {
  .content {
    margin-left: 0px;
    margin-top: 200px;
    height: auto;
  }
  .risk-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }
  .cta {
    margin-top: 35px;
    margin-bottom: 0;
  }
}

/* iPad Air */
@media (max-width: 992px) {
  .risk-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }
  .content {
    margin-left: 0px;
    margin-top: 200px;
    height: auto;
    padding: 20px 40px;
  }
  .cta {
    margin-top: 190px;
    margin-bottom: 0;
  }
  /* .app {
    grid-template-columns: 1fr;
  } */
  .risk-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "critical"
      "high"
      "medium"
      "low"
      "security";
  }
  .security-right {
    grid-column: auto;
    grid-row: auto;
  }
}

/* iPad Pro */
@media (max-width: 1200px) {
  .risk-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }
  .content {
    margin-left: 0px;
    margin-top: 200px;
    height: auto;
    padding: 45px 55px;
  }
  .cta {
    margin-top: 385px;
    margin-bottom: 0;
  }
}

/* larger screen */
@media screen and (min-width: 1920px) {
  .content {
    height: auto;
  }
  .cta {
    margin-top: 480px;
    margin-bottom: 0;
  }
  .security-card p {
    font-size: 18px;
}
}
</style>
