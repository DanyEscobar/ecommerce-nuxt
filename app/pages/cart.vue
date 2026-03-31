<template>
  <div class="cart-page animate-fade-in">
    <h1 class="h1 mb-8">Shopping Cart</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart glass text-center py-16">
      <div class="icon mb-6">🛒</div>
      <h2 class="h2 mb-4">Your cart is empty</h2>
      <p class="text-muted mb-8">Looks like you haven't added anything yet.</p>
      <NuxtLink to="/products" class="btn-link btn btn-primary lg">Start Shopping</NuxtLink>
    </div>
    
    <div v-else class="cart-container grid">
      <div class="cart-items glass">
        <div class="cart-header flex justify-between items-center mb-6">
          <h2 class="h3">Items ({{ cartStore.totalItems }})</h2>
          <button class="btn btn-outline btn-sm text-danger" @click="cartStore.clearCart">Clear Cart</button>
        </div>
        
        <div class="item-list">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item glass-card mb-4">
            <div class="item-image-wrapper">
              <img :src="item.image" :alt="item.title" />
            </div>
            
            <div class="item-details">
              <h3 class="h4" :title="item.title">
                <NuxtLink :to="`/products/${item.id}`">{{ item.title }}</NuxtLink>
              </h3>
              <p class="text-muted text-sm mt-1 capitalize">{{ item.category }}</p>
              <div class="price h4 mt-2">${{ item.price.toFixed(2) }}</div>
            </div>
            
            <div class="item-actions flex items-center justify-between">
              <div class="quantity-selector">
                <button class="btn-less btn btn-outline btn-sm" @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                <span class="quantity-value">{{ item.quantity }}</span>
                <button class="btn-plus btn btn-outline btn-sm" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
              
              <div class="total-action flex items-center gap-4 justify-end">
                <span class="item-total h4 mb-0">${{ (item.price * item.quantity).toFixed(2) }}</span>
                <button class="btn btn-danger btn-sm" @click="removeFromCart(item.id)">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cart-summary glass">
        <h2 class="h3 mb-6">Order Summary</h2>
        
        <div class="summary-row flex justify-between mb-4">
          <span class="text-muted">Subtotal ({{ cartStore.totalItems }} items)</span>
          <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        
        <div class="summary-row flex justify-between mb-4">
          <span class="text-muted">Shipping</span>
          <span class="text-success">Free</span>
        </div>
        
        <div class="summary-row flex justify-between mb-4">
          <span class="text-muted">Tax</span>
          <span>$0.00</span>
        </div>
        
        <hr class="my-4 divider" />
        
        <div class="summary-row flex justify-between mb-8">
          <span class="h3">Total</span>
          <span class="h3 text-gradient">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        
        <button 
          class="btn btn-primary lg w-full" 
          :disabled="isCheckingOut"
          @click="checkout"
        >
          <span v-if="isCheckingOut">Processing...</span>
          <span v-else>Proceed to Checkout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useOrdersStore } from '~/stores/orders'
import { useToast } from '~/composables/useToast'

const cartStore = useCartStore()
const ordersStore = useOrdersStore()
const router = useRouter()
const { addToast } = useToast()

const isCheckingOut = ref(false)

const updateQuantity = (id: number, qty: number) => {
  if (qty > 0) {
    cartStore.updateQuantity(id, qty)
  }
}

const removeFromCart = (id: number) => {
  cartStore.removeFromCart(id)
  addToast('Item removed from cart', 'info')
}

const checkout = () => {
  if (cartStore.items.length === 0) return
  
  isCheckingOut.value = true
  
  // Simulate API call
  setTimeout(() => {
    // Create order
    ordersStore.createOrder(cartStore.items, cartStore.totalPrice)
    
    addToast('Order placed successfully! 🎉', 'success')
    
    // Clear cart
    cartStore.clearCart()
    
    // Redirect to orders
    router.push('/orders')
    
    isCheckingOut.value = false
  }, 1500)
}
</script>

<style scoped>
.empty-cart .icon {
  font-size: 4rem;
}

.btn-link {
  color: #fff;
}

.cart-container {
  grid-template-columns: 1fr;
  align-items: start;
}

@media (min-width: 992px) {
  .cart-container {
    grid-template-columns: 2fr 1fr;
  }
}

.cart-items {
  border-radius: var(--radius-lg);
}

@media (min-width: 200px) {
  .cart-items {
    padding: 1rem;
  }

  .btn-less, .btn-plus {
    padding: 0.5rem;
  }
}

@media (min-width: 480px) {
  .cart-items {
    padding: 2rem;
  }
  
  .btn-less, .btn-plus {
    padding: 0.5rem 1rem;
  }
}

.cart-header, .total-action {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cart-summary {
  padding: 2rem;
  border-radius: var(--radius-lg);
  position: sticky;
  top: 100px;
}

.cart-item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.25rem;
  align-items: center;
}

@media (min-width: 480px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem 1.25rem;
  }
}

/* Desktop: 3-column layout */
@media (min-width: 640px) {
  .cart-item {
    grid-template-columns: 100px 2fr 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

.item-image-wrapper {
  justify-self: center;
  width: 100px;
  background: white;
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 480px) {
  .item-image-wrapper {
    justify-self: stretch;
    width: auto;
  }
}

.item-image-wrapper img {
  max-height: 100%;
  object-fit: contain;
}

.item-actions {
  grid-column: 1 / -1;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .item-actions {
    grid-column: auto;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }
}

.item-details h3 {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-details a {
  color: var(--text-main);
}

.item-details a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-color);
  border: 1px solid var(--surface-border);
  padding: 0.25rem;
  border-radius: var(--radius-md);
}

.quantity-value {
  font-weight: 700;
  min-width: 1.5rem;
  text-align: center;
}

.divider {
  border: none;
  border-top: 1px solid var(--surface-border);
}

.summary-row {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.capitalize {
  text-transform: capitalize;
}
</style>
