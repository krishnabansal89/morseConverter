import { groq } from 'next-sanity'
// *** BLOGS ***
export const blogNamesWithLimitQuery = groq`
*[_type == "blog"][0...$limit] | order(date desc, _updatedAt desc) {
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

export const blogNamesByAuthorSlugQuery = groq`
*[_type == "blog" && author->slug.current == $slug] | order(date desc, _updatedAt desc) {
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

export const blogSlugsQuery = groq`
*[_type == "blog" && defined(slug.current)][].slug.current`

export const blogBySlugQuery = groq`
*[_type == "blog" && slug.current == $slug][0] {
	_id,
	title,
	description,
	seoTitle,
	seoDescription,
	image,
	slug,
	body,
	author->{
		name,
		slug,
		image,
		shortBio,
	},
	publishedAt,
	body,
	faqs,
	readingTimeInMinutes,
	tags,
	linkedBlogs[]->{
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
	}
}`

// *** PAGE SEO ***
export const pageSeoByPathQuery = groq`
*[_type == "pageSeo" && path == $path][0] {
	_id,
	title,
	path,
	scripts[]{
	  name,
		value,
		insertAt,
	}
}`

// *** AUTHORS ***
export const authorNamesQuery = groq`
*[_type == "author"] | order(_updatedAt desc) {
	_id,
	name,
	shortBio,
	slug,
	image,
}`

export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current`

export const authorBySlugQuery = groq`
*[_type == "author" && slug.current == $slug][0] {
	_id,
	name,
	slug,
	shortBio,
	seoTitle,
	seoDescription,
	image,
	body,
	socials[]{
		label,
		value,
	}	
}`
