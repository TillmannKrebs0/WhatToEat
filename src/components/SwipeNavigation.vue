<template>
  <div class="q-pa-md row justify-center">
    <q-card
      v-touch-swipe.mouse.right="handleSwipeRight"
      v-touch-swipe.mouse.left="handleSwipeLeft"
      class="custom-area cursor-pointer bg-primary text-white shadow-2 relative-position row flex-center"
    >
      <div v-if="info" class="custom-info">
        <pre>{{ info }}</pre>
      </div>
      <div v-else>
        Swipe to navigate pages
        <q-icon name="swap_horiz" />
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const info = ref(null);
const router = useRouter();

const routes = ["/overview", "/addMeal", "/selectMeal"]; // Define the order of your routes

const navigate = (direction) => {
  const currentRoute = router.currentRoute.value.path;
  const currentIndex = routes.indexOf(currentRoute);
  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + direction + routes.length) % routes.length; // Loop navigation
  router.push(routes[nextIndex]);
};

const handleSwipeRight = () => {
  navigate(-1); // Navigate to the previous route
};

const handleSwipeLeft = () => {
  navigate(1); // Navigate to the next route
};
</script>

<style lang="sass" scoped>
.custom-area
  width: 90%
  height: 220px
  border-radius: 3px
  padding: 8px

.custom-info pre
  width: 180px
  font-size: 12px
</style>
