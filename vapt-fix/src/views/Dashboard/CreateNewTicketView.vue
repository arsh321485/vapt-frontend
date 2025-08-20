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
                        <div class="row">
                            <div class="col-5 py-3">
                                <router-link to="/supportticket" class="text-decoration-none" tag="button"
                                    style="color: rgba(49, 33, 177, 1);"><i class="bi bi-arrow-left"></i>
                                    Back</router-link>
                                <h2 class="ticket-head mt-3">Create a new ticket</h2>
                                <form>
                                <label class="ps-1 mt-5 mb-2" style="font-size: 18px;color: rgba(0, 0, 0, 1);font-weight: 500;">
                                    Asset</label>
                                <div class="position-relative" style="width: 260px;">
                                     <select class="form-select ps-3 py-2 pe-5 placeholder-style"
                                        style="background-color: rgba(246, 246, 246, 1); border: none; border-radius: 8px;">
                                    <option value="" disabled selected hidden>Select an asset...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                </div>
                                    <label class="ps-1 mt-4 mb-2" style="font-size: 18px;color: rgba(0, 0, 0, 1);font-weight: 500;">Subject</label>
                                    <input type="text" class="form-control py-2" placeholder="Write a subject..." style="border:none;background-color: rgba(246, 246, 246, 1); border-radius: 8px;">
                                    </form>
                                    <label class="ps-1 mt-4 mb-2" style="font-size: 18px;color: rgba(0, 0, 0, 1);font-weight: 500;">Description</label>
                                    <textarea type="text" class="form-control py-2 " rows="7" placeholder="Write a description..." style="border:none;background-color: rgba(246, 246, 246, 1); border-radius: 8px;"></textarea>
                                <label class="ps-1 mt-5 mb-2" style="font-size: 18px;color: rgba(0, 0, 0, 1);font-weight: 500;">
                                    Category</label>
                                <div class="position-relative" style="width: 260px;">
                                     <select class="form-select ps-3 py-2 pe-5 placeholder-style"
                                        style="background-color: rgba(246, 246, 246, 1); border: none; border-radius: 8px;">
                                    <option value="" disabled selected hidden>Select a category...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                </div>
                                <button type="submit" class="btn btn-ticket py-2 px-5 mt-5"><i class="bi bi-plus-lg"></i> Create a new ticket</button>
                            </div>
                            <div class="col-7">
                                <!-- blank -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import DashboardMenu from '@/components/DashboardMenu.vue';
import DashboardHeader from '@/components/DashboardHeader.vue';

export default {
    name: 'CreateNewTicketView',
    components: {
        DashboardMenu,
        DashboardHeader
    }
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