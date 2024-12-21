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
import { reactive, watch } from "vue";

// Emit event
const emit = defineEmits(["update:query"]);

// Reactive state with reactive()
const state = reactive({
  searchQuery: "",
});

// Automatically trigger search on each input change
watch(() => state.searchQuery, (newQuery) => {
  emit("update:query", newQuery);
});
</script>