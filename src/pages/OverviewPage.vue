<!-- This Component renders the Meals Overview Page-->

<template>
  <!-- Component for searching for meals -->
  <div class="searchBar" id="searchBar">
    <SearchBar v-model:query="searchQuery" />
  </div>

    <!-- Component for selecting and managing meal categories -->
  <div class="categoryButton">
    <CategoryButton
      :categories="categories"
      v-model:categories="selectedCategories"
    />
  </div>

  <!-- Component for displaying a list of meals based on filters -->
  <div class="mealList" id="mealList">
    <MealList
      v-model:meals="meals"
      :categories="selectedCategories"
      :query="searchQuery"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import SearchBar from "../components/overviewComponents/SearchBar.vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import MealList from "../components/overviewComponents/MealList.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

// Maps category names from exampleCategories to categories
const categories = computed(() =>
  exampleCategories.categories.map((category) => category.name)
);

// Reactive state declarations
const meals = ref([]); // Stores all meals
const searchQuery = ref(""); // Stores the search query entered by the user
const selectedCategories = ref([]); // Tracks selected categories for filtering

// Load meals from storage when the component is mounted
onMounted(async () => {
  try {
    const { value } = await Preferences.get({ key: "meals" }); // Retrieve stored meals
    meals.value = value ? JSON.parse(value) : []; // Parse or initialize an empty array
    console.log(meals.value);
  } catch (error) {
    console.error("Failed to load meals:", error);
  }
});
</script>

<style scoped>
/* Styling for content containers */
.content {
  margin: 2%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Layout for rows */
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

/* Search bar section styling */
.searchBar {
  margin: 2%;
  margin-top: 5%;
}

/* Meal list section styling */
.mealList {
  margin: 2%;
}

/* Category button section styling */
.categoryButton {
  margin-left: 2%;
}
</style>
