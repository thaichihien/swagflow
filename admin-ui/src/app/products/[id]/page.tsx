import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getProduct } from "@/providers/product";
import { ProductInfoForm } from "./_components/product-info";

export default async function Page({ params }: { params: { id: string } }) {
  const productId = await params;
  const product = await getProduct(productId.id);

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <Breadcrumb pageName="Product Detail" />

      <ProductInfoForm product={product} />
    </div>
  );
}
