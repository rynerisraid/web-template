import Image from "next/image"
import Link from "next/link"
import { Star, Download, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const templates = [
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
    author: "AI Hub Team",
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
    views: 32100,
    tags: ["Next.js", "DALL-E", "Tailwind"],
    author: "Creative Labs",
  },
  {
    id: 3,
    title: "Document AI Analyzer",
    description: "Intelligent document processing with OCR, text extraction, and AI-powered insights.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Document Processing",
    price: "$49",
    rating: 4.7,
    downloads: 5600,
    views: 18900,
    tags: ["Python", "OCR", "Machine Learning"],
    author: "DocTech Solutions",
  },
  {
    id: 4,
    title: "Voice Assistant",
    description: "Smart voice assistant with speech recognition, natural language processing, and custom commands.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Voice AI",
    price: "$39",
    rating: 4.6,
    downloads: 7200,
    views: 25400,
    tags: ["JavaScript", "Speech API", "NLP"],
    author: "Voice Innovations",
  },
  {
    id: 5,
    title: "Sentiment Analysis API",
    description: "Real-time sentiment analysis with multiple language support and detailed emotion detection.",
    image: "/placeholder.svg?height=300&width=400",
    category: "NLP",
    price: "$19",
    rating: 4.5,
    downloads: 9800,
    views: 28700,
    tags: ["Python", "Flask", "NLTK"],
    author: "NLP Experts",
  },
  {
    id: 6,
    title: "Object Detection System",
    description: "Advanced object detection and tracking system using YOLO and computer vision techniques.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Computer Vision",
    price: "$59",
    rating: 4.8,
    downloads: 4300,
    views: 15600,
    tags: ["Python", "YOLO", "OpenCV"],
    author: "Vision Labs",
  },
]

export default function TemplateGrid() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Showing {templates.length} templates</p>
        <select className="bg-card border border-border text-foreground rounded-md px-3 py-2 text-sm">
          <option>Most Popular</option>
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="bg-card border-border overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
          >
            <div className="relative">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/90 text-foreground">
                  {template.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {template.price === "Free" ? (
                  <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
                    {template.price}
                  </span>
                ) : (
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium rounded">
                    {template.price}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-background/90 hover:bg-background text-muted-foreground hover:text-red-500"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {template.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{template.description}</p>
              <p className="text-xs text-primary font-medium">by {template.author}</p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-xs text-muted-foreground">{template.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{template.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/templates/${template.id}`} className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                    View Details
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="border-border hover:bg-accent bg-transparent">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
