import { draftMode } from 'next/headers'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { getMainContent } from 'utils/contentful'
import Image from 'next/image'
import Link from 'next/link'
const Bold = ({ children }) => <span className='mr-4 font-bold'>{children}</span>
const Text = ({ children }) => <p className='my-3 max-w-prose content-center text-lg '>{children}</p>

const HyperLink = ({ children, node }) => (
  <a className='text-blue-300 hover:underline' href={node.data.uri}>
    {children}
  </a>
)

const CodeBlock = ({ children }) => {
  return <code className='my-4 bg-slate-600 p-1'>{children}</code>
}
const TitleH1 = ({ children }) => {
  return <h1 className='my-1 text-3xl font-bold'>{children}</h1>
}

const TitleH2 = ({ children }) => {
  return <h2 className='my-1 border-b text-2xl'>{children}</h2>
}

const TitleH3 = ({ children }) => {
  return <h3 className='my-2 mr-4 text-base text-stone-400'>{children}</h3>
}

const AssetBlock = ({ node }) => {
  return (
    <Image
      src={`https:${node.data.target.fields.file.url}`}
      height={node.data.target.fields.file.details.image.height}
      width={node.data.target.fields.file.details.image.width}
      alt={node.data.target.fields.description}
    />
  )
}

const EntryBlock = ({ children, node }) => {
  const { title, file, link } = node.data.target.fields
  return (
    <button className='my-4 block rounded bg-sky-300/90'>
      <Link className='px-2 text-black' target='_blank' href={link}>
        <Image
          className='inline px-1'
          src={`https:${file.fields.file.url}`}
          width={25}
          height={25}
          alt={node.data.target.fields.title}
        />

        {node.data.target.fields.title}
      </Link>
    </button>
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
    [BLOCKS.HEADING_3]: (node, children) => <TitleH3>{children}</TitleH3>,
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => <AssetBlock node={node} />,
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => <EntryBlock node={node}>{children}</EntryBlock>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [INLINES.HYPERLINK]: (node, children) => {
      return <HyperLink node={node}>{children}</HyperLink>
    },
  },
}

export default async function Page() {
  const content = await getMainContent({ preview: draftMode().isEnabled })
  const { fields } = content
  //@ts-ignore
  const dtrc = documentToReactComponents(fields.text, options)
  return (
    <main className='mx-auto mt-20 grid max-w-2xl grid-cols-1 px-4'>
      <div className='content-center'>
        <article>{dtrc}</article>
      </div>
    </main>
  )
}
