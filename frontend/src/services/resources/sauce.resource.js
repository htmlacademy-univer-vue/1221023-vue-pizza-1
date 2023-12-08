import { CrudService } from "@/services/api/crud.service";

export class SauceResource extends CrudService {
  constructor() {
    super("/api/sauce");
  }

  getSauce() {
    return this.get();
  }
}
