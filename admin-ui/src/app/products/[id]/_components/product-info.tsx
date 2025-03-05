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
  getBrands,
  getCategoies,
  ProductDetailType,
} from "@/providers/product";
import { useEffect, useState } from "react";

export function ProductInfoForm({ product }: { product: ProductDetailType }) {
  console.log(product);

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

  console.log({ categries });

  return (
    <ShowcaseSection title="Product Information" className="!p-7">
      <form>
        <InputGroup
          className="mb-5.5"
          type="text"
          name="name"
          label="Name"
          placeholder="devidjhon24"
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
          items={categries.map((category) => {
            return {
              label: category.name,
              value: category.id,
            };
          })}
          defaultValue={product.categoryId}
        />

        <Select
          className="mb-5.5"
          label="Brand"
          items={brands.map((brand) => {
            return {
              label: brand.name,
              value: brand.id,
            };
          })}
          defaultValue={product.brandId}
        />

        <TextAreaGroup
          className="mb-5.5"
          label="Descrpition"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          defaultValue={product.description}
        />

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
