<template>
  <div class="spinner-container animate-fade-in">
    <div class="spinner" />
    <span v-if="text" class="spinner-text text-muted mt-4">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: 'Loading data...'
  }
})
</script>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  width: 100%;
  min-height: 200px;
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* Use the glass surface border and primary color for a sleek look */
  border: 4px solid var(--surface-border);
  border-right-color: var(--primary-color);
  animation: spin 1s infinite linear;
}

.spinner-text {
  font-weight: 500;
  letter-spacing: 0.5px;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
