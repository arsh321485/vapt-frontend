<template>
    <main>
    <section class="bg-light">
    <div class="container-fluid">
    <div class="row">
        <div class="d-flex justify-content-center py-2">
            <div class="stepper ">
                <a class="navbar-brand fs-3 fw-semibold" href="#">vaptfix</a>
        
            <div class="step active">
                <div class="step-circle">1</div>
                <div class="label">Add location and users</div>
            </div>

            <div class="line active"></div>


            <div class="step">
                <div class="step-circle">2</div>
                <div class="label">Configure teams</div>
            </div>

            <div class="line"></div>

            
            <div class="step">
                <div class="step-circle">3</div>
                <div class="label">Vulnerability report</div>
            </div>

            <div class="line"></div>

            
            <div class="step">
                <div class="step-circle">4</div>
                <div class="label">All done</div>
            </div>
            <!-- <button type="button" class="btn stepper-btn mt-5">Next <i class="bi bi-arrow-right-circle-fill ms-1"></i></button> -->
             <router-link to="/configureteams" class="btn stepper-btn mt-5" tag="button">
  Next <i class="bi bi-arrow-right-circle-fill ms-1"></i>
</router-link>

            </div>
            
        </div>
        </div>

                </div>
      
        </section>
        
    </main>
</template>

<script>
export default {
  name: 'Stepper'
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