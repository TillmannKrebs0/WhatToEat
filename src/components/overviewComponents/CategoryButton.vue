<template>
  <q-scroll-area :visible="true" style="height: 70px; width: 100%;">
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
/* Zeilen-Layout für die Buttons */
.row {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; /* Ermöglicht Scrollen, wenn die Buttons nicht alle passen */
}

.category-button {
  margin: 5px;
  border-radius: 15px;
  font-size: 0.9rem; /* Standard-Schriftgröße */
  padding: 5px 10px; /* Standard-Padding */
}

/* Für mobile Geräte: Schaltflächen werden kleiner */
@media (max-width: 600px) {
  .category-button {
    font-size: 0.8rem; /* Kleinere Schrift */
    padding: 3px 8px;  /* Weniger Padding */
  }
}
</style>
