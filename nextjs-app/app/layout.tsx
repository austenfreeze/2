import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { Toaster } from "sonner";
import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import { VisualEditing } from "next-sanity";
import { toPlainText } from "@portabletext/react";

/**
 * Generate metadata for the page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${settings?.title || "Default Title"}`,
      default: settings?.title || "Default Title",
    },
    description: Array.isArray(settings?.description)
      ? toPlainText(settings.description) // ✅ Convert Portable Text to string
      : settings?.description || "",
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraftMode = (await draftMode()).isEnabled; // ✅ Corrected usage

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen pt-24">
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <Header />
          <main>{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
