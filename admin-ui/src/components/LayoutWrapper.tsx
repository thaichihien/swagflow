"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Layouts/sidebar";
import { Header } from "./Layouts/header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in";

  return !isAuthPage ? (
    <div className="flex min-h-screen">
      <ToastContainer />
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  ) : (
    children
  );
}
