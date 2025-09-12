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

                    <div class="col-11 pt-2 pb-3 px-4">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h2 class="ticket-head mt-3">Support tickets</h2>
                            </div>
                            <div>
                                <button type="button" class="btn pending-approval-btn rounded-pill mt-4">
                                Choose premium and ask vaptfix for support 
                                <i class="bi bi-arrow-right ms-1 fs-5"></i>
                            </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex flex-row align-items-center justify-content-between mt-3">
                                <div class="d-flex gap-3">
                                    <button class="btn btn-primary btn-pill active-tab fw-semibold">All</button>
                                    <button class="btn btn-danger btn-pill other-btn">Open</button>
                                    <button class="btn btn-success btn-pill other-btn">Closed</button>
                                </div>
                                <div>
                                    <router-link to="/createnewticket">
                                        <button type="submit" class="btn btn-ticket py-2 px-5"><i class="bi bi-plus-lg"></i>
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
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description. This is the description.</td>
                                            <td>Bug</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description. This is the description.</td>
                                            <td>Help</td>
                                            <td>Close</td>
                                            <td>23/06/2025</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description. This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Close</td>
                                            <td>23/06/2025</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description. This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>This is the description. This is the description.</td>
                                            <td>Feature request</td>
                                            <td>Open</td>
                                            <td>23/06/2025</td>
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

export default {
    name: 'SupportTicketView',
    components: {
        DashboardMenu,
        DashboardHeader
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