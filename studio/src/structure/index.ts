import { CogIcon } from '@sanity/icons'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Only include the People, Posts, Pages, Thought Threads, and Settings tabs
      ...S.documentTypeListItems()
        .filter(
          (listItem: any) =>
            !DISABLED_TYPES.includes(listItem.getId()) &&
            ['people', 'post', 'page', 'thoughtThread'].includes(listItem.getId())  // Filter specific types
        )
        .map((listItem) => listItem.title(pluralize(listItem.getTitle() as string))),


      // Site Settings Singleton to manage global settings
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
