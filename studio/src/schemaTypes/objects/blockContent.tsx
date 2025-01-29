import { defineType, defineField } from 'sanity';
import { LinkIcon } from '@sanity/icons';
/* import WithBlockSelector from '../components/WithBlockSelector'; // Correct import path */

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
   /*    components: {
        input: WithBlockSelector // Pass the component function here, not an invocation
            type: 'portable-text',
            blockPreviews: [
                {
                    title: 'Content',
                    blocks: {
                        accordion: {
                            description: ''.
                            imageURL: '',
                        }
                    }
                }
            ],
            showOther: true,
            excludedBlocks: ['extendedBlock'],
            text: {
                addItem: 'Legg til blokk',
            },
            replaceQueries: [
                {
                    level: 'field',
                    query: '[data-testid="insert-menu-auto-collapse-menu"] [data-testid="insert-menu-button"]',
                },
                {
                    level: 'document',
                    query: 'div[data-testid="document-panel-portal"] #menu-button[data-testid="insert-menu-button"]',
                },
            ]
        })
    }
      */
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => 'H',
          },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Link internal page',
            icon: LinkIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'page' }],
              },
            ],
          },
        ],
      },
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Blockquote', value: 'blockquote' },
      ],
    },
    {
      type: 'image1', // Ensure the 'image1' schema type exists elsewhere
    },
    defineField({
      name: 'authorReference',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
  ],
});
