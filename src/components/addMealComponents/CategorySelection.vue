<template>
  <q-select
    filled
    v-model="multiple"
    multiple
    :options="options"
    :style="{ minWidth: '60%', border: '1px solid lightgrey', borderRadius: '5px' }"
    @update:model-value="onSelectionChange"
    dense
  />
</template>

<script setup>
import { ref } from "vue";
import categorieList from "../../assets/exampleCategories.json";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:model-value"]);

const multiple = ref(props.modelValue || []);
const options = ref(categorieList.categories.map((category) => category.name));

const onSelectionChange = (newValues) => {
  emit("update:model-value", newValues); // Notify the parent
};

/*

  <q-dialog v-model="isDialogOpen">
    <q-card>
      <q-card-section>
        <h6>Add a new category</h6>
        <q-input v-model="newCategory" label="Category name" filled autofocus />
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Cancel" @click="closeDialog" />
        <q-btn flat label="Save" @click="saveNewCategory" />
      </q-card-actions>
    </q-card>
  </q-dialog>


options.value.push("new");

const isDialogOpen = ref(false);
const newCategory = ref("");



const onSelectionChange = (newValues) => {
  if (newValues.includes("new")) {
    const index = newValues.indexOf("new");
    if (index > -1) {
      newValues.splice(index, 1); // Remove 'new' from the array
    }
    isDialogOpen.value = true;
  }
  emit("update:model-value", newValues); // Notify the parent
};

const closeDialog = () => {
  isDialogOpen.value = false;
  newCategory.value = "";
};

const saveNewCategory = () => {
  if (newCategory.value && !options.value.includes(newCategory.value)) {
    const index = options.value.indexOf("new");
    if (index > -1) {
      options.value.splice(index, 1);
    }

    options.value.push(newCategory.value);
    multiple.value.push(newCategory.value);

    options.value.push("new");
  }

  closeDialog();
};*/
</script>
