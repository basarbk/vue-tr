import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const auth = reactive({ id: 0 })

  function setLoggedIn(data) {
    auth.id = data.id
    auth.username = data.username
    auth.email = data.email
    auth.image = data.image
  }
  return { auth, setLoggedIn }
})
