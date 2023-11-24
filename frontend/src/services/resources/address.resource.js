import { CrudService } from "@/services/api/crud.service";

export class AddressesResource extends CrudService {
  constructor() {
    super("/api/addresses");
  }

  getAddresses() {
    return this.get();
  }
  addAddresses(address) {
    return this.post(address);
  }
  updateAddresses(address) {
    return this.put(address);
  }
  deleteAddresses(addressId) {
    return this.delete(addressId);
  }
}
