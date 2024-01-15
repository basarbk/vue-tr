<template>
  <nav class="navbar navbar-expand bg-body-tertiary shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">My App</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/login">{{ $t('login') }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup">{{ $t('signUp') }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
