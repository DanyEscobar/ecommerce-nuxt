<template>
  <header class="app-header glass">
    <div class="container header-container">
      <NuxtLink to="/" class="logo text-gradient" @click="isMenuOpen = false">
        NovaShop
      </NuxtLink>

      <nav :class="['nav-links', { 'is-open': isMenuOpen }]">
        <NuxtLink to="/products" class="nav-link" @click="isMenuOpen = false">Products</NuxtLink>
        <NuxtLink to="/orders" class="nav-link" @click="isMenuOpen = false">Orders</NuxtLink>
      </nav>

      <div class="actions">
        <NuxtLink to="/cart" class="cart-btn btn btn-outline" @click="isMenuOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartStore.totalItems > 0" class="badge animate-fade-in">
            {{ cartStore.totalItems }}
          </span>
        </NuxtLink>

        <!-- Hamburger Toggle Button -->
        <button class="hamburger-btn btn btn-outline" aria-label="Toggle menu" @click="isMenuOpen = !isMenuOpen">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const isMenuOpen = ref(false)
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hamburger-btn {
  display: none;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.nav-links {
  display: flex;
  gap: 2rem;
}

@media (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(13, 17, 23, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--surface-border);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    align-items: center;
    
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-lg);
  }

  .nav-links.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.nav-link {
  font-weight: 500;
  color: var(--text-main);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width var(--transition-fast);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: var(--primary-color);
}

.cart-btn {
  position: relative;
  padding: 0.7rem;
  border-radius: var(--radius-full);
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
</style>
