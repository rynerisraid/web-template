import Image from "next/image"
import Link from "next/link"
import { Star, Download, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredTemplates = [
  {
    id: 1,
    title: "ChatGPT Clone",
    description:
      "Full-featured chat application with OpenAI integration, user authentication, and conversation history.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Chatbot",
    price: "Free",
    rating: 4.9,
    downloads: 12500,
    views: 45600,
    tags: ["React", "OpenAI", "TypeScript"],
    featured: true,
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "Create stunning images with DALL-E integration, custom prompts, and image editing capabilities.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Image Generation",
    price: "$29",
    rating: 4.8,
    downloads: 8900,
    views: 32400,
    tags: ["Next.js", "DALL-E", "Tailwind CSS"],
    featured: true,
  },
  {
    id: 3,
    title: "Voice Assistant Pro",
    description: "Advanced voice-controlled assistant with natural language processing and smart home integration.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Voice AI",
    price: "$49",
    rating: 4.7,
    downloads: 6700,
    views: 21800,
    tags: ["Python", "Speech Recognition", "IoT"],
    featured: false,
  },
  {
    id: 4,
    title: "AI Content Writer",
    description: "Generate high-quality blog posts, articles, and marketing copy with SEO optimization.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Content Creation",
    price: "$39",
    rating: 4.9,
    downloads: 15200,
    views: 58900,
    tags: ["NLP", "SEO", "Copywriting"],
    featured: true,
  },
]

export default function FeaturedTemplates() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Templates</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Kickstart your AI projects with our professionally designed templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="glass-card overflow-hidden group"
            >
              <div className="relative">
                <Image
                  src={template.image}
                  alt={template.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {template.featured && (
                  <Badge className="absolute top-4 right-4 glass-badge">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{template.title}</h3>
                  <span className="text-lg font-bold text-primary">{template.price}</span>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs glass-badge">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{(template.downloads / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{(template.views / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
                
                <Link href={`/templates/${template.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full glass-button"
                  >
                    View Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/templates">
            <Button size="lg" className="glass-button bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-primary-foreground px-8 py-4 text-lg">
              Browse All Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}