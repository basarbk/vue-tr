<script setup>
import { RouterView } from 'vue-router'
import LanguageSelector from './components/LanguageSelector.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="container mt-3">
    <router-link class="d-block" to="/activation/123">Activation 123</router-link>
    <router-link class="d-block" to="/activation/456">Activation 456</router-link>
    <RouterView />
    <LanguageSelector />
  </main>
</template>
