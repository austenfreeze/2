import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";

// Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: '/studio',
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }
      return props.filterDefault(props);
    },
  },
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source);
}
