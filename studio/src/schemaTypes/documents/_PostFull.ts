import { defineType, defineField } from 'sanity';

// Function to truncate text to a logical character limit followed by "..."
const truncateText = (text: string, maxLength = 50): string => {  // Explicitly define text as string
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default defineType({
  name: 'postFull',
  title: 'Post Full',
  type: 'document',
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'postContent',}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postName',
      title: 'Post Name',
      type: 'string',
      readOnly: true, // Make the field read-only
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'content', // Select the content field for preview
    },
    prepare(selection) {
      const { content } = selection;
      const truncatedTitle = truncateText(content, 50); // Adjust max length as needed
      return {
        title: truncatedTitle,
      };
    },
  },
});
