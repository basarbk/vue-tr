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
import { watchEffect, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'
import activate from './api'
const { t } = useI18n()
const route = useRoute()

const errorMessage = ref()
const successMessage = ref()
const status = ref()

watchEffect(async () => {
  status.value = 'loading'
  try {
    const response = await activate(route.params.token)
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
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'
import activate from './api'

export default {
  components: {
    AppSpinner,
    AppAlert
  },
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
        const response = await activate(this.$route.params.token)
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
