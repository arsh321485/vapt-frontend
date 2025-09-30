import { defineStore } from "pinia";
import endpoint from "../services/apiServices";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    token: null as any,
  }),
  actions: {
    async signup(payload: any) {
      const { data } = await endpoint.post("/admin/users/signup/", payload);
      return data;
    },
    getAuthorization() {
      const auth = localStorage.getItem("authorization");
      return auth ? JSON.parse(auth) : null;
    },
    
  },
});
