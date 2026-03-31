<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/stores/orders'
import { onMounted } from 'vue'

const ordersStore = useOrdersStore()

onMounted(() => {
  // Load persisted orders on app start
  ordersStore.loadOrders()
})
</script>
