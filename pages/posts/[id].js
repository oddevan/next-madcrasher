import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXL}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<img
					src={postData.cover.sourceUrl}
					alt={`${postData.title} album cover`}
					loading="lazy"
					srcset={postData.cover.srcset}
					sizes={postData.cover.sizes}
				/>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

				<h3>Find {postData.title} on</h3>
				<ul>
					{ postData.links.map((link) => {
						return <li><a href={link.link}>{link.service}</a></li>
					})}
				</ul>
			</article>
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