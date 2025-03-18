import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductResponse } from "../components/models/Product";

/// Define the CartProduct type (extends ProductResponse with quantity)
export interface CartProduct extends ProductResponse {
  quantity: number; // Quantity is added when the product is added to the cart
}

// Define the CartState type
interface CartState {
  products: CartProduct[];
}

// Initial state for the cart
const initialState: CartState = {
  products: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action: PayloadAction<ProductResponse>) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.productId === product.productId);

      if (existingProduct) {
        // If the product already exists, increment its quantity
        existingProduct.quantity += 1;
      } else {
        // If the product doesn't exist, add it to the cart with a quantity of 1
        state.products.push({ ...product, quantity: 1 });
      }
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p.productId !== parseInt(productId));
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;