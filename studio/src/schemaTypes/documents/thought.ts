import { Rule } from '@sanity/types';  // Import Rule for proper typing
import { SanityDocument } from '@sanity/types';  // Import SanityDocument to type 'document'

// Thought Document Schema
export default {
  name: 'thought',
  title: 'Thought',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'The date and time this thought was created',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The content of the thought',
    },
    {
      name: 'thoughtThread',
      title: 'Thought Thread',
      type: 'reference',
      to: [{ type: 'thoughtThread' }],
      description: 'Link this thought to a thought thread',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This will be generated automatically',
      readOnly: true, // Set to read-only since it's auto-generated
      validation: (Rule: Rule) => Rule.required(),
      initialValue: (document: SanityDocument) => {
        const dateString = document.date as string;  // Explicitly cast 'document.date' to string
        const date = new Date(dateString);
        return `Thought on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
