import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { client, urlFor, getDate } from "@/sanity/client"
import { Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Breadcrumb from "@/components/breadcrumb"

export const revalidate = 86400; //24hrs


// Updated interface to match the GROQ query response
interface Author {
    name: string
    slug: { current: string }
    image: string
    shortBio: string
}
type tParams = Promise<{ slug: string }>;


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

// Create a new query without limit for all blogs
// Or we can use the same query with a higher limit
const POSTS_PER_PAGE = 12;

export default async function BlogListingPage({
    searchParams,
}: {
    searchParams: tParams
}) {
    // Get the current page from the URL query params
    const currentPage = Number((await (searchParams)).slug) || 1;

    // Fetch total count for pagination
    const totalPosts = await client.fetch(`count(*[_type == "blog"])`);

    // Calculate total pages
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    // Calculate start and end indices
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    // Fetch posts for the current page
    const posts: Array<BlogPost> = await client.fetch(
        `*[_type == "blog"] | order(publishedAt desc, _updatedAt desc)[${start}...${end}] {
      _id,
      title,
      description,
      image,
      slug,
      author->{
        name,
        slug,
        image,
        shortBio,
      },
      publishedAt,
      readingTimeInMinutes,
    }`
    );

    if (!posts || posts.length === 0) {
        return <div className="text-center py-10">No blog posts found.</div>;
    }

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <section className="bg-background text-foreground w-[98%] mx-auto p-4 md:px-20 rounded-lg shadow-lg min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Breadcrumb                />
                <h1 className="md:text-5xl/snug text-4xl/snug bg-gradient-to-r from-green-500 to-teal-900 text-transparent bg-clip-text font-medium text-center mb-12 tracking-tight md:px-10 font-poppins pt-8">
                    All Blog Posts
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {posts.map((post) => {
                        const imageUrl = post.image ? urlFor(post.image)?.width(600)?.height(300)?.url() : "/placeholder-blog.jpg";
                        const authorImageUrl = post.author?.image ? urlFor(post.author.image)?.width(40)?.height(40)?.url() : "/placeholder-author.jpg";

                        return (
                            <Card key={post._id} className="overflow-hidden bg-card rounded-lg shadow-lg flex flex-col">
                                <Link href={`/blog/${post.slug.current}`}>
                                    <div className="relative h-56 w-full -mt-10">
                                        <Image
                                            src={imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-fill transition-transform hover:scale-105 duration-300"
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4 pb-10">
                        <Link
                            href={`/blog?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                            className={`flex items-center p-2 border rounded-md ${currentPage === 1
                                    ? 'text-muted-foreground cursor-not-allowed border-border'
                                    : 'border-primary text-primary hover:bg-primary/10'
                                }`}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : undefined}
                        >
                            <ChevronLeft size={20} />
                        </Link>

                        <div className="flex space-x-2">
                            {pageNumbers.map((page) => (
                                <Link
                                    key={page}
                                    href={`/blog?page=${page}`}
                                    className={`inline-flex items-center justify-center h-10 w-10 rounded-md border ${currentPage === page
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'border-primary text-primary hover:bg-primary/10'
                                        }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={`/blog?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                            className={`flex items-center p-2 border rounded-md ${currentPage === totalPages
                                    ? 'text-muted-foreground cursor-not-allowed border-border'
                                    : 'border-primary text-primary hover:bg-primary/10'
                                }`}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : undefined}
                        >
                            <ChevronRight size={20} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
