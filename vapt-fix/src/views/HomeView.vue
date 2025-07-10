
<template>
  <main>
    <Header />

    <!-- hero section -->
    <section class="hero-section">
      <div class="container-fluid">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <p><i class="bi bi-shield-fill-check"></i> Vetted, tested security. Trusted by experts</p>
          <h1>Secure your assets with proven fixes and clear steps.</h1>
          <p class="hero-text">Security isn’t just about finding flaws—it’s about fixing them fast. We close the gaps that reports leave behind, giving you lasting protection.</p>
          <div class="hero-div-btn">
            <button type="button" class="btn hero-btn">Fix your vulnerabilities now <i class="bi bi-arrow-right-circle-fill fs-5 ms-1"></i></button>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
          <!-- <div class="hero-img">
            <img src="../assets/images/hero-img.png" alt="">
          </div> -->
          <div class="cyber-bg">
            <img src="../assets/images/hero-img.png" alt="Cyber Security" class="center-img" />
          </div>
        </div>
      </div>
     </div>
    </section>
     
    <!-- Why post VAPT Remidiation is broken -->
    <section class="remidiation-section fluid-padding">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <p class="warning"><i class="bi bi-exclamation-triangle-fill"></i> The problem</p>
            <h2 class="fw-semibold">Why post VAPT Remidiation is broken</h2>
          </div>
          <div class="col-lg-6 d-flex flex-column justify-content-end">
            <p>Most cybersecurity teams run a VAPT exercise and stop at the report. But what happens after the vulnerabilities are discovered? They sit in spreadsheets, lost in handoffs, or ignored in long development cycles.</p>
          </div>
        </div>

        <div class="row remidiation-cards">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="mb-5">
              <img src="../assets/images/ownership.png" class="" alt="...">
              <h5 class="card-title">No clear ownership</h5>
              <p class="card-text mt-2">No clear ownership. No clear ownership. No clear ownership. No clear ownership. No clear ownership.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="mb-5">
              <img src="../assets/images/guidance.png" class="" alt="...">
              <h5 class="card-title">Vague remediation guidance</h5>
              <p class="card-text mt-2">No clear ownership. No clear ownership. No clear ownership. No clear ownership. No clear ownership.</p>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="mb-5">
              <img src="../assets/images/prioritization.png" class="" alt="...">
              <h5 class="card-title">No risk prioritization</h5>
              <p class="card-text mt-2">No clear ownership. No clear ownership. No clear ownership. No clear ownership. No clear ownership.</p>
            </div>
          </div>
        </div>

        <div class="row result-row">
          <div class="col-lg-6 col-md-6">
            <p class="warning"><i class="bi bi-exclamation-triangle-fill"></i> The problem</p>
            <h2 class="fw-semibold">The result?</h2>
            <div class="">
              <p class="mt-lg-5 mt-5">Most cybersecurity teams run a VAPT exercise and stop at the report. But what happens after the vulnerabilities are discovered? They sit in spreadsheets, lost in handoffs, or ignored in long development cycles.</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 mt-lg-5 mt-md-5">
          <div class="result-box text-center p-4 mt-5">
            <p class="mb-3">Start for free, no obligations.</p>
            <button type="button" class="btn fw-semibold">
              Fix your vulnerabilities now 
              <i class="bi bi-arrow-right-circle-fill fs-5 ms-1"></i>
            </button>
          </div>
        </div>

        </div>
      </div>
    </section>

    <!-- Our Approach to Quick Remediation -->
     <section class="our-approach">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12 our-approach-top">
          </div>
        </div>
        
        <div class="row our-approach-box">
          <div class="text-center mt-3">
              <p><i class="bi bi-puzzle-fill"></i> Our solution</p>
              <h1>Our Approach to Quick<br> Remediation</h1>
          </div>
          <!-- <div class="col-lg-12">
            <div class="col-lg-6">
              <div style="background: linear-gradient(107.2deg, #28282F 1.06%, #090913 99.51%);height: 300px;width: 400px;">
                <img src="" alt="">
              </div>
              <h3>AI driven contextual insights</h3>
              <p>AI-driven contextual insights analyze your infrastructure in real time, identifying not just vulnerabilities but the surrounding conditions, usage patterns, and dependencies that make them critical.</p>
            </div>
            <div class="col-lg-6">

            </div>
            <div class="col-lg-6">

            </div>
            <div class="col-lg-6">

            </div>
          </div> -->
        </div>
        

        </div>
     </section>

  </main>
</template>

<script lang="ts">
import Header from '../components/Header.vue';
export default {
  name: 'HomeView',
  components: {
    Header
  }
};
</script>
