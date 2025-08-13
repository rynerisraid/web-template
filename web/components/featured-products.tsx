import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featuredProducts = [
  {
    id: 1,
    name: "经典真皮手袋",
    price: 12800,
    originalPrice: 15600,
    image: "/placeholder.svg?height=400&width=400",
    category: "手袋",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "钻石项链",
    price: 28900,
    image: "/placeholder.svg?height=400&width=400",
    category: "珠宝",
    rating: 5.0,
    isLimited: true,
  },
  {
    id: 3,
    name: "瑞士机械腕表",
    price: 45600,
    image: "/placeholder.svg?height=400&width=400",
    category: "腕表",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 4,
    name: "丝绸围巾",
    price: 3200,
    image: "/placeholder.svg?height=400&width=400",
    category: "配饰",
    rating: 4.7,
  },
  {
    id: 5,
    name: "意大利皮鞋",
    price: 8900,
    image: "/placeholder.svg?height=400&width=400",
    category: "鞋履",
    rating: 4.9,
  },
  {
    id: 6,
    name: "珍珠耳环",
    price: 15600,
    image: "/placeholder.svg?height=400&width=400",
    category: "珠宝",
    rating: 4.8,
    isLimited: true,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4 tracking-wide">精选商品</h2>
          <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto">
            每一件商品都经过精心挑选，为您呈现最优质的奢华体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">新品</span>
                  )}
                  {product.isLimited && (
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded">限量</span>
                  )}
                  {product.isDiscounted && (
                    <span className="bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">特价</span>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-foreground hover:text-destructive hover:bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="h-5 w-5" />
                </Button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/products/${product.id}`}>
                    <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium">查看详情</Button>
                  </Link>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary text-sm font-medium">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-slate-300 text-sm">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-foreground font-medium text-lg mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold text-xl">¥{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-slate-500 line-through text-sm">
                        ¥{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
            >
              查看全部商品
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
