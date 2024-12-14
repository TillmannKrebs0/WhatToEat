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
      <h3 @click="toggleDetails">{{ meal.title }}</h3>
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
    <div v-if="isExpanded" class="meal-details">
      <p v-if="meal.preparationTime"><strong>Dauer:</strong> {{ meal.preparationTime }} min.</p>
      <p v-if="meal.ingredients.length > 0"><strong>Zutaten:</strong></p>
      <ul>
        <li v-for="ingredient in meal.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <p v-if="meal.categories.length > 0"><strong>Kategorien:</strong> {{ meal.categories.join(', ') }}</p>
    </div>

    <!-- Popup zum Bearbeiten der Mahlzeit -->
    <q-dialog v-model="editPopupVisible" class="dialog">
      <q-card :style="dialogStyle">
        <q-card-section>
          <div class="text-h5">Mahlzeit bearbeiten</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="editedMeal.title"
            label="Titel"
            autofocus
          />

          <CategorySelection 
            v-model="editedMeal.categories" 
            label="Kategorien"
            :categories="categories" 
          />

          <div class="row">
            <p class="label">Zubereitungszeit:</p>
            <p v-if="editedMeal.preparationTime > 0">{{ editedMeal.preparationTime }} Minuten</p>
            <p v-else>-</p>
          </div> 

          <q-slider
            v-model="editedMeal.preparationTime"
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
            v-model="editedMeal.ingredients"
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
import { ref, computed } from 'vue';
import { Preferences } from "@capacitor/preferences";
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn, QInput, QSlider } from 'quasar';
import CategorySelection from '../addMealComponents/CategorySelection.vue';
import IngredientSelection from '../addMealComponents/IngredientSelection.vue';

const props = defineProps({
  meal: Object
});

const emit = defineEmits(['removeMeal', 'updateMeal']);
  
const isExpanded = ref(false);
const isFavorite = ref(props.meal.categories.includes('Favoriten'));
const editPopupVisible = ref(false);

const editedMeal = ref({ ...props.meal });

// Dynamische Dialoggröße
const dialogStyle = computed(() => {
  const isMobile = window.innerWidth <= 600;
  return {
    width: isMobile ? '90%' : '50%',
    maxWidth: '600px',
    minWidth: '300px',
  };
});

const toggleFavorite = async () => {
  isFavorite.value = !isFavorite.value;

  if (isFavorite.value) {
    if (!editedMeal.value.categories.includes('Favoriten')) {
      editedMeal.value.categories.push('Favoriten');
    }
  } else {
    const index = editedMeal.value.categories.indexOf('Favoriten');
    if (index !== -1) {
      editedMeal.value.categories.splice(index, 1);
    }
  }

  const { value } = await Preferences.get({ key: "meals" });
  const mealsList = value ? JSON.parse(value) : [];

  const mealIndex = mealsList.findIndex(meal => meal.id === editedMeal.value.id);
  if (mealIndex !== -1) {
    mealsList[mealIndex] = { ...editedMeal.value };
  }

  await Preferences.set({
    key: "meals",
    value: JSON.stringify(mealsList),
  });

  console.log("Meal updated:", editedMeal.value);
};

const toggleDetails = () => {
  console.log(props.meal.preparationTime);
  isExpanded.value = !isExpanded.value;
};

const removeMeal = () => {
  emit('removeMeal', props.meal.id);
};

const openEditPopup = () => {
  editedMeal.value = { ...props.meal };
  editPopupVisible.value = true;
};

const closeEditPopup = () => {
  editPopupVisible.value = false;
  window.location.reload();
};

const saveChanges = () => {
  emit('updateMeal', editedMeal.value);
  closeEditPopup();
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

.label{
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

.edit-icon, .remove-icon, .favorite-icon {
  cursor: pointer;
  font-size: 1.5rem;
}

.favorite-icon.fav-selected {
  color: #f1c40f;
}
</style>
