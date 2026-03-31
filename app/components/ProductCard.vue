<template>
  <div class="product-card glass-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" loading="lazy" />
      <div class="category-badge">{{ product.category }}</div>
    </div>
    
    <div class="product-info">
      <h3 class="product-title h4" :title="product.title">
        <NuxtLink :to="`/products/${product.id}`" class="title-link">
          {{ product.title }}
        </NuxtLink>
      </h3>
      
      <div class="product-meta mt-2">
        <div class="rating flex items-center gap-2">
          <span class="stars">⭐ {{ product.rating?.rate }}</span>
          <span class="count text-muted text-xs">({{ product.rating?.count }})</span>
        </div>
      </div>
      
      <div class="product-actions mt-4 flex items-center justify-between">
        <span class="price h3">${{ product.price.toFixed(2) }}</span>
        <button class="btn btn-primary btn-sm add-to-cart-btn" aria-label="Add to Cart" @click="addToCart">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            <line x1="12" y1="12" x2="12" y2="16"></line>
            <line x1="10" y1="14" x2="14" y2="14"></line>
          </svg>
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.product)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--surface-color);
}

.product-image-container {
  position: relative;
  height: 200px;
  background-color: #fff; /* Keep white for product images */
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-height: 100%;
  object-fit: contain;
  transition: transform var(--transition-normal);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--surface-color);
  backdrop-filter: blur(4px);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  text-transform: capitalize;
  font-weight: 600;
  color: var(--text-main);
  border: 1px solid var(--surface-border);
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.title-link {
  color: var(--text-main);
}

.title-link:hover {
  text-decoration: underline;
  color: var(--primary-color);
}

.stars {
  color: #fbbf24;
  font-weight: 600;
  font-size: 0.9rem;
}

.product-actions {
  margin-top: auto;
  padding-top: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.price {
  font-weight: 800;
  color: var(--primary-color);
}

.add-to-cart-btn {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.add-to-cart-btn svg {
  margin-right: 0.2rem;
}
</style>
