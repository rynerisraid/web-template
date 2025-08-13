import Link from "next/link"
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-bold text-xl">AI Hub</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering developers with premium AI templates, comprehensive courses, and cutting-edge resources to
              build the future.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg">Products</h3>
            <div className="space-y-3">
              <Link href="/templates" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Templates
              </Link>
              <Link href="/courses" className="block text-muted-foreground hover:text-primary transition-colors">
                Online Courses
              </Link>
              <Link href="/resources" className="block text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/tools" className="block text-muted-foreground hover:text-primary transition-colors">
                AI Tools
              </Link>
              <Link href="/api" className="block text-muted-foreground hover:text-primary transition-colors">
                API Access
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg">Company</h3>
            <div className="space-y-3">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/careers" className="block text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/press" className="block text-muted-foreground hover:text-primary transition-colors">
                Press Kit
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-foreground font-semibold text-lg">Support</h3>
            <div className="space-y-3">
              <Link href="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="/documentation" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
              <Link href="/status" className="block text-muted-foreground hover:text-primary transition-colors">
                System Status
              </Link>
              <Link href="/feedback" className="block text-muted-foreground hover:text-primary transition-colors">
                Feedback
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">© 2024 AI Hub. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
