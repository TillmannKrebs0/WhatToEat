<template>
  <div class="content" id="titleSelection">
    <div class="row">
      <h5 class="label">Name:</h5>
      <q-input 
        outlined
        v-model="text"
        :style="{ minWidth: '60%', backgroundColor: '#f2f2f2' }"
        class="input-box"
        />
    </div>
  </div>
  <div class="content" id="categorySelection">
    <h5>Kategorien:</h5>
    <CategorySelection v-model="selectedCategories" />
  </div>
  <div class="content" id="durationSelection">
    <div class="row">
      <h5>Zubereitungszeit:</h5>
      <p v-if="duration > 0">{{ duration }} Minuten</p>
      <p v-else>-</p>
    </div> 
    <DurationSlider v-model="duration" class="duration-slider"/>
  </div>
  <div class="content" id="ingredientSelection">
    <h5>Zutaten:</h5>
    <IngredientSelection v-model="ingredients" />
  </div>
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

const text = ref("");
const selectedCategories = ref([]);
const duration = ref(0);
const ingredients = ref([]);

const submitMeal = async () => {

  if (text.value === "") {
    console.log("need to put in a title");
    alert("Bitte geben Sie einen Namen für das Gericht ein");
    return;
  }

  if (selectedCategories.value.length === 0) {
    console.log("need to put in a category");
    alert("Bitte geben Sie mindestens eine Kategorie an");

    return;
  }

  const { value } = await Preferences.get({ key: "meals" }); 
  const mealsList = value ? JSON.parse(value) : [];
  
  const maxId = mealsList.reduce((max, meal) => (meal.id > max ? meal.id : max), 0);
  const newMeal = {
    id: maxId + 1,
    title: text.value,
    preparationTime: duration.value,
    categories: selectedCategories.value,
    ingredients: ingredients.value,
  };

  mealsList.push(newMeal);

  await Preferences.set({
    key: "meals",
    value: JSON.stringify(mealsList),
  });

  console.log("Meal saved:", newMeal);
  alert("Das Gericht wurde erfolgreich gespeichert");

  window.location.reload();
};
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

.label {
  margin: 0;
}

h5 {
  margin-top: 0px;
  margin-bottom: 10px;
}

.duration-slider {
  width: 99%;
}

.addMealButton {
  position: fixed; /* Fixes the button at the bottom of the screen */
  bottom: 100px; /* Distance from the bottom */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Fine-tuning for centering */
  z-index: 1000; /* Ensure the button is on top of other elements */
}

:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 32px;
  font-size: 16px;
}
</style>
