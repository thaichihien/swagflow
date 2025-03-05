import apiClient from "@/lib/api-client";
import apiServerClient from "@/lib/api-server-client";

export interface ProductDetailType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  category_id: string;
  brand_id: string;
  images: string[];
  sizes: {
    id: number;
    name: string;
    quantity: number;
  }[];
}

export interface CreateProductType {
  name: string;
  price: number;
  description: string;
  category_id: string;
  brand_id: string;
  sizes: {
    id: number;

    quantity: number;
  }[];
}

export async function getProduct(id: string): Promise<ProductDetailType> {
  try {
    const response = await apiServerClient.get(
      `/product-service/products/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
}

export async function getCategoies() {
  try {
    const response = await apiClient.get(`/product-service/categories`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}

export async function getBrands() {
  try {
    const response = await apiClient.get(`/product-service/brands`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    throw error;
  }
}

export async function getSizes() {
  try {
    const response = await apiClient.get(`/product-service/size`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sizes:", error);
    throw error;
  }
}

export async function createProduct(
  body: CreateProductType,
): Promise<ProductDetailType> {
  try {
    const response = await apiClient.post(
      `/product-service/products`,
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
}
