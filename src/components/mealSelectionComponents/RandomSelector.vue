<template>
    <div>
      <!-- Canvas-basiertes Glücksrad -->
      <FortuneWheel
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
  import { ref } from 'vue';
  import { computed } from 'vue';
  import FortuneWheel from 'vue-fortune-wheel';
  import 'vue-fortune-wheel/style.css';
  
  // Props, die von der Parent-Komponente übergeben werden
  const props = defineProps<{
    meals: Array<{ id: number; title: string; categories: string[] }>, // Liste der Mahlzeiten
    categories: string[], // Kategorienfilter (optional)
    duration: number
  }>();
  
  const { meals, categories } = props;
  const second = ref(false);

  // Bereinige und filtere die `meals`, um die `prizes` zu generieren
  const prizes = computed(() => {
    const filteredMeals = meals.filter((meal) =>
      categories.length > 0 ? categories.some((cat) => meal.categories.includes(cat)) : true
    );
    

    return filteredMeals.map((meal) => ({
      id: meal.id,
      name: meal.title,
      bgColor: getBgColor(meal.id),
      color: '#000',
      probability: calculateProbability(filteredMeals.length),
    }));
  });

  function getBgColor(index) {
    const colors = ['#fff', '#ddd', '#e9e9e9']; // Deine drei Farbtöne
    return colors[index % 3]; // Modulo 3 für die Farbauswahl
  }
  
  function calculateProbability(size) {
    return 100 / size;
  }
  
  // Optionen für das Canvas-Glücksrad
  const canvasOptions = {
    radius: 250,
    borderColor: '#333',
    borderWidth: 5,
    fontSize: 18,
    btnWidth: 100,
    btnText: 'Drehen!',
  };
  
  // Event-Handler
  const onRotateStart = () => {
    console.log('Das Glücksrad dreht sich!');
  };
  
  const onRotateEnd = (prize) => {
    alert(`Gewonnen: ${prize.name}`);
  };
  </script>  