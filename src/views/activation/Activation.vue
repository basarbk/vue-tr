<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppAlert v-if="status === 'loading'" variant="secondary" center>
      <AppSpinner size="normal" />
    </AppAlert>
    <AppAlert v-if="status === 'fail'" variant="danger">
      {{ error }}
    </AppAlert>
    <AppAlert v-if="status === 'success'">
      {{ data.message }}
    </AppAlert>
  </div>
</template>
<script setup>
import AppSpinner from '@/components/AppSpinner.vue'
import AppAlert from '@/components/AppAlert.vue'
import activate from './api'

import useRouteParamApiRequest from '@/shared/useRouteParamApiRequest'

const { status, data, error } = useRouteParamApiRequest(activate, 'token')
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
      error: undefined,
      data: undefined
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
        this.data = response.data
        this.status = 'success'
      } catch (apiError) {
        if (apiError.response?.data?.message) {
          this.error = apiError.response.data.message
        } else {
          this.error = this.$t('genericError')
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
