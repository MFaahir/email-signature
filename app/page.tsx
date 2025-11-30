import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Mail, Palette, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { TemplateGallery } from "@/components/landing/TemplateGallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream-200">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-cream-100 via-sand-50 to-cream-200 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Join 1,000+ professionals</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Professional Email Signatures
            <br />
            <span className="bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent">
              In Under 60 Seconds
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Make every email count. Create stunning, mobile-responsive signatures that work across all email clients. No design skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/generator">
              <Button size="lg" className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all bg-sage-600 hover:bg-sage-700">
                Start Creating Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-600">
              ✓ No credit card required  ✓ 3 free signatures
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sage-600" />
              <span>12 Premium Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sage-600" />
              <span>Instant Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-sage-600" />
              <span>Analytics Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <TemplateGallery />

      {/* How It Works */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-700 text-lg">Three simple steps to your perfect signature</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sage-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose Template</h3>
              <p className="text-gray-600">Pick from 12 beautiful designs and see live previews</p>
            </div>
            
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sage-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fill Your Details</h3>
              <p className="text-gray-600">Add your info or auto-fill from your website</p>
            </div>
            
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sage-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Export & Use</h3>
              <p className="text-gray-600">Copy HTML or install directly to your email client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-cream-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-gray-700 text-lg">Professional features at an unbeatable price</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">12 Beautiful Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from 12 professionally designed templates. Perfect across all email clients.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Preview</h3>
              <p className="text-gray-600 leading-relaxed">
                See exactly how your signature looks as you type. No surprises, just perfect results.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-sage-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-sage-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Export</h3>
              <p className="text-gray-600 leading-relaxed">
                Copy HTML to paste directly or download as PDF. Works everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-sage-800 to-sage-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-sage-100 text-lg mb-12">Create for free. Upgrade for unlimited signatures and analytics.</p>
          
          <div className="bg-white text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-auto">
            <div className="mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl font-bold">$4.99</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">Premium Plan • Cancel anytime</p>
            </div>
            
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Unlimited signature creation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Email analytics & tracking</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">All 12 premium templates</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Priority support</span>
              </div>
            </div>
            
            <Link href="/pricing">
              <Button size="lg" className="w-full text-lg py-6 rounded-full bg-sage-600 hover:bg-sage-700">
                View Pricing
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">Start with 3 free signatures</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Stand Out?
          </h2>
          <p className="text-xl mb-8 text-sage-50">
            Join thousands of professionals who've upgraded their email game
          </p>
          <Link href="/generator">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all bg-white text-sage-700 hover:bg-cream-50">
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

