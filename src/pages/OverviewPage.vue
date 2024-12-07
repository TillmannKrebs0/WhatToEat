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
</template>

<script setup>
import { ref , onMounted} from "vue";
import SearchBar from "../components/overviewComponents/SearchBar.vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import MealList from "../components/overviewComponents/MealList.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

const categories = exampleCategories.categories.map((category) => category.name);
const meals = ref ([]);
const searchQuery = ref("");
const selectedCategories = ref([]);

onMounted(async () => {
  const { value } = await Preferences.get({ key: "meals" });
  meals.value = value ? JSON.parse(value) : [];
  console.log(meals.value)
})
</script>

<style scoped>
</style>