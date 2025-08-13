import Link from "next/link"
import { ArrowRight, Sparkles, Code, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Enhanced background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      {/* Glass morphism background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Glass morphism card */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-background/30 backdrop-blur-xl rounded-3xl rotate-12 glass-effect" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-background/20 backdrop-blur-xl rounded-2xl -rotate-12 glass-effect" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          {/* Glass morphism badge */}
          <div className="inline-flex items-center gap-2 glass-badge text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            New: 50+ AI Templates Added This Month
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build AI Apps with
            <span className="gradient-text block">Premium Templates</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover curated AI software templates, comprehensive courses, and cutting-edge resources. Accelerate your
            AI development journey with production-ready solutions.
          </p>
        </div>

        {/* Glass morphism buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/templates">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-primary-foreground px-8 py-4 text-lg glass-button"
            >
              Explore Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              className="glass-button px-8 py-4 text-lg"
            >
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Feature highlights with glass morphism effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center glass-card p-6">
            <div className="w-16 h-16 bg-primary/10 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 glass-effect">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Production Ready</h3>
            <p className="text-muted-foreground">All templates are tested, optimized, and ready for deployment</p>
          </div>

          <div className="flex flex-col items-center text-center glass-card p-6">
            <div className="w-16 h-16 bg-primary/10 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 glass-effect">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">Leverage the latest AI technologies and frameworks</p>
          </div>

          <div className="flex flex-col items-center text-center glass-card p-6">
            <div className="w-16 h-16 bg-primary/10 backdrop-blur-lg rounded-xl flex items-center justify-center mb-4 glass-effect">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Regularly Updated</h3>
            <p className="text-muted-foreground">Get access to new features and improvements every month</p>
          </div>
        </div>
      </div>
    </section>
  )
}