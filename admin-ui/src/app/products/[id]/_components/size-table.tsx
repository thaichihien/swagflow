"use client";

import { TrashIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { Select } from "@/components/FormElements/select";
import { PreviewIcon } from "@/components/Tables/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSizes, ProductDetailType } from "@/providers/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProductSizeTable({
  defaultSizes,
}: {
  defaultSizes: ProductDetailType["sizes"];
}) {
  const [sizes, setSizes] = useState<ProductDetailType["sizes"]>(defaultSizes);
  const [availableSizes, setAvailableSizes] = useState<
    { id: number; name: string }[]
  >([]);

  let newSizeSelected: { id: number; name: string } | null = null;

  async function fetchSizes() {
    const res = await getSizes();
    setAvailableSizes(res);
  }

  function sizesCanBeAdded() {
    return availableSizes.filter((size) => {
      return !sizes.find((s) => s.name === size.name);
    });
  }

  function addSize(newSize: { id: number; name: string }) {
    setSizes([...sizes, { ...newSize, quantity: 0 }]);
  }

  useEffect(() => {
    fetchSizes();
  }, []);

  function updateSizeQuan(value: string, id: number) {
    const newSizes = sizes.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          quantity: parseInt(value),
        };
      }
      return s;
    });

    setSizes(newSizes);
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="py-4 sm:py-5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Product Size
        </h2>
      </div>

      <div className="">
        <div className="mb-5.5 flex items-center">
          <Select
            className="min-w-50 max-w-65"
            label=""
            items={sizesCanBeAdded().map((s) => {
              return {
                label: s.name,
                value: s.id.toString(),
              };
            })}
            placeholder="Select Size"
            defaultValue={""}
            onChange={(v) => {
              console.log(v);

              newSizeSelected =
                availableSizes.find((s) => s.id === parseInt(v)) || null;
            }}
          />

          <button
            className="ml-5 mt-2 rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="button"
            onClick={() => {
              if (sizesCanBeAdded().length == 1) {
                addSize(sizesCanBeAdded()[0]);
              } else if (newSizeSelected) {
                addSize(newSizeSelected);
              }
            }}
          >
            Add
          </button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Name
              </TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sizes.map((s) => (
              <TableRow
                className="text-base font-medium text-dark dark:text-white"
                key={s.name}
              >
                <TableCell>{s.name}</TableCell>

                <TableCell className="w-1/3">
                  <div>
                    <InputGroup
                      className="mb-5.5"
                      type='number'
                      name="name"
                      label=""
                      placeholder=""
                      defaultValue={s.quantity.toString()}
                      // icon={<UserIcon />}
                      // iconPosition="left"
                      height="sm"
                      handleChange={(e) => {
                        updateSizeQuan(e.target.value, s.id);
                      }}
                    />
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">Delete Invoice</span>
                    <TrashIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
