<template>
    <main>
    <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <div class="col-lg-2">
            <!-- <Stepper /> -->
              <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <div class="d-flex justify-content-center py-2">
            <div class="stepper mt-3">
                <!-- <a class="navbar-brand fs-3 fw-semibold" href="#">vaptfix</a> -->
              <img src="@/assets/images/logo2.png" alt="">
              <img src="" alt="">
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="label">Add location and users</div>
            </div>

            <div class="line active"></div>


            <div class="step">
                <div class="step-circle">2</div>
                <div class="label">Risk Criteria</div>
            </div> 

            <div class="line"></div>

            
            <div class="step">
                <div class="step-circle">3</div>
                <div class="label">Vulnerability report</div>
            </div>

             <router-link to="/uploadreport" class="btn stepper-btn mt-5" tag="button">
  Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
</router-link>

            </div>
            
        </div>
    </div>
    </div>
              </section>
        </div>
        <div class="col-lg-10 my-3">
            <div class="container-fluid welcome-bg py-5 px-5">
              <div class="row">
                <div class="col-1 d-flex justify-content-center align-items-center mb-3">
                  <img src="@/assets/images/waving-hand.png" alt="">
                </div>
                <div class="col-11">
                  <h1 class="fw-semibold welcome-head"> Welcome to vaptfix!</h1>
                  <p class="welcome-subhead">Before we fix your information assets, ....</p>
                </div>
              </div>
              
              <div class="row mt-5">
                <div class="col-lg-9 location-card py-4 px-4">
                  <div class="row">
                    <router-link to="/location" class="mb-3" style="color: rgba(49, 33, 177, 1);text-decoration: none;">
                                <i class="bi bi-arrow-left"></i> Back
                                </router-link>
                    <div class="col-1 d-flex justify-content-center align-items-center location-icon">
                      <i class="bi bi-exclamation-triangle-fill fs-4"></i>
                    </div>
                    <div class="col-lg-7">
                      
                      <h3 class="fw-semibold">Risk Criteria</h3>
                      <p class="text-muted" style="font-size: 15px;">Set timelines for vulnerability criticaity</p>
                      
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-10 pb-5 pt-3">
                        <div class="d-flex justify-content-start gap-5 mb-4">
                            <div class="d-flex justify-content-between gap-3">
                                <div class="mt-2">
                                <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(177, 35, 24, 1)"
                                ></span>
                                <span class="fw-bold" style="color: rgba(177, 35, 24, 1);">Critical <span class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned Critical<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                                </div>
                                <div>
                                <select id="Critical" name="Critical" class="p-2" style="border-color: rgba(0, 0, 0, 0.16);margin-left: 8px;">
                              
                                    <option value="">1 Day</option>
                                    <option value="">2 Days</option>
                                    <option value="">3 Days</option>
                                    <option value="">4 Days</option>
                                    <option value="">5 Days</option>
                                    <option value="">6 Days</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Weeks</option>
                                    <option value="">3 Weeks</option>
                                    <option value="">4 Weeks</option>
                                    <option value="">5 Weeks</option>
                                </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between gap-3">
                                <div class="mt-2">
                                <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(235, 50, 35, 1)"
                                ></span>
                                <span class="fw-bold" style="color: rgba(235, 50, 35, 1);">High <span class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned high<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                                <select id="High" name="High" class="p-2" style="border-color: rgba(0, 0, 0, 0.16);">
                                    <option value="">1 Day</option>
                                    <option value="">2 Days</option>
                                    <option value="">3 Days</option>
                                    <option value="">4 Days</option>
                                    <option value="">5 Days</option>
                                    <option value="">6 Days</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Weeks</option>
                                    <option value="">3 Weeks</option>
                                    <option value="">4 Weeks</option>
                                    <option value="">5 Weeks</option>
                                </select>
                            </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-start gap-5">
                            <div class="d-flex justify-content-between gap-3">
                                <div class="mt-2">
                                <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(201, 142, 0, 1)"
                                ></span>
                                <span class="fw-bold" style="color: rgba(201, 142, 0, 1);">Medium <span class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned medium<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                                </div>
                                <div>
                                <select id="Medium" name="Medium" class="p-2" style="border-color: rgba(0, 0, 0, 0.16);">
                                    <option value="">1 Day</option>
                                    <option value="">2 Days</option>
                                    <option value="">3 Days</option>
                                    <option value="">4 Days</option>
                                    <option value="">5 Days</option>
                                    <option value="">6 Days</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Weeks</option>
                                    <option value="">3 Weeks</option>
                                    <option value="">4 Weeks</option>
                                    <option value="">5 Weeks</option>
                                </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between gap-3">
                                <div class="mt-2">
                                <span class="d-flex align-items-center">
                                <span
                                  class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(78, 172, 91, 1)"
                                ></span>
                                <span class="fw-bold" style="color: rgba(78, 172, 91, 1);">Low <span class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i class="bi bi-info-circle ms-1" style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned low<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                                <select id="Low" name="Low" class="p-2" style="border-color: rgba(0, 0, 0, 0.16);margin-left: 5px;">
                                    <option value="">1 Day</option>
                                    <option value="">2 Days</option>
                                    <option value="">3 Days</option>
                                    <option value="">4 Days</option>
                                    <option value="">5 Days</option>
                                    <option value="">6 Days</option>
                                    <option value="">1 Week</option>
                                    <option value="">2 Weeks</option>
                                    <option value="">3 Weeks</option>
                                    <option value="">4 Weeks</option>
                                    <option value="">5 Weeks</option>
                                </select>
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
import Stepper from '@/components/admin-component/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';

export default {
  name: 'RiskCriteriaView',
  components: {
    Stepper,
    Vue3Select
  },
  
};
</script>

<style scoped>
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


  /* stepper */
  .stepper {
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e4e4e4;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.step.active .step-circle {
  background-color: #6c47ff;
  color: white;
}
.label {
  margin-top: 6px;
  font-size: 0.875rem;
  color: #6c757d;
}
.step.active .label {
  color: #000;
  font-weight: 500;
}
.line {
  width: 2px;
  height: 70px;
  background-image: repeating-linear-gradient(
    to bottom,
    #ccc,
    #ccc 4px,
    transparent 4px,
    transparent 8px
  );
}
.line.active {
  background-image: repeating-linear-gradient(
    to bottom,
    #6c47ff,
    #6c47ff 4px,
    transparent 4px,
    transparent 8px
  );
}
</style>
