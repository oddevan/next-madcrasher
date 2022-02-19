import Head from 'next/head'
import Layout from '../components/layout'
import { getAllPostIds, getPostData } from '../lib/posts'

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<h1 className="fullbleed">{postData.title}</h1>
			<div className="container">
				<img
					src={postData.cover.sourceUrl}
					alt={`${postData.title} album cover`}
					loading="lazy"
					srcSet={postData.cover.srcset}
					sizes={postData.cover.sizes}
					className="responsive"
				/>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

				<h3>Find {postData.title} on</h3>
				<ul>
					{ postData.links.map((link) => {
						return <li><a href={link.link}>{link.service}</a></li>
					})}
				</ul>
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = await getAllPostIds()
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id)
	return { props: { postData } }
}