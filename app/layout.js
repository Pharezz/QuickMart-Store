// app/layout.js
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { Poppins } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "QuickMart",
  description: "Next.js MVP Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
