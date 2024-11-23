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
      <q-icon name="search" @click="onSearch" />  <!-- Klick auf das Icon löst die Suche aus -->
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