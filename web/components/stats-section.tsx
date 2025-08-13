import { Users, Download, Star, Code } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Developers",
    description: "Join our growing community",
  },
  {
    icon: Download,
    value: "2M+",
    label: "Downloads",
    description: "Templates downloaded worldwide",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    description: "Based on 10K+ reviews",
  },
  {
    icon: Code,
    value: "500+",
    label: "AI Templates",
    description: "Production-ready solutions",
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Developers Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are building the future with our AI templates and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-muted-foreground text-sm">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
