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

                    <div class="col-11 pt-2 pb-3 px-4 pe-5">
                        <div class="d-flex justify-content-between">
                            <div><h2 class="ticket-head mt-4">Support Requests</h2></div>
                            <div class="d-flex flex-row gap-3 mt-4">
                                
                                <button type="button" class="btn pending-approval-btn rounded-pill">Go premium and get exclusive support
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
    <div
      v-if="showChat"
      class="chat-box"
    >
      <!-- Left Column -->
      <div class="chat-left">
        <!-- Header -->
        <div class="chat-header d-flex justify-content-between align-items-center px-3 py-3">
          <h6 class="mb-0 fw-semibold">
            CVE-2024-22259 - org.springframework:spring-web
          </h6>
          <div class="d-flex flex-row gap-2">
            <!-- <button class="btn btn-sm text-secondary" @click="minimizeChat"><i class="bi bi-dash-lg"></i></button> -->
            <button class="btn btn-sm text-dark border-0" @click="closeChat"><i class="bi bi-x-lg fs-5"></i></button>
          </div>
        </div>

        <!-- Messages -->
        <div class="chat-messages flex-grow-1 p-3">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['chat-bubble', msg.sender === 'user' ? 'user-bubble ms-auto' : 'bot-bubble']"
          >
            <span>{{ msg.text }}</span>
  <div class="chat-time">
    {{ msg.time }}
  </div>
            <button
              v-if="msg.deletable"
              class="btn btn-sm text-danger delete-btn"
              @click="deleteMessage(index)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input d-flex align-items-center gap-2 p-2">
          <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
          <button class="btn btn-light" @click="$refs.fileInput.click()">
            <i class="bi bi-paperclip"></i>
          </button>
          <input
            v-model="newMessage"
            type="text"
            class="form-control rounded-pill"
            placeholder="Type a message..."
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.shift.enter.stop
          />
          <button class="btn btn-success rounded-circle" @click="sendMessage">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>

      <!-- Right Column -->
      <div class="chat-right p-4">
        <div class="text-center mb-3">
          <img
            src="@/assets/images/smaller-logo.png"
            alt="Logo"
            class="mt-2"/>
        </div>
        <div class="details-card p-3 text-center">
          <p><strong>Asset:</strong> 192.168.1.42</p>
          <p><strong>Category:</strong> Bug</p>
          <p><strong>Severity:</strong> <span class="text-danger fw-bold">High</span></p>
          <p><strong>Description:</strong> <br>Applications that use UriComponentsBuilder in Spring FrameworkÂ to parse an externally provided URL (e.g. through a query parameter) ANDÂ perform validation checks on the host of the parsed URL may be vulnerable to a open redirect <a href="https://cwe.mitre.org/data/definitions/601.html">https://cwe.mitre.org/data/definitions/601.html</a></p>
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
  { text: "Hi, can you explain the vulnerability?", sender: "user", deletable: true, time: "10:30 AM" },
  { text: "Sure, this is related to Spring framework.", sender: "bot", deletable: false, time: "10:31 AM" },
],

      newMessage: "",
    };
},
 methods: {
    toggleChat() {
      this.showChat = true;
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
          text: `📎 ${file.name}`,
          sender: "user",
          deletable: true,
        });
      }
    },
  },
   mounted() {
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
.chat-time {
  font-size: 11px;
  color: gray;
  text-align: right;
}
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 900px;
  height: 550px;
  /* background: transparent; */
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  top: 50px;    
  bottom: auto;
}

.chat-left {
  flex: 7;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
   /* background: #e5ddd5;   */
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: hidden;
}

.chat-header {
  background: #f0f2f5;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 12px;
}

.chat-messages {
  flex-grow: 1;
  background: #e5ddd5;
  overflow-y: auto;
}

.chat-bubble {
  max-width: 70%;
  padding: 5px 13px;
  border-radius: 18px;
  position: relative;
  margin-bottom: 8px;
  word-wrap: break-word;
}

.user-bubble {
  background: #d9fdd3;
  text-align: right;
}

.bot-bubble {
  background: #fff;
  border: 1px solid #ddd;
}

.delete-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
  background: white;
  border-radius: 50%;
  padding: 0;
}

.chat-input {
  background: #f0f2f5;
  border-bottom-left-radius: 12px;
}

.chat-right {
  flex: 5;
  background: #fafafa;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.details-card p {
  margin-bottom: 12px;
  font-size: 15px;
}
.details-card {
  background: #fff;
}

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