"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerSlides = [
  {
    id: 1,
    title: "2024春季新品系列",
    subtitle: "探索奢华与优雅的完美融合",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "立即探索",
    link: "/products?category=new",
  },
  {
    id: 2,
    title: "限量版珠宝系列",
    subtitle: "每一件都是独一无二的艺术品",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "查看详情",
    link: "/products?category=jewelry",
  },
  {
    id: 3,
    title: "经典手袋系列",
    subtitle: "传承工艺，现代设计",
    image: "/placeholder.svg?height=600&width=1200",
    cta: "选购手袋",
    link: "/products?category=bags",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-wide">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 font-light tracking-wide opacity-90">{slide.subtitle}</p>
              <Link href={slide.link}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium px-8 py-3 text-lg tracking-wide transition-all duration-300 hover:scale-105"
                >
                  {slide.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary hover:bg-accent/20 w-12 h-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary hover:bg-accent/20 w-12 h-12"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
