<template>
  <li>
    <app-drag :transfer-data="ingredient">
      <span class="filling" :class="'filling--' + ingredientName(ingredient)">{{
        ingredient.name
      }}</span>
    </app-drag>
    <SimpleCounter
      :initial-value="getIngredientCount(ingredient)"
      :max-value="3"
      @counter-updated="handleCounterUpdate(ingredient, $event)"
    />
  </li>
</template>
<script setup>
import { ingredientName } from "@/common/helpers";
import SimpleCounter from "@/common/components/SimpleCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

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
  const selectedIngredient = props.selectedIngredients[ingredient.id].value;

  return selectedIngredient ? selectedIngredient : 0;
};

const handleCounterUpdate = (ingredient, count) => {
  props.updateSelectedIngredients(ingredient, count);
};
</script>
