import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { postQuery } from "@/sanity/lib/queries"; // ✅ Use `postQuery`
import { urlFor } from "@/sanity/lib/client";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { data: post } = await sanityFetch({
    query: postQuery, // ✅ Use the correct query
    params: { slug: params.slug }, // ✅ Ensure proper params
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      {post?.mainImage && (
        <Image
          className="w-full aspect-[800/300]"
          src={urlFor(post.mainImage).width(800).height(300).quality(80).auto("format").url()}
          alt={post?.mainImage?.alt || ""}
          width="800"
          height="300"
        />
      )}
      <h1 className="text-4xl font-bold">{post?.title}</h1>
      {post?.body && (
        <div className="prose">
          <PortableText value={post.body} />
        </div>
      )}
      <hr />
      <Link href="/posts">&larr; Return to index</Link>
    </main>
  );
}
