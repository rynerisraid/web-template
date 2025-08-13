"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const categories = [
  { id: "handbags", name: "手袋", count: 45 },
  { id: "jewelry", name: "珠宝", count: 32 },
  { id: "watches", name: "腕表", count: 28 },
  { id: "accessories", name: "配饰", count: 67 },
  { id: "shoes", name: "鞋履", count: 39 },
  { id: "clothing", name: "服装", count: 56 },
]

const brands = [
  { id: "luxuria", name: "LUXURIA", count: 89 },
  { id: "elegance", name: "Elegance", count: 67 },
  { id: "prestige", name: "Prestige", count: 45 },
  { id: "royal", name: "Royal Collection", count: 34 },
  { id: "heritage", name: "Heritage", count: 23 },
]

const colors = [
  { id: "black", name: "黑色", color: "hsl(var(--foreground))" },
  { id: "white", name: "白色", color: "hsl(var(--background))" },
  { id: "gold", name: "金色", color: "hsl(var(--primary-light))" },
  { id: "silver", name: "银色", color: "hsl(var(--muted))" },
  { id: "brown", name: "棕色", color: "hsl(var(--muted-foreground))" },
  { id: "navy", name: "深蓝", color: "hsl(var(--primary))" },
]

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    color: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-white font-medium text-lg mb-4">筛选条件</h2>

        {/* Category Filter */}
        <div className="border-b border-slate-700 pb-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => toggleSection("category")}
            className="w-full justify-between p-0 text-white hover:text-amber-400"
          >
            <span className="font-medium">商品分类</span>
            {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {expandedSections.category && (
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <label htmlFor={category.id} className="text-slate-300 text-sm cursor-pointer flex-1">
                    {category.name}
                  </label>
                  <span className="text-slate-500 text-xs">({category.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="border-b border-slate-700 pb-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => toggleSection("brand")}
            className="w-full justify-between p-0 text-white hover:text-amber-400"
          >
            <span className="font-medium">品牌</span>
            {expandedSections.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {expandedSections.brand && (
            <div className="mt-3 space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox id={brand.id} />
                  <label htmlFor={brand.id} className="text-slate-300 text-sm cursor-pointer flex-1">
                    {brand.name}
                  </label>
                  <span className="text-slate-500 text-xs">({brand.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="border-b border-slate-700 pb-4 mb-4">
          <Button
            variant="ghost"
            onClick={() => toggleSection("price")}
            className="w-full justify-between p-0 text-white hover:text-amber-400"
          >
            <span className="font-medium">价格区间</span>
            {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {expandedSections.price && (
            <div className="mt-3 space-y-4">
              <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={1000} className="w-full" />
              <div className="flex justify-between text-sm text-slate-300">
                <span>¥{priceRange[0].toLocaleString()}</span>
                <span>¥{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="pb-4">
          <Button
            variant="ghost"
            onClick={() => toggleSection("color")}
            className="w-full justify-between p-0 text-white hover:text-amber-400"
          >
            <span className="font-medium">颜色</span>
            {expandedSections.color ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {expandedSections.color && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-slate-600 cursor-pointer hover:border-amber-400 transition-colors"
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                  <span className="text-slate-300 text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium">应用筛选</Button>
      </div>
    </div>
  )
}
