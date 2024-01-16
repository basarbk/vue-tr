<template>
  <AppCard>
    <template v-slot:header>
      <ProfileImage
        class="rounded-circle shadow"
        width="200"
        height="200"
        :alt="user.username + ' profile'"
        :tempImage="tempImage"
        :image="image"
      />
    </template>
    <template v-slot:body>
      <div class="text-center">
        <template v-if="!editMode">
          <h3>{{ username }}</h3>
          <AppButton v-if="auth.id === user.id" @click="editMode = !editMode">{{
            $t('edit')
          }}</AppButton>
          <div class="mt-3"></div>
          <UserDeleteButton :id="user.id" />
        </template>
        <EditForm
          v-if="editMode"
          @cancel="onClickCancel"
          @save="editMode = false"
          @newImage="onNewImage"
        />
      </div>
    </template>
  </AppCard>
</template>
<script setup>
import AppCard from '@/components/AppCard.vue'
import AppButton from '@/components/AppButton.vue'
import ProfileImage from '@/components/ProfileImage.vue'
import UserDeleteButton from './UserDeleteButton.vue'
import { useAuthStore } from '@/stores/auth'
import EditForm from './EditForm.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  user: Object
})

const editMode = ref(false)
const { auth } = useAuthStore()

const tempImage = ref()

const onNewImage = (data) => {
  tempImage.value = data
}

const onClickCancel = () => {
  editMode.value = false
  tempImage.value = undefined
}

const username = computed(() => (auth.id === props.user.id ? auth.username : props.user.username))

const image = computed(() => (auth.id === props.user.id ? auth.image : props.user.image))
</script>
