import { person } from './documents/person'
import { page } from './documents/page'
import { post } from './documents/post'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { settings } from './singletons/settings'
import { link } from './objects/link'
import { blockContent } from './objects/blockContent'
import thought from './documents/thought'
import thoughtThread from './documents/thoughtThread'
import profile from './documents/profile'
import postContent from './documents/postContent'
import comment from './documents/comment'
import reactionArray from './documents/reactionArray'
import reactionObject from './documents/reactionObject'
import reaction from './documents/reaction'

// Export an array of all the schema types
export const schemaTypes = [
  settings, // Singletons
  page, post, person, thought, thoughtThread, profile, postContent, comment, reaction, reactionArray, reactionObject, // Documents
  blockContent, infoSection, callToAction, link, // Objects
]
