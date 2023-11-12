import { defineStore } from "pinia";
import daughJson from '@/mocks/dough.json'
import ingredientsJson from '@/mocks/ingredients.json'
import saucesJson from '@/mocks/sauces.json'
import sizesJson from '@/mocks/sizes.json'
import miscJson from '@/mocks/misc.json'
import {doughNormalize, sizeNormalize, ingredientNormalize, sauceNormalize} from "@/common/helpers";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: daughJson.map(doughNormalize),
    ingredients: ingredientsJson.map(ingredientNormalize),
    sauces: saucesJson.map(sauceNormalize),
    sizes: sizesJson.map(sizeNormalize),
    misc: miscJson,
  }),
  getters: {},
  actions: {},
});
