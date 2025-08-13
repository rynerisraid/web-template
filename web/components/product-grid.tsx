import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "经典真皮手袋",
    price: 12800,
    originalPrice: 15600,
    image: "/placeholder.svg?height=400&width=400",
    category: "手袋",
    rating: 4.9,
    reviews: 128,
    isNew: true,
  },
  {
    id: 2,
    name: "钻石项链",
    price: 28900,
    image: "/placeholder.svg?height=400&width=400",
    category: "珠宝",
    rating: 5.0,
    reviews: 89,
    isLimited: true,
  },
  {
    id: 3,
    name: "瑞士机械腕表",
    price: 45600,
    image: "/placeholder.svg?height=400&width=400",
    category: "腕表",
    rating: 4.8,
    reviews: 156,
    isNew: true,
  },
  {
    id: 4,
    name: "丝绸围巾",
    price: 3200,
    image: "/placeholder.svg?height=400&width=400",
    category: "配饰",
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 5,
    name: "意大利皮鞋",
    price: 8900,
    image: "/placeholder.svg?height=400&width=400",
    category: "鞋履",
    rating: 4.9,
    reviews: 167,
  },
  {
    id: 6,
    name: "珍珠耳环",
    price: 15600,
    image: "/placeholder.svg?height=400&width=400",
    category: "珠宝",
    rating: 4.8,
    reviews: 94,
    isLimited: true,
  },
  {
    id: 7,
    name: "羊绒大衣",
    price: 18900,
    image: "/placeholder.svg?height=400&width=400",
    category: "服装",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 8,
    name: "钛金眼镜",
    price: 6800,
    image: "/placeholder.svg?height=400&width=400",
    category: "配饰",
    rating: 4.6,
    reviews: 78,
  },
]

export default function ProductGrid() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-slate-300">显示 {products.length} 件商品</p>
        <select className="bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 text-sm">
          <option>推荐排序</option>
          <option>价格从低到高</option>
          <option>价格从高到低</option>
          <option>最新上架</option>
          <option>评分最高</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-slate-800 border-slate-700 overflow-hidden group hover:border-amber-500/50 transition-all duration-300"
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
              <div className="absolute top-4 left-4 flex gap-2">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={
                      tag === "Limited"
                        ? "bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium rounded"
                        : tag === "Sale"
                        ? "bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded"
                        : "bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium rounded"
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:text-red-400 hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart className="h-5 w-5" />
              </Button>

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link href={`/products/${product.id}`}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">查看详情</Button>
                </Link>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-400 text-sm font-medium">{product.category}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-300 text-sm">{product.rating}</span>
                  <span className="text-slate-500 text-xs">({product.reviews})</span>
                </div>
              </div>

              <Link href={`/products/${product.id}`}>
                <h3 className="text-white font-medium text-lg mb-3 group-hover:text-amber-400 transition-colors cursor-pointer">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-semibold text-xl">¥{product.price.toLocaleString()}</span>
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
    </div>
  )
}
