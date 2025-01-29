import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `person`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "profile" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Profiles'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}