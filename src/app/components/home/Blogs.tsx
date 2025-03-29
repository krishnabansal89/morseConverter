import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { client, urlFor , getDate } from "@/sanity/client"
import { getBlogs } from "@/sanity/queries"

interface BlogPost {
  title: string
  metaDescription: string
  mainImage: string
  publishedAt: string
  slug: string
}


export default async function BlogGrid() {
  const posts: Array<BlogPost> = await client.fetch(getBlogs)

  if (!posts || posts.length === 0) {
    return <div className="text-center py-10">No blog posts found.</div>;
  }

  return (
    <section className="bg-[rgb(236,232,228)] w-[98%] mx-auto p-4 md:px-20 rounded-lg rounded-b-none rounded-t-none shadow-lg">
      <div className="max-w-7xl mx-auto ">
        <h2 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center mb-12  tracking-tight md:px-10 font-poppins">Our Blogs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {posts.map((post) => {
            const imageUrl = post.mainImage ? urlFor(post.mainImage)?.width(400)?.height(300)?.url() : null;
            return (<Card key={post.slug} className="overflow-hidden bg-[#f5f5f5] rounded-lg shadow-lg">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-56 -mt-10 w-full">
                  <Image src={imageUrl as string} alt={post.title} fill className="object-fill" />
                </div>
              </Link>

              <CardHeader className="space-y-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-lg font-semibold text-[#456359] hover:text-[#324740] line-clamp-2"
                >
                  {post.title}
                </Link>
                <p className="text-muted-foreground line-clamp-3">{post.metaDescription}</p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>{getDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )
          } 
          

          )}

        </div>

        <div className="text-center">
          <Button variant="outline" className="bg-[#456359] mr-6 text-white px-4 py-2 rounded-lg font-poppins hover:bg-[#324740] ">
            View All Blogs
          </Button>
        </div>
      </div>
    </section>
  )
}

