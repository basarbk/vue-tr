import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  let initialState = {
    id: 0
  }

  const storedState = localStorage.getItem('auth')
  if (storedState !== null) {
    try {
      initialState = JSON.parse(storedState)
    } catch {
      /* empty */
    }
  }

  const auth = reactive(initialState)

  function setLoggedIn(data) {
    auth.id = data.id
    auth.username = data.username
    auth.email = data.email
    auth.image = data.image
  }

  function logout() {
    auth.id = 0
    delete auth.username
    delete auth.email
    delete auth.image
  }

  function update(data) {
    auth.username = data.username
    auth.image = data.image
  }

  watch(auth, () => {
    localStorage.setItem('auth', JSON.stringify(auth))
  })

  return { auth, setLoggedIn, logout, update }
})
