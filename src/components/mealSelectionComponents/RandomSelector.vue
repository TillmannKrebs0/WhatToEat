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
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FortuneWheel from "vue-fortune-wheel";
import "vue-fortune-wheel/style.css";

const props = defineProps<{
  meals: Array<{ title: string; categories: string[] }>;
  categories: string[];
}>();

const duration = 2500;

// Dynamisch aktualisiertes Array für die Prämien des Glücksrads
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
    bgColor: getBgColor(index),
    color: "#000",
    probability: probabilities[index],
  }));
});

function getBgColor(index: number) {
  const colors = ["#F6D6D6", "#F6F7C4", "#A1EEBD", "#A1EEBD"];
  return colors[index % 4];
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
  btnText: "Drehen!",
};

const onRotateStart = () => {
  console.log("Das Glücksrad dreht sich!");
};

const onRotateEnd = (prize) => {
  alert(`Gewonnen: ${prize.name}`);
};
</script>