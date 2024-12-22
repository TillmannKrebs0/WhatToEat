<template>
  <q-input
    filled
    v-model="state.searchQuery"
    placeholder="Suche"
    clearable
    class="q-mb-md"
  >
    <template v-slot:append>
      <q-icon name="search" @click="onSearch" />
    </template>
  </q-input>
</template>

<script setup>
import { useSearch } from '../../composables/useSearch'; // Importiere das Composable

// Definiere das emit
const emit = defineEmits(['update:query']);

// Verwende das useSearch Composable
const { state, emitSearch } = useSearch();

// Trigger das Suchereignis
emitSearch(emit);
</script>