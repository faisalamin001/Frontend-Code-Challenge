import { create } from 'zustand';

const useStore = create((set) => ({
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],

  addItemToCart: (item) => {
    set((state) => {
      const updatedItems = [...state.cartItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return { cartItems: updatedItems };
    });
  },

  removeItemFromCart: (itemId) => {
    set((state) => {
      const updatedItems = state.cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return { cartItems: updatedItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ cartItems: [] });
  },
}));

export default useStore;
