<template>
  <div class="product-card glass-card">
    <div class="product-image-container skeleton-bg">
      <!-- Simulated badge -->
      <div class="skeleton badge-skel" />
    </div>
    
    <div class="product-info">
      <!-- Simulated Title -->
      <div class="skeleton title-line-1" />
      <div class="skeleton title-line-2" />
      
      <!-- Simulated Rating -->
      <div class="skeleton rating-line" />
      
      <!-- Simulated Actions -->
      <div class="product-actions">
        <div class="skeleton price-skel" />
        <div class="skeleton btn-skel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--surface-color);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
}

.product-image-container {
  position: relative;
  height: 200px;
  padding: 1rem;
}

.skeleton-bg {
  background: linear-gradient(-90deg, rgba(22, 27, 34, 0.4) 0%, rgba(30, 36, 45, 0.8) 50%, rgba(22, 27, 34, 0.4) 100%);
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;
}

.badge-skel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 70px;
  height: 24px;
  border-radius: var(--radius-full);
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title-line-1 {
  height: 20px;
  width: 90%;
  margin-bottom: 8px;
}

.title-line-2 {
  height: 20px;
  width: 60%;
  margin-bottom: 24px;
}

.rating-line {
  height: 16px;
  width: 40%;
  margin-bottom: 24px;
  margin-top: 0.5rem;
}

.product-actions {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-skel {
  height: 28px;
  width: 60px;
}

.btn-skel {
  height: 32px;
  width: 80px;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: -135% 0%; }
}
</style>
