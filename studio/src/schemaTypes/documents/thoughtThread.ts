// thoughtThread.js (Sanity schema for the thought thread)
export default {
    name: 'thoughtThread',
    title: 'Thought Thread',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Thread Title',
        type: 'string',
        description: 'A title for the entire thread (optional)',
      },
      {
        name: 'thoughts',
        title: 'Thoughts',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'thought' }] }],
        description: 'A chronological collection of thoughts',
        options: {
          // Sort the thoughts chronologically by date (optional)
          // This may require a custom sorting function if you want more control over it
          // You can also use a plugin to handle custom sorting for this field
        }
      },
    ],
  };
  