<!-- This Component renders the Add Meal Page-->

<template>
  <!-- Title input section -->
  <div class="content" id="titleSelection">
    <div class="row">
      <h5 class="label">Name:</h5>
      <!-- Input field for meal name -->
      <q-input 
        outlined
        v-model="text"
        :style="{ minWidth: '60%', backgroundColor: '#f2f2f2' }"
        class="input-box"
      />
    </div>
  </div>

  <!-- Category selection section -->
  <div class="content" id="categorySelection">
    <h5>Kategorien:</h5>
    <CategorySelection v-model="selectedCategories" />
  </div>

  <!-- Duration input section -->
  <div class="content" id="durationSelection">
    <div class="row">
      <h5>Zubereitungszeit:</h5>
      <!-- Display selected preparation time or placeholder -->
      <p v-if="duration > 0">{{ duration }} Minuten</p>
      <p v-else>-</p>
    </div> 
    <!-- Component for selecting preparation time -->
    <DurationSlider v-model="duration" class="duration-slider" />
  </div>

  <!-- Ingredient input section -->
  <div class="content" id="ingredientSelection">
    <h5>Zutaten:</h5>
    <IngredientSelection v-model="ingredients" />
  </div>

  <!-- Submit button -->
  <div class="content">
    <q-btn
      label="Gericht hinzufügen"
      color="primary"
      @click="submitMeal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CategorySelection from "../components/addMealComponents/CategorySelection.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import IngredientSelection from "../components/addMealComponents/IngredientSelection.vue";
import { Preferences } from "@capacitor/preferences";

// Reactive state declarations
const text = ref(""); // Meal title
const selectedCategories = ref([]); // Selected meal categories
const duration = ref(0); // Meal preparation time
const ingredients = ref([]); // Meal ingredients

// Function to reset the form inputs to their initial state
const resetForm = () => {
  text.value = "";
  selectedCategories.value = [];
  duration.value = 0;
  ingredients.value = [];
};

// Function to handle meal submission
const submitMeal = async () => {
  // Validate title input
  if (text.value === "") {
    console.log("need to put in a title");
    alert("Bitte geben Sie einen Namen für das Gericht ein");
    return;
  }

  // Validate category selection
  if (selectedCategories.value.length === 0) {
    console.log("need to put in a category");
    alert("Bitte geben Sie mindestens eine Kategorie an");
    return;
  }

  // Retrieve existing meals from local storage
  const { value } = await Preferences.get({ key: "meals" }); 
  const mealsList = value ? JSON.parse(value) : [];
  
  // Generate a new meal ID
  const maxId = mealsList.reduce((max, meal) => (meal.id > max ? meal.id : max), 0);

  // Create a new meal object
  const newMeal = {
    id: maxId + 1,
    title: text.value,
    preparationTime: duration.value,
    categories: selectedCategories.value,
    ingredients: ingredients.value,
  };

  // Add the new meal to the list and save to local storage
  mealsList.push(newMeal);
  await Preferences.set({
    key: "meals",
    value: JSON.stringify(mealsList),
  });

  console.log("Meal saved:", newMeal);
  alert("Das Gericht wurde erfolgreich gespeichert");

  resetForm(); 
};
</script>

<style scoped>
/* Styling for content sections */
.content {
  margin: 2%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

/* Flex container for rows */
.row {
  display: flex;
  justify-content: space-between;
}

/* Styling for labels */
.label {
  margin: 0;
}

/* Styling for section headers */
h5 {
  margin-top: 0px;
  margin-bottom: 10px;
}

/* Slider component width */
.duration-slider {
  width: 99%;
}

/* Styling for the add meal button */
.addMealButton {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

/* Deep styling for input boxes */
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 32px;
  font-size: 16px;
}
</style>
