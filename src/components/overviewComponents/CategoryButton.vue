<template>
  <div>
    <q-btn
      v-for="category in categories"
      :key="category"
      :label="category"
      @click="toggleCategory(category)"
      :class="selected.includes(category) ? 'bg-primary text-white' : 'bg-white text-black'"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:categories"]);

const selected = ref([]);

const toggleCategory = (category) => {
  if (selected.value.includes(category)) {
    selected.value = selected.value.filter((c) => c !== category);
  } else {
    selected.value.push(category);
  }
  emit("update:categories", selected.value);
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}
</style>
