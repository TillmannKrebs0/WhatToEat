<template>
  <q-input
    rounded outlined
    v-model="searchQuery"
    placeholder="Suche"
    @input="onSearch"
    @keyup.enter="onSearch"
    clearable
    class="q-mb-md input-box"
    bg-color="white"
  >
    <template v-slot:prepend>
      <q-icon name="search" @click="onSearch" color="black"/>
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

<style scoped>



</style>
