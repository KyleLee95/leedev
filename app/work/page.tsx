import { draftMode } from 'next/headers'
import { Card } from '@/components/dom/Card'
import { getProjects } from 'utils/contentful'

export const metadata = {
  title: 'Kyle Lee | Work',
  description: `Kyle Lee's personal website.`,
}

export default async function Page() {
  const projects = await getProjects({ preview: draftMode().isEnabled })
  const { items } = projects
  return (
    <main className='mx-auto mt-20 grid max-w-2xl sm:grid-cols-1 lg:grid-cols-2'>
      {items.map((project) => {
        const { fields } = project
        return <Card key={fields.id} project={project} />
      })}
    </main>
  )
}
