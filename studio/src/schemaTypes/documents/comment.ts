import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'comment',
  title: 'Comment',
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
          fieldset: 'comment',
        }),
        defineField({
          name: 'reactions',
          title: 'Reactions',
          type: 'reference',
          to: [{ type: 'reactionObject' }], // Reference the reactionObject schema
          fieldset: 'comment',
        }),
    ],
    fieldsets: [
        { name: 'id', title: 'ID', options: { columns: 2 } },
        { name: 'comment', title: 'Comment' },
    ],
})