<template>
  <q-slider
    v-model="time"
    color="green"
    markers
    snap
    :min="0"
    :max="10"
    @change="emitTime"
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
