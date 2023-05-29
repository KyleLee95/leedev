import { getBlogPosts } from 'utils/contentful'
import { PostLineItem } from './PostLineItem'
export default async function Page() {
  const posts = await getBlogPosts()
  return (
    <div className=' mx-auto max-w-2xl px-4'>
      {posts.map((post) => {
        const { id } = post.fields
        return <PostLineItem key={id} post={post} />
      })}
    </div>
  )
}
