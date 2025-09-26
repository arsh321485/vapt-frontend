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

                    <div class="col-11 pt-5 pb-3 px-4 pe-5">
                        <div class="d-flex justify-content-between">
                            <div><h2 class="ticket-head mt-4">Support Requests</h2></div>
                            <div class="d-flex flex-row gap-3 mt-4">
                                
                                <button type="button" class="btn pending-approval-btn rounded-pill">Go Premium
                                <!-- Go premium and get exclusive support control request from us -->
                                <i class="bi bi-arrow-right ms-1 fs-5"></i>
                                </button>
                                <div class="dropdown">
                            <div class="dropdown-btn"> Select location</div>
                            <div class="dropdown-content">
                              <a href="#">Greece</a>
                              <a href="#">Germany</a>
                              <a href="#">Bahrain</a>
                            </div>
                                </div>
                                <NotificationPanel />
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="d-flex justify-content-start gap-3">
                                <button class="btn rounded-pill border px-4" style="background-color: rgba(230, 227, 255, 1);color: rgba(49, 33, 177, 1);">All</button>
                                <!-- <button class="btn rounded-pill border px-4" style="color: rgba(0, 115, 12, 1);">Approved</button>
                                <button class="btn rounded-pill border px-4" style="color: rgba(170, 0, 0, 1);">Declined</button> -->
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-arrow-down-up me-1"></i>Sort by</button>
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-funnel me-1"></i>Filter</button>
                            </div>
                        </div>

                        <div class="row mt-5">
                            
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Requested by</th>
                                            <th scope="col">Date requested</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            
                                             <td style="cursor: pointer;" 
                                                data-bs-toggle="modal" data-bs-target="#viewRequestsModal">The issue has been reviewed.
                                             </td>
                                             
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);" @click="toggleChat">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Reviewed, more justification required.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Reviewed, more justification required.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                           <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Request denied due to weak reasoning.</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- view Requests Modal -->
                      <div class="modal fade" id="viewRequestsModal" tabindex="-1" aria-labelledby="viewRequestsModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            
                            <!-- Modal Header -->
                            <div class="modal-header">
                              <h5 class="modal-title" id="viewRequestsModalLabel">Issues Raised for Support</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <!-- Modal Body -->
                            <div class="modal-body">
                              <div class="row g-2">
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 2: Code review</span>
                                </div>
                                <div class="col-4">
                                  <span class="badge rounded-pill w-100 py-2 text-center bg-primary" style="cursor: pointer; font-size: 12px;">Step 4: Code review</span>    
                                </div>
                              </div>

                              <h6 class="mt-3 fw-semibold">Description</h6>
                              <textarea class="form-control rounded-0" rows="4" readonly>The issue has been reviewed, but the current explanation is not sufficient. Please provide additional justification to proceed further.
                              </textarea>
                            </div>
                            
                            <!-- Modal Footer -->
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>

                          </div>
                        </div>
                      </div>
                            </div>

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
    <!-- <div class="d-flex justify-content-center gap-5">
      <img src="@/assets/images/smaller-logo.png" alt="" class="mt-2" />
      <p>PM</p>
    </div> -->
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

        </section>
    </main>
</template>

<script>
import DashboardMenu from '@/components/admin-component/DashboardMenu.vue';
import DashboardHeader from '@/components/admin-component/DashboardHeader.vue';
import NotificationPanel from "@/components/admin-component/NotificationPanel.vue";

export default {
    name: 'ExceptionsView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    },
    data() {
    return {
      showChat: false,
      minimized: false,
      messages: [
  { text: "Hi, can you explain the vulnerability?", sender: "bot", deletable: false, time: "10:30 AM" },
  { text: "Sure, this is related to Spring framework.", sender: "user", deletable: true, time: "10:35 AM" },
],  
showBox: false,
    };
},
 methods: {
    toggleChat() {
    this.showChat = !this.showChat;

    this.$nextTick(() => {
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
      [...popoverTriggerList].map(el => {
        new bootstrap.Popover(el, {
          container: 'body',
          html: true,
          placement: 'right'
        });
      });
    });
  },
  closeChat() {
    this.showChat = false;
  },
    closeChat() {
      this.showChat = false;
    },
    minimizeChat() {
      this.minimized = !this.minimized;
    },
    sendMessage() {
  if (this.newMessage.trim() !== "") {
    this.messages.push({
      text: this.newMessage,
      sender: "user",
      deletable: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.newMessage = "";
  }
},
    deleteMessage(index) {
      this.messages.splice(index, 1);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.messages.push({
          text: `${file.name}`,
          sender: "user",
          deletable: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    },
  },
   mounted() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(el => {
    new bootstrap.Popover(el, {
      container: 'body',   // append to body
      html: true,
      placement: 'right'
    });
  });

    const dropdown = document.querySelector('.dropdown');
    const btn = dropdown.querySelector('.dropdown-btn');
    const options = dropdown.querySelectorAll('.dropdown-content a');

    // Toggle dropdown open/close
    btn.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    // Set selected option
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        btn.textContent = option.textContent; // update button text
        dropdown.classList.remove('show'); // close dropdown
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  },
  
};
</script>

<style scoped>
.hover-box {
  position: absolute;
  top: 40px;
  right: -50px;
  width: 400px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
}

.asset-card {
  background: #ccebe7;
  border: 1px solid #97dfd5;
  border-radius: 8px;
}

.chat-box {
  border-radius: 12px;
  display: flex;
  height: 90vh;
  max-width: 900px;
  top: 54%;
  left: 65%;
  transform: translate(-50%, -50%);
  position: fixed;
  overflow: visible !important;
}

/* The left column (chat history) is removed, so chat-middle now takes its place */
.chat-middle {
  flex: 3; /* Main chat area takes up more space */
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-top-left-radius: 12px; /* Add radius for the new left edge */
  border-bottom-left-radius: 12px;
}

.chat-right {
  flex: 1.5; /* Right sidebar remains the same */
  background: #f7f7f7;
  border-left: 1px solid #e0e0e0;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 1.5rem;
}

/* Chat Header */
.chat-header {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px; /* Apply to the new top-left */
}

/* Chat Messages */
.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f7f7f7;
}

.chat-bubble {
  max-width: 70%; /* Increased max-width for bubbles */
  padding: 0.75rem 1rem;
  border-radius: 18px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.user-bubble {
  background: #e9e9f9; /* Light purple for user messages */
  color: #333;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.bot-bubble {
  background: #fff;
  border: 1px solid #e0e0e0;
  margin-right: auto;
  border-bottom-left-radius: 4px;
}

.chat-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
  text-align: right;
}

/* Chat Input */
.chat-input {
  background: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 1rem 1.5rem;
  border-bottom-left-radius: 12px; /* Apply to the new bottom-left */
}

.chat-input .form-control {
  background: #f7f7f7;
  border-radius: 25px;
  border: 1px solid #e0e0e0;
  padding: 0.75rem 1.5rem;
}

.chat-input .btn-success {
  background: rgba(49, 33, 177, 1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Right Sidebar */
.details-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.details-card h6 {
  color: #8e80e9; /* Purple for heading */
}

.details-card p strong {
  color: #555;
}

.issue{
  background: #ccebe7;
  border: 1px solid #97dfd5;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.right-section-item {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.send-btn {
  background-color: #5c47e2;
}

/* .details-card p {
  margin-bottom: 12px;
  font-size: 15px;
}
.details-card {
  background: #fff;
} */

.ticket-head {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
    font-size: 36px;
}

.raised-table tr th {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
}

.raised-tbody tr td {
    color: rgba(0, 0, 0, 1);
    font-weight: 500;
}
.fixes-btn {
    color:rgba(49, 33, 177, 1);
    font-weight: 600;
}
.fixes-red-btn {
    color:rgba(170, 0, 0, 1);
    font-weight: 600;
}

.dropdown {
    position: relative;
    display: inline-block;
    width: 200px;
}

.dropdown-btn {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 50px;
    padding: 8px 20px 8px 12px; /* extra right padding for the arrow */
    cursor: pointer;
    position: relative;
}

.dropdown-btn::after {
    content: "▼"; /* arrow symbol */
    font-size: 12px;
    color: #333;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 100%;
    border-radius: 12px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
    z-index: 1;
    margin-top: 4px;
}

.dropdown-content a {
    padding: 8px 12px;
    display: block;
    text-decoration: none;
    color: black;
    border-radius: 8px;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown.show .dropdown-content {
    display: block;
}
</style>