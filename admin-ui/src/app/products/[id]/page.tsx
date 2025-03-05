import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getProduct, ProductDetailType } from "@/providers/product";
import { ProductInfoForm } from "./_components/product-info";
import { UploadImageForm } from "./_components/upload-image";
import MultipleBreadcrumb from "@/components/Breadcrumbs/MultipleBreadcrumb";
import { ProductSizeTable } from "./_components/size-table";

export default async function Page({ params }: any) {
  const productId = await params;

  let product: ProductDetailType = {
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    categoryId: "",
    brandId: "",
    images: [],
    sizes: [],
  };
  if (productId.id !== "new") {
    product = await getProduct(productId.id);
  }

  return (
    <div className="mx-auto w-full">
      <MultipleBreadcrumb
        pages={[
          {
            label: "Products",
            path: "/products",
          },
          {
            label: "Product detail",
            path: "#",
          },
        ]}
      />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <ProductInfoForm product={product} />
        </div>
        <div className="col-span-5 xl:col-span-2">
          <UploadImageForm images={product.images} />
        </div>
      </div>
    </div>
  );
}
