<template>
  <form @submit.prevent="submit">
    <AppInput id="username" :label="$t('username')" v-model="username" :help="errors.username" />
    <AppInput
      id="image"
      :label="$t('selectImage')"
      type="file"
      @change="onImageChange"
      :help="errors.image"
    />
    <AppAlert v-if="error" variant="danger">{{ error }}</AppAlert>
    <AppButton type="submit" :api-progress="apiProgress">{{ $t('save') }}</AppButton>
    <div class="d-inline m-1"></div>
    <AppButton type="button" variant="outline-secondary" @click="$emit('cancel')">{{
      $t('cancel')
    }}</AppButton>
  </form>
</template>
<script setup>
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppAlert from '@/components/AppAlert.vue'
import { useAuthStore } from '@/stores/auth'
import { updateUser } from './api'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['cancel', 'save', 'newImage'])

const { t } = useI18n()
const { auth, update } = useAuthStore()
const error = ref()
const errors = ref({})
const apiProgress = ref(false)
const username = ref(auth.username)
const image = ref()
const submit = async () => {
  apiProgress.value = true
  error.value = undefined
  try {
    const response = await updateUser(auth.id, { username: username.value, image: image.value })
    update({ username: username.value, image: response.data.image })
    emit('save')
  } catch (apiError) {
    apiProgress.value = false
    if (apiError.response?.status === 400) {
      errors.value = apiError.response.data.validationErrors
    } else {
      error.value = t('genericError')
    }
  }
}

const onImageChange = (event) => {
  delete errors.value.image
  const file = event.target.files[0]
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    const data = fileReader.result
    image.value = data.split(',')[1]
    emit('newImage', data)
  }
  fileReader.readAsDataURL(file)
}

watch(
  () => username.value,
  () => {
    delete errors.value.username
  }
)
</script>
