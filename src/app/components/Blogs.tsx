import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  title: string
  description: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    title: "8 Best Hidden Spy Apps for Android in 2025: Top Picks and Reviews",
    description: "8 Best Hidden Spy Apps for Android in 2025",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Charlotte Jones",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Mar 11, 2025",
    readTime: "4 min read",
    slug: "spy-apps-android",
  },
  {
    title: "Uncover the College Major Mystery: Understanding Your Academic Path",
    description: "This article helps students understand the process of choosing a college major, shedding light on...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Charlotte Jones",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Oct 26, 2024",
    readTime: "6 min read",
    slug: "college-major-mystery",
  },
  {
    title: "Major vs Minor Degree: Understanding the Key Differences",
    description: "This blog explores the key differences between major and minor degrees in higher education...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Charlotte Jones",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Dec 23, 2024",
    readTime: "7 min read",
    slug: "major-vs-minor",
  },
  {
    title: "Unlock Your Potential: Comprehensive Guide on Becoming a Professor",
    description:
      "Becoming a professor is a rewarding journey that requires dedication, advanced education, and a passion...",
    image: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Charlotte Jones",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "Nov 23, 2024",
    readTime: "5 min read",
    slug: "become-professor",
  },
]

export default function BlogGrid() {
  return (
    <section className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center mb-10  tracking-tight md:px-10 font-lexend">Our Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="overflow-hidden bg-[#f5f5f5] rounded-lg shadow-lg">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              </Link>

              <CardHeader className="space-y-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-lg font-semibold text-[#456359] hover:text-[#324740] line-clamp-2"
                >
                  {post.title}
                </Link>
                <p className="text-muted-foreground line-clamp-2">{post.description}</p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#456359]">{post.author.name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="rounded-md px-4 py-2 hover:bg-[#1e534e] hover:text-white text-white bg-[#456359] ">
            View All Blogs
          </Button>
        </div>
      </div>
    </section>
  )
}

