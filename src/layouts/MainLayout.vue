<template>
  <q-layout view="hHh lpR fFf">

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
        <q-route-tab to="/overview" label="Übersicht" />
        <q-route-tab to="/addMeal" label="Hinzufügen" />
        <q-route-tab to="/selectMeal" label="Auswählen" />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>


<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const routeTitles = {
  '/': 'Übersicht',
  '/overview': 'Übersicht',
  '/addMeal': 'Hinzufügen',
  '/selectMeal': 'Auswählen',
};

const route = useRoute();

const pageTitle = computed(() => routeTitles[route.path] || 'Default Title');
</script>