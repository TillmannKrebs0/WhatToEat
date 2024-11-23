<template>
  <div class="content" id="searchBar">
    <SearchBar v-model:query="searchQuery" />
  </div>
  <div class="content" id="categoryButtons">
    <CategoryButton
      :categories="categories"
      v-model:categories="selectedCategories"
    />
  </div>
  <div class="content" id="mealList">
    <MealList
      :meals="meals"
      :categories="selectedCategories"
      :query="searchQuery"
    />
  </div>
  <q-btn
    label="Top Button"
    color="primary"
    class="overviewButton"
    @click="onTopButtonClick"
  />
</template>

<script setup>
import { ref } from "vue";
import SearchBar from "../components/overviewComponents/SearchBar.vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import MealList from "../components/overviewComponents/MealList.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import exampleMeals from "src/assets/exampleMeals.json";

const categories = exampleCategories.categories.map((category) => category.name);
const meals = ref(exampleMeals.meals);
const searchQuery = ref("");
const selectedCategories = ref([]);

const onTopButtonClick = () => {
  console.log("Search Query", searchQuery.value);
  console.log("CategoriesSelected", selectedCategories.value);
  console.log("MealList", meals.value);
};
</script>

<style scoped>
</style>