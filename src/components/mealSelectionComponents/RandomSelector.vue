<template>
  <div>
    <FortuneWheel
      v-if="prizes.length > 0"
      style="width: 500px; max-width: 100%;"
      :verify="false"
      :canvas="canvasOptions"
      :prizes="prizes"
      @rotateStart="onRotateStart"
      @rotateEnd="onRotateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import FortuneWheel from 'vue-fortune-wheel';
import 'vue-fortune-wheel/style.css';
import { Preferences } from '@capacitor/preferences';

const props = defineProps<{
  meals: Array<{ title: string; categories: string[] }>;
  categories: string[];
  duration: number;
}>();

const { meals, categories, duration } = props;

const prizes = computed(() => {
  const filteredMeals = meals.filter((meal) =>
    categories.length > 0 ? categories.some((cat) => meal.categories.includes(cat)) : true
  );

  if (filteredMeals.length === 0) return []; 

  const probability = calculateProbability(filteredMeals.length);

  return filteredMeals.map((meal, index) => ({
    name: meal.title,
    bgColor: getBgColor(index),
    color: '#000',
    probability,
  }));
});

function getBgColor(index: number) {
  const colors = ['#F6D6D6', '#F6F7C4', '#A1EEBD', '#A1EEBD'];
  return colors[index % 4];
}


function calculateProbability(size: number) {
  if (size === 0) return 0;
  return 100 / size;
}

const canvasOptions = {
  radius: 250,
  borderColor: '#333',
  borderWidth: 5,
  fontSize: 18,
  btnWidth: 100,
  btnText: 'Drehen!',
};

const onRotateStart = () => {
  console.log('Das Glücksrad dreht sich!');
};

const onRotateEnd = (prize) => {
  alert(`Gewonnen: ${prize.name}`);
};

onMounted(async () => {
  const { value } = await Preferences.get({ key: 'meals' });
  meals.values = value ? JSON.parse(value) : [];

  console.log(meals);
});
</script>
