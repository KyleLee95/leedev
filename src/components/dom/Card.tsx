import Image from 'next/image'
import Link from 'next/link'
export const Card = (props) => {
  const { project } = props
  const { fields } = project
  const { image } = fields
  return (
    <div className='m-4'>
      <div className='p-4'>
        <Image
          className='rounded-md'
          alt={image.fields.description}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.width}
          src={`https:${image.fields.file.url}`}
        />
        <h3 className='text-base font-bold'>{fields.title}</h3>
        <p>{fields.description}</p>
        <Link className='text-base text-stone-400 underline hover:text-white' href={fields.url}>
          Github
        </Link>
      </div>
    </div>
  )
}
