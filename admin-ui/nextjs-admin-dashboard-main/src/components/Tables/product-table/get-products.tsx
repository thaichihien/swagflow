import apiClient from "@/lib/api-client";

export async function getProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  try {
    const response = await apiClient.get("/product-service/products/offset", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}
