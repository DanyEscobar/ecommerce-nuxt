<template>
  <div class="products-page animate-fade-in">
    <div class="page-header mb-8 text-center">
      <h1 class="h1">All Products</h1>
      <p class="text-muted mt-2">Browse our entire collection</p>
    </div>

    <!-- Mobile Category Selector -->
    <div class="mobile-filter glass mb-8">
      <label for="mobile-category" class="font-medium text-muted">Category:</label>
      <select 
        id="mobile-category"
        v-model="selectedCategory"
        class="mobile-select capitalize cursor-pointer"
      >
        <option :value="null" class="text-black">All</option>
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category" 
          class="capitalize select-option"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Desktop Categories Filter (hidden on mobile) -->
    <div class="desktop-filters filters glass mb-8 py-4 px-6 items-center gap-4">
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
      <button class="btn btn-primary mt-4" @click="() => refresh()">Try Again</button>
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
import type { Product } from '~/types'

const selectedCategory = ref<string | null>(null)

// Nuxt useFetch will SSR these perfectly
const { data: products, pending, error, refresh } = await useFetch<Product[]>('/api/products', {
  lazy: true
})

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
  display: flex; /* Enforce flex for horizontal overflow */
  
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

/* Custom Responsive Styles (Since Tailwind utilities like md:hidden are not in main.css) */
.mobile-filter {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-lg);
}

.mobile-select {
  background-color: transparent;
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  padding: 0.4rem 0.8rem;
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border-color var(--transition-fast);
  text-align: right;
  min-width: 140px;
}

.mobile-select:focus {
  border-color: var(--primary-color);
}

.select-option {
  color: #000;
  background-color: #fff;
}

/* Desktop is hidden by default on small screens */
.desktop-filters {
  display: none;
}

/* On larger screens (md breakpoint) */
@media (min-width: 768px) {
  .mobile-filter {
    display: none;
  }

  .desktop-filters {
    display: flex;
  }

  .filters {
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
  }
}
</style>
