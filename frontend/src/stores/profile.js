import { defineStore } from "pinia";
import addresseseJson from '@/mocks/addresses.json'

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: addresseseJson
  }),
  getters: {},
  actions: {},
});
