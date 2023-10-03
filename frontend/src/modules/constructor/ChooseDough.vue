<template>
  <label>
    <input
      type="radio"
      name="dought"
      :value="doughName(dough)"
      class="visually-hidden"
      :checked="index === 0"
      @click="selectDough"
    />
    <b>{{ dough.name }}</b>
    <span>{{ dough.description }}</span>
  </label>
</template>
<script setup>
import { doughName } from "@/common/helpers";
import AppDrag from "@/common/components/AppDrag.vue";
import {getCurrentInstance} from "vue";
const props = defineProps({
  dough: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { emit } = getCurrentInstance();

const selectDough = () => {
  emit("dough-selected", props.dough);
};
</script>
