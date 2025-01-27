import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'profileName',
      title: 'Profile Name',
      type: 'string',
      fieldset: 'profileInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profilePic',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      fieldset: 'profileInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileLink',
      title: 'Profile Link',
      type: 'url',
      fieldset: 'profileLinks',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'slug',
        title: 'slug',
        type: 'slug',
        options: {source: 'profileName',},
        readOnly: true,
        fieldset: 'profileLinks',
    }),
    defineField({
      name: 'ml',
      title: 'ML',
      type: 'reference',
      to: [{ type: 'person' }],
      fieldset: 'ml',
    }),
    defineField({
      name: 'isMLActive',
      title: 'Is ML Con?',
      type: 'boolean',
      initialValue: false,
      fieldset: 'ml',
    }),
    defineField({
      name: 'profileAssociations',
      title: 'Profile Associations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'profile' }], // Directly reference _profile here
        },
      ],
    }),
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'text',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{type: 'reference',
        to: [{type: 'postContent',}],
      }],
    }),
  ],
  fieldsets: [
    { name: 'profileInfo', title: 'Profile Information' },
    { name: 'ml', title: 'ML Info', options: { columns: 2 } },
    { name: 'profileLinks', title: 'Profile Links', options: {columns: 2,},},
    { name: 'postsArray', title: 'Posts Array',},
  ],
  preview: {
    select: {
      title: 'profileName',
      ml: 'ml.name',
      subtitle: 'profileLink',
      media: 'profilePic',
      associations: 'profileAssociations', // Added associations to preview
    },
    prepare(selection) {
      const { title, ml, subtitle, media, associations } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - Associations: ${associations?.length || 0}`,
        media: media,
        ml: ml, // You can format this if needed
      };
    },
  },
});
