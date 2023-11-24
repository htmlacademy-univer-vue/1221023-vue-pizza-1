import { AddressResource } from "@/services/resources/address.resource";
import { DoughResource } from "@/services/resources/address.resource";
import { SizeResource } from "@/services/resources/address.resource";
import { SauceResource } from "@/services/resources/address.resource";
import { OrderResource } from "@/services/resources/address.resource";
import { MiscResource } from "@/services/resources/address.resource";
import { IngredientsResource } from "@/services/resources/address.resource";
export default {
  address: new AddressResource(),
  dough: new DoughResource(),
  size: new SizeResource(),
  sauce: new SauceResource(),
  order: new OrderResource(),
  misc: new MiscResource(),
  ingredients: new IngredientsResource(),
};
