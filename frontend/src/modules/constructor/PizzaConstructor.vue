<template>
  <app-drop>
    <div class="content__constructor">
      <div ref="pizza" class="pizza" :class="pizzaClass" :style="pizzaStyle">
        <div class="pizza__wrapper"></div>
      </div>
    </div>
  </app-drop>
</template>
<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { computed } from "vue";
import {doughName, sauceName, sizeName} from "@/common/helpers";

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
  let size = "small"; // Default size
  let width = "50%"; // Default width
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
</script>
