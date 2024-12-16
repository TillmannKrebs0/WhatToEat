<template>
  <q-input
    v-model="ingredientsInput"
    label="mehrere Zutaten mit Komma trennen"
    outlined
    clearable
    :style="{ backgroundColor: '#f2f2f2' }"
    @keyup.enter="addIngredients"
    dense
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
import { ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:model-value"]);

const ingredientsInput = ref("");
const ingredients = ref(props.modelValue || []);

watch(ingredients, (newValue) => {
  emit("update:model-value", newValue);
}, { deep: true });

const addIngredients = () => {
  const newIngredients = ingredientsInput.value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);
  ingredients.value = [...ingredients.value, ...newIngredients];
  ingredientsInput.value = "";
};

const removeIngredient = (index) => {
  ingredients.value.splice(index, 1);
};
</script>

<style scoped></style>
