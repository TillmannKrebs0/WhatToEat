<template>
  <div class="meal-list">
    <MealCard 
      v-for="meal in filteredMeals" 
      :key="meal.id" 
      :meal="meal"
      @updateMeal="updateMeal"
      @removeMeal="removeMeal"
      class="meal-card"
    />
  </div>
</template>
  
<script setup>
  import { computed } from "vue";
  import MealCard from "./MealCard.vue";
  import { Preferences } from "@capacitor/preferences";

  const emit = defineEmits(['update:meals']);

  const props = defineProps({
    meals: Array,
    categories: Array,
    query: String
  });

  const filteredMeals = computed(() => {
    return props.meals.filter(meal => {
      const matchesQuery = meal.title.toLowerCase().includes(props.query.toLowerCase());
      const matchesCategories = props.categories.length === 0 || meal.categories.some(category => props.categories.includes(category));
      return matchesQuery && matchesCategories;
    });
  });

  const removeMeal = async (id) => {
    const updatedMeals = props.meals.filter(meal => meal.id !== id);
    await saveMealsToPreferences(updatedMeals);
    emit('update:meals', updatedMeals);
  };

  const updateMeal = async (updatedMeal) => {
    const updatedMeals = props.meals.map(meal => 
      meal.id === updatedMeal.id ? updatedMeal : meal
    );
    await saveMealsToPreferences(updatedMeals);
    emit('update:meals', updatedMeals);
  };

  const saveMealsToPreferences = async (meals) => {
    await Preferences.set({ key: "meals", value: JSON.stringify(meals) });
  };


</script>
  
<style scoped>
  .meal-list {
    display: flex;
    flex-direction: column;
  }
</style>