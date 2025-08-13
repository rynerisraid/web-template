import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  MessageCircle,
  Zap,
  Target,
  Lightbulb,
} from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Harness the power of data with our sophisticated analytics tools that provide deep market insights."
    },
    {
      icon: TrendingUp,
      title: "Real-time Data",
      description: "Access live market data and social sentiment to make informed trading decisions."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive risk assessment tools to help protect your investments."
    },
    {
      icon: MessageCircle,
      title: "Social Sentiment",
      description: "Understand market mood through our advanced social media sentiment analysis."
    }
  ]

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "15+ years in financial technology and algorithmic trading."
    },
    {
      name: "Sam Chen",
      role: "CTO",
      bio: "Former Google engineer with expertise in big data and machine learning."
    },
    {
      name: "Jordan Williams",
      role: "Head of Product",
      bio: "Specializes in creating intuitive financial analysis tools for retail investors."
    },
    {
      name: "Taylor Reed",
      role: "Lead Data Scientist",
      bio: "PhD in Quantitative Finance with focus on predictive modeling."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About TradeInsight</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Empowering retail investors with professional-grade analytics and insights
            </p>
            <Button size="lg" variant="secondary" className="text-primary font-semibold">
              Start Your Journey
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Democratizing Financial Analysis</h2>
              <p className="text-lg text-muted-foreground">
                We believe that every investor deserves access to the same powerful tools and insights 
                that professional traders use. Our platform bridges the gap between complex financial 
                data and actionable insights for retail investors.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become the leading platform for retail investor analytics and market insights globally.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
                <p className="text-muted-foreground">
                  Combining cutting-edge technology with financial expertise to deliver intuitive solutions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  Transparency, innovation, and user empowerment drive everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of tools designed to give you an edge in the market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a diverse group of finance experts, data scientists, and technologists passionate about empowering investors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-none text-center">
                  <CardContent className="pt-6">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Investing?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Join thousands of investors who are already using TradeInsight to make smarter decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}