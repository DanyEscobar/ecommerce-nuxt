<template>
  <footer class="app-footer">
    <div class="container footer-container">
      <div class="footer-content">
        <div class="brand">
          <h2 class="h3">NovaShop</h2>
          <p class="text-muted text-sm mt-4">
            Premium e-commerce experience built with Nuxt 3 and Vanilla CSS.
          </p>
        </div>
        
        <div class="links">
          <h3 class="h4">Quick Links</h3>
          <ul class="link-list mt-4">
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/products">Products</NuxtLink></li>
            <li><NuxtLink to="/cart">Cart</NuxtLink></li>
            <li><NuxtLink to="/orders">Orders</NuxtLink></li>
          </ul>
        </div>
        
        <div class="social">
          <h3 class="h4">Connect</h3>
          <div class="social-icons mt-4">
            <a href="#" class="btn btn-outline">𝕏</a>
            <a href="#" class="btn btn-outline">In</a>
            <a href="#" class="btn btn-outline">GH</a>
          </div>
        </div>
      </div>
      
      <div class="bottom-bar mt-8">
        <p class="text-xs text-muted">
          &copy; {{ new Date().getFullYear() }} NovaShop. All rights reserved. simulated for demo.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 2rem;
  padding: var(--space-12) 0 var(--space-6);
  border-top: 1px solid var(--surface-border);
  background-color: var(--surface-color);
  backdrop-filter: blur(8px);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.link-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.link-list a {
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.link-list a:hover {
  color: var(--text-main);
}

.social-icons {
  display: flex;
  gap: var(--space-2);
}

.social-icons .btn {
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
}

.bottom-bar {
  border-top: 1px solid var(--surface-border);
  padding-top: var(--space-6);
  text-align: center;
}
</style>
