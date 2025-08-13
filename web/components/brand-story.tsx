import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function BrandStory() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="品牌工艺"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 tracking-wide">
                传承与创新的
                <span className="text-primary block">完美融合</span>
              </h2>
              <div className="w-20 h-1 bg-primary"></div>
            </div>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
              <p>
                自1892年创立以来，LUXURIA始终坚持着对卓越品质的不懈追求。我们相信，真正的奢华不仅仅体现在材质的珍贵，更在于每一个细节的精雕细琢。
              </p>
              <p>
                我们的工匠大师们传承着百年工艺，同时融入现代设计理念，为每一位客户打造独一无二的奢华体验。从选材到成品，每一个环节都体现着我们对完美的执着。
              </p>
              <p>在LUXURIA，我们不仅仅是在销售商品，更是在传递一种生活态度——对美好事物的追求，对品质生活的向往。</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium px-8 py-3">
                了解品牌故事
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 bg-transparent"
              >
                探索工艺传承
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">130+</div>
                <div className="text-slate-400 text-sm">年品牌历史</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">50+</div>
                <div className="text-slate-400 text-sm">国家销售</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-primary mb-2">100K+</div>
                <div className="text-slate-400 text-sm">满意客户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
