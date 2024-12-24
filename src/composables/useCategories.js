import { reactive } from 'vue';

export function useCategories() {
  // Anfangs keine Kategorie ausgewählt
  const state = reactive({
    selected: []
  });

  // Funktion, um eine Kategorie hinzuzufügen oder zu entfernen
  const toggleCategory = (category) => {
    const index = state.selected.indexOf(category);
    if (index !== -1) {
      state.selected.splice(index, 1); // Kategorie entfernen
    } else {
      state.selected.push(category); // Kategorie hinzufügen
    }
  };

  return {
    selected: state, // Gebe das reaktive Objekt zurück
    toggleCategory
  };
}