<template>
  <q-layout
    view="hHh lpR fFf"
    v-touch-swipe.mouse.right="handleSwipeRight"
    v-touch-swipe.mouse.left="handleSwipeLeft"
  >
<q-header elevated class="bg-primary text-white" style="height: 13%;">
      <q-toolbar class="q-pt-lg q-pb-lg">
        <div class="absolute-center text-center">
          <h4>{{ pageTitle }}</h4>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white" style="height: 75px;">
      <q-tabs class="q-mt-none"> <!-- Removes margin on tabs -->
        <q-route-tab to="/" label="Übersicht" icon="home" />
        <q-route-tab to="/addMeal" label="Hinzufügen" icon="add_circle" />
        <q-route-tab to="/selectMeal" label="Auswählen" icon="casino">
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>


<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Titles for each route
const routeTitles = {
  '/': 'Gerichte Übersicht',
  '/addMeal': 'Gericht Hinzufügen',
  '/selectMeal': 'Zufallsauswahl treffen',
};

const route = useRoute();
const router = useRouter();

const pageTitle = computed(() => (routeTitles[route.path] || 'Default Title'));

// Swipe navigation logic
const routes = ['/', '/addMeal', '/selectMeal'];
const navigate = (direction) => {
  const currentRoute = route.path;
  const currentIndex = routes.indexOf(currentRoute);

  if (currentIndex === -1) return;

  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < routes.length) {
    router.push(routes[nextIndex]);
  }
};

const handleSwipeRight = () => {
  navigate(-1);
};

const handleSwipeLeft = () => {
  navigate(1);
};
</script>

<style scoped>
h4 {
  margin-top: 15vh;
  white-space: nowrap;
}
</style>