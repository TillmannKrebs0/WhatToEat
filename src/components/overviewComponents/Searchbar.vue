<template>
    <q-input
      filled
      v-model="searchQuery"
      placeholder="Search"
      @input="onSearch"
      clearable
      class="q-mb-md"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </template>
  
  <script>
  export default {
    emits: ['update:query'],
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      onSearch() {
        this.$emit('update:query', this.searchQuery);
      }
    }
  };
  </script>