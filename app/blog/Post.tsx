import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

const Bold = ({ children }) => <span className='font-bold'>{children}</span>

const Text = ({ children }) => <p className='content-center'>{children}</p>

const HyperLink = ({ children, node }) => (
  <a className='text-blue-300 hover:underline' href={node.data.uri}>
    {children}
  </a>
)

const CodeBlock = ({ children }) => {
  return <code className='my-4 bg-slate-600 p-1'>{children}</code>
}
const Title = ({ children }) => {
  return <h1 className='text-3xl font-bold'>{children}</h1>
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.CODE]: (text) => <CodeBlock>{text}</CodeBlock>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <Title>{children}</Title>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => {
      return <HyperLink node={node}>{children}</HyperLink>
    },
  },
}

export const Post = (props) => {
  const { id, title, body } = props.post.fields
  const dtrc = documentToReactComponents(body, options)
  return <main className='justify-self-center'>{dtrc}</main>
}
