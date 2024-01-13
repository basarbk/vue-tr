<script setup>
import { RouterView } from 'vue-router'
import LanguageSelector from './components/LanguageSelector.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="container mt-3">
    <RouterView />
    <LanguageSelector />
  </main>
</template>
