import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleGetAllProducts } from '../Api/HomeScreenApi';
import type { ProductItem } from '../Api/HomeScreenApi';

type initialStateType = {
  loading: string;
  reviewLoading: string;
  productListing: ProductItem[];
  error: string | null;
  reviewError: string | null;
};

const initialState: initialStateType = {
  productListing: [],
  loading: 'idle',
  reviewLoading: 'idle',
  reviewError: null,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  'allProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await handleGetAllProducts();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const AllProductSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.pending, state => {
        state.loading = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.productListing = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      });
  },
});


export default AllProductSlice.reducer;
