"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const cartItems = [
  {
    id: 1,
    name: "经典真皮手袋",
    price: 12800,
    originalPrice: 15600,
    image: "/placeholder.svg?height=200&width=200",
    color: "黑色",
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    name: "钻石项链",
    price: 28900,
    image: "/placeholder.svg?height=200&width=200",
    color: "白金",
    quantity: 1,
    inStock: true,
  },
]

export default function ShoppingCart() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 5000 ? 0 : 200
  const discount = promoCode === "LUXURY10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-slate-600 mx-auto mb-6" />
          <h1 className="text-2xl font-serif text-white mb-4">购物车为空</h1>
          <p className="text-slate-400 mb-8">还没有添加任何商品到购物车</p>
          <Link href="/products">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">开始购物</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-white mb-8">购物车</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 bg-slate-700 rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium text-lg">{item.name}</h3>
                        <p className="text-slate-400 text-sm">颜色: {item.color}</p>
                        {item.inStock ? (
                          <p className="text-green-400 text-sm">现货</p>
                        ) : (
                          <p className="text-red-400 text-sm">缺货</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-semibold text-lg">¥{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-slate-500 line-through text-sm">
                            ¥{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 border-slate-600 text-white hover:border-amber-500"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 border-slate-600 text-white hover:border-amber-500"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700 sticky top-8">
            <CardHeader>
              <CardTitle className="text-white">订单摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Promo Code */}
              <div>
                <label className="text-slate-300 text-sm mb-2 block">优惠码</label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="输入优惠码"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Button
                    variant="outline"
                    className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900 bg-transparent"
                  >
                    应用
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-slate-700">
                <div className="flex justify-between text-slate-300">
                  <span>小计</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>配送费</span>
                  <span>{shipping === 0 ? "免费" : `¥${shipping}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>优惠折扣</span>
                    <span>-¥{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-slate-700">
                  <span>总计</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium mt-6">
                <span>立即结算</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Continue Shopping */}
              <Link href="/products">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-400 bg-transparent"
                >
                  继续购物
                </Button>
              </Link>

              {/* Security Notice */}
              <div className="text-center text-slate-400 text-xs pt-4">
                <p>安全支付 • 数据加密保护</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
