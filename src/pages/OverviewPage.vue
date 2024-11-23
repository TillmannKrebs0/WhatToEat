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
  <q-btn
    label="Top Button"
    color="primary"
    class="overviewButton"
    @click="onTopButtonClick"
  />
</template>

<script setup>
import { ref } from "vue";
import SearchBar from "../components/overviewComponents/Searchbar.vue"; 
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import MealCard from "src/components/overviewComponents/MealCard.vue";
import MealList from "../components/overviewComponents/MealList.vue";
import exampleCategories from "src/assets/exampleCategories.json";

const categories = exampleCategories.categories.map((category) => category.name);
const searchQuery = ref("");
const selectedCategories = ref([]);
const mealList = ref([]);

const onTopButtonClick = () => {
  console.log("Search Query", searchQuery.value);
  console.log("CategoriesSelected", selectedCategories.value);
  console.log("MealList", mealList.value);
};
</script>

<style scoped>
</style>