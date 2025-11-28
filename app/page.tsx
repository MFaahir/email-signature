import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Mail, Palette, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Create Professional <span className="text-blue-600">Email Signatures</span> in Seconds
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Stand out in every email. Design a beautiful, mobile-responsive signature without writing a single line of code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generator">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                Create My Signature <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Generator?</h2>
            <p className="text-gray-600">Everything you need to look professional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Templates</h3>
              <p className="text-gray-600">
                Choose from professionally designed templates that look great on all devices and email clients.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Preview</h3>
              <p className="text-gray-600">
                See changes instantly as you type. Customize colors, fonts, and layout with ease.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Export</h3>
              <p className="text-gray-600">
                Copy the HTML directly to your clipboard or download as a PDF with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Email Signature Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
