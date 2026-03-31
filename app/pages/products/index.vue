<template>
  <div class="products-page animate-fade-in">
    <div class="page-header mb-8 text-center">
      <h1 class="h1">All Products</h1>
      <p class="text-muted mt-2">Browse our entire collection</p>
    </div>

    <!-- Categories Filter (Optional simple implementation) -->
    <div class="filters glass mb-8 py-4 px-6 flex items-center gap-4">
      <button 
        class="btn btn-outline" 
        :class="{ 'btn-primary': !selectedCategory }" 
        @click="selectedCategory = null"
      >
        All
      </button>
      <button 
        v-for="category in categories" 
        :key="category"
        class="btn btn-outline capitalize" 
        :class="{ 'btn-primary': selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="pending" class="grid grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="skeleton"></div>
    </div>
    
    <div v-else-if="error" class="error-message glass text-center py-8">
      <p class="text-danger h3">Failed to load products.</p>
      <button @click="() => refresh()" class="btn btn-primary mt-4">Try Again</button>
    </div>
    
    <div v-else-if="filteredProducts.length === 0" class="empty-state text-center py-16">
      <h3 class="h3 text-muted">No products found.</h3>
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        class="animate-fade-in"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Product } from '~/types'

const selectedCategory = ref<string | null>(null)

// Nuxt useFetch will SSR these perfectly
const { data: products, pending, error, refresh } = await useFetch<Product[]>('https://fakestoreapi.com/products')

// Extract unique categories
const categories = computed(() => {
  if (!products.value) return []
  return [...new Set(products.value.map(p => p.category))]
})

const filteredProducts = computed(() => {
  if (!products.value) return []
  if (!selectedCategory.value) return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})
</script>

<style scoped>
.filters {
  border-radius: var(--radius-lg);
  overflow-x: auto;
  flex-wrap: nowrap;
  
  /* Hide scrollbar for a cleaner look */
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.filters::-webkit-scrollbar {
  display: none;
}

.filters button {
  flex-shrink: 0;
}

.capitalize {
  text-transform: capitalize;
}

.skeleton {
  height: 350px;
}

/* On larger screens, center the buttons and allow wrapping */
@media (min-width: 768px) {
  .filters {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
  }
}
</style>
