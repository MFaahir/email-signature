import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Mail, Palette, Zap, Sparkles, Clock, DollarSign } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Join 1,000+ professionals</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Professional Email Signatures
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              In Under 60 Seconds
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Make every email count. Create stunning, mobile-responsive signatures that work across all email clients. No design skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/generator">
              <Button size="lg" className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all">
                Start Creating Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              ✓ No credit card required  ✓ Export for just $4.99
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>3 Premium Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Instant Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>One-Time Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to your perfect signature</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Fill Your Details</h3>
              <p className="text-gray-600">Add your name, title, contact info, and social links</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Template</h3>
              <p className="text-gray-600">Pick from 3 beautiful designs and customize colors</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Export & Use</h3>
              <p className="text-gray-600">Copy HTML or download PDF for $4.99 one-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-600 text-lg">Professional features at an unbeatable price</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beautiful Templates</h3>
              <p className="text-gray-700 leading-relaxed">
                3 professionally designed templates that work perfectly across Gmail, Outlook, Apple Mail, and more.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Preview</h3>
              <p className="text-gray-700 leading-relaxed">
                See exactly how your signature looks as you type. No surprises, just perfect results every time.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Export</h3>
              <p className="text-gray-700 leading-relaxed">
                Copy HTML to paste directly into your email client or download as PDF. Works everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-300 text-lg mb-12">Create for free. Export for a one-time fee.</p>
          
          <div className="bg-white text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl font-bold">$4.99</span>
                <span className="text-gray-600">one-time</span>
              </div>
              <p className="text-gray-600">Lifetime access • No subscriptions</p>
            </div>
            
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Unlimited signature creation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">All 3 premium templates</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Export as HTML & PDF</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Lifetime updates</span>
              </div>
            </div>
            
            <Link href="/generator">
              <Button size="lg" className="w-full text-lg py-6 rounded-full">
                Start Creating Free
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">Pay only when you're ready to export</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Stand Out?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who've upgraded their email game
          </p>
          <Link href="/generator">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all">
              Create Your Signature Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center">
        <p>&copy; {new Date().getFullYear()} Email Signature Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

