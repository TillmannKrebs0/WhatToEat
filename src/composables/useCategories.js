import { ref } from 'vue';

export function useCategories() {
  // Anfangs keine Kategorie ausgewählt
  const selected = ref([]);

  // Funktion, um eine Kategorie hinzuzufügen oder zu entfernen
  const toggleCategory = (category) => {
    if (selected.value.includes(category)) {
      selected.value = selected.value.filter((c) => c !== category);
    } else {
      selected.value.push(category);
    }
  };

  return {
    selected,
    toggleCategory
  };
}