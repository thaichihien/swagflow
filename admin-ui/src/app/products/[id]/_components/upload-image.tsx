"use client";

import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";
import { useState } from "react";

export function UploadImageForm({ images }: { images: string[] }) {
  const [imagesLink, setImageLinks] = useState<string[]>(images);

  return (
    <ShowcaseSection title="Product Images" className="!p-7">
      <form>
        <button
          className="mb-5.5 flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
          type="submit"
        >
          Save
        </button>
        <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            hidden
            onChangeCapture={(e: any) => {
              const files = e.target.files;

              if (files) {
                const urls = Array.from(files).map((file: any) =>
                  URL.createObjectURL(file),
                );

                setImageLinks([...urls, ...imagesLink]);
              }
            }}
          />

          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <UploadIcon />
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>

            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>

        <div className="flex gap-3">
          {imagesLink.map((image, index) => (
            <a href={image} key={index} target="_blank" rel="noreferrer">
              <Image
                src={image}
                width={200}
                height={200}
                alt="User"
                className="size-14 rounded-sm object-cover"
                quality={90}
              />
            </a>
          ))}
        </div>
        <div className="flex justify-end gap-3"></div>
      </form>
    </ShowcaseSection>
  );
}
