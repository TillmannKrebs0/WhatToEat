<template>
  <q-slider
    v-model="state.time"
    color=positive
    markers
    snap
    :min="0"
    :max="120"
    :step=10
    :markers="10"
    @update:model-value="emitTime"
  />
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:model-value"]);

const state = reactive({
  time: props.modelValue,
});

const emitTime = (newValue) => {
  emit("update:model-value", newValue);
};

watch(
  () => props.modelValue,
  (newValue) => {
    state.time = newValue;
  }
);
</script>