import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ProductTable } from "@/components/Tables/product-table";

import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
 

  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="space-y-10">
      <ProductTable />
      
      </div>
    </>
  );
};

export default ProductsPage;
