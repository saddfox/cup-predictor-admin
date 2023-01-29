import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    host: "http://localhost:7000",
    token: "",
    expiry: 0,
    cup: null,
    cupList: [],
  }),
  actions: {},
});
