"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const productImages = [
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
  "/placeholder.svg?height=600&width=600",
]

const product = {
  id: 1,
  name: "经典真皮手袋",
  price: 12800,
  originalPrice: 15600,
  category: "手袋",
  rating: 4.9,
  reviews: 128,
  description:
    "这款经典真皮手袋采用意大利进口小牛皮制作，经过精湛的手工工艺打造。每一个细节都体现着奢华与品质的完美结合。",
  features: ["意大利进口小牛皮材质", "手工缝制工艺", "24K镀金五金配件", "可调节肩带设计", "多功能内部隔层"],
  specifications: {
    材质: "意大利小牛皮",
    尺寸: "30cm x 25cm x 12cm",
    重量: "0.8kg",
    颜色: "经典黑色",
    产地: "意大利",
  },
  inStock: true,
  stockCount: 5,
}

export default function ProductDetail({ productId }: { productId: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("black")
  const [quantity, setQuantity] = useState(1)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-slate-800 rounded-lg overflow-hidden">
            <Image
              src={productImages[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary hover:bg-accent/20 w-10 h-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary hover:bg-accent/20 w-10 h-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square bg-slate-800 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex ? "border-primary" : "border-border hover:border-accent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary text-sm font-medium">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-foreground text-sm">{product.rating}</span>
                <span className="text-slate-400 text-sm">({product.reviews} 评价)</span>
              </div>
            </div>
            <h1 className="text-3xl font-serif text-foreground mb-4 tracking-wide">{product.name}</h1>
            <p className="text-slate-300 text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">¥{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-slate-500 line-through">¥{product.originalPrice.toLocaleString()}</span>
            )}
            {product.originalPrice && (
              <span className="bg-destructive text-destructive-foreground px-2 py-1 text-sm rounded">
                限时特价
              </span>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-white font-medium mb-3">颜色选择</h3>
            <div className="flex gap-3">
              {["black", "brown", "navy"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-colors ${
                    selectedColor === color ? "border-primary" : "border-border hover:border-accent"
                  }`}
                  style={{
                    backgroundColor: 
                      color === "black" ? "hsl(var(--foreground))" : 
                      color === "brown" ? "hsl(var(--muted-foreground))" : 
                      "hsl(var(--primary))",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-white font-medium mb-3">数量</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-border text-foreground hover:border-primary hover:text-primary"
              >
                -
              </Button>
              <span className="text-foreground font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                className="border-border text-foreground hover:border-primary hover:text-primary"
              >
                +
              </Button>
              <span className="text-slate-400 text-sm ml-4">库存: {product.stockCount} 件</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground font-medium">
              <ShoppingBag className="h-5 w-5 mr-2" />
              加入购物车
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Heart className="h-5 w-5 mr-2" />
              收藏
            </Button>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-amber-400" />
              <div>
                <div className="text-foreground text-sm font-medium">免费配送</div>
                <div className="text-slate-400 text-xs">订单满¥5000</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-amber-400" />
              <div>
                <div className="text-foreground text-sm font-medium">品质保证</div>
                <div className="text-slate-400 text-xs">正品保障</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-amber-400" />
              <div>
                <div className="text-foreground text-sm font-medium">30天退换</div>
                <div className="text-slate-400 text-xs">无理由退换</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
            <TabsTrigger
              value="features"
              className="text-slate-300 data-[state=active]:text-amber-400 data-[state=active]:bg-slate-700"
            >
              产品特色
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="text-slate-300 data-[state=active]:text-amber-400 data-[state=active]:bg-slate-700"
            >
              规格参数
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-slate-300 data-[state=active]:text-amber-400 data-[state=active]:bg-slate-700"
            >
              用户评价
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-white font-medium text-lg mb-4">产品特色</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-300">
                      <div className="w-2 h-2 bg-amber-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-white font-medium text-lg mb-4">规格参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-white font-medium text-lg mb-4">用户评价 ({product.reviews})</h3>
                <div className="space-y-6">
                  <div className="border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-white font-medium">张女士</span>
                      <span className="text-slate-400 text-sm">2024年1月15日</span>
                    </div>
                    <p className="text-slate-300">
                      质量非常好，做工精细，皮质手感很棒。包装也很精美，送人自用都很不错。
                    </p>
                  </div>
                  <div className="border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= 4 ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium">李先生</span>
                      <span className="text-slate-400 text-sm">2024年1月10日</span>
                    </div>
                    <p className="text-slate-300">给太太买的生日礼物，她很喜欢。颜色很正，大小也合适，值得推荐。</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-white font-medium">王女士</span>
                      <span className="text-slate-400 text-sm">2024年1月8日</span>
                    </div>
                    <p className="text-slate-300">奢华感十足，细节处理得很好。配送速度也很快，整体购物体验很满意。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
