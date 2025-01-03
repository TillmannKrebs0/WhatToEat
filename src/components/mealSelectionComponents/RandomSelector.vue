<template>
  <div>
    <!-- Fortune Wheel component, rendered only if there are prizes -->
    <FortuneWheel
      :key="prizes.length > 0 ? JSON.stringify(prizes) : 'empty'"
      v-if="prizes.length > 0"
      style="width: 500px; max-width: 100%;"
      :verify="false"
      :canvas="canvasOptions"
      :prizes="prizes"
      :duration="duration"
      @rotateStart="onRotateStart"
      @rotateEnd="onRotateEnd"
    />
    <!-- Popup for displaying details of the won meal -->
    <div v-if="showpopup" class="popup-overlay">
      <div class="popup" :class="popupClass">
        <h3>Gewonnen: {{ selectedPrize?.name }}</h3>

        <!-- Display meal details if a prize is selected -->
        <div v-if="selectedPrize">
          <div v-if="selectedPrize.preparationTime">
            <p><strong>Dauer:</strong> {{ selectedPrize.preparationTime }} min.</p>
          </div>
          <div v-if="selectedPrize.ingredients && selectedPrize.ingredients.length > 0">
            <p><strong>Zutaten:</strong></p>
            <ul>
              <li v-for="ingredient in selectedPrize.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div v-if="selectedPrize.categories && selectedPrize.categories.length > 0">
            <p><strong>Kategorien:</strong> {{ selectedPrize.categories.join(", ") }}</p>
          </div>
        </div>

        <!-- Button to close the popup -->
        <button @click="closePopup" class="close-button bg-primary text-white">Schließen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import FortuneWheel from "vue-fortune-wheel";
import "vue-fortune-wheel/style.css";

// Define props for meals and categories
const props = defineProps<{
  meals: Array<{ title: string; categories: string[]; ingredients: string[]; preparationTime: number }>;
  categories: string[];
}>();

// Constants
const duration = 2500; // Duration for the wheel spin (ms)

// Reactive variables
const showpopup = ref(false); // Popup visibility
const selectedPrize = ref<{
  name: string;
  categories: string[];
  ingredients: string[];
  preparationTime: number;
} | null>(null); // The selected prize details

// Compute prizes based on filtered meals
const prizes = computed(() => {
  const filteredMeals = props.meals.filter((meal) =>
    props.categories.length > 0
      ? props.categories.some((cat) => meal.categories.includes(cat))
      : true
  );

  if (filteredMeals.length === 0) return []; // No prizes if no filtered meals

  console.log(filteredMeals);

  const probabilities = calculateProbability(filteredMeals.length);

  return filteredMeals.map((meal, index) => ({
    id: index,
    name: meal.title,
    categories: meal.categories,
    ingredients: meal.ingredients,
    preparationTime: meal.preparationTime,
    bgColor: getBgColor(index, filteredMeals.length - 1),
    color: "#000",
    probability: probabilities[index],
  }));
});

// Helper function to calculate background colors for prizes
function getBgColor(index: number, lastIndex: number) {
  const colors = ["#FF7F3F", "#F6D860", "#95CD41", "#A1EEBD"];
  if (index === lastIndex && lastIndex % 3 === 0) {
    return colors[(index % 3) + 1];
  }
  return colors[index % 3];
}

// Helper function to calculate prize probabilities
function calculateProbability(size: number): number[] {
  if (size === 0) return [];

  const baseProbability = Math.floor(100 / size);
  const probabilities = Array(size).fill(baseProbability);

  const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);
  const remaining = 100 - totalProbability;

  if (remaining > 0) {
    probabilities[size - 1] += remaining;
  }

  return probabilities;
}

// Configuration for the Fortune Wheel canvas
const canvasOptions = {
  radius: 250,
  borderColor: "#333",
  borderWidth: 5,
  fontSize: 18,
  btnWidth: 100,
  btnText: "Los!",
};

// Event handlers
const onRotateStart = () => {
  console.log("Das Glücksrad dreht sich!");
};

const onRotateEnd = (prize) => {
  selectedPrize.value = prize; // Set the won prize
  showpopup.value = true; // Show the popup
};

const closePopup = () => {
  showpopup.value = false; // Hide the popup
  selectedPrize.value = null; // Clear the selected prize
};

// Dynamically computed class for popup size based on screen width
const popupClass = computed(() => {
  const width = window.innerWidth;
  if (width < 600) return "popup-small";
  if (width < 1024) return "popup-medium";
  return "popup-large";
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.popup-small {
  width: 85%;
  max-height: 70%;
  font-size: 14px;
}

.popup-medium {
  width: 75%;
  max-height: 75%;
  font-size: 16px;
}

.popup-large {
  width: 60%;
  max-height: 75%;
  font-size: 18px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
}
</style>
