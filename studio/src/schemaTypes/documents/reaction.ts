import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'reaction',
  title: 'Reaction',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true, // Allow hotspot for cropping if needed
      },
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      options: {
        list: ['LIKE', 'HEART', 'HAHA', 'SAD', 'CARE', 'ANGRY', 'WOW'],
      },
      initialValue: 'LIKE',
    }),
    defineField({
      name: 'count',
      title: 'Reaction Count',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'icon', // Display the icon in the preview
      subtitle: 'count',
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title: `${title} Reaction`,
        media,
        subtitle: `Count: ${subtitle}`,
      };
    },
  },
});
