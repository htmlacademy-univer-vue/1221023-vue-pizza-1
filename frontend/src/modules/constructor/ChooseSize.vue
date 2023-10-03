<template>
  <label>
    <input
      type="radio"
      name="diameter"
      :value="sizeName(size)"
      class="visually-hidden"
      :checked="index === 0"
      @click="selectSize"
    />
    <span>{{ size.name }}</span>
  </label>
</template>
<script setup>
import { sizeName } from "@/common/helpers";
import {getCurrentInstance} from "vue";

const props = defineProps({
  size: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { emit } = getCurrentInstance();

const selectSize = () => {
  emit("size-selected", props.size);
};
</script>
