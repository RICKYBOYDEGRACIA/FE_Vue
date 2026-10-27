<!-- src/views/HomeView.vue -->
<template>
  <div class="home-page">
    <h1>Welcome to the Home Page</h1>
    <p>{{ greeting }}</p>
    <button @click="incrementCount">Clicked {{ count }} times</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const greeting = ref('Hello, Vue 3 developer!')
const count = ref(0)

// Methods/functions
const incrementCount = () => {
  count.value++
}
</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #42b983;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>