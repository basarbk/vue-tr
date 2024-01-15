<template>
  <nav class="navbar navbar-expand bg-body-tertiary shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">My App</router-link>
      <ul class="navbar-nav">
        <template v-if="auth.id === 0">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">{{ $t('login') }}</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">{{ $t('signUp') }}</router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/user/' + auth.id">My Profile</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'

const { auth } = useAuthStore()
</script>
