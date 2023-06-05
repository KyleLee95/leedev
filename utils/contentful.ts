import { createClient } from 'contentful'
const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_ACCESS_TOKEN } = process.env
const host = 'preview.contentful.com'

interface FetchBlogPostsOptions {
  preview: boolean
}

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
})

const previewClient = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: host,
})
const contentfulClient = ({ preview = false }) => {
  if (preview) {
    return previewClient
  }

  return client
}

// Retrieve the list of blog posts from Contentful
export const getBlogPosts = async ({ preview }: FetchBlogPostsOptions) => {
  const contentful = contentfulClient({ preview })
  const response = await contentful.getEntries({
    content_type: 'blogPost',
  })

  return response.items
}

export const getBlogPostBySlug = async ({ preview }: FetchBlogPostsOptions, slug: string) => {
  const contentful = contentfulClient({ preview })
  const res = await contentful.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2,
  })
  return res
}

export const getProjects = async ({ preview }: FetchBlogPostsOptions) => {
  const contentful = contentfulClient({ preview })
  const res = await contentful.getEntries({
    content_type: 'project',
    include: 2,
  })
  return res
}

export const getMainContent = async ({ preview }: FetchBlogPostsOptions) => {
  const contentful = contentfulClient({ preview })
  const res = await contentful.getEntry('7bvo3CTPVJROpCEcp3v5VV')
  return res
}
