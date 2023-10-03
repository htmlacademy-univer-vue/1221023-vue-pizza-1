<template>
  <app-drop>
    <div class="content__constructor">
      <div ref="pizza" class="pizza" :class="pizzaClass">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredientId) in filteredIngredients"
            :key="ingredientId"
            class="pizza__filling"
            :class="[
              'pizza__filling--' + ingredientName(ingredientId),
              ingredientId.count === 2
                ? 'pizza__filling--second'
                : ingredientId.count === 3
                ? 'pizza__filling--third'
                : '',
            ]"
          ></div>
        </div>
      </div>
    </div>
  </app-drop>
</template>
<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { computed } from "vue";
import {
  doughName,
  ingredientName,
  sauceName,
  sizeName,
} from "@/common/helpers";

const props = defineProps({
  selectedDough: {
    type: Object,
    required: true,
  },
  selectedSauce: {
    type: Object,
    required: true,
  },
  selectedSize: {
    type: Object,
    required: true,
  },
  selectedIngredients: {
    type: Object,
    required: true,
  },
});

const pizzaClass = computed(() => {
  let sauce = "tomato";
  let daugh = "light";
  if (Object.keys(props.selectedDough).length !== 0) {
    daugh = doughName(props.selectedDough);
  }
  if (Object.keys(props.selectedSauce).length !== 0) {
    sauce = sauceName(props.selectedSauce);
  }
  return `pizza--foundation--${daugh}-${sauce}`;
});

const pizzaStyle = computed(() => {
  let size = "small";
  let width = "50%";
  if (Object.keys(props.selectedSize).length !== 0) {
    size = sizeName(props.selectedSize);
  }
  if (size === "normal") {
    width = "75%";
  } else if (size === "big") {
    width = "100%";
  }
  return {
    width,
  };
});

const filteredIngredients = computed(() => {
  return Object.entries(props.selectedIngredients)
    .filter(([ingredientId, count]) => count > 0)
    .map(([ingredientId, count]) => {
      return {
        id: ingredientId,
        count: count,
      };
    });
});
</script>
