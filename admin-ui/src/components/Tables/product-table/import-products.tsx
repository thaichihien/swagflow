import apiClient from "@/lib/api-client";
import { toast } from "react-toastify";

export async function importProductCSVfile(file: File) {
  toast.done(
    "File upload in progress. Please wait for product import to complete.",
  );
  const formData: FormData = new FormData();
  formData.append("file", file);
  try {
    const response = await apiClient.post(
      "/product-service/products/import",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to import products:", error);
    throw error;
  }
}
