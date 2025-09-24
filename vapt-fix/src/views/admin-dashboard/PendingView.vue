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
                                <button class="btn btn-danger btn-pill other-btn">Open</button>
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
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Subject</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Date requested</th>
                                            <th scop="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description.</td>
                                            <td>Bug</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>                               
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description.</td>
                                            <td>Help</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                            <td><router-link to="" style="text-decoration: none;">
                                              <button class="btn fw-semibold border-0" style="color: rgba(49, 33, 177, 1);">Chat with us <i class="bi bi-chat-dots ms-2"></i></button>
                                            </router-link></td>
                                        </tr>
                                    </tbody>
                                </table>
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
    name: 'PendingView',
    components: {
        DashboardMenu,
        DashboardHeader,
        NotificationPanel
    }
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