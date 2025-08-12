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

          <div class="col-11 pt-2 pb-3 pe-5">
            <div class="row">
                <router-link to="/mitigationstrategy">
                <button class="my-4" style="color: rgba(49, 33, 177, 1);background-color: white;border: 0;"><i class="bi bi-arrow-left"></i> Back</button>
                </router-link>
            </div>             
        
            <div class="row">
                <h2 class="ticket-head">Missing security updates</h2>
                        <div class="row mt-5">
                            <h6 class="fw-semibold mb-3"><i class="bi bi-microsoft me-1"></i> Microsoft(23 assets)</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Estimated effort</th>
                                            <th scope="col">Dependency</th>
                                            <th scope="col">Assigned to</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                <router-link to="/Vulnerabilitycard">
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button> 
                                                </router-link> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
            </div>

            <div class="row">
                        <div class="row mt-5">
                            <h6 class="fw-semibold mb-3"><i class="bi bi-microsoft me-1"></i> Apple(61 assets)</h6>
                            <div class="table-responsive">
                                <table class="table align-middle table-borderless">
                                    <thead class="raised-table">
                                        <tr>
                                            <th scope="col">Vul. name</th>
                                            <th scope="col">Asset</th>
                                            <th scope="col">OS</th>
                                            <th scope="col">Estimated effort</th>
                                            <th scope="col">Dependency</th>
                                            <th scope="col">Assigned to</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="raised-tbody">
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-truncate" style="max-width: 200px;">VMware ESXi 7.0/8.0
                                                Sandbox Escape...</td>
                                            <td>192.68.1.42</td>
                                            <td>Windows 10</td>
                                            <td>4 hours</td>
                                            <td>Developers</td>
                                            <td>Aditi Bose</td>
                                            <td>
                                                 <button class="btn fixes-btn">
                                                    View
                                                    <i class="bi bi-arrow-right-circle-fill"></i>
                                                </button>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import DashboardMenu from "@/components/DashboardMenu.vue";
import DashboardHeader from "@/components/DashboardHeader.vue";

export default {
  name: "MissingSecurityUpdatesView",
  components: {
    DashboardMenu,
    DashboardHeader,
  }
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
