<template>
  <q-scroll-area :visible="false" style="height: 50px">
    <div class="row no-wrap">
      <q-btn
        v-for="category in categories"
        :key="category"
        :label="category"
        @click="toggleCategory(category)"
        :class="
          selected.includes(category)
            ? 'bg-primary text-white'
            : 'bg-white text-black'
        "
      />
    </div>
  </q-scroll-area>
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
  margin-right: 7px;
  border-radius: 15px;
}
</style>
