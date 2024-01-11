<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      class="form-control"
      :id="id"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
    />
    {{ help }}
  </div>
</template>
<script setup>
defineProps({
  id: String,
  label: String,
  help: String,
  modelValue: String,
  type: String
})

defineEmits(['update:modelValue'])
</script>
<!-- <script>
export default {
  emits: ['update:modelValue'],
  props: {
    id: String,
    label: String,
    help: String,
    modelValue: String,
    type: String
  }
}
</script> -->
