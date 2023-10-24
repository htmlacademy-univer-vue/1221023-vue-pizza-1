<template>
  <main class="content">
    <form action="#" method="post">
      <BigBlock>
        <template #title>Конструктор пиццы</template>
        <div class="content__dough">
          <SheetBlock :class-name="'dough'">
            <template #title>Выберите тесто</template>
            <choose-dough
              v-for="(dough, index) in doughs"
              :key="dough.id"
              :dough="dough"
              class="dough__input"
              :class="'dough__input--' + doughName(dough)"
              :index="index"
              :selected-dough="selectedDough"
              @dough-selected="updateSelectedDough"
            />
          </SheetBlock>
        </div>
        <div class="content__diameter">
          <SheetBlock :class-name="'diameter'">
            <template #title>Выберите размер</template>
            <choose-size
              v-for="(size, index) in sizes"
              :key="size.id"
              :size="size"
              :index="index"
              class="diameter__input"
              :selected-size="selectedSize"
              :class="'diameter__input--' + sizeName(size)"
              @size-selected="updateSelectedSize"
            />
          </SheetBlock>
        </div>
        <div class="content__ingredients">
          <SheetBlock :class-name="'ingredients'">
            <template #title>Выберите ингредиенты</template>
            <div class="ingredients__sauce">
              <p>Основной соус:</p>
              <choose-sauce
                v-for="(sauce, index) in sauces"
                :key="sauce.id"
                class="radio ingredients__input"
                :sauce="sauce"
                :index="index"
                :selected-sauce="selectedSauce"
                @sauce-selected="updateSelectedSauce"
              />
            </div>
            <div class="ingredients__filling">
              <p>Начинка:</p>

              <ul class="ingredients__list">
                <add-ingredient
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                  class="ingredients__item"
                  :ingredient="ingredient"
                  :selected-ingredients="selectedIngredients || {}"
                  :update-selected-ingredients="updateSelectedIngredients"
                />
              </ul>
            </div>
          </SheetBlock>
        </div>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaName"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :selected-dough="selectedDough || {}"
            :selected-sauce="selectedSauce || {}"
            :selected-size="selectedSize || {}"
            :selected-ingredients="selectedIngredients || {}"
          />

          <div class="content__result">
            <p v-text="'Итого: ' + totalPriceInfo + ' ₽'"></p>
            <GreenButton :disabled="isButtonDisabled" @click="printInfo"> Готовьте! </GreenButton>
          </div>
        </div>
      </BigBlock>
    </form>
  </main>
</template>

<script setup>
import doughs from "../mocks/dough.json";
import sizes from "../mocks/sizes.json";
import ingredients from "../mocks/ingredients.json";
import sauces from "../mocks/sauces.json";

import { doughName, sizeName } from "@/common/helpers";
import BigBlock from "@/common/components/BigBlock.vue";
import SheetBlock from "@/common/components/SheetBlock.vue";
import GreenButton from "@/common/components/GreenButton.vue";
import ChooseDough from "@/modules/constructor/ChooseDough.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import ChooseSize from "@/modules/constructor/ChooseSize.vue";
import ChooseSauce from "@/modules/constructor/ChooseSauce.vue";
import AddIngredient from "@/modules/constructor/AddIngredient.vue";
import {computed, ref} from "vue";

const selectedDough = ref(doughs[0]);
const updateSelectedDough = (dough) => {
  selectedDough.value = dough;
};

const selectedSauce = ref(sauces[0]);

const isButtonDisabled = computed(() => {
  return pizzaName.value.length === 0;
});
const updateSelectedSauce = (sauce) => {
  selectedSauce.value = sauce;
};

const selectedSize = ref(sizes[0]);
const pizzaName = ref("");
const updateSelectedSize = (size) => {
  selectedSize.value = size;
};

const selectedIngredients = ref([]);

ingredients.forEach((ingredient) => {
  selectedIngredients.value[ingredient.id] = 0;
});
const updateSelectedIngredients = (ingredient, count) => {
  selectedIngredients.value[ingredient.id] = count;
};

function printInfo(){
    console.log(pizzaName.value)
    console.log(selectedIngredients.value)
    console.log(selectedSize.value)
    console.log(selectedDough.value)
    console.log(selectedSauce.value)
    console.log(totalPriceInfo.value)
}

const totalPriceInfo = computed(() => {

  const doughPrice = selectedDough.value
    ? selectedDough.value.price
    : doughs[0].price;
  const saucePrice = selectedDough.value
    ? selectedSauce.value.price
    : sauces[0].price;

  const sizeMultiplier = selectedSize.value
    ? selectedSize.value.multiplier
    : sizes[0].multiplier;


  let totalPrice = Object.entries(selectedIngredients.value)
    .filter(([ingredientId, count]) => count > 0)
    .reduce((total, [ingredientId, count]) => {
      const ingredient = ingredients.find((i) => i.id === parseInt(ingredientId));
      return total + ingredient.price * count;
    }, 0);

  totalPrice = (totalPrice + saucePrice + doughPrice) * sizeMultiplier;

  return totalPrice;
});
</script>
