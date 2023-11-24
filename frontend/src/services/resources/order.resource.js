import { CrudService } from "@/services/api/crud.service";

export class OrderResource extends CrudService {
  constructor() {
    super("/api/orders");
  }

  getOrder() {
    return this.get();
  }
  createOrder(order) {
    return this.post(order);
  }

  removeOrder(orderId) {
    return this.delete(orderId);
  }
}
