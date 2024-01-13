<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppAlert v-if="status === 'loading'" variant="secondary" center>
      <AppSpinner size="normal" />
    </AppAlert>
    <AppAlert v-if="status === 'fail'" variant="danger">
      {{ errorMessage }}
    </AppAlert>
    <AppAlert v-if="status === 'success'">
      {{ successMessage }}
    </AppAlert>
  </div>
</template>
<script setup>
import axios from 'axios'
import { watchEffect, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'
const { t } = useI18n()
const route = useRoute()

const errorMessage = ref()
const successMessage = ref()
const status = ref()

watchEffect(async () => {
  status.value = 'loading'
  try {
    const response = await axios.patch(`/api/v1/users/${route.params.token}/active`)
    successMessage.value = response.data.message
    status.value = 'success'
  } catch (apiError) {
    if (apiError.response?.data?.message) {
      errorMessage.value = apiError.response.data.message
    } else {
      errorMessage.value = t('genericError')
    }
    status.value = 'fail'
  }
})
</script>
<!-- <script>
import axios from 'axios'

export default {
  data() {
    return {
      status: undefined,
      errorMessage: undefined,
      successMessage: undefined
    }
  },
  mounted() {
    this.sendActivationRequest()
  },
  methods: {
    async sendActivationRequest() {
      this.status = 'loading'
      try {
        const response = await axios.patch(`/api/v1/users/${this.$route.params.token}/active`)
        this.successMessage = response.data.message
        this.status = 'success'
      } catch (apiError) {
        if (apiError.response?.data?.message) {
          this.errorMessage = apiError.response.data.message
        } else {
          this.errorMessage = this.$t('genericError')
        }
        this.status = 'fail'
      }
    }
  },
  watch: {
    '$route.params.token'() {
      this.sendActivationRequest()
    }
  }
}
</script> -->
