<template>
  <div>
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
</template>

<script setup>
import { useCategories } from '../../composables/useCategories'; // Importiere das Composable
import { watchEffect } from 'vue';

// Verwende das useCategories Composable
const { selected, toggleCategory } = useCategories(); // Keine Initialkategorien mehr

// Definiere Props
const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [] // Standardwert ist ein leeres Array
  }
});

// Sicherstellen, dass categories als Array behandelt wird
const categoriesArray = Array.isArray(props.categories) ? props.categories : [];

// Beobachten, wenn sich `selected` ändert und an den Eltern-Component weiterleiten
const emit = defineEmits(['update:categories']);
watchEffect(() => {
  emit('update:categories', selected.selected); // Gebe das Array der ausgewählten Kategorien weiter
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