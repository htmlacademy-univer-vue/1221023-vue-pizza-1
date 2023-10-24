<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="counterValue === 0"
      @click="decrementCounter"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      disabled
      name="counter"
      class="counter__input"
      :value="counterValue"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="counterValue === maxValue"
      @click="incrementCounter"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";

const props = defineProps({
  initialValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: false,
  },
});

const { emit } = getCurrentInstance();

const counterValue = ref(props.initialValue);

const incrementCounter = () => {
  counterValue.value += 1;
  emit("counter-updated", counterValue.value);
};

const decrementCounter = () => {
  if (counterValue.value > 0) {
    counterValue.value -= 1;
    emit("counter-updated", counterValue.value);
  }
};
</script>
