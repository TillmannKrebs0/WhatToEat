<template>
    <div class="meal-card" @click="toggleDetails">
      <h3>{{ meal.title }}</h3>
      <div v-if="isExpanded" class="meal-details">
        <p><strong>Dauer:</strong> {{ meal.preparationTime }} minutes</p>
        <p v-if="meal.ingredients.length > 0"><strong>Zutaten:</strong></p>
        <ul>
          <li v-for="ingredient in meal.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <p v-if="meal.categories.length > 0"><strong>Kategorien</strong> {{ meal.categories.join(', ') }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    meal: Object
  });
  
  // Zustand, um die MealCard ein- und auszuklappen
  const isExpanded = ref(false);
  
  // Methode zum Umschalten des ausgeklappten Zustands
  const toggleDetails = () => {
    isExpanded.value = !isExpanded.value;
  };
  </script>
  
  <style scoped>
  .meal-card {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  .meal-card h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  </style>  