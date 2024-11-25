<template>
   <div class="content" id="categoryButtons">
    <CategoryButton
      :categories="categories"
      v-model:categories="selectedCategories"
    />
  </div>
  <div class="content" id="durationSelection">
    <h4>Dauer</h4>
    <DurationSlider v-model="duration" />
  </div>
  <div class="content" id="randomSelector">
    <RandomSelector
      :meals="meals"
      :categories="selectedCategories"
      :duration="duration"
    />
  </div>
  <q-btn
    label="Top Button"
    color="primary"
    class="addMealButton"
    @click="onTopButtonClick"
  />
</template>

<script setup>
import { ref } from "vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import RandomSelector from "src/components/mealSelectionComponents/RandomSelector.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import exampleMeals from "src/assets/exampleMeals.json";

const categories = exampleCategories.categories.map((category) => category.name);
const meals = ref(exampleMeals.meals);
const selectedCategories = ref([]);
const duration = ref();


const onTopButtonClick = () => {
  console.log("Kategorien", selectedCategories.value);
  console.log("Dauer", duration.value);
};
</script>

<style scoped>

</style>
