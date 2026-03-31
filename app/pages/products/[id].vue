<template>
  <div class="product-details-page">
    <button class="btn btn-outline mb-6" @click="$router.back()">
      ← Back
    </button>

    <div v-if="pending" class="skeleton details-skeleton"></div>

    <div v-else-if="error || !product" class="error-message glass text-center py-8">
      <p class="text-danger h3">Product not found or failed to load.</p>
      <NuxtLink to="/products" class="btn btn-primary mt-4">Browse Catalog</NuxtLink>
    </div>

    <div v-else class="product-container glass animate-fade-in">
      <div class="product-image-section">
        <img :src="product.image" :alt="product.title" class="product-image" />
      </div>
      
      <div class="product-info-section">
        <div class="badge-container mb-4">
          <span class="category-badge">{{ product.category }}</span>
        </div>
        
        <h1 class="h2 mb-4">{{ product.title }}</h1>
        
        <div class="rating flex items-center gap-2 mb-6">
          <span v-if="product.rating" class="stars">
            {{ '⭐'.repeat(Math.round(product.rating.rate)) }}
          </span>
          <span class="count text-muted">
            {{ product.rating?.rate }} ({{ product.rating?.count }} reviews)
          </span>
        </div>
        
        <p class="price h1 text-gradient mb-6">${{ product.price.toFixed(2) }}</p>
        
        <div class="description text-muted mb-8 text-lg" style="line-height: 1.8;">
          {{ product.description }}
        </div>
        
        <hr class="divider mb-8" />
        
        <div class="add-to-cart-container">
          <div class="quantity-selector">
            <button class="btn btn-outline btn-sm" @click="quantity > 1 && quantity--">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button class="btn btn-outline btn-sm" @click="quantity++">+</button>
          </div>
          
          <button class="btn btn-primary" @click="addToCart">
            Add {{ quantity }} to Cart - ${{ (product.price * quantity).toFixed(2) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '~/types'
import { useCartStore } from '~/stores/cart'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const cartStore = useCartStore()
const { addToast } = useToast()

const productId = route.params.id as string
const { data: product, pending, error } = await useFetch<Product>(`https://fakestoreapi.com/products/${productId}`, {
  lazy: true
})

const quantity = ref(1)

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    addToast(`Added ${quantity.value}× "${product.value.title}" to cart`, 'success')
  }
}
</script>

<style scoped>
.details-skeleton {
  width: 100%;
  height: 60vh;
  border-radius: var(--radius-lg);
}

.product-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
}

.product-image-section {
  background-color: white;
  border-radius: var(--radius-md);
  padding: var(--space-8);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.product-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

.category-badge {
  background: rgba(88, 166, 255, 0.1);
  color: var(--primary-color);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.875rem;
}

.stars {
  letter-spacing: 2px;
}

.description {
  word-break: break-all; 
}

.divider {
  border: none;
  border-top: 1px solid var(--surface-border);
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface-color);
  border: 1px solid var(--surface-border);
  padding: 0.5rem;
  border-radius: var(--radius-md);
  justify-content: center;
}

.quantity-value {
  font-weight: 700;
  min-width: 1.5rem;
  text-align: center;
}

.add-to-cart-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-to-cart-container .btn-primary {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (min-width: 200px) {
  .product-container {
    padding: 1rem;
  }
}

@media (min-width: 480px) {
  .product-container {
    padding: 2rem;
  }

  .add-to-cart-container {
    flex-direction: row;
    align-items: center;
  }

  .add-to-cart-container .btn-primary {
    flex-grow: 1;
    width: auto;
  }
}

@media (min-width: 992px) {
  .product-container {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
