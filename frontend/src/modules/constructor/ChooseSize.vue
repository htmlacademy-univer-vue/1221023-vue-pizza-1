<template>
  <app-drag :transfer-data="size">
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
  </app-drag>
</template>
<script setup>
import AppDrag from "@/common/components/AppDrag.vue";
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
