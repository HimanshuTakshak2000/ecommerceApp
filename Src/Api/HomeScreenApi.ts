import { AxiosError } from 'axios';

import apiClient from './ApiClients';
import Endpoints from './endpoint';

export interface ProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  totalQuantity: number;
  quantity: number;
}

interface GetAllProductsResponse {
  data: ProductItem[];
}

export const handleGetAllProducts = async (
): Promise<ProductItem[]> => {
  try {
    const response = await apiClient.get<GetAllProductsResponse>(
      `${Endpoints.GET_ALL_PRODUCT}`,
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid API response format");
    }

    return response.data.map((e: ProductItem) => { return { ...e, totalQuantity: 5, quantity: 0 } });
  } catch (error) {

    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch Product List';
      throw new Error(errorMessage);
    }
    throw new Error(
      'An unexpected error occurred while fetching Product List',
    );
  }
};
