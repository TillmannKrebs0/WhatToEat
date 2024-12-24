import { reactive, watch } from 'vue';

export function useSearch() {
  const state = reactive({
    searchQuery: ''
  });

  const emitSearch = (emit) => {
    watch(() => state.searchQuery, (newQuery) => {
      emit('update:query', newQuery);
    });
  };

  return {
    state,
    emitSearch
  };
}