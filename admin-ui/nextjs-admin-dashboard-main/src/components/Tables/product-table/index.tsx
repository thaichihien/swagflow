"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getTopProducts } from "../fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductsSkeleton } from "./skeleton";
import { getProducts } from "./get-products";
import { PreviewIcon } from "../icons";
import { TrashIcon } from "@/assets/icons";

export type ProductType = {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  description: string;
};

export function ProductTable() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data: {
          data: ProductType[];
          total_pages: number;
        } = await getProducts({ page, limit });
        setProducts(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [page, limit]);

  // Generate page range dynamically
  const generatePageNumbers = () => {
    const range = [];
    const maxVisible = 5; // Show 5 pages at a time

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      range.push(1, 2, 3, "...", totalPages);
    } else if (page >= totalPages - 2) {
      range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }

    return range;
  };

  return loading ? (
    <ProductsSkeleton></ProductsSkeleton>
  ) : (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Products
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Product Name
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={product.name}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                <Image
                  src={product.images[0] ?? null}
                  className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                  width={60}
                  height={50}
                  alt={"Image for product " + product.name}
                  role="presentation"
                />
                <div>{product.name}</div>
              </TableCell>

              <TableCell>{product.category}</TableCell>

              <TableCell>{product.price} EUR</TableCell>

              <TableCell className="xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">View Invoice</span>
                    <PreviewIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <div className="flex items-center justify-between">
          <label>
            Show{" "}
            <select
              value={limit}
              onChange={(e) => router.push(`?page=1&limit=${e.target.value}`)}
              className="border p-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>{" "}
            items per page
          </label>

          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => router.push(`?page=${page - 1}&limit=${limit}`)}
              disabled={page <= 1}
              className="rounded border px-3 py-1 disabled:opacity-50 mr-2"
            >
              Previous
            </button>
            {generatePageNumbers().map((num, index) =>
              num === "..." ? (
                <span key={index} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => router.push(`?page=${num}&limit=${limit}`)}
                  className={`rounded border px-3 py-1 ${
                    num === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {num}
                </button>
              ),
            )}
            <button
              onClick={() => router.push(`?page=${page + 1}&limit=${limit}`)}
              disabled={page >= totalPages}
              className="rounded border px-3 py-1 disabled:opacity-50 ml-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
