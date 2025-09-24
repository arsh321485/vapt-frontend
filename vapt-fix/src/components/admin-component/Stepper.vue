<template>
    <main>
    <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <!-- <div class="d-flex justify-content-center py-2">
            <div class="stepper mt-3">
              <img src="@/assets/images/logo2.png" alt="">

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

            <router-link to="/riskcriteria" class="btn stepper-btn mt-5" tag="button">Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
            </router-link>

            </div>
            
        </div> -->
    
    <div class="d-flex justify-content-start align-items-center welcome-bg">
      
    <div class="stepper text-center mt-5">

    <!-- Step 1 -->
    <div
      class="step text-decoration-none position-relative" style="cursor: pointer;"
      :class="{ active: isCompletedOrActive(1), disabled: currentStep < 1 }"
      @click="goToStep(1)"
    >
    <img src="@/assets/images/smaller-logo.png" alt="logo" class="step-logo">
      <div class="step-circle">1</div>
      <div class="label">Add location and users</div>
    </div>

    <div class="line" :class="{ active: currentStep >= 2 }"></div>

    <!-- Step 2 -->
    <div
      class="step text-decoration-none " style="cursor: pointer;"
      :class="{ active: isCompletedOrActive(2) }"
      @click="goToStep(2)"
    >
    <!-- Logo above Step 2 -->
  <!-- <img src="@/assets/images/smaller-logo.png" alt="logo" class="step-logo"> -->

      <div class="step-circle">2</div>
      <div class="label">Risk Criteria</div>
    </div>

    <div class="line" :class="{ active: currentStep >= 3 }"></div>

    <!-- Step 3 -->
    <div
      class="step text-decoration-none" style="cursor: pointer;"
      :class="{ active: isCompletedOrActive(3) }"
      @click="goToStep(3)"
    >
      <div class="step-circle">3</div>
      <div class="label">Vulnerability report</div>
    </div>
    </div>
      </div>
      </div>
    </div>
    </section>

    <!-- Next Button -->
      <!-- <button class="btn stepper-btn mt-5" @click="goNext">
        Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
      </button> -->
    </main>
</template>

<script>
export default {
  name: 'Stepper',
   data() {
    return {
      steps: ["/location", "/riskcriteria", "/uploadreport"],
    };
  },
  computed: {
    currentStep() {
      return this.steps.indexOf(this.$route.path) + 1;
    },
  },
 methods: {
  isCompletedOrActive(step) {
    return step <= this.currentStep;
  },
  goToStep(step) {
    const currentIndex = this.currentStep;

    // Going forward (only next step allowed)
    if (step === currentIndex + 1) {
      this.$router.push(this.steps[step - 1]);
    }

    // Going backward (only previous step allowed)
    if (step === currentIndex - 1) {
      this.$router.push(this.steps[step - 1]);
    }
  }
}

  }
</script>


<style scoped>
/* .step.disabled {
  cursor: pointer;
  opacity: 0.5;
} */
.stepper {
  gap: 1.5rem;
  display: flex;
  flex-direction: row; /* Horizontal instead of column */
  align-items: center;
  justify-content: center;
}

.step {
  display: flex;
  flex-direction: column; /* Keep number above text */
  align-items: center;
  text-align: center;
  min-width: 150px;
  position: relative; /* Ensures spacing between steps */
}

.step-logo {
  position: absolute;
  top: -140px;
  left: -70%;
  transform: translateX(-50%);
  /* height: 70%;
  width: 20%; */
  height: 80px;
  width: 40px;
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
  margin-bottom: 6px;
}

.step.active .step-circle {
  background-color: #6c47ff;
  color: white;
}

.label {
  font-size: 0.875rem;
  color: #6c757d;
}

.step.active .label {
  color: #000;
  font-weight: 500;
}

.line {
  flex-grow: 1;
  height: 2px; /* thin horizontal line */
  min-width: 130px; /* 👈 ensures line is visible */
  background-image: repeating-linear-gradient(
    to right,
    #6c757d,
    #6c757d 4px,
    transparent 4px,
    transparent 8px
  );
}

.line.active {
  background-image: repeating-linear-gradient(
    to right,
    #6c47ff,   
    #6c47ff 4px,
    transparent 4px,
    transparent 8px
  );
}


</style>