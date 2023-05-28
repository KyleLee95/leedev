import { getBlogPosts } from 'utils/contentful'
import { PostLineItem } from './PostLineItem'
export default async function Page() {
  const posts = await getBlogPosts()
  return (
    <div className='grid grid-cols-1'>
      {posts.map((post) => {
        const { id } = post.fields
        return <PostLineItem key={id} post={post} />
      })}
    </div>
  )
}
