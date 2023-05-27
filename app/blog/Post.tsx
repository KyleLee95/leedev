import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

const Bold = ({ children }) => <span className='font-bold'>{children}</span>

const Text = ({ children }) => <p className='content-center'>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

export const Post = (props) => {
  const { id, title, body } = props.post.fields
  const dtrc = documentToReactComponents(body, options)
  return (
    <main className='justify-self-center'>
      {title}
      {dtrc}
    </main>
  )
}
