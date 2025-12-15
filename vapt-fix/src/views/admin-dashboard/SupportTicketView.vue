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
                                <h2 class="ticket-head mt-3">Support Tickets</h2>
                            </div>
                            <div class="d-flex flex-row mt-4">
                                <div>
                                <button type="button" class="btn pending-approval-btn rounded-pill">
                                Go Premium
                                <i class="bi bi-arrow-right ms-1 fs-5"></i>
                                </button>
                            </div>
                            <NotificationPanel />
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex flex-row align-items-center justify-content-between mt-3">
                                <div class="d-flex gap-3">
                                    <button class="btn btn-primary btn-pill active-tab fw-semibold" @click="loadAllTickets">All</button>
                                    <button class="btn btn-danger btn-pill other-btn" @click="loadOpenTickets">Open</button>
                                    <button class="btn btn-success btn-pill other-btn" @click="loadClosedTickets">Closed</button>
                                </div>
                                <!-- <div>
                                    <router-link to="/createnewticket">
                                        <button type="submit" class="btn btn-ticket py-2 px-5"><i class="bi bi-plus-lg"></i>
                                        Create a new ticket</button>
                                    </router-link>
                                </div> -->
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
                                            <th scop="col"></th>
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
                                            <button class="btn fw-semibold border-0" style="color: rgba(49,33,177,1);">
                                            Chat with us <i class="bi bi-chat-dots ms-2"></i>
                                            </button>
                                        </router-link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        <!-- view Requests Modal -->
                      <div class="modal fade" id="viewRequestsModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Issues Raised for Support</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <h6 class="fw-semibold">Description</h6>
            <textarea class="form-control rounded-0" rows="4" readonly>
              {{ selectedDescription }}
            </textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    name: 'SupportTicketView',
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
    async loadAllTickets() {
      const res = await this.authStore.getAllTickets();
      if (res.status) {
        this.tickets = this.authStore.tickets;
      }
    },
    async loadOpenTickets() {
    const res = await this.authStore.getOpenTickets();
    if (res.status) {
      this.tickets = this.authStore.tickets;
    }
    },
    async loadClosedTickets() {
    const res = await this.authStore.getClosedTickets();
    if (res.status) {
      this.tickets = this.authStore.tickets;
    }
    },
  },

  async mounted() {
    await this.loadAllTickets(); 
  },
};
</script>

<style scoped>
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