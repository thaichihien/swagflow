"use client";
import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import {
  createProduct,
  getBrands,
  getCategoies,
  ProductDetailType,
} from "@/providers/product";
import { FormEvent, useEffect, useState } from "react";
import { ProductSizeTable } from "./size-table";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ProductInfoForm({ product }: { product: ProductDetailType }) {
  const router = useRouter();

  const [categries, setCategories] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [brands, setBrands] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [sizes, setSizes] = useState<ProductDetailType["sizes"]>(product.sizes);

  async function fetchCategories() {
    const data = await getCategoies();
    setCategories(data);
  }
  async function fetchBrands() {
    const data = await getBrands();
    setBrands(data);
  }
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(form.entries());
    console.log(data);
    console.log(sizes);

    try {
      const newProduct = await createProduct({
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category_id: data.category_id,
        brand_id: data.brand_id,
        sizes: sizes.map((s) => {
          return {
            id: s.id,
            quantity: s.quantity,
          };
        }),
      });

      console.log(newProduct);

      toast.success("Product created successfully");
      router.push(`/products/${newProduct.id}`);
    } catch (error) {
      toast.error("Failed to create product");
    }
  }

  return (
    <ShowcaseSection title="Product Information" className="!p-7">
      <form onSubmit={handleSubmit}>
        <InputGroup
          className="mb-5.5"
          type="text"
          name="name"
          label="Name"
          placeholder="devidjhon24"
          required
          defaultValue={product.name}
          // icon={<UserIcon />}
          // iconPosition="left"
          height="sm"
        />

        <InputGroup
          className="mb-5.5"
          type="number"
          name="price"
          label="Price"
          placeholder="devidjhon24"
          defaultValue={product.price.toString()}
          // icon={<UserIcon />}
          // iconPosition="left"
          height="sm"
        />

        <Select
          className="mb-5.5"
          label="Category"
          name="category_id"
          items={categries.map((category) => {
            return {
              label: category.name,
              value: category.id,
            };
          })}
          defaultValue={product.category_id}
        />

        <Select
          className="mb-5.5"
          name="brand_id"
          label="Brand"
          items={brands.map((brand) => {
            return {
              label: brand.name,
              value: brand.id,
            };
          })}
          defaultValue={product.brand_id}
        />

        <TextAreaGroup
          name="description"
          className="mb-5.5"
          label="Descrpition"
          placeholder="Write product description here"
          icon={<PencilSquareIcon />}
          defaultValue={product.description}
        />

        <ProductSizeTable sizes={sizes} setSizes={setSizes}></ProductSizeTable>

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
