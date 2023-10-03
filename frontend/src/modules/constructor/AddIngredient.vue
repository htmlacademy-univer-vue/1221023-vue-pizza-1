<template>
  <li>
    <app-drag :transfer-data="ingredient">
      <span class="filling" :class="'filling--' + ingredientName(ingredient)">{{
        ingredient.name
      }}</span>
    </app-drag>
    <SimpleCounter />
  </li>
</template>
<script setup>
import { ingredientName } from "@/common/helpers";
import SimpleCounter from "@/common/components/SimpleCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

defineProps({
  ingredient: {
    type: Object,
    required: true,
  },
});
</script>
