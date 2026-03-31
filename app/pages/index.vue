<template>
  <div class="home-page">
    <section class="hero glass animate-fade-in">
      <div class="hero-content text-center">
        <h1 class="h1 mb-4">Discover the <span class="text-gradient">Premium</span> Collection</h1>
        <p class="text-lg text-muted mb-8">
          Elevate your lifestyle with our curated selection of high-quality products.
          Experience the seamless blend of style and functionality.
        </p>
        <NuxtLink to="/products" class="btn-link btn btn-primary lg">
          Shop Now
        </NuxtLink>
      </div>
    </section>

    <section class="featured-products mt-8 py-16">
      <div class="section-header flex justify-between items-center mb-8">
        <h2 class="h2">Featured Products</h2>
        <NuxtLink to="/products" class="btn btn-outline">View All</NuxtLink>
      </div>

      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <div v-for="i in 4" :key="i" class="skeleton"></div>
      </div>
      
      <div v-else-if="error" class="error-message glass text-center py-8">
        <p class="text-danger h3">Failed to load products.</p>
        <button class="btn btn-primary mt-4" @click="() => refresh()">Try Again</button>
      </div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="animate-fade-in"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const { data: products, pending, error, refresh } = await useFetch<Product[]>('https://fakestoreapi.com/products?limit=4', {
  lazy: true
})
</script>

<style scoped>
.hero {
  padding: 6rem 2rem;
  margin-bottom: 4rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(88, 166, 255, 0.1) 0%, transparent 60%);
  z-index: -1;
}

.hero-content {
  max-width: 800px;
}

.section-header {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-link {
  font-size: 1.1rem; 
  padding: 0.75rem 2rem;
}

.btn-link:hover {
  color: #fff;
}

.skeleton {
  height: 350px;
}
</style>
