import type { PropsWithChildren } from "react";

import { Metadata } from "next";
import { setupInterceptors } from "@/lib/api-client";

export const metadata: Metadata = {
  title: "Profile Page",
};

export default function Layout({ children }: PropsWithChildren) {
  return children;
}
