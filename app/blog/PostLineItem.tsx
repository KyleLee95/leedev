import Link from 'next/link'

export const PostLineItem = (props) => {
  const { date, title, slug } = props.post.fields
  return (
    <li className='mt-2'>
      <Link className='text-lg underline hover:no-underline' href={`/blog/${slug}`}>
        {title}
      </Link>
      <p className='mt-1 text-sm text-stone-400'> {date}</p>
    </li>
  )
}
