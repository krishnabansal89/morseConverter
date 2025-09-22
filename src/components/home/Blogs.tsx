import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { client, urlFor, getDate } from "@/sanity/client"
import { blogNamesWithLimitQuery } from "@/sanity/queries"
import { Clock, Calendar } from "lucide-react" // Assuming you're using Lucide icons

// Updated interface to match the GROQ query response

export const revalidate = 86400; //24hrs


interface Author {
  name: string
  slug: { current: string }
  image: string
  shortBio: string
}

interface BlogPost {
  _id: string
  title: string
  description: string
  image: string
  slug: { current: string }
  author: Author
  publishedAt: string
  readingTimeInMinutes: number
}

export default async function BlogGrid() {
  const posts: Array<BlogPost> = await client.fetch(blogNamesWithLimitQuery, { limit: 8 })

  if (!posts || posts.length === 0) {
    return <div className="text-center py-10">No blog posts found.</div>;
  }

  return (
    <section className="bg-background w-[98%] mx-auto p-4 md:px-20  rounded-lg rounded-b-none rounded-t-none shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col mt-10 md:mt-0">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center mb-4 tracking-tight md:px-10 font-poppins">Our Blogs</h2>
        <p className="text-muted-foreground font-maitree mb-12 mx-auto ">
          Explore our Blogs and guides on Morse Code
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {posts.map((post) => {
            const imageUrl = post.image ? urlFor(post.image)?.width(600)?.height(300)?.url() : "/placeholder-blog.jpg";
            const authorImageUrl = post.author?.image ? urlFor(post.author.image)?.width(40)?.height(40)?.url() : "/placeholder-author.jpg";

            return (
              <Card key={post._id} className="overflow-hidden bg-card rounded-lg shadow-lg flex flex-col">
                <Link href={`/blog/${post.slug.current}`}>
                
                  <div className="relative h-56 w-full -mt-10 ">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-fill  transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>

                <CardHeader className="space-y-2 flex-grow">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-lg font-semibold text-primary hover:underline line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                </CardHeader>

                <CardContent className="pb-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{getDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readingTimeInMinutes} min read</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <Link href={`/author/${post.author?.slug.current}`} className="flex items-center gap-2 w-full">
                    {post.author?.image && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={authorImageUrl}
                          alt={post.author.name || "Author"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-primary">
                      {post.author?.name || "Anonymous"}
                    </span>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button
            variant="default"
            asChild
          >
            <Link href="/blog">View All Blogs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
