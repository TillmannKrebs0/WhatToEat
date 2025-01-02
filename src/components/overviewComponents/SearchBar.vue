<template>
  <q-input
    ref="searchInputRef"
    rounded outlined
    v-model="state.searchQuery"
    placeholder="Suche"
    clearable
    class="q-mb-md input-box"
    bg-color="white"
    @input="onInput"
    @clear="onClear"
  >
    <template v-slot:prepend>
      <q-icon name="search" color="black" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from 'vue';
import { useSearch } from '../../composables/useSearch';

const emit = defineEmits(['update:query']);
const { state, emitSearch } = useSearch();

// Template Ref für q-input
const searchInputRef = ref(null);

// wenn Suche geändert wird
const onInput = () => {
  if (state.searchQuery === '') {
    emitSearch(emit);
  }
};

// Löschen der Suchanfrage
const onClear = () => {
  state.searchQuery = '';
  emitSearch(emit);
};

// Trigger das Suchereignis beim Initialisieren
emitSearch(emit);
</script>

<style scoped>
</style>