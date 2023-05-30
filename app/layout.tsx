import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { Header } from '@/components/dom/Header'
export const metadata = {
  title: 'Kyle Lee | Homepage',
  description: `Kyle Lee's personal website.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-neutral-800 text-white antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}

        <Header />
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
