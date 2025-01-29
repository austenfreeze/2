import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageDocument',
  title: 'Image Document',
  type: 'document',
  fields: [
    // Title and description for the image document
    defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
      description: 'A descriptive title for the image.',
    }),

    defineField({
      name: 'imageDescription',
      title: 'Image Description',
      type: 'text',
      description: 'A more detailed description of the image (context, background, etc.).',
    }),

    // Embed the `image1` object schema here (no need to redefine its fields)
    defineField({
      name: 'image1',
      title: 'Image Details',
      type: 'image1', // Referencing the `image1` object schema
      description: 'All metadata, context, and image settings.',
    }),

    // Folder reference for organizational purposes (reference to an image folder)
    defineField({
      name: 'folderReference',
      title: 'Folder Reference',
      type: 'reference',
      to: [{ type: 'imageFolder' }],
      description: 'Reference to an image folder for better organization.',
    }),

    // Publishing status of the image document
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Indicates whether the image document is published or a draft.',
    }),

    // Tags for categorization
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing and searching the image.',
    }),
  ],

  preview: {
    select: {
      title: 'imageTitle',  // Title for the document preview
      media: 'image1.image',  // Media field pointing to the image
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Untitled Image',  // Default title if not set
        media: media || 'https://via.placeholder.com/100',  // Fallback media if no image is available
      };
    },
  },
});
