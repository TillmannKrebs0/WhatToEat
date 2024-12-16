<template>
  <div>
    <div class="categoryButton">
      <CategoryButton
        :categories="categories"
        v-model:categories="selectedCategories"
      />
    </div>
  </div>
  <div class="content" id="durationSelection">
    <div class="row">
      <h5>Zubereitungszeit:</h5>
      <p v-if="duration > 0">max. {{ duration }} Minuten</p>
      <p v-else>-</p>
    </div>
    <DurationSlider v-model="duration" class="duration-slider" />
  </div>
  <div class="content" id="randomSelector" v-if="loaded">
    <RandomSelector
      :meals="filteredMeals"
      :categories="selectedCategories"
      :duration="duration"
      class="randomSelector"
      @select="showMealDetails"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CategoryButton from "../components/overviewComponents/CategoryButton.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import RandomSelector from "src/components/mealSelectionComponents/RandomSelector.vue";
import exampleCategories from "src/assets/exampleCategories.json";
import { Preferences } from "@capacitor/preferences";

const categories = exampleCategories.categories.map(
  (category) => category.name
);
const meals = ref([]);
const selectedCategories = ref([]);
const duration = ref(0);
let loaded = ref(false);

const selectedMeal = ref({});
const showModal = ref(false);

const filteredMeals = computed(() => {
  return meals.value.filter((meal) => {
    const matchesCategories =
      selectedCategories.value.length === 0 ||
      meal.categories.some((category) =>
        selectedCategories.value.includes(category)
      );
    const matchesDuration =
      duration.value === 0 || meal.preparationTime <= duration.value;
    return matchesCategories && matchesDuration;
  });
});

const showMealDetails = (meal) => {
  selectedMeal.value = meal;
  showModal.value = true;
};

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
.content {
  margin: 2%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
}

h5 {
  margin-top: 0px;
  margin-bottom: 10px;
}

.duration-slider {
  width: 99%;
}

.randomSelector {
  max-width: 100%;
}

.categoryButton {
  margin-top: 4%;
  margin-left: 2%;
}
</style>
