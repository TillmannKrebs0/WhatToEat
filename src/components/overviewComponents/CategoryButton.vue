<template>
    <div>
      <q-btn
        v-for="category in categories"
        :key="category"
        :label="category"
        @click="toggleCategory(category)"
        :class="selected.includes(category) ? 'bg-primary text-white' : 'bg-white text-black'"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    emits: ['update:categories'],
    data() {
      return {
        selected: []
      };
    },
    methods: {
      toggleCategory(category) {
        if (this.selected.includes(category)) {
          this.selected = this.selected.filter((c) => c !== category);
        } else {
          this.selected.push(category);
        }
        this.$emit('update:categories', this.selected);
      }
    }
  };
  </script>  