import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Recursive } from "next/font/google";
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import "./globals.css";
const StoreProvider = dynamic(() => import('./StoreProvider'))
const Loader = dynamic(() => import("@/components/common/Loader"))

const recursive = Recursive({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Spiritual Center",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Suspense fallback={<Loader text="Loading.." />}>
          <main className="bg-slate-700">
            <Toaster position="bottom-right" />
            <StoreProvider>
              {children}
            </StoreProvider>
          </main>
        </Suspense>
      </body>
    </html>
  );
}