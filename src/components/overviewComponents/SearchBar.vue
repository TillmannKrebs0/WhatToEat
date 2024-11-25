<template>
  <q-input
    filled
    v-model="searchQuery"
    placeholder="Suche"
    @input="onSearch"
    @keyup.enter="onSearch"
    clearable
    class="q-mb-md"
  >
    <template v-slot:append>
      <q-icon name="search" @click="onSearch" />
    </template>
  </q-input>
</template>

<script setup>
import { ref } from "vue";

// Emit event
const emit = defineEmits(["update:query"]);

// Reactive state
const searchQuery = ref("");

// Method
const onSearch = () => {
  emit("update:query", searchQuery.value);
};
</script>
