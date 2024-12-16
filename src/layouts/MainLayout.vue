<template>
  <div>
    <!-- Show splash screen only on initial load -->
    <SplashScreen v-if="showSplashScreen" />

    <q-layout
      v-if="!showSplashScreen" 
      view="hHh lpR fFf"
    >
      <q-header elevated class="bg-primary text-white" style="height: 13%">
        <q-toolbar class="q-pt-lg q-pb-lg">
          <div class="absolute-center text-center">
            <h4>{{ pageTitle }}</h4>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-white text-black footer-border">
        <q-tabs class="q-mt-none custom-tabs">
          <q-route-tab to="/" label="Übersicht" icon="home" />
          <q-route-tab to="/addMeal" label="Hinzufügen" icon="add_circle" />
          <q-route-tab to="/selectMeal" label="Auswählen" icon="casino" />
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SplashScreen from '../pages/SplashScreen.vue'; 

const router = useRouter();
const route = useRoute();
const showSplashScreen = ref(true);

onMounted(() => {
  setTimeout(() => {
    showSplashScreen.value = false;
    router.push('/');
  }, 1500);
});

const routeTitles = {
  "/": "Gerichte Übersicht",
  "/addMeal": "Gericht Hinzufügen",
  "/selectMeal": "Zufallsauswahl",
};

const pageTitle = computed(() => routeTitles[route.path] || "Default Title");

const routes = ["/", "/addMeal", "/selectMeal"];

</script>

<style scoped>
h4 {
  margin-top: 15vh;
  white-space: nowrap;
}
.custom-tabs .q-tab {
  color: rgb(73, 73, 73);
}

.custom-tabs .q-tab.q-tab--active {
  color: black;
}

.footer-border {
  border-top: 2px solid black;
}
</style>
