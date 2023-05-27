import { getBlogPosts } from 'utils/contentful'
import { Post } from './Post'
export default async function Page() {
  const posts = await getBlogPosts()
  return (
    <div className='grid grid-cols-1'>
      {posts.map((post) => {
        const { id } = post.fields
        return <Post key={id} post={post} />
      })}
    </div>
  )
}
