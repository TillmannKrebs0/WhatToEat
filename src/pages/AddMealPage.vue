<template>
  <div class="content" id="titleSelection">
    <div class="row">
      <h4 class="label">Name</h4>
      <q-input
        filled
        v-model="text"
        :style="{ minWidth: '60%' }"
        bg-color="white"
      />
    </div>
  </div>
  <div class="content" id="categorySelection">
    <h4>Kategorien</h4>
    <CategorySelection v-model="selectedCategories" />
  </div>
  <div class="content" id="durationSelection">
    <h4>Dauer</h4>
    <DurationSlider v-model="duration" />
  </div>
  <div class="content" id="ingredientSelection">
    <h4>Zutaten</h4>
    <IngredientSelection v-model="ingredients" />
  </div>
  <q-btn
    label="Gericht hinzufügen"
    color="primary"
    class="addMealButton"
    @click="submitMeal"
  />
</template>

<script setup>
import { ref } from "vue";
import CategorySelection from "../components/addMealComponents/CategorySelection.vue";
import DurationSlider from "../components/addMealComponents/DurationSlider.vue";
import IngredientSelection from "../components/addMealComponents/IngredientSelection.vue";
import { Preferences } from "@capacitor/preferences";

const text = ref("");
const selectedCategories = ref([]);
const duration = ref();
const ingredients = ref([]);

const submitMeal = async () => {

  if (text.value === "") {
    console.log("need to put in a title");
    return;
  }

  const newMeal = {
    title: text.value,
    preperationTime: duration.value,
    categories: selectedCategories.value,
    ingredients: ingredients.value,
  };

  const { value } = await Preferences.get({ key: "meals" });
  let mealsList = value ? JSON.parse(value) : [];

  mealsList.push(newMeal);

  await Preferences.set({
    key: "meals",
    value: JSON.stringify(mealsList),
  });

  console.log("Meal saved:", newMeal);
};
</script>

<style scoped>
.content {
  background-color: lightgray;
  margin: 30px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.label {
  margin: 0;
}
</style>
