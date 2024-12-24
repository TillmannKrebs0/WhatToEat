<template>
  <q-input
    rounded outlined
<<<<<<< HEAD
    v-model="searchQuery"
=======
    v-model="state.searchQuery"
>>>>>>> clemensFixes
    placeholder="Suche"
    clearable
    class="q-mb-md input-box"
    bg-color="white"
<<<<<<< HEAD
=======
    @input="onInput"
    @clear="onClear"
>>>>>>> clemensFixes
  >
    <template v-slot:prepend>
      <q-icon name="search" @click="onSearch" color="black"/>
    </template>
  </q-input>
</template>


<script setup>
import { useSearch } from '../../composables/useSearch'; // Importiere das Composable

// Definiere das emit
const emit = defineEmits(['update:query']);

// Verwende das useSearch Composable
const { state, emitSearch } = useSearch();

// Funktion, die beim Eingabewert ändern aufgerufen wird
const onInput = () => {
  // Wenn der Suchbegriff leer ist, triggern wir die Suche
  if (state.searchQuery === '') {
    emitSearch(emit);
  }
};

// Funktion, die beim Löschen der Eingabe (Clear-Button) aufgerufen wird
const onClear = () => {
  state.searchQuery = ''; // Setze den Wert manuell auf leer
  emitSearch(emit); // Trigger das Suchereignis
};

// Trigger das Suchereignis beim Initialisieren
emitSearch(emit);
</script>

<style scoped>



</style>
