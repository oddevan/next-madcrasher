import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="container">
        {allPostsData.map(({ id, title, cover }) => (
          <div className="index-album">
            <img
              src={cover.sourceUrl}
              alt={`${title} album cover`}
              srcSet={cover.srcset}
              sizes={cover.sizes}
            />
            <Link href={`/${id}`}>
              <a><span>{title}</span></a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return { props: { allPostsData } };
}
