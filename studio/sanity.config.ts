// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes'; // Adjust path if necessary
import { structure } from './src/structure'; // Adjust path if necessary
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { presentationTool, defineDocuments, defineLocations, type DocumentLocation } from 'sanity/presentation';
import { assist } from '@sanity/assist';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  name: 'stenstudio',
  title: 'STENS STUDIO',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: { enable: '/api/draft-mode/enable' },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/:slug',
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: '/posts/:slug',
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({ locations: [homeLocation], message: 'This document is used on all pages', tone: 'positive' }),
          page: defineLocations({
            select: { name: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [{ title: doc?.name || 'Untitled', href: `/` + (doc?.slug?.current || '') }],
            }),
          }),
          post: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title || 'Untitled', href: `/posts/${doc?.slug?.current}` },
                { title: 'Home', href: '/' },
              ],
            }),
          }),
        },
      },
    }),
    unsplashImageAsset(),
    assist(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
