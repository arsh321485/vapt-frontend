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
                            <div><h2 class="ticket-head mt-4">Exceptions</h2></div>
                            <div>
                                <button type="button" class="btn pending-approval-btn rounded-pill mt-4">
                                Go premium and get exclusive Compensatory control support from us
                                <i class="bi bi-arrow-right ms-1 fs-5"></i>
                            </button>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="d-flex justify-content-start gap-3">
                                <button class="btn rounded-pill border px-4" style="background-color: rgba(230, 227, 255, 1);color: rgba(49, 33, 177, 1);">All</button>
                                <button class="btn rounded-pill border px-4" style="color: rgba(0, 115, 12, 1);">Approved</button>
                                <button class="btn rounded-pill border px-4" style="color: rgba(170, 0, 0, 1);">Declined</button>
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-arrow-down-up me-1"></i>Sort by</button>
                                <button class="btn btn-sm py-1 px-2" style="border-radius: 20px;border-color: rgba(0, 0, 0, 0.12);"><i class="bi bi-funnel me-1"></i>Filter</button>
                            </div>
                        </div>

                        <div class="row mt-5">
                            <h6 class="fw-semibold mb-3">Requested today</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Comment added</th>
                                            <th scope="col">Requested by</th>
                                            <th scope="col">Date requested</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <!-- <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button> -->
                                                <!-- Approve Button -->
<button class="btn fixes-btn border-0" data-bs-toggle="modal" data-bs-target="#approveModal">
  Approve
  <i class="bi bi-arrow-right-circle-fill"></i>
</button>

<!-- Decline Button -->
<button class="btn fixes-red-btn border-0" data-bs-toggle="modal" data-bs-target="#declineModal">
  Decline
  <i class="bi bi-arrow-right-circle-fill"></i>
</button>

<!-- Approve Modal -->
<div class="modal fade" id="approveModal" tabindex="-1" aria-labelledby="approveModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="approveModalLabel">Approve Compensatory Control?</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body pt-4 pb-4">
        <p class="text-muted pb-3">Do you want to approve VMware ESXi 7.0/8.0 Sandbox... ?</p>
        <div class="d-flex justify-content-start gap-3 mt-3">
            <button class="btn rounded-pill text-light" style="background-color: rgba(49, 33, 177, 1);">Approve Compensatory Control</button>
            <button class="btn border-0 text-danger" data-bs-dismiss="modal" style="font-weight: 600;">Decline</button>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div> -->
    </div>
  </div>
</div>

<!-- Decline Modal -->
<div class="modal fade" id="declineModal" tabindex="-1" aria-labelledby="declineModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="declineModalLabel">Decline Compensatory Control?</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <label for="exampleFormControlTextarea1" class="form-label text-muted">Reason for declining the compensatory control..</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" style="border-radius: 8px;" rows="3"></textarea>
        <div class="d-flex justify-content-start gap-3 mt-3">
            <button class="btn rounded-pill text-light" style="background-color: rgba(49, 33, 177, 1);">Decline Compensatory Control</button>
            <button class="btn border-0 text-danger" data-bs-dismiss="modal" style="font-weight: 600;">Decline</button>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div> -->
    </div>
  </div>
</div>

                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            <div class="row mt-5">
                            <h6 class="fw-semibold mb-3">Requested earlier this week</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">Comment added</th>
                                            <th scope="col">Requested by</th>
                                            <th scope="col">Date requested</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                    </button>
                                                    <button class="btn fixes-red-btn">
                                                        Decline 
                                                        <i class="bi bi-arrow-right-circle-fill"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>Developer name</td>
                                            <td>23/06/25</td>
                                            <td>
                                                <div class="d-flex justify-content-around">
                                                    <button class="btn fixes-btn">
                                                    Approve
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                <button class="btn fixes-red-btn">
                                                    Decline 
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>
                                                </div>
                                            </td>
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
import Swal from "sweetalert2";

export default {
    name: 'ExceptionsView',
    components: {
        DashboardMenu,
        DashboardHeader
    },
   
};
</script>

<style scoped>
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
</style>