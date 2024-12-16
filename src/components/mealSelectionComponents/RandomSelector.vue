<template>
  <div>
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
    <!-- Popup für Details des gewonnenen Gerichts -->
    <div v-if="showpopup" class="popup-overlay">
      <div class="popup">
        <h3>Gewonnen: {{ selectedPrize?.name }}</h3>

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
        
        <button @click="closePopup" class="close-button bg-primary text-white">Schließen</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuasar } from 'quasar';
import FortuneWheel from "vue-fortune-wheel";
import "vue-fortune-wheel/style.css";

const props = defineProps<{
  meals: Array<{ title: string; categories: string[]; ingredients: string[]; preparationTime: number }>;
  categories: string[];
}>();

const duration = 2500;

// Popup-Status und gewonnenes Gericht
const showpopup = ref(false);
const selectedPrize = ref<{ name: string; categories: string[]; ingredients: string[]; preparationTime: number } | null>(null);

const prizes = computed(() => {
  const filteredMeals = props.meals.filter((meal) =>
    props.categories.length > 0
      ? props.categories.some((cat) => meal.categories.includes(cat))
      : true
  );

  if (filteredMeals.length === 0) return [];
  console.log(filteredMeals);

  const probabilities = calculateProbability(filteredMeals.length);

  return filteredMeals.map((meal, index) => ({
    id: index,
    name: meal.title,
    categories: meal.categories,
    ingredients: meal.ingredients, // Zutaten für das Popup
    preparationTime: meal.preparationTime, // Zubereitungszeit für das Popup
    bgColor: getBgColor(index, filteredMeals.length-1),
    color: "#000",
    probability: probabilities[index],
  }));
});

function getBgColor(index: number, lastIndex: number) {
  const colors = ["#FF7F3F", "#F6D860", "#95CD41", "#A1EEBD"];
  if (index == lastIndex && lastIndex % 3 == 0) {
    return colors[index % 3 + 1]
  }
  return colors[index % 3];
}

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

const canvasOptions = {
  radius: 250,
  borderColor: "#333",
  borderWidth: 5,
  fontSize: 18,
  btnWidth: 100,
  btnText: "Los!",
};

const onRotateStart = () => {
  console.log("Das Glücksrad dreht sich!");
};

const onRotateEnd = (prize) => {
  selectedPrize.value = prize;
  showpopup.value = true; // Popup anzeigen
};

const closePopup = () => {
  showpopup.value = false; // Popup schließen
  selectedPrize.value = null;
};
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
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

ul {
  padding-left: 20px;
  text-align: left;
}

ul li {
  margin-bottom: 5px;
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
