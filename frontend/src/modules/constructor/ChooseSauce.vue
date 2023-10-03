<template>
  <label>
    <input
      type="radio"
      name="sauce"
      :value="sauceName(sauce)"
      :checked="index === 0"
      @click="selectSauce"
    />
    <span>{{ sauce.name }}</span>
  </label>
</template>
<script setup>
import { sauceName } from "@/common/helpers";
import {getCurrentInstance} from "vue";

const props = defineProps({
  sauce: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { emit } = getCurrentInstance();

const selectSauce = () => {
  emit("sauce-selected", props.sauce);
};
</script>
