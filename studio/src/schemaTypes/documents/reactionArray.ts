import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'reactionArray',
    title: 'Reaction Array',
    type: 'object',
    fields: [
      defineField({
        name: 'reactions',
        title: 'Reactions',
        type: 'array',
        of: [{ type: 'reaction' }],
        fieldset: 'reactionsSection',
      }),
    ],
    fieldsets: [
      {name: 'reactionsSection', title: 'Reactions',},
      {name: 'noteableSection', title: 'Noteable',},
    ],
    preview: {
      select: {
        reactions: 'reactions',
        noteable: 'noteable',
      },
      prepare(selection) {
        const { reactions, noteable } = selection;
        return {
          title: `Reactions (${reactions?.length || 0})`,
          subtitle: noteable ? 'Noteable' : 'Not Noteable',
        };
      },
    },
  });
  