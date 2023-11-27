import { defineStore } from "pinia";
import resources from "@/services/resources";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: null,
    name: "",
    email: "",
    avatar: "",
    phone: "",
    orders: [],
    addresses: [],
  }),
  actions: {
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    makeOrder(order) {
      this.orders.push(order);
    },
    setOrders(orders) {
      this.orders = orders;
    },
    addUserData(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar;
      this.phone = user.phone;
    },
    resetUser() {
      this.id = null;
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];
    },
    async setAddresses() {
      const data = await resources.address.getAddresses();
      this.addresses = data.data.filter(
        (address) => address.userId === this.id
      );
    },
    async addAddress(address) {
      const user = useProfileStore();
      const addressToAdd = {
        name: address.name,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
        userId: user.id,
      };
      await resources.address.addAddresses(addressToAdd);
      await this.setAddresses();
    },
  },
});
