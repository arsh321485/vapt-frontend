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

                    <div class="col-11 pt-5 mt-2 pb-3 px-4">
                        <div class="row">
                            <div class="col-6 py-3">
                                <router-link to="/supportticket" class="text-decoration-none" tag="button"
                                    style="color: rgba(49, 33, 177, 1);"><i class="bi bi-arrow-left"></i>
                                    Back</router-link>
                                <h2 class="ticket-head mt-3">Create a new ticket</h2>
                                  <form>
                                    
                                    <label class="ps-1 mt-5 mb-2">Category</label>
<select
  v-model="selectedCategory"
  class="form-select ps-3 py-2"
  style="background:#f6f6f6;border:none;border-radius:8px;"
>
  <option value="" disabled>Select a category...</option>
  <option value="bug">Report a bug</option>
  <option value="fix">Fix steps not working</option>
  <option value="other">Other</option>
</select>
<label class="ps-1 mt-4 mb-2">Asset</label>
<input
  type="text"
  class="form-control py-2"
  v-model="selectedAsset"
  readonly
  style="background:#f6f6f6;border:none;border-radius:8px;"
/>
<label class="ps-1 mt-4 mb-2">Subject</label>
<input
  v-model="subject"
  type="text"
  class="form-control py-2"
  placeholder="Write a subject..."
  style="background:#f6f6f6;border:none;border-radius:8px;"
/>
<label class="ps-1 mt-4 mb-2">Description</label>
<textarea
  v-model="description"
  class="form-control py-2"
  rows="7"
  :placeholder="descriptionPlaceholder"
  style="background:#f6f6f6;border:none;border-radius:8px;"
></textarea>
                                    </form>
                                   
                                <button type="submit" class="btn btn-ticket py-2 px-5 mt-5" data-bs-toggle="modal" data-bs-target="#ticketModal"><i class="bi bi-plus-lg"></i> Create a new ticket</button>
                            </div>

                            <!-- Modal -->
                  <div class="modal fade" id="ticketModal" tabindex="-1" aria-labelledby="ticketModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content rounded-3">
                        <div class="modal-header">
                          <h5 class="modal-title fw-semibold" id="ticketModalLabel">Confirmation</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body">
                          Please make sure you have followed all the recommendations on vulnerability card before submitting ticket.
                        </div>
                        
                        <div class="modal-footer">
                          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal" @click="submitTicket">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>

                            <div class="col-4">
                                <!-- blank -->
                            </div>
                            <div class="col-2 pt-4">
                                <div class="row py-3 px-3">
                                    <select class="form-select rounded-pill" v-model="selectedLocation">
                                        <option disabled value="">Select location</option>
                                        <option value="germany">Germany</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="bahrain">Bahrain</option>
                                        <option value="greece">Greece</option>
                                    </select>
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
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';
import { useAuthStore } from "@/stores/authStore";
import Swal from "sweetalert2";

export default {
    name: 'CreateNewTicketView',
    components: {
        DashboardMenu,
        DashboardHeader
    },
    data() {
    return {
      selectedLocation: "greece", 
      selectedCategory: "",
      selectedAsset: "",
      subject: "",
      description: "",
      adminId: "", 
      reportId: "", 
      fixVulnerabilityId: ""
    };
},
created() {
  const { reportId, fixVulId, asset } = this.$route.params;

  console.log("Ticket Page Params:", reportId, fixVulId, asset);

  this.reportId = reportId || "";
  this.fixVulnerabilityId = fixVulId || "";
  this.selectedAsset = asset || "";
  },
 computed: {
    descriptionPlaceholder() {
      if (this.selectedCategory === "fix") {
        return "Please make sure you have followed our steps. What issue are you facing?";
      }
      return "Write your description here";
    },
  },
  methods: {
    async submitTicket() {
  if (!this.selectedCategory || !this.subject || !this.description) {
    Swal.fire({
      icon: "warning",
      title: "Please fill all required fields",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  const authStore = useAuthStore();

  const payload = {
    category: this.selectedCategory,
    subject: this.subject,
    description: this.description
  };

  const res = await authStore.createTicket(
    this.reportId,
    this.fixVulnerabilityId,
    payload
  );

  if (res.status) {
    Swal.fire({
      icon: "success",
      title: "Ticket Created Successfully",
      timer: 3000,
      showConfirmButton: false
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: res.message,
      timer: 3000,
      showConfirmButton: false
    });
  }
},
  },
};
</script>

<style scoped>
.ticket-head {
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
    font-size: 36px;
}
.placeholder-style {
    color: rgba(0, 0, 0, 0.6);
  }

  .placeholder-style option:not([value=""]) {
    color: rgba(0, 0, 0, 1);
  }
  .btn-ticket {
      background-color: rgba(49, 33, 177, 1);
      color: #fff;
      border: none;
      border-radius: 50px;
    }
    .btn-ticket:hover{
      background-color: rgb(76, 57, 221);
      color: #fff;
    }
</style>