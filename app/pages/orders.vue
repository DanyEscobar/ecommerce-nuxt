<template>
  <div class="orders-page animate-fade-in">
    <div class="page-header mb-8">
      <h1 class="h1">Order History</h1>
      <NuxtLink to="/products" class="btn-link btn btn-primary">Continue Shopping</NuxtLink>
    </div>

    <div v-if="ordersStore.orders.length === 0" class="empty-orders glass text-center py-16">
      <div class="icon mb-6">📦</div>
      <h2 class="h2 mb-4">No orders yet</h2>
      <p class="text-muted mb-8">When you place an order, it will appear here.</p>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in ordersStore.orders" :key="order.id" class="order-card glass mb-6">
        <div class="order-header">
          <div class="order-info">
            <h3 class="h4">Order #{{ order.id }}</h3>
            <p class="text-muted text-sm mt-1">
              Placed on {{ new Date(order.date).toLocaleDateString() }} at {{ new Date(order.date).toLocaleTimeString() }}
            </p>
          </div>
          <div class="order-status text-right">
            <span class="status-badge bg-success">{{ order.status }}</span>
            <p class="h3 mt-2 text-gradient">${{ order.total.toFixed(2) }}</p>
          </div>
        </div>

        <hr class="divider my-6" />

        <div class="order-items">
          <h4 class="h5 mb-4">Items ({{ order.items.reduce((acc, item) => acc + item.quantity, 0) }})</h4>
          <div class="items-grid">
            <div v-for="item in order.items" :key="item.id" class="item-row mb-4">
              <div class="item-image glass-card">
                <img :src="item.image" :alt="item.title" />
              </div>
              <div class="item-details">
                <NuxtLink :to="`/products/${item.id}`" class="item-title font-medium text-main">{{ item.title }}</NuxtLink>
                <div class="item-price-row mt-2">
                  <span class="text-muted text-sm">Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}</span>
                  <span class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrdersStore } from '~/stores/orders'

const ordersStore = useOrdersStore()
</script>

<style scoped>
.btn-link {
  color: #fff;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.order-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-header .order-status {
  text-align: left;
}

.empty-orders .icon {
  font-size: 4rem;
}

.order-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.status-badge {
  background-color: var(--success-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.divider {
  border: none;
  border-top: 1px solid var(--surface-border);
}

.my-6 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.items-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.item-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: var(--surface-color);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--surface-border);
}

.item-image {
  width: 60px;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-details {
  flex-grow: 1;
  min-width: 0;
}

.item-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-decoration: none;
  word-break: break-word;
}

.item-title:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.item-price-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (min-width: 200px) {
  .order-card {
    padding: 1rem;
  }
}

@media (min-width: 480px) {
  .order-card {
    padding: 2rem;
  }

  .item-price-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: 700;
}

@media (min-width: 640px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .order-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .order-header .order-status {
    text-align: right;
  }
}

@media (min-width: 768px) {
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
