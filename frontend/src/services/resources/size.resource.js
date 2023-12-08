import { CrudService } from "@/services/api/crud.service";

export class SizeResource extends CrudService {
  constructor() {
    super("http://localhost:3000/size");
  }

  getSize() {
    return this.get();
  }
}
