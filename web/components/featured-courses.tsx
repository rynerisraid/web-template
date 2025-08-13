import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star, Play, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredCourses = [
  {
    id: 1,
    title: "Complete AI Development Bootcamp",
    description:
      "Master AI development from basics to advanced concepts. Build real-world projects with modern frameworks.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Dr. Sarah Chen",
    duration: "12 weeks",
    students: 15420,
    rating: 4.9,
    price: "$199",
    originalPrice: "$299",
    level: "Beginner to Advanced",
    lessons: 156,
  },
  {
    id: 2,
    title: "Machine Learning with Python",
    description: "Deep dive into machine learning algorithms, data preprocessing, and model deployment strategies.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Prof. Michael Rodriguez",
    duration: "8 weeks",
    students: 12800,
    rating: 4.8,
    price: "$149",
    originalPrice: "$199",
    level: "Intermediate",
    lessons: 98,
  },
  {
    id: 3,
    title: "Natural Language Processing",
    description: "Comprehensive guide to NLP techniques, from basic text processing to advanced transformer models.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Dr. Emily Johnson",
    duration: "10 weeks",
    students: 9650,
    rating: 4.9,
    price: "$179",
    originalPrice: "$249",
    level: "Advanced",
    lessons: 124,
  },
]

export default function FeaturedCourses() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from industry experts with our comprehensive AI and machine learning courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <Card
              key={course.id}
              className="bg-card border-border overflow-hidden group hover:shadow-lg transition-all duration-300 hover:border-primary/50 glass-card"
            >
              <div className="relative">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={350}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glass-button">
                    <Play className="mr-2 h-5 w-5" />
                    Preview Course
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="glass-badge">
                    {course.level}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{course.description}</p>
                <p className="text-sm font-medium text-primary">{course.instructor}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-sm text-foreground">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{course.lessons} lessons</span>
                </div>

                <Link href={`/courses/${course.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glass-button">Enroll Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/courses">
            <Button variant="outline" size="lg" className="glass-button">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}