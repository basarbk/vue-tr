<template>
  <img
    src="https://flagcdn.com/24x18/tr.png"
    width="24"
    height="18"
    alt="Turkish"
    role="button"
    @click="setLanguage('tr')"
  />
  <span class="m-1"></span>
  <img
    src="https://flagcdn.com/24x18/gb.png"
    width="24"
    height="18"
    alt="English"
    role="button"
    @click="setLanguage('en')"
  />
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const setLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>
<!-- <script>
export default {
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('lang', lang)
    }
  }
}
</script> -->
