import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center">
        <section className="section text-center">
          <p className="eyebrow">404 Error</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-2 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
            The page or project details you are looking for does not exist or may
            have been moved.
          </p>
          <Link href="/" className="primary-link inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

