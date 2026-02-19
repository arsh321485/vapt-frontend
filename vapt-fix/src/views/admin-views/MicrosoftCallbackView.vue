<template>
  <div class="callback-loading">
    <p>Connecting Microsoft Teams...</p>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";

export default {
  async mounted() {
    const authStore = useAuthStore();

    try {
      // backend sends access_token in query OR fragment
      const params = new URLSearchParams(window.location.search);

      const accessToken =
        params.get("access_token") ||
        params.get("token") ||
        params.get("ms_token");

      if (!accessToken) {
        Swal.fire("Error", "Microsoft access token missing", "error");
        this.$router.push("/settings");
        return;
      }

      // 🔥 CALL LOGIN API
      const res = await authStore.microsoftLogin(accessToken);

      if (res.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Microsoft Teams connected successfully",
          timer: 2000,
          showConfirmButton: false
        });

        // notify parent window if needed
        window.opener?.postMessage({ type: "TEAMS_CONNECTED" }, "*");

        this.$router.push("/settings");
      } else {
        Swal.fire("Error", "Microsoft login failed", "error");
        this.$router.push("/settings");
      }
    } catch (err) {
      console.error("Microsoft callback error:", err);
      Swal.fire("Error", "Microsoft connection failed", "error");
      this.$router.push("/settings");
    }
  }
};
</script>

