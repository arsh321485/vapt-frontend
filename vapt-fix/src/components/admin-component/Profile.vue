<template>
  <main>
    <div class="container pt-3 pb-5">
        <div class="row mt-5 mb-2">
    <!-- Sidebar -->
    <div class="col-lg-5">
      <div class="card shadow-lg p-5" style="border-radius: 20px;">
        <!-- Profile Icon & Name -->
        <div class="text-center mb-4">
          <i class="bi bi-person-circle text-primary" style="font-size: 80px;"></i>
          <h4 class="mt-2">John Doe</h4> 
          <p class="text-muted">johndoe@example.com</p>
        </div>

        <!-- Profile Actions -->
        <div class="d-grid gap-3">
          <button
            class="btn btn-outline-primary"
            @click="activeTab = 'updateProfile'"
          >
            <i class="bi bi-pencil-square me-2"></i> Update Profile
          </button>

          <button
            class="btn btn-outline-warning"
            @click="activeTab = 'changePassword'"
          >
            <i class="bi bi-key-fill me-2"></i> Change Password
          </button>

          <button
            class="btn btn-outline-danger"
            @click="activeTab = 'logout'"
          >
            <i class="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="col-lg-7 mt-5 mt-lg-0">
      <!-- Update Profile -->
      <div
        v-if="activeTab === 'updateProfile'"
        class="card shadow-lg p-4"
        style="border-radius: 20px;"
      >
        <h3 class="text-center mb-4">Update Profile</h3>

        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input type="text" v-model="firstName" class="form-control" placeholder="Enter first name" />
        </div>

        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input type="text" v-model="lastName" class="form-control" placeholder="Enter last name" />
        </div>

        <div class="mb-3">
          <label class="form-label">Organization Name</label>
          <input type="text" v-model="orgName" class="form-control" placeholder="Enter organization name" />
        </div>

        <div class="mb-3">
          <label class="form-label">Organization URL</label>
          <input type="url" v-model="orgUrl" class="form-control" placeholder="https://example.com" />
        </div>

        <div class="text-center">
          <button class="btn btn-primary">Save Changes</button>
        </div>
      </div>

      <!-- Change Password -->
      <div
        v-if="activeTab === 'changePassword'"
        class="card shadow-lg p-4"
        style="border-radius: 20px;"
      >
        <h3 class="text-center mb-4">Change Password</h3>

        <div class="mb-3">
          <label class="form-label">Old Password</label>
          <input type="password" class="form-control" placeholder="Enter old password" />
        </div>

        <div class="mb-3">
          <label class="form-label">New Password</label>
          <input type="password" class="form-control" placeholder="Enter new password" />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirm New Password</label>
          <input type="password" class="form-control" placeholder="Re-enter new password" />
        </div>

        <div class="text-center">
          <button class="btn btn-warning">Update</button>
        </div>
      </div>

      <!-- Logout (Static) -->
    <div class="d-flex justify-content-center align-items-center" style="margin-top: 130px;">
        <div
            v-if="activeTab === 'logout'"
            class="card shadow-lg p-5 text-center"
            style="border-radius: 20px;">
            <h3 class="mb-4">Are you sure you want to logout?</h3>
            <div class="d-flex justify-content-center">
                <button class="btn btn-danger px-4">Logout</button>
            </div>
        </div>
    </div>
    </div>
  </div>
    </div>
  </main>
</template>

<script>
export default {
    name: 'Profile',
    data() {
    return {
      activeTab: "updateProfile", // default card
      firstName: "",
      lastName: "",
      orgName: "",
      orgUrl: "",
    };
  },
}
</script>

<style scoped>
.card {
  border: none;
}
</style>