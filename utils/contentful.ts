import { createClient } from 'contentful'
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env
const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
})

// Retrieve the list of blog posts from Contentful
export const getBlogPosts = async () => {
  const response = await client.getEntries({
    content_type: 'blogPost',
  })

  return response.items
}

export const getBlogPostBySlug = async (slug: string) => {
  const res = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2,
  })
  return res
}
