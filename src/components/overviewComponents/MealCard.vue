<template>
  <div class="meal-card">
    <div class="header">
      <q-icon>
        <template v-if="isFavorite">
          <q-icon name="star" class="favorite-icon fav-selected" @click="toggleFavorite" />
        </template>
        <template v-else>
          <q-icon name="star_border" class="favorite-icon" @click="toggleFavorite" />
        </template>
      </q-icon>
      <h3 @click="toggleDetails">{{ state.meal.title }}</h3>
      <q-icon
        name="edit"
        class="edit-icon"
        @click="openEditPopup" 
      />
      <q-icon
        name="delete"
        class="remove-icon"
        @click="removeMeal"
      />
    </div>
    <div v-if="state.isExpanded" class="meal-details">
      <p v-if="state.meal.preparationTime"><strong>Dauer:</strong> {{ state.meal.preparationTime }} min.</p>
      <p v-if="state.meal.ingredients.length > 0"><strong>Zutaten:</strong></p>
      <ul>
        <li v-for="ingredient in state.meal.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <p v-if="state.meal.categories.length > 0"><strong>Kategorien:</strong> {{ state.meal.categories.join(', ') }}</p>
    </div>

    <!-- Popup zum Bearbeiten der Mahlzeit -->
    <q-dialog v-model="state.editPopupVisible" class="dialog">
      <q-card :style="dialogStyle">
        <q-card-section>
          <div class="text-h5">Mahlzeit bearbeiten</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="tempMeal.title"
            label="Titel"
            autofocus
          />

          <CategorySelection 
            v-model="tempMeal.categories" 
            label="Kategorien"
            :categories="categories" 
          />

          <div class="row">
            <p class="label">Zubereitungszeit:</p>
            <p v-if="tempMeal.preparationTime > 0">{{ tempMeal.preparationTime }} Minuten</p>
            <p v-else>-</p>
          </div> 

          <q-slider
            v-model="tempMeal.preparationTime"
            color="green"
            label="Zubereitungszeit"
            markers
            snap
            :min="0"
            :max="120"
            :step="10"
            :markers="10"
          />

          <IngredientSelection 
            v-model="tempMeal.ingredients"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn flat label="Abbrechen" @click="closeEditPopup" />
          <q-btn flat label="Speichern" @click="saveChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QInput, QSlider } from 'quasar';
import CategorySelection from '../addMealComponents/CategorySelection.vue';
import IngredientSelection from '../addMealComponents/IngredientSelection.vue';

const props = defineProps({
  meal: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['removeMeal', 'updateMeal']);

const state = reactive({
  meal: { ...props.meal }, // Original-Daten
  isExpanded: false,
  editPopupVisible: false,
});

const tempMeal = reactive({ ...props.meal }); // Temporäre Kopie für Bearbeitungen

// Dynamische Dialoggröße
const dialogStyle = computed(() => {
  const isMobile = window.innerWidth <= 600;
  return {
    width: isMobile ? '90%' : '50%',
    maxWidth: '600px',
    minWidth: '300px',
  };
});

const openEditPopup = () => {
  Object.assign(tempMeal, props.meal); // Daten in tempMeal kopieren
  state.editPopupVisible = true;
};

const saveChanges = () => {
  Object.assign(state.meal, tempMeal); // Änderungen übernehmen
  emit('updateMeal', state.meal); // Event senden
  state.editPopupVisible = false;
};

const closeEditPopup = () => {
  state.editPopupVisible = false; // Dialog schließen, ohne Änderungen zu speichern
};

const toggleDetails = () => {
  state.isExpanded = !state.isExpanded;
};

const removeMeal = () => {
  emit('removeMeal', state.meal.id);
};

const toggleFavorite = () => {
  if (state.meal.categories.includes('Favoriten')) {
    state.meal.categories = state.meal.categories.filter((cat) => cat !== 'Favoriten');
  } else {
    state.meal.categories.push('Favoriten');
  }
};
</script>

<style scoped>
h3 {
  width: 80%;
  cursor: pointer;
}

.row {
  display: flex;
  justify-content: space-between;
}

.row p {
  margin: 0;
}

.label {
  margin: 0;
  color: #888;
  font-size: 0.8rem;
}

.meal-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.meal-card h3 {
  margin: 0;
  font-size: 1.2rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.edit-icon,
.remove-icon,
.favorite-icon {
  cursor: pointer;
  font-size: 1.5rem;
}

.favorite-icon.fav-selected {
  color: #f1c40f;
}
</style>
