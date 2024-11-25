<template>
    <div class="meal-list">
      <MealCard v-for="meal in filteredMeals" :key="meal.id" :meal="meal" />
    </div>
</template>
  
<script setup>
  import { computed } from "vue";
  import MealCard from "./MealCard.vue";
  
  // Receive meals and filter them by categories and query
  const props = defineProps({
    meals: Array,
    categories: Array,
    query: String
  });
  
  // Compute filtered meals based on search query and selected categories
  const filteredMeals = computed(() => {
    return props.meals.filter(meal => {
      const matchesQuery = meal.title.toLowerCase().includes(props.query.toLowerCase());
      const matchesCategories = props.categories.length === 0 || meal.categories.some(category => props.categories.includes(category));
      return matchesQuery && matchesCategories;
    });
  });
</script>
  
<style scoped>
  .meal-list {
    display: flex;
    flex-direction: column;
  }
</style>  