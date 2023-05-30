import { Card } from '@/components/dom/Card'
import { getProjects } from 'utils/contentful'
export default async function Page() {
  const projects = await getProjects()
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
