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

                    <div class="col-11 pt-5 pb-3 px-4">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h2 class="ticket-head mt-3">Pending</h2>
                            </div>
                            <div class="d-flex flex-row mt-4">
                                <div>
                                <router-link to="/pricingplan" class="btn pending-approval-btn rounded-pill text-decoration-none">Go Premium
                                <i class="bi bi-arrow-right"></i></router-link>
                                </div>
                                <NotificationPanel />
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex flex-row align-items-center justify-content-between mt-3">
                                <div class="d-flex flex-row align-items-center justify-content-start gap-3">
                                    <button class="btn btn-danger btn-pill other-btn" @click="loadOpenTickets">Open</button>
                                    <select class="form-select border border-secondary" id="roleSelect" style="border-radius: 50px;">
                                        <option style="font-size: 15px;" selected disabled>Select Team</option>
                                        <option style="font-size: 15px;" value="patch management">Patch Management</option>
                                        <option style="font-size: 15px;" value="architectural flaws">Configuration Management</option>
                                        <option style="font-size: 15px;" value="patch management">Network Security</option>
                                        <option style="font-size: 15px;" value="patch management">Architectural Flaws</option>
                                        
                                    </select>
                                </div>
                                <div>
                                    <router-link to="/createnewticket">
                                        <button type="submit" class="btn btn-ticket py-2 px-5 me-5"><i class="bi bi-plus-lg"></i>
                                        Create a new ticket</button>
                                    </router-link>
                                </div>
                                
                            </div>
                        </div>
                        <div class="row mt-5">
                            
                            <div class="table-responsive">
                                <table class="table align-middle table-hover">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Date requested</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                    <tr v-for="(ticket, i) in tickets" :key="i">
                                        <td class="text-truncate" style="max-width: 200px;">{{ ticket.subject }}</td>
                                        <td>{{ ticket.asset }}</td>
                                        <td style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#viewRequestsModal">
                                        {{ ticket.description }}
                                        </td>
                                        <td>{{ ticket.category }}</td>
                                        <td>{{ ticket.status }}</td>
                                        <td>{{ new Date(ticket.created_at).toLocaleDateString() }}</td>
                                        <td>
                                        <router-link to="" style="text-decoration: none;">
                                            <button class="btn fw-semibold border-0" style="color: rgba(49,33,177,1);" @click="toggleChat">
                                            Chat with us <i class="bi bi-chat-dots ms-2"></i>
                                            </button>
                                        </router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                <!-- Chat Box -->
  <div v-if="showChat" class="chat-box">
  <div class="chat-middle">
    <div class="chat-header d-flex justify-content-between align-items-center px-4 py-3">
      <div class="d-flex flex-row">
        <h6 class="mb-0 fw-semibold">VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)</h6>
        
<div class="position-relative d-inline-block">
    <!-- Question Icon -->
    <i
      class="bi bi-question-circle"
      @mouseenter="showBox = true"
      @mouseleave="showBox = false"
      style="cursor: pointer; font-size: 18px;"
    ></i>

    <!-- Hover Box -->
    <div
      v-if="showBox"
      class="hover-box p-3"
    >
      <!-- Vulnerability Name -->
      <h6 class="text-center fw-semibold mb-3" style="color: rgba(49, 33, 177, 1);">
        VMware ESXi 7.0/8.0 Sandbox Escape (CVE - 2025-22225)
      </h6>

      <!-- Asset Info Card -->
      
        <!-- First row -->
        <div class="d-flex justify-content-between mb-3">
          <div class="text-center flex-fill pe-2">
            <p class="mb-1 fw-semibold text-secondary" style="font-size: 14px;">Asset:</p>
            <p class="mb-0" style="font-size: 14px;">192.68.1.42</p>
          </div>
          <div class="text-center flex-fill ps-2">
            <p class="mb-1 fw-semibold text-secondary" style="font-size: 14px;">CVSS Score:</p>
            <p class="mb-0" style="font-size: 14px;">8.1</p>
          </div>
        </div>

        <div class="asset-card p-2 mb-3">
          <p class="mb-1" style="font-size: 14px;"><strong> <i class="bi bi-check-circle-fill text-success me-1"></i> Vendor Fix Available: </strong>Yes</p>
        </div>

        <div class="asset-card p-2 mb-3">
            <p class="mb-1" style="font-size: 14px;"><i class="bi bi-check-circle-fill text-success me-1"></i> <strong>Hostname: </strong>fra-sto-shr-uat-lda9-evt-mgr-dbmigration</p>
        </div>
      

      <!-- Description Card -->
      <div class="card border rounded p-2" style="background: #e0f7f4; border-color: #97dfd5;">
        <h6 class="fw-semibold text-center mb-2">Description</h6>
        <p class="small text-muted mb-0 text-center">
          Applications that use UriComponentsBuilder in Spring Framework 
          to parse an externally provided URL (e.g. through a query parameter) 
          AND perform validation checks on the host of the parsed URL may be vulnerable.
        </p>
      </div>
    </div>
  </div>

   
</div>
      <div class="text-end gap-2" style="margin-top: -10px;">
        <button class="btn btn-sm text-dark border-0" @click="closeChat"><i class="bi bi-x-lg fs-5"></i></button>
      </div>
    </div>
    <div class="chat-messages flex-grow-1">
      <p class="text-center"><small class="text-muted">Today 10:30 AM</small></p>
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-bubble', msg.sender === 'user' ? 'user-bubble ms-auto' : 'bot-bubble']"
      >
        <span>{{ msg.text }}</span>
        <div class="chat-time">{{ msg.time }}</div>
      </div>
    </div>
    <div class="chat-input d-flex align-items-center gap-2 p-3">
      <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
      <button class="btn btn-light rounded-circle" @click="$refs.fileInput.click()">
        <i class="bi bi-paperclip"></i>
      </button>
      <input v-model="newMessage" type="text" class="form-control rounded-pill" placeholder="Type a message" @keydown.enter.exact.prevent="sendMessage" />
    </div>
    <div class="text-end me-3 mb-3">
      <button class="btn text-light" @click="sendMessage" style="background-color:rgba(49, 33, 177, 1);;">
        <i class="bi bi-send-fill"></i> Send Message
      </button>
    </div>
  </div>

  <div class="chat-right">
    <div class="text-center mb-4">
      <img src="@/assets/images/smaller-logo.png" alt="" class="mt-2" />
      <div class="d-flex justify-content-end me-4">
        <div class="avatar-container">
        <div class="avatar ava-green" ref="germany">PM</div>
      </div>
      </div>
    </div>
   
    <div class="text-center mt-4">
      <div class="d-flex justify-content-between small text-dark">
        <span><strong class="text-secondary">Asset:</strong> 192.68.1.42</span>
        <span><strong class="text-secondary">Date requested:</strong> 23/06/25</span>
      </div>
    </div>
    <div class="issue text-center mt-5 mb-4">
      <i class="bi bi-exclamation-circle text-success me-2"></i>
      <span class="text-success fw-semibold">Issues Raised for Support</span>
      <button class="btn btn-primary btn-sm rounded-pill my-2">Step 2:Code review</button>
      <button class="btn btn-primary btn-sm rounded-pill">Step 2:Code review</button>
    </div>
    <div class="right-section-item text-center">
      <h6 class="fw-semibold mb-2">Issue Description</h6>
      <p class="small text-muted mb-1">The issue has been reviewed, but the current explanation is not sufficient. Please provide additional justification to proceed further.</p>
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
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";
import { useAuthStore } from "@/stores/authStore";

export default {
    name: 'PendingView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    },
    data() {
    return {
      authStore: useAuthStore(),
      tickets: [],
      selectedDescription: "",
    };
  },
   methods: {
    async loadOpenTickets() {
    const res = await this.authStore.getOpenTickets();
    if (res.status) {
      this.tickets = this.authStore.tickets;
    }
    },
   },
   async mounted() {
    await this.loadOpenTickets(); 
  },
};
</script>

<style scoped>
.pending-approval-btn {
  background-color: rgba(236, 233, 254, 1);
  border: none;
  color: rgba(0, 0, 0, 1);
  padding: 8px 18px;
}

.pending-approval-btn:hover {
  background-color: rgb(217, 213, 243);
  color: rgba(0, 0, 0, 1);
}

.pending-approval-btn i {
  color: rgba(49, 33, 177, 1);
}
.ticket-head {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
    font-size: 36px;
}

.btn-pill {
    border-radius: 50px;
    padding: 6px 20px;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    height: 36px;
}

.active-tab {
    background-color: #E6E3FF;
    color: #3121B1;
    border: none;
    font-size: 13px;
}

.other-btn {
    /* color: rgba(0, 0, 0, 0.6); */
    border: 1px solid rgba(0, 0, 0, 0.16);
}

/* .other-btn:hover {
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.16);
    background-color: white;
} */
.btn-ticket {
    background-color: rgba(49, 33, 177, 1);
    color: #fff;
    border: none;
    border-radius: 50px;
}

.btn-ticket:hover {
    background-color: rgb(76, 57, 221);
    color: #fff;
}
.raised-table tr th {
    color: rgba(0, 0, 0, 0.6);
}
.raised-tbody tr td{
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
}
</style>