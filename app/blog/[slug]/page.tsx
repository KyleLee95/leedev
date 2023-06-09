import Image from 'next/image'
import { draftMode } from 'next/headers'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { getBlogPostBySlug } from 'utils/contentful'
const Bold = ({ children }) => <span className='font-bold'>{children}</span>
const Text = ({ children }) => <p className='my-3 max-w-prose content-center text-lg '>{children}</p>

export let metadata = {
  title: 'Kyle Lee | ',
  description: `Kyle Lee's personal website.`,
}
const HyperLink = ({ children, node }) => (
  <a className='text-blue-300 hover:underline' href={node.data.uri}>
    {children}
  </a>
)

const CodeBlock = ({ children }) => {
  return <code className='my-4 bg-slate-600 p-1'>{children}</code>
}
const TitleH1 = ({ children }) => {
  return <h1 className='m-1 text-3xl font-bold'>{children}</h1>
}

const TitleH2 = ({ children }) => {
  return <h2 className='m-1 text-base text-stone-400'>{children}</h2>
}

const AssetBlock = ({ children, node }) => {
  return (
    <Image
      src={`https:${node.data.target.fields.file.url}`}
      height={node.data.target.fields.file.details.image.height}
      width={node.data.target.fields.file.details.image.width}
      alt={node.data.target.fields.description}
    />
  )
}
const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
    [MARKS.CODE]: (text) => <CodeBlock>{text}</CodeBlock>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <TitleH1>{children}</TitleH1>,
    [BLOCKS.HEADING_2]: (node, children) => <TitleH2>{children}</TitleH2>,
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => <AssetBlock node={node}>{children}</AssetBlock>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => {
      return <HyperLink node={node}>{children}</HyperLink>
    },
  },
}

export default async function Page({ params }) {
  const { slug } = params
  //use the slug to fetch the post
  metadata.title = `Kyle Lee | ${slug}`
  const post = await getBlogPostBySlug({ preview: draftMode().isEnabled }, slug)
  //destructuring the body off the post
  const { items } = post
  const { body } = items[0].fields
  //@ts-ignore
  const dtrc = documentToReactComponents(body, options)
  return (
    <main className='mx-auto max-w-2xl px-4 pt-20'>
      <article>{dtrc}</article>
    </main>
  )
}
