<template>
  <main>
    <section class="bg-light">
      <div class="container-fluid">
        <div class="row">

          <div class="col-lg-12 welcome-bg">
            <div class="col-lg-10 offset-lg-2">
              <div class="container-fluid py-4">
                <!-- <div class="row">
                  <div class="d-flex flex-row">
                    <div class="mt-2">
                      <img src="@/assets/images/waving-hand.png" alt="" class="me-3">
                    </div>
                    <div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <h1 class="fw-semibold welcome-head"> Welcome to vaptfix!</h1>
                          <p class="welcome-subhead">Before we fix your information assets, ....</p>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div> -->

                <div class="row">
                  <div class="d-flex flex-row align-items-start justify-content-between w-100">

                    <!-- LEFT (UNCHANGED) -->
                    <div class="d-flex flex-row">
                      <div class="mt-2">
                        <img src="@/assets/images/waving-hand.png" alt="" class="me-3">
                      </div>

                      <div>
                        <h1 class="fw-semibold welcome-head">Welcome to vaptfix!</h1>
                        <p class="welcome-subhead">Before we fix your information assets, ....</p>
                      </div>
                    </div>

                    
                  </div>
                </div>

                <div class="row">
                  <Stepper />
                </div>

                <div class="row mt-5">
                  <div class="col-lg-9 location-card px-5 pt-5 pb-4">
                    <div class="row">
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
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(177, 35, 24, 1)"></span>
                                <span class="fw-bold" style="color: rgba(177, 35, 24, 1);">Critical <span
                                    class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i
                                    class="bi bi-info-circle ms-1"
                                    style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned Critical<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                              <select v-model="form.critical" id="Critical" name="Critical" :disabled="isLocked" class="p-2"
                                style="border-color: rgba(0, 0, 0, 0.16);margin-left: 8px;">
                                <option disabled value="">Select</option>
                                <option v-for="option in timeOptions" :key="option" :value="option">
                                  {{ option }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between gap-3">
                            <div class="mt-2">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(235, 50, 35, 1)"></span>
                                <span class="fw-bold" style="color: rgba(235, 50, 35, 1);">High <span
                                    class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i
                                    class="bi bi-info-circle ms-1"
                                    style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned high<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                              <select v-model="form.high" id="High" :disabled="isLocked" name="High" class="p-2"
                                style="border-color: rgba(0, 0, 0, 0.16);">
                                <option disabled value="">Select</option>
                                <option v-for="option in timeOptions" :key="option" :value="option" :disabled="isHighOptionDisabled(option)">
                                  {{ option }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="d-flex justify-content-start gap-5">
                          <div class="d-flex justify-content-between gap-3">
                            <div class="mt-2">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(201, 142, 0, 1)"></span>
                                <span class="fw-bold" style="color: rgba(201, 142, 0, 1);">Medium <span
                                    class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i
                                    class="bi bi-info-circle ms-1"
                                    style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned medium<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                              <select v-model="form.medium" :disabled="isLocked" id="Medium" name="Medium" class="p-2"
                                style="border-color: rgba(0, 0, 0, 0.16);">
                                <option disabled value="">Select</option>
                                <option v-for="option in timeOptions" :key="option" :value="option" :disabled="isMediumOptionDisabled(option)">
                                  {{ option }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between gap-3">
                            <div class="mt-2">
                              <span class="d-flex align-items-center">
                                <span class="rounded-circle me-1"
                                  style="width: 6px; height: 6px; background-color: rgba(78, 172, 91, 1)"></span>
                                <span class="fw-bold" style="color: rgba(78, 172, 91, 1);">Low <span
                                    class="text-danger">*</span></span>
                                <span class="info-icon" style="position:  relative; display: inline-block;"><i
                                    class="bi bi-info-circle ms-1"
                                    style="color: rgba(49, 33, 177, 1);font-size: 13px;font-weight: 600;"></i>
                                  <span class="tooltip-text">
                                    Please choose the remediation timeframe corresponding to the assigned low<br>
                                    according to this practices 2 days or 5 days
                                  </span>
                                </span>
                              </span>
                            </div>
                            <div>
                              <select v-model="form.low" :disabled="isLocked" id="Low" name="Low" class="p-2"
                                style="border-color: rgba(0, 0, 0, 0.16);margin-left: 5px;">
                                <option disabled value="">Select</option>
                                <option v-for="option in timeOptions" :key="option" :value="option" :disabled="isLowOptionDisabled(option)">
                                  {{ option }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div class="text-end">
                <router-link to="/uploadreport" class="btn stepper-btn mt-5">
                Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
                </router-link>
              </div> -->
                <div class="text-end">
                  <!-- <button class="btn stepper-btn mt-5" :disabled="loading" @click="submitRiskCriteria">
                    {{ loading ? "Saving..." : "Next" }}
                    <i class="bi bi-arrow-right-circle-fill ms-1"></i>
                  </button> -->
                  <button
  class="btn stepper-btn mt-5"
  :disabled="loading"
  @click="submitRiskCriteria"
>
  {{ loading ? "Saving..." : "Next" }}
  <i class="bi bi-arrow-right-circle-fill ms-1"></i>
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

<script>
import Stepper from '@/components/admin-component/Stepper.vue';
import Vue3Select from 'vue3-select';
import 'vue3-select/dist/vue3-select.css';
import { useAuthStore } from "@/stores/authStore";

export default {
  name: 'RiskCriteriaView',
  components: {
    Stepper,
    Vue3Select
  },

  data() {
    return {
      form: {
        critical: '',
        high: '',
        medium: '',
        low: '',
        isLocked: false
      },
      loading: false,
      message: '',
      isLocked: false,
      timeOptions: [
        '1 Day',
        '2 Days',
        '3 Days',
        '4 Days',
        '5 Days',
        '6 Days',
        '1 Week',
        '2 Weeks',
        '3 Weeks',
        '4 Weeks',
        '5 Weeks'
      ]
    };
  },

  methods: {
    // Convert time period string to days (for comparison)
    convertToDays(value) {
      if (!value) return 0;

      // Extract number from string (e.g., "2 Days" -> 2)
      const match = value.match(/^(\d+)/);
      if (!match) return 0;

      const num = parseInt(match[1]);

      // Convert weeks to days
      if (value.includes('Week')) {
        return num * 7;
      }

      // Already in days
      return num;
    },

    // Check if High option should be disabled
    isHighOptionDisabled(option) {
      if (!this.form.critical) return false;
      const criticalDays = this.convertToDays(this.form.critical);
      const optionDays = this.convertToDays(option);
      return optionDays < criticalDays;
    },

    // Check if Medium option should be disabled
    isMediumOptionDisabled(option) {
      if (!this.form.high) return false;
      const highDays = this.convertToDays(this.form.high);
      const optionDays = this.convertToDays(option);
      return optionDays < highDays;
    },

    // Check if Low option should be disabled
    isLowOptionDisabled(option) {
      if (!this.form.medium) return false;
      const mediumDays = this.convertToDays(this.form.medium);
      const optionDays = this.convertToDays(option);
      return optionDays < mediumDays;
    },

    // Validate risk criteria order
    validateRiskCriteria() {
      const criticalDays = this.convertToDays(this.form.critical);
      const highDays = this.convertToDays(this.form.high);
      const mediumDays = this.convertToDays(this.form.medium);
      const lowDays = this.convertToDays(this.form.low);

      // Check if all fields are filled
      if (!this.form.critical || !this.form.high || !this.form.medium || !this.form.low) {
        Swal.fire({
          icon: 'warning',
          title: 'Missing Fields',
          text: 'Please select values for all risk criteria fields.',
          confirmButtonText: 'OK'
        });
        return false;
      }

      // Validate: Critical <= High <= Medium <= Low (remediation time)
      if (criticalDays > highDays) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Risk Criteria',
          text: 'Critical remediation time must be less than or equal to High. Critical issues need faster resolution.',
          confirmButtonText: 'OK'
        });
        return false;
      }

      if (highDays > mediumDays) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Risk Criteria',
          text: 'High remediation time must be less than or equal to Medium.',
          confirmButtonText: 'OK'
        });
        return false;
      }

      if (mediumDays > lowDays) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Risk Criteria',
          text: 'Medium remediation time must be less than or equal to Low.',
          confirmButtonText: 'OK'
        });
        return false;
      }

      return true;
    },

    // async submitRiskCriteria() {
    //   try {
    //     this.loading = true;
    //     this.message = '';

    //     const auth = useAuthStore();
    //     const payload = {
    //       critical: this.form.critical,
    //       high: this.form.high,
    //       medium: this.form.medium,
    //       low: this.form.low,
    //     };

    //     const res = await auth.addRiskCriteria(payload);

    //     if (res.status) {
    //       console.log("✅ Risk Criteria Added:", res.data);
    //       this.message = res.message;

    //       // ✅ Show success SweetAlert
    //       await Swal.fire({
    //         icon: 'success',
    //         title: 'Success!',
    //         text: res.message,
    //         showConfirmButton: false,
    //         timer: 3000,
    //         timerProgressBar: true
    //       });

    //       this.$router.push("/uploadreport");

    //     } else {
    //       this.message = res.message || "Something went wrong";

    //       // ❌ Show error SweetAlert
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error!',
    //         text: this.message,
    //         confirmButtonText: 'OK'
    //       });
    //     }
    //   } catch (err) {
    //     console.error("❌ Error submitting Risk Criteria:", err);
    //     this.message = "An error occurred while submitting.";

    //     // ❌ Show catch error in SweetAlert
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error!',
    //       text: this.message,
    //       confirmButtonText: 'OK'
    //     });
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async submitRiskCriteria() {

  // 🔒 CASE 2: Already exists → just move next
  if (this.isLocked) {
    this.$router.push("/uploadreport");
    return;
  }

  // ✅ Validate risk criteria order before submission
  if (!this.validateRiskCriteria()) {
    return;
  }

  // 🆕 CASE 1: New user → save first
  try {
    this.loading = true;
    this.message = '';

    const auth = useAuthStore();
    const payload = {
      critical: this.form.critical,
      high: this.form.high,
      medium: this.form.medium,
      low: this.form.low,
    };

    const res = await auth.addRiskCriteria(payload);

    if (res.status) {
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: res.message,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });

      this.$router.push("/uploadreport");

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: res.message || "Something went wrong",
        confirmButtonText: 'OK'
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: "An error occurred while submitting.",
      confirmButtonText: 'OK'
    });
  } finally {
    this.loading = false;
  }
},
    async getRiskCriteria() {
  try {
    this.loading = true;

    const auth = useAuthStore();
    const res = await auth.getRiskCriteriaById();

    if (res.status && res.data?.risk_criteria) {
      const data = res.data.risk_criteria;

      this.form.critical = data.critical;
      this.form.high = data.high;
      this.form.medium = data.medium;
      this.form.low = data.low;

      this.isLocked = true;
    } else if (!res.isNotFound) {
      // Only show error if it's NOT a 404 (real error occurred)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: res.message || 'Failed to load risk criteria',
      });
    }
    // If it's a 404 (isNotFound = true), silently allow user to create new
  } catch (err) {
    console.error("❌ Unexpected error fetching risk criteria", err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An unexpected error occurred',
    });
  } finally {
    this.loading = false;
  }
    },
  },
  mounted() {
  this.getRiskCriteria();
}

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
  bottom: 125%;
  /* Position above the icon */
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
  top: 100%;
  /* Arrow position */
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
  background-image: repeating-linear-gradient(to bottom,
      #ccc,
      #ccc 4px,
      transparent 4px,
      transparent 8px);
}

.line.active {
  background-image: repeating-linear-gradient(to bottom,
      #6c47ff,
      #6c47ff 4px,
      transparent 4px,
      transparent 8px);
}
</style>
