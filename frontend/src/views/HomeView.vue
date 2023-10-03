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
                />
              </ul>
            </div>
          </SheetBlock>
        </div>
        <div class="content__pizza">
          <SimpleInput
            :hidden-span="String('Название пиццы')"
            :input-name="String('pizza_name')"
            :type="String('text')"
            :placeholder="String('Введите название пиццы')"
          />

          <pizza-constructor
            :selected-dough="selectedDough || {}"
            :selected-sauce="selectedSauce || {}"
            :selected-size="selectedSize || {}"
          />

          <div class="content__result">
            <span v-text="selectedPizzaInfo"></span>
            <p>Итого: 0 ₽</p>
            <GreenButton disabled> Готовьте! </GreenButton>
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
import SimpleInput from "@/common/components/SimpleInput.vue";
import ChooseDough from "@/modules/constructor/ChooseDough.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import ChooseSize from "@/modules/constructor/ChooseSize.vue";
import ChooseSauce from "@/modules/constructor/ChooseSauce.vue";
import AddIngredient from "@/modules/constructor/AddIngredient.vue";
import { computed, ref } from "vue";

const selectedDough = ref(null);
const updateSelectedDough = (dough) => {
  selectedDough.value = dough;
};

const selectedSauce = ref(null);

const updateSelectedSauce = (sauce) => {
  selectedSauce.value = sauce;
};

const selectedSize = ref(null);

const updateSelectedSize = (size) => {
  selectedSize.value = size;
};

const selectedPizzaInfo = computed(() => {
  const doughInfo = selectedDough.value
    ? `Тесто: ${selectedDough.value.name}`
    : "Тесто: Тонкое";
  const sauceInfo = selectedSauce.value
    ? `Соус: ${selectedSauce.value.name}`
    : "Соус: Томатный";
  const sizeInfo = selectedSize.value
    ? `Размер: ${selectedSize.value.name}`
    : "Размер: 23 см";

  const pizzaInfo = [doughInfo, sauceInfo, sizeInfo]
    .filter((info) => info !== "")
    .join(", ");

  return pizzaInfo;
});
</script>
