<template>
  <q-slider
    v-model="time"
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
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:model-value"]);

const emitTime = (newValue) => {
  emit("update:model-value", newValue);
};

const time = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    time.value = newValue;
  }
);
</script>
