import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'reactionObject',
    title: 'Reaction Object',
    type: 'object',
    fields: [
      defineField({
        name: 'reactions',
        title: 'Reactions',
        type: 'reactionArray',
        fieldset: 'reactionsSection',
      }),
    ],
      fieldsets: [
        {name: 'reactionsSection', title: 'Reactions Section',},
      ],
    preview: {
      select: {
        reactions: 'reactions',
      },
      prepare(selection) {
        const { reactions } = selection;
        const reactionCount = reactions?.length || 0;
        return {
          title: `Reactions Group (Total: ${reactionCount})`,
        };
      },
    },
  });
  