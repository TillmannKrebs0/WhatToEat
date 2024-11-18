<template>
  <q-layout
    view="hHh lpR fFf"
    v-touch-swipe.mouse.right="handleSwipeRight"
    v-touch-swipe.mouse.left="handleSwipeLeft"
  >
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          {{ pageTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
      </q-toolbar>
      <q-tabs>
        <q-route-tab to="/" label="Übersicht" />
        <q-route-tab to="/addMeal" label="Hinzufügen" />
        <q-route-tab to="/selectMeal" label="Auswählen" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const routeTitles = {
  '/': 'Übersicht',
  '/addMeal': 'Hinzufügen',
  '/selectMeal': 'Auswählen',
};

const route = useRoute();
const router = useRouter();

const pageTitle = computed(() => routeTitles[route.path] || 'Default Title');

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
