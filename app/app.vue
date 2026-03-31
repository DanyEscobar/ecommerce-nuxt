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
import { useCartStore } from '~/stores/cart'
import { onMounted } from 'vue'

const ordersStore = useOrdersStore()
const cartStore = useCartStore()

onMounted(() => {
  // Load persisted data on app start
  ordersStore.loadOrders()
  cartStore.loadCart()
})
</script>
