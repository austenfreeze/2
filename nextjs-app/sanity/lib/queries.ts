import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    }, 
    []
  ),
  author->{
    firstName,
    lastName,
    picture
  },
  publishedAt
`;

const linkFields = /* groq */ `
  markDefs[]{
    ...,
    _type == "link" => {
      "page": page->slug.current,
      "post": post->slug.current
    }
  }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ... // Other link fields can be added here
      }
    }
  }
`);

// Static Props Fetcher
export const fetchStaticProps = async ({ slug }: { slug: string }) => {
  const data = await sanityFetch({ query: getPageQuery, params: { slug } });
  return data;
};

// Fetch all posts
export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc, date desc, _updatedAt desc) [0...12] {
    ${postFields}
  }
`);

// Fetch more posts, excluding one (for single post pages)
export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] 
  | order(publishedAt desc, date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

// Fetch a single post
export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    publishedAt,
    "categories": coalesce(
      categories[]->{
        _id,
        slug,
        title
      }, 
      []
    ),
    author->{
      name,
      image
    },
    content[]{
      ...,
      ${linkFields}
    }
  }
`);

// Get all post slugs
export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  { "slug": slug.current }
`);

// Get all page slugs
export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  { "slug": slug.current }
`);
