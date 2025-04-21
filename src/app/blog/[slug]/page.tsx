export const revalidate = 86400; //24hrs

import { blogBySlugQuery, blogSlugsQuery } from '@/sanity/queries';
import { client, urlFor } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { Clock, Calendar, Tag } from 'lucide-react'; // Assuming you use Lucide icons
import FAQAccordion from '@/app/components/blogs/FAQaccordion';
import Breadcrumb from '@/components/breadcrumb';



// Define dynamic metadata
export async function generateMetadata({
    params,
}: {
    params: tParams;
}): Promise<Metadata> {
    const post = await client.fetch(blogBySlugQuery, { slug: (await params).slug });
    return {
        title: post?.seoTitle || post?.title || 'Blog Post',
        description: post?.seoDescription || post?.description || 'A blog post from our site.',
        authors: post?.author ? [{ name: post.author.name }] : undefined,
        keywords: post?.tags,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_URL}/blog/${post?.slug.current}`,
        },
    };
}

// Define dynamic routes
export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(blogSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

type tParams = Promise<{ slug: string }>;

const ptComponents = {
    types: {
        image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string; caption?: string } }) => {
            if (!value?.asset?._ref) {
                return null;
            }
            const imageUrl = urlFor(value)?.width(800)?.fit('max').auto('format').url();
            if (!imageUrl) return null;

            return (
                <div className="my-6 relative">
                    <Image
                        src={imageUrl}
                        alt={value.alt || 'Image from blog content'}
                        width={800}
                        height={600}
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="mx-auto rounded-md"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-600 mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </div>
            );
        },
    },
    marks: {
        link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
                    {children}
                </a>
            );
        },
    },
    block: {
        h1: ({ children }: { children: React.ReactNode }) => (
            <h1 className="text-4xl font-bold my-6 font-poppins ">{children}</h1>
        ),
        h2: ({ children }: { children: React.ReactNode }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 font-poppins">{children}</h2>
        ),
        h3: ({ children }: { children: React.ReactNode }) => (
            <h3 className="text-2xl font-bold mt-6 mb-3 font-poppins">{children}</h3>
        ),
        blockquote: ({ children }: { children: React.ReactNode }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: { children: React.ReactNode }) => (
            <ul className="list-disc list-inside my-4 pl-4">{children}</ul>
        ),
        number: ({ children }: { children: React.ReactNode }) => (
            <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
        number: ({ children }: { children: React.ReactNode }) => <li className="mb-2">{children}</li>,
    },
};



export default async function BlogPostPage(
    props: {
        params: tParams
    }) {
    const { slug } = await props.params;

    const post = await client.fetch(blogBySlugQuery, { slug });

    if (!post) {
        return <div>Post not found.</div>;
    }

    const {
        title,
        publishedAt,
        image,
        body,
        author,
        readingTimeInMinutes,
        tags,
        linkedBlogs,
        faqs
    } = post;

    const imageUrl = image ? urlFor(image)?.width(1000).auto('format').url() : null;
    const authorImageUrl = author?.image ? urlFor(author.image)?.width(80).height(80).auto('format').url() : null;

    return (
        <article className="container mx-auto px-4 py-8  bg-[rgb(236,232,228)] rounded-lg">

            <div className='max-w-3xl mx-auto text-[#2d2d2d] '>
            <Breadcrumb />




                {/* Post Header */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-10">{title}</h1>

                {/* Post Metadata */}
                <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                    {publishedAt && (
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            <time dateTime={publishedAt}>
                                {new Date(publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    )}

                    {readingTimeInMinutes && (
                        <div className="flex items-center gap-1.5">
                            <Clock size={16} />
                            <span>{readingTimeInMinutes} min read</span>
                        </div>
                    )}
                </div>

                {/* Featured Image */}
                {imageUrl && (
                    <div className="mb-8 relative w-full" style={{ aspectRatio: '16/9' }}>
                        <Image
                            src={imageUrl}
                            alt={image?.alt || title || 'Blog post featured image'}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            sizes="(max-width: 900px) 100vw, 1000px"
                            className="rounded-lg"
                        />
                    </div>
                )}

                {/* Author Information */}
                {author && (
                    <div className="flex items-center gap-4 mb-8 p-4  rounded-lg">
                        {authorImageUrl && (
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                                <Image
                                    src={authorImageUrl}
                                    alt={`Photo of ${author.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                />
                            </div>
                        )}
                        <div>
                            <Link
                                href={`/author/${author.slug.current}`}
                                className="font-medium text-lg hover:text-blue-600"
                            >
                                {author.name}
                            </Link>
                            {author.shortBio && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{author.shortBio}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tags.map((tag: string) => (
                            <Link
                                key={tag}
                                href={`/blog/tag/${tag}`}
                                className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                            >
                                <Tag size={14} />
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Main Content */}
                {body && (
                    <div className="prose prose-lg max-w-none font-maitree">
                        {/* @ts-expect-error: Solve Later */}
                        <PortableText value={body} components={ptComponents} />
                    </div>
                )}

                {faqs && faqs.length > 0 && (
                    <FAQAccordion faqs={faqs} />
                )}


                {/* Related Posts */}
                {linkedBlogs && linkedBlogs.length > 0 && (
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {linkedBlogs.map((relatedPost: any) => {
                                const relatedImageUrl = relatedPost.image ?
                                    urlFor(relatedPost.image)?.width(400).height(250).auto('format').url() :
                                    null;

                                return (
                                    <div key={relatedPost.slug.current} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        {relatedImageUrl && (
                                            <Link href={`/blog/${relatedPost.slug.current}`} className="block">
                                                <div className="relative h-40 w-full">
                                                    <Image
                                                        src={relatedImageUrl}
                                                        alt={relatedPost.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 400px"
                                                    />
                                                </div>
                                            </Link>
                                        )}
                                        <div className="p-4">
                                            <Link
                                                href={`/blog/${relatedPost.slug.current}`}
                                                className="text-lg font-medium hover:text-blue-600 line-clamp-2"
                                            >
                                                {relatedPost.title}
                                            </Link>
                                            {relatedPost.description && (
                                                <p className="text-gray-600 mt-2 line-clamp-2">{relatedPost.description}</p>
                                            )}
                                            <div className="mt-3 flex justify-between text-sm">
                                                {relatedPost.author && (
                                                    <span className="text-gray-600">By {relatedPost.author.name}</span>
                                                )}
                                                {relatedPost.readingTimeInMinutes && (
                                                    <span className="text-gray-500">{relatedPost.readingTimeInMinutes} min read</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

        </article>
    );
}
