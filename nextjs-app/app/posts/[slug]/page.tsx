// In the page file where you are listing all posts

import { GetStaticProps } from 'next';
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  return {
    props: {
      posts: data || [],
    },
    revalidate: 60, // Revalidate every minute for fresh content
  };
};
