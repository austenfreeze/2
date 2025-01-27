import { defineType, defineField } from 'sanity';

// Function to truncate text to a logical character limit followed by "..."
const truncateText = (text: string, maxLength = 50): string => {  // Explicitly define text as string
  if (text && text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default defineType({
  name: 'postContent',
  title: 'Post Content',
  type: 'document',
  fields: [
    defineField({
      name: 'postAuthor',
      title: 'Post Author',
      type: 'reference',
      to: [{ type: 'profile' }],
      fieldset: 'id',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      fieldset: 'id',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
      fieldset: 'content',
    }),
    defineField({
      name: 'reactions',
      title: 'Reactions',
      type: 'reactionObject',
      fieldset: 'content',
    }),
    defineField({
      name: 'noteworthyComments',
      title: 'Noteworthy Comments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'comment' }] }],
    }),
    defineField({
      name: 'postUrl',
      title: '_Post URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      fieldset: 'profileLinks',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'content',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'profileLinks',
    }),
  ],
  fieldsets: [
    { name: 'id', title: 'ID', options: { columns: 2 } },
    { name: 'profileLinks', title: 'Post Links', options: { columns: 2 } },
    { name: 'content', title: 'Content' },
  ],
  preview: {
    select: {
      title: 'content', // Title of the post content
      date: 'date', // Date of the post
      author: 'postAuthor.profileName', // Author's name from the referenced _profile
      media: 'postAuthor.profilePic', // Profile picture of the author
    },
    prepare(selection) {
      const { title, date, author, media } = selection;
      const truncatedTitle = truncateText(title || 'No content available'); // Use the truncateText function

      return {
        title: truncatedTitle,
        subtitle: `Posted by ${author || 'Anonymous'} on ${date}`, // Format the subtitle with author and date
        media: media, // Display the author's profile picture
      };
    },
  },
});
