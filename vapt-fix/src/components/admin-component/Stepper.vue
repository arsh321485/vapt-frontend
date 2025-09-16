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
    
        <div class="d-flex justify-content-center py-2">
    <div class="stepper mt-3">
      <img src="@/assets/images/logo2.png" alt="" />

      <!-- Step 1 -->
      <router-link
        to="/location"
        class="step text-decoration-none"
        :class="{ active: isCompletedOrActive(1) }"
      >
        <div class="step-circle">1</div>
        <div class="label">Add location and users</div>
      </router-link>

      <div class="line" :class="{ active: currentStep >= 2 }"></div>

      <!-- Step 2 -->
      <router-link
        to="/riskcriteria"
        class="step text-decoration-none"
        :class="{ active: isCompletedOrActive(2) }"
      >
        <div class="step-circle">2</div>
        <div class="label">Risk Criteria</div>
      </router-link>

      <div class="line" :class="{ active: currentStep >= 3 }"></div>

      <!-- Step 3 -->
      <router-link
        to="/uploadreport"
        class="step text-decoration-none"
        :class="{ active: isCompletedOrActive(3) }"
      >
        <div class="step-circle">3</div>
        <div class="label">Vulnerability report</div>
      </router-link>

      <!-- Next Button -->
      <button class="btn stepper-btn mt-5" @click="goNext">
        Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
      </button>
    </div>
  </div>
      </div>
    </div>
    </section>
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
    goNext() {
       // special case for riskcriteria
      if (this.$route.path === "/uploadreport") {
        this.$router.push("/admindashboardonboarding");
        return;
      }
      const currentIndex = this.steps.indexOf(this.$route.path);
      if (currentIndex < this.steps.length - 1) {
        this.$router.push(this.steps[currentIndex + 1]);
      }
    },
  },
  }
</script>


<style scoped>
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