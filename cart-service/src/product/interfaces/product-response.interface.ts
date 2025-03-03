export interface ProductServiceResponse {
  data: {
    id: string;
    name: string;
    price: number;
    category: string;
    brand: string;
    images: string[];
    description: string;
  }[];
  next_page: string;
  previous_page: string;
}
