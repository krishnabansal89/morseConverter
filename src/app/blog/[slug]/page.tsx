import { blogsQuery } from '@/sanity/queries';
import { client, urlFor } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';

// Define dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const post = await client.fetch(blogsQuery, { slug: (await params).slug });
  return {
    title: post?.title || 'Blog Post',
    description: post?.description || 'A blog post from our site.',
  };
}

// Define dynamic routes
export async function generateStaticParams() {
  const data = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)]`
  );
  return data.map((post) => ({ slug: post.slug.current }));
}

type tParams = Promise<{ slug: string[] }>;

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
            <h1 className="text-4xl font-bold my-6 font-poppins">{children}</h1>
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

    const post = await client.fetch(blogsQuery, { slug });

    if (!post) {
        return <div>Post not found.</div>;
    }

    const { title, publishedAt, mainImage, body, faqs } = post;
    const mainImageUrl = mainImage ? urlFor(mainImage)?.width(1000).auto('format').url() : null;

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <Link href="" className="text-blue-600 hover:underline mb-6 inline-block">
                ← Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            {publishedAt && (
                <p className="text-gray-500 text-sm mb-6">
                    Published on: {new Date(publishedAt).toLocaleDateString()}
                </p>
            )}

            {mainImageUrl && (
                <div className="mb-8 relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                        src={mainImageUrl}
                        alt={mainImage?.alt || title || 'Blog post main image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes="(max-width: 900px) 100vw, 1000px"
                        className="rounded-lg"
                    />
                </div>
            )}

            {body && (
                <div className="prose prose-lg max-w-none font-maitree ">
                    {/* @ts-expect-error: Will fix later */}

                    <PortableText value={body} components={ptComponents} />
                </div>
            )}

            {faqs && faqs.length > 0 && (
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq: { _key: string; question: string; answer: string }, index: number) => (
                            <div key={faq._key || index}>
                                <h3 className="text-lg font-semibold ">{faq.question}</h3>
                                {faq.answer && (
                                    <div className="prose prose-sm max-w-none text-gray-700">
                                        {/* @ts-expect-error: Will fix later */}
                                        <PortableText value={faq.answer} components={ptComponents} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}

