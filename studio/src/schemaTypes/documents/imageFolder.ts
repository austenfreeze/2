import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'imageFolder',
  title: 'Image Folder',
  type: 'document',
  fields: [
    // Name of the folder
    defineField({
      name: 'title',
      title: 'Folder Name',
      type: 'string',
      description: 'The name of the image folder.',
      validation: (Rule) => Rule.required().max(100).warning('Folder names should be concise.'),
    }),

    // Description of the folder
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description of the folder’s contents or purpose.',
      rows: 2,
    }),

    // Reference to a parent folder (optional, for nested folder structures)
    defineField({
      name: 'parentFolder',
      title: 'Parent Folder',
      type: 'reference',
      to: [{ type: 'imageFolder' }],
      description: 'Reference to a parent folder, allowing hierarchical organization.',
    }),

    // Tags for categorization
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing and filtering image folders.',
    }),

    // Cover image for the folder
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'An optional cover image representing the folder.',
    }),

    // Date created (for archival/logging purposes)
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      type: 'datetime',
      description: 'The date this folder was created.',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Untitled Folder',
        media: media || 'https://via.placeholder.com/100',
      };
    },
  },
});
