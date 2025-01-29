import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'image1',
  title: 'Image 1',
  type: 'object',
  fields: [
    // The main image field with hotspot for cropping
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,  // Enable cropping hotspot for flexibility
        metadata: ['location', 'exif',],  // Image metadata options
      },
      fieldset: 'mainImage',
    }),

    // Basic image metadata and context
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A title or caption for the image.',
      fieldset: 'imageDetails',
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A short caption for the image.',
      fieldset: 'imageDetails',
    }),

    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'Contextual information about the image.',
      fieldset: 'imageDetails',
    }),

    // Tags for SEO and categorization
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Relevant tags for categorizing the image.',
      fieldset: 'seo',
    }),

    // People associated with the image (via references to another document type)
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      description: 'People associated with the image.',
      fieldset: 'seo',
    }),

    // Date the image was taken
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'datetime',
      description: 'The date the image was captured.',
      fieldset: 'archivalInfo',
    }),

    // Date the image was archived (in case it is moved or stored elsewhere)
    defineField({
      name: 'archivedDate',
      title: 'Archived Date',
      type: 'datetime',
      description: 'The date the image was archived.',
      fieldset: 'archivalInfo',
    }),

    // Archival info specific to local storage
    defineField({
      name: 'archivalInfoLocal',
      title: 'Local Archival Info',
      type: 'string',
      description: 'Information regarding the image’s location in local storage.',
      fieldset: 'archivalInfo',
    }),

    // Archival info specific to Sanity Studio (e.g., asset URL, status)
    defineField({
      name: 'archivalInfoStudio',
      title: 'Sanity Studio Archival Info',
      type: 'string',
      description: 'Information about how the image is stored/managed in Sanity Studio.',
      fieldset: 'archivalInfo',
    }),

    // Folder reference (to organize images into specific folders)
    defineField({
      name: 'folderReference',
      title: 'Folder Reference',
      type: 'reference',
      to: [{ type: 'imageFolder' }],
      description: 'Reference to an image folder for organizational purposes.',
      fieldset: 'organization',
    }),

    // URL manipulation options for the image (e.g., width, blur, format)
    defineField({
      name: 'imageUrlOptions',
      title: 'Image URL Options',
      type: 'object',
      fieldset: 'imageUrlOptions',
      fields: [
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          description: 'Width of the image (px).',
        }),
        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          description: 'Height of the image (px).',
        }),
        defineField({
          name: 'size',
          title: 'Size',
          type: 'string',
          options: {
            list: ['small', 'medium', 'large', 'original'],
          },
          description: 'Predefined size for image rendering.',
        }),
        defineField({
          name: 'blur',
          title: 'Blur Effect',
          type: 'boolean',
          description: 'Apply a blur effect (useful for low-quality image placeholders).',
        }),
        defineField({
          name: 'focalPoint',
          title: 'Focal Point',
          type: 'array',
          of: [{ type: 'number' }],
          description: 'Focal point for image (X, Y coordinates for hotspot).',
        }),
        defineField({
          name: 'rect',
          title: 'Custom Crop Area (Rect)',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'X',
              type: 'number',
            }),
            defineField({
              name: 'y',
              title: 'Y',
              type: 'number',
            }),
            defineField({
              name: 'width',
              title: 'Width',
              type: 'number',
            }),
            defineField({
              name: 'height',
              title: 'Height',
              type: 'number',
            }),
          ],
          description: 'Define a custom crop area that overrides hotspot/crop.',
        }),
        defineField({
          name: 'format',
          title: 'Format',
          type: 'string',
          options: {
            list: ['jpg', 'pjpg', 'png', 'webp'],
          },
          description: 'Select the image format.',
        }),
        defineField({
          name: 'forceDownload',
          title: 'Force Download',
          type: 'boolean',
          description: 'Whether to force download the image when clicked.',
        }),
        defineField({
          name: 'vanityName',
          title: 'Vanity Name',
          type: 'string',
          description: 'Custom name for the image file (helps with SEO).',
        }),
        defineField({
          name: 'frame',
          title: 'Frame',
          type: 'number',
          description: 'Apply a frame around the image.',
        }),
      ],
    }),
  ],
  fieldsets: [
    {
      name: 'mainImage',
      title: 'Main Image',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'imageDetails',
      title: 'Image Details',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'archivalInfo',
      title: 'Archival Information',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'organization',
      title: 'Organization',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'imageUrlOptions',
      title: 'Image URL Options',
      options: { collapsible: true, collapsed: true },
    },
  ],
});
