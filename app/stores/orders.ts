import { defineStore } from 'pinia';
import type { Order, CartItem } from '../types';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),
  
  actions: {
    createOrder(items: CartItem[], total: number) {
      const newOrder: Order = {
        id: `ord_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        items: [...items],
        total,
        status: 'Completed',
      };
      
      this.orders.unshift(newOrder); // Add to the top
      this.saveOrders();
      return newOrder;
    },
    
    // Simple persistence to localStorage
    saveOrders() {
      if (typeof globalThis !== 'undefined') {
        localStorage.setItem('ecommerce_orders', JSON.stringify(this.orders));
      }
    },
    
    loadOrders() {
      if (typeof globalThis !== 'undefined') {
        const saved = localStorage.getItem('ecommerce_orders');
        if (saved) {
          try {
            this.orders = JSON.parse(saved);
          } catch (e) {
            console.error('Failed to parse orders:', e);
          }
        }
      }
    }
  }
});
