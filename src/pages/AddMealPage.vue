<template>
  <div class="content" id="titleSelection">
    <div class="row">
      <h4 class="label">Name</h4>
      <q-input filled v-model="text" :style="{ minWidth: '60%' }" bg-color="white"/>
    </div>
  </div>
  <div class="content" id="categorySelection">
    <h4>Kategorien</h4>
    <q-select
      filled
      v-model="multiple"
      multiple
      :options="options"
      :style="{ minWidth: '60%' }"
      bg-color="white"
      @update:model-value="onSelectionChange"
    />
    <q-dialog v-model="isDialogOpen">
      <q-card>
        <q-card-section>
          <h6>Add a new category</h6>
          <q-input
            v-model="newCategory"
            label="Category name"
            filled
            autofocus
          />
        </q-card-section>

        <q-card-actions>
          <q-btn flat label="Cancel" @click="closeDialog" />
          <q-btn flat label="Save" @click="saveNewCategory" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <div class="content" id="durationSelection">
    <h4>Dauer</h4>
  </div>
  <div class="content" id="ingredientSelection">
    <h4>Zutaten</h4>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import categorieList from "../assets/exampleCategories.json"

const text = ref('');
const multiple = ref([]);  
const options = ref(categorieList.categories.map(category => category.name)); 
options.value.push("new"); 


const isDialogOpen = ref(false);  
const newCategory = ref('');

const onSelectionChange = (newValues) => {
  if (newValues.includes('new')) {
  const index = newValues.indexOf('new');
  if (index > -1) {
    newValues.splice(index, 1);  // Remove 'new' from the array
  }
  isDialogOpen.value = true;
}
};

const closeDialog = () => {
  isDialogOpen.value = false;
  newCategory.value = ''; 
};

const saveNewCategory = () => {
  if (newCategory.value && !options.value.includes(newCategory.value)) {
    const index = options.value.indexOf('new');
    if (index > -1) {
      options.value.splice(index, 1);
    }

    options.value.push(newCategory.value);
    multiple.value.push(newCategory.value);

    options.value.push('new');
  }

  closeDialog();
};
</script>

<style scoped>
.content {
  background-color: lightgray;
  margin: 30px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.label {
  margin: 0;
}
</style>
