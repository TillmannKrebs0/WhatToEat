<template>
  <q-input
    v-model="ingredientsInput"
    label="merhrere Zutaten mit Komma trennen"
    outlined
    clearable
    @keyup.enter="addIngredients"
  />
  <q-btn
    label="Zutaten hinzufügen"
    color="primary"
    class="q-mt-md"
    @click="addIngredients"
  />

  <q-list class="q-mt-lg">
    <q-item
      v-for="(ingredient, index) in ingredients"
      :key="index"
      class="q-pa-sm"
      clickable
    >
      <q-item-section>{{ ingredient }}</q-item-section>
      <q-item-section side>
        <q-btn
          icon="delete"
          color="negative"
          flat
          round
          @click="removeIngredient(index)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:model-value"]);

const ingredientsInput = ref("");
const ingredients = ref([]);

const addIngredients = () => {
  const newIngredients = ingredientsInput.value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);
  ingredients.value = [...ingredients.value, ...newIngredients];
  ingredientsInput.value = "";
  emit("update:model-value", ingredients.value);
};

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
  emit("update:model-value", ingredients.value);
};
</script>

<style scoped></style>
