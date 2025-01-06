import "@workspace/ui/styles/globals.css";
import { ThemeProvider } from "@workspace/ui/components/theme-provider";
import type { Metadata } from "next";
import { Outfit, Noto_Sans_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ApolloProvider from "../providers/apollo-provider";
import { Suspense } from "react";

const outfit = Outfit({
  subsets: ["latin"],
});

const notoMono = Noto_Sans_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spacelink | Pulsar",
  description: "Pulsar software from Spacelink",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${outfit.className} ${notoMono.className} antialiased font-sans`}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ApolloProvider>{children}</ApolloProvider>
            <Toaster richColors />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
