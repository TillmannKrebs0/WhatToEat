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
  <div class="content" id="randomSelector" v-if="loaded">
    <RandomSelector
      :meals="meals"
      :categories="selectedCategories"
      :duration="duration"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import RandomSelector from "src/components/mealSelectionComponents/RandomSelector.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

const categories = exampleCategories.categories.map((category) => category.name);
const meals = ref([]);
const selectedCategories = ref([]);
const duration = ref(0);
let loaded = ref(false);


onMounted(async () => {
  try {
    const { value } = await Preferences.get({ key: "meals" });
    meals.value = value ? JSON.parse(value) : [];
    console.log(meals.value);
  } catch (error) {
    console.error("Failed to load meals:", error);
  } finally {
    loaded.value = true;
  }
});
</script>

<style scoped>

</style>
