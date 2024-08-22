// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helperFunctions/axios.utlil";
import { toast } from "react-toastify";

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("access_token");
      const response = await axiosInstance.get("cart", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    console.log(productId, quantity);
    try {
      const userToken = localStorage.getItem("access_token");
      const response = await axiosInstance.post(
        `cart`,
        {
          productId: productId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response.data.message);
      toast.success(response.data.message);
      fetchCartItems();
      return response.data.message;
    } catch (error) {
      toast.error(response.data.message);
      return rejectWithValue(error.response.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("access_token");
      const response = await axiosInstance.delete(`cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data.message);
      console.log(response.data.message);
      fetchCartItems();
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    itemNumber: 0,
    vat: 0,
    subtotal: 0,
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setCartValues: (state, action) => {
      state.itemNumber = action.payload.itemNumber;
      state.vat = action.payload.vat;
      state.subtotal = action.payload.subtotal;
      state.total = action.payload.total;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    refetch: (state) => {
      state.status = "refetch";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.item;
        state.itemNumber = action.payload.itemNumber;
        state.vat = action.payload.vat;
        state.subtotal = action.payload.subtotal;
        state.total = action.payload.total;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCartValues, removeItem, clearCart, refetch } =
  cartSlice.actions;
export default cartSlice.reducer;
