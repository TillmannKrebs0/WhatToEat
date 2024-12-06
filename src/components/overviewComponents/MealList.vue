<template>
    <div class="meal-list">
      <MealCard 
        v-for="meal in filteredMeals" 
        :key="meal.id" 
        :meal="meal"
        @updateMeal="updateMeal"
        @removeMeal="removeMeal"
      />
    </div>
</template>
  
<script setup>
  import { computed } from "vue";
  import MealCard from "./MealCard.vue";
  import { Preferences } from "@capacitor/preferences";

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

  const removeMeal = (id) => {
    const mealIndex = props.meals.findIndex(meal => meal.id === id);
    
    if (mealIndex !== -1) {
      props.meals.splice(mealIndex, 1);  
      saveMealsToPreferences(props.meals); 
    }
  };

  const updateMeal = (updatedMeal) => {
    const mealIndex = props.meals.findIndex(meal => meal.id === updatedMeal.id);
    
    if (mealIndex !== -1) {
      props.meals[mealIndex] = updatedMeal;
      saveMealsToPreferences(props.meals);
    }
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