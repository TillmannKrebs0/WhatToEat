<template>
  <div class="searchBar" id="searchBar">
    <SearchBar v-model:query="searchQuery" />
  </div>
  <div class="categoryButton">
    <CategoryButton
      :categories="categories"
      v-model:categories="selectedCategories"
    />
  </div>
  <div class="mealList" id="mealList">
    <MealList
      :meals="meals"
      :categories="selectedCategories"
      :query="searchQuery"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchBar from "../components/overviewComponents/SearchBar.vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import MealList from "../components/overviewComponents/MealList.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

const categories = exampleCategories.categories.map(
  (category) => category.name
);
const meals = ref([]);
const searchQuery = ref("");
const selectedCategories = ref([]);

onMounted(async () => {
  const { value } = await Preferences.get({ key: "meals" });
  meals.value = value ? JSON.parse(value) : [];
  console.log(meals.value);
});
</script>

<style scoped>
.content {
  margin: 2%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  justify-content: space-between;
}

.label {
  margin: 0;
}

h5 {
  margin-top: 0px;
  margin-bottom: 10px;
}

.searchBar {
  margin: 2%;
  margin-top: 5%;
}

.mealList {
  margin: 2%;
}

.categoryButton {
  margin-left: 2%;
}
</style>
