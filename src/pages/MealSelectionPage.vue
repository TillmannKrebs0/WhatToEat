<!-- This Component renders the Meal Selection Page-->

<template>
  <div>
    <!-- Selection For the Categories that should be included -->
    <div class="categoryButton">
      <CategoryButton
        :categories="categories"
        v-model:categories="selectedCategories"
      />
    </div>
  </div>

  <!-- Selection For the Duration that should be considered -->
  <div class="content" id="durationSelection">
    <div class="row">
      <h5>Zubereitungszeit:</h5>
      <p v-if="duration > 0">max. {{ duration }} Minuten</p>
      <p v-else>-</p>
    </div>
    <DurationSlider v-model="duration" class="duration-slider" />
  </div>

  <!-- Random meal selector section -->
  <div class="content" id="randomSelector">
    <!-- Show the random meal selector if meals are loaded and filtered meals exist -->
    <RandomSelector 
      v-if="loaded && filteredMeals.length > 0"
      :meals="filteredMeals"
      :categories="selectedCategories"
      :duration="duration"
      class="randomSelector"
      @select="showMealDetails"
    />
    <!-- Display appropriate messages if no meals are available -->
    <div v-else class="no-meals">
      <p v-if="loaded">Keine Mahlzeiten gefunden.</p>
      <p v-if="loaded">Füge zuerst einige<br>Mahlzeiten hinzu!</p>
      <p v-else>Lade Mahlzeiten...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import RandomSelector from "src/components/mealSelectionComponents/RandomSelector.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

// Extracts category names from the example categories JSON
const categories = exampleCategories.categories.map(
  (category) => category.name
);

// Reactive state declarations
const meals = ref([]); // Stores all meals
const selectedCategories = ref([]); // Selected category filters
const duration = ref(0); // Selected preparation time filter
let loaded = ref(false); // Tracks loading state
const selectedMeal = ref({}); // Stores the currently selected meal
const showModal = ref(false); // Controls the visibility of the meal details modal

// Filters meals based on selected categories and preparation time
const filteredMeals = computed(() => {
  return meals.value.filter((meal) => {
    // Check if meal matches the selected categories
    const matchesCategories =
      selectedCategories.value.length === 0 || // If no categories are selected, include all meals
      meal.categories.some((category) =>
        selectedCategories.value.includes(category)
      );

    // Check if meal matches the preparation time constraint or if none is set, select all
    const matchesDuration =
      duration.value === 0 ||
      meal.preparationTime <= duration.value;

    return matchesCategories && matchesDuration;
  });
});

// Opens the modal to show details of the selected meal
const showMealDetails = (meal) => {
  selectedMeal.value = meal;
  showModal.value = true;
};

// Load meals from local storage when the component is mounted
onMounted(async () => {
  try {
    const { value } = await Preferences.get({ key: "meals" }); 
    meals.value = value ? JSON.parse(value) : []; 
  } catch (error) {
    console.error("Failed to load meals:", error);
  } finally {
    loaded.value = true;
  }
});
</script>

<style scoped>
/* General content container styling */
.content {
  margin: 2%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Layout for rows within sections */
.row {
  display: flex;
  justify-content: space-between;
}

/* Styling for section headers */
h5 {
  margin-top: 0;
  margin-bottom: 10px;
}

/* Adjusts width for the duration slider */
.duration-slider {
  width: 99%;
}

/* Maximum width for the random meal selector */
.randomSelector {
  max-width: 100%;
}

/* Spacing for category button */
.categoryButton {
  margin-top: 4%;
  margin-left: 2%;
}

/* Centering and styling messages for when no meals are found */
.no-meals {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.25rem;
}
</style>
