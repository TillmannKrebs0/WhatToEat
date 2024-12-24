<template>
  <q-scroll-area :visible="true" style="height: 50px; width: 100%;">
    <div class="row no-wrap">
      <q-btn
        v-for="category in categoriesArray"
        :key="category"
        @click="toggleCategory(category)"
        :class="selected.selected.includes(category) ? 'bg-primary text-white' : 'bg-white text-black'"
        class="category-button"
      >
        <q-icon :name="getCategoryIcon(category)" />
        {{ category }}
      </q-btn>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { useCategories } from '../../composables/useCategories';
import { watchEffect } from 'vue';

const { selected, toggleCategory } = useCategories();

const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => []
  }
});

const categoriesArray = Array.isArray(props.categories) ? props.categories : [];

const emit = defineEmits(['update:categories']);
watchEffect(() => {
  emit('update:categories', selected.selected);
});

const getCategoryIcon = (category) => {
  switch (category) {
    case "Favoriten":
      return "star";
    case "Nudeln":
      return "restaurant_menu";
    case "Gesund":
      return "fitness_center";
    case "Schnell":
      return "fastfood";
    case "Vegetarisch":
      return "eco";
    case "Vegan":
      return "spa";
    case "Fleisch":
      return "restaurant";
    case "Dessert":
      return "cake";
    default:
      return "";
  }
};
</script>

<style scoped>
button {
  margin: 7px;
  border-radius: 15px;
}
</style>
