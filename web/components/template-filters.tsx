"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { id: "chatbot", name: "Chatbots", count: 45 },
  { id: "image-gen", name: "Image Generation", count: 32 },
  { id: "nlp", name: "Natural Language Processing", count: 28 },
  { id: "computer-vision", name: "Computer Vision", count: 24 },
  { id: "voice-ai", name: "Voice AI", count: 18 },
  { id: "recommendation", name: "Recommendation Systems", count: 15 },
]

const technologies = [
  { id: "react", name: "React", count: 89 },
  { id: "nextjs", name: "Next.js", count: 67 },
  { id: "python", name: "Python", count: 156 },
  { id: "tensorflow", name: "TensorFlow", count: 45 },
  { id: "pytorch", name: "PyTorch", count: 38 },
  { id: "openai", name: "OpenAI", count: 72 },
]

const pricing = [
  { id: "free", name: "Free", count: 45 },
  { id: "paid", name: "Paid", count: 123 },
  { id: "premium", name: "Premium", count: 67 },
]

export default function TemplateFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    technology: true,
    pricing: true,
    price: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="border-b border-border pb-4">
            <Button
              variant="ghost"
              onClick={() => toggleSection("category")}
              className="w-full justify-between p-0 text-foreground hover:text-primary"
            >
              <span className="font-medium">Category</span>
              {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {expandedSections.category && (
              <div className="mt-3 space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox id={category.id} />
                    <label htmlFor={category.id} className="text-muted-foreground text-sm cursor-pointer flex-1">
                      {category.name}
                    </label>
                    <span className="text-muted-foreground text-xs">({category.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technology Filter */}
          <div className="border-b border-border pb-4">
            <Button
              variant="ghost"
              onClick={() => toggleSection("technology")}
              className="w-full justify-between p-0 text-foreground hover:text-primary"
            >
              <span className="font-medium">Technology</span>
              {expandedSections.technology ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {expandedSections.technology && (
              <div className="mt-3 space-y-2">
                {technologies.map((tech) => (
                  <div key={tech.id} className="flex items-center space-x-2">
                    <Checkbox id={tech.id} />
                    <label htmlFor={tech.id} className="text-muted-foreground text-sm cursor-pointer flex-1">
                      {tech.name}
                    </label>
                    <span className="text-muted-foreground text-xs">({tech.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Filter */}
          <div className="border-b border-border pb-4">
            <Button
              variant="ghost"
              onClick={() => toggleSection("pricing")}
              className="w-full justify-between p-0 text-foreground hover:text-primary"
            >
              <span className="font-medium">Pricing</span>
              {expandedSections.pricing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {expandedSections.pricing && (
              <div className="mt-3 space-y-2">
                {pricing.map((price) => (
                  <div key={price.id} className="flex items-center space-x-2">
                    <Checkbox id={price.id} />
                    <label htmlFor={price.id} className="text-muted-foreground text-sm cursor-pointer flex-1">
                      {price.name}
                    </label>
                    <span className="text-muted-foreground text-xs">({price.count})</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="pb-4">
            <Button
              variant="ghost"
              onClick={() => toggleSection("price")}
              className="w-full justify-between p-0 text-foreground hover:text-primary"
            >
              <span className="font-medium">Price Range</span>
              {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {expandedSections.price && (
              <div className="mt-3 space-y-4">
                <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filters</Button>
        </CardContent>
      </Card>
    </div>
  )
}
