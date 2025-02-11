import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Navbar } from "../navbar";
import { Metadata } from "next";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ai-sdk-preview-internal-knowledge-base.vercel.app",
  ),
  title: "Internal Knowledge Base",
  description:
    "Internal Knowledge Base using Retrieval Augmented Generation and Middleware",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const breadcrumbItems = [
    { title: "AI", href: "/ai" }
  ]

  return (
    <>
      <Header items={breadcrumbItems} />
      <div className="container mx-auto m-4">
        <Card className="p-4">
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </Card>
      </div>
    </>
  );
}