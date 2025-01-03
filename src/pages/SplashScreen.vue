<template>
  <div class="splash-screen">
    <img :src="logo" alt="WhatToEat Logo" class="logo" />
    <h2>WhatToEat</h2>
  </div>
</template>



<script setup>
  import logo from "/icons/WTElogo1.png"
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  flex-direction: column;
  text-align: center;
}
h2 {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 5em;
  margin-top: 1.5em;
  color: #EA5C2B;
  position: absolute;
  top: 0;
}

.logo {
  width: 70vw; /* Set the width of the image */
  height: auto; /* Keep the aspect ratio */
  background-color: white;
}
</style>
