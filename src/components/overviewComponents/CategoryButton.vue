<template>
  <div>
    <q-btn
      v-for="category in categories"
      :key="category"
      @click="toggleCategory(category)"
      :class="selected.includes(category) ? 'bg-primary text-white' : 'bg-white text-black'"
      class="category-button"
    >
      <q-icon :name="getCategoryIcon(category)"/>
      {{ category }}
    </q-btn>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useCategories } from '../../composables/useCategories'; // Importiere das Composable

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:categories']);

// Verwende das useCategories Composable
const { selected, toggleCategory } = useCategories(); // Keine Initialkategorien mehr

// Beobachte Änderungen in den ausgewählten Kategorien und sende das Event
watch(selected, (newSelected) => {
  emit('update:categories', newSelected);
});

// Dummy Icon Mapping (dies kann angepasst werden)
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
.category-button {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
}

.category-button .category-icon {
  margin-right: 8px; /* Abstand zwischen Icon und Text */
}
</style>
