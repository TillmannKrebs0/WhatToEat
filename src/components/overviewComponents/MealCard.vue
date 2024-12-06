<template>
    <div class="meal-card">
      <div class="header">
        <q-icon>
          <template v-if="isFavorite">
            <q-icon name="favorite" class="favorite-icon" @click="toggleFavorite" />
          </template>
          <template v-else>
            <q-icon name="favorite_border" class="favorite-icon" @click="toggleFavorite" />
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
        <p v-if="meal.preparationTime > 0"><strong>Dauer:</strong> {{ meal.preparationTime }} min.</p>
        <p v-if="meal.ingredients.length > 0"><strong>Zutaten:</strong></p>
        <ul>
          <li v-for="ingredient in meal.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <p v-if="meal.categories.length > 0"><strong>Kategorien:</strong> {{ meal.categories.join(', ') }}</p>
      </div>

      <!-- Popup zum Bearbeiten der Mahlzeit -->
    <q-dialog v-model="editPopupVisible" class="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Mahlzeit bearbeiten</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="editedMeal.title"
            label="Titel"
            autofocus
          />

          <CategorySelection 
            v-model="editedMeal.categories" 
            :categories="categories" 
          />

          <q-slider
            v-model="editedMeal.preparationTime"
            color="green"
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
  import { ref } from 'vue';

  import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn, QInput, QSelect } from 'quasar';
  import CategorySelection from '../addMealComponents/CategorySelection.vue';
  import IngredientSelection from '../addMealComponents/IngredientSelection.vue';

  const props = defineProps({
    meal: Object
  });

  const emit = defineEmits(['removeMeal', 'updateMeal']);
  
  const isExpanded = ref(false);
  const isFavorite = ref(false);
  const editPopupVisible = ref(false);

  const editedMeal = ref({ ...props.meal });

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  };

  const toggleDetails = () => {
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

  .dialog {
    width: 400px;
  }
</style>  