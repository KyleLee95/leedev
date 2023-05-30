import { Card } from '@/components/dom/Card'
import { getProjects } from 'utils/contentful'
export default async function Page() {
  const projects = await getProjects()
  const { items } = projects
  return (
    <main className='grid lg:grid-cols-2 sm:grid-cols-1 mx-auto mt-20 max-w-2xl'>
      {items.map((project) => {
        const { fields } = project
        return <Card key={fields.id} project={project} />
      })}
    </main>
  )
}
