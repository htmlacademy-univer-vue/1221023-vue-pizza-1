<template>
  <li>
    <app-drag
      :transfer-data="ingredient"
      :draggable="getIngredientCount(ingredient) < 3"
    >
      <span class="filling" :class="'filling--' + ingredientName(ingredient)">{{
        ingredient.name
      }}</span>
    </app-drag>
    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="getInitialValue(ingredient) === 0"
        @click="decrementCounter(ingredient)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        disabled
        name="counter"
        class="counter__input"
        :value="getInitialValue(ingredient)"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="getInitialValue(ingredient) === MAX_INGREDIENT_COUNT"
        @click="incrementCounter(ingredient)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>
<script setup>
import { ingredientName } from "@/common/helpers";
import AppDrag from "@/common/components/AppDrag.vue";
import {MAX_INGREDIENT_COUNT} from "@/common/constants";

const props = defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
  selectedIngredients: {
    type: Object,
    required: true,
  },
  updateSelectedIngredients: {
    type: Function,
    required: true,
  },
});

const getIngredientCount = (ingredient) => {
  const selectedIngredient = props.selectedIngredients[ingredient.id];
  return selectedIngredient ? selectedIngredient : 0;
};

const getInitialValue = (ingredient) => {
  return props.selectedIngredients[ingredient.id];
};

const incrementCounter = (ingredient) => {
  const currentCount = getIngredientCount(ingredient);
  if (currentCount < 3) {
    props.updateSelectedIngredients(ingredient, currentCount + 1);
  }
};

const decrementCounter = (ingredient) => {
  const currentCount = getIngredientCount(ingredient);
  if (currentCount > 0) {
    props.updateSelectedIngredients(ingredient, currentCount - 1);
  }
};
</script>
