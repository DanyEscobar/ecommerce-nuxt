import { defineStore } from 'pinia';
import type { CartItem, Product } from '../types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  
  actions: {
    addToCart(product: Product, quantity: number = 1) {
      const existing = this.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ ...product, quantity });
      }
      this.saveCart();
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveCart();
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(item => item.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
        this.saveCart();
      }
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    },
    
    saveCart() {
      if (typeof globalThis !== 'undefined') {
        localStorage.setItem('ecommerce_cart', JSON.stringify(this.items));
      }
    },
    
    loadCart() {
      if (typeof globalThis !== 'undefined') {
        const saved = localStorage.getItem('ecommerce_cart');
        if (saved) {
          try {
            this.items = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse cart:', e);
          }
        }
      }
    }
  }
});
