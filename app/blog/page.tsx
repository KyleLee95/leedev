import { draftMode } from 'next/headers'
import { getBlogPosts } from 'utils/contentful'
import { PostLineItem } from './PostLineItem'

const TitleH1 = ({ children }) => {
  return <h1 className='text-4xl font-bold'>{children}</h1>
}
export default async function Page() {
  const posts = await getBlogPosts({ preview: draftMode().isEnabled })
  return (
    <div className='mx-auto mt-20 max-w-2xl px-4'>
      <TitleH1>Blog</TitleH1>
      <ul>
        {posts.map((post) => {
          const { id } = post.fields
          return <PostLineItem key={id} post={post} />
        })}
      </ul>
    </div>
  )
}
