import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const apollo = new ApolloClient({
  uri: 'https://madcrasher.smolblog.com/graphql/',
  cache: new InMemoryCache()
});

export async function getSortedPostsData() {
  const { data } = await apollo.query({
    query: gql`
      query albumList {
        albums {
          nodes {
            slug
            title
            date
            featuredImage {
              node {
                srcSet(size: LARGE)
                sourceUrl(size: LARGE)
                sizes(size: LARGE)
              }
            }
          }
        }
      }
    `
  });

  return data.albums.nodes.map(post => {
    return {
      id: post.slug,
      date: post.date,
      title: post.title,
      cover: post.featuredImage.node,
    }
  })
}

export async function getAllPostIds() {
  const { data } = await apollo.query({
    query: gql`
      query albumSlugs {
        albums {
          nodes {
            slug
          }
        }
      }
    `
  });

  return data.albums.nodes.map(album => {
    return {
      params: {
        id: album.slug
      }
    }
  })
}

export async function getPostData(id) {
  const { data } = await apollo.query({
    query: gql`
      query albumInfo {
        albumBy(slug: "${id}") {
          content(format: RENDERED)
          date
          featuredImage {
            node {
              srcSet(size: LARGE)
              sourceUrl(size: LARGE)
              sizes(size: LARGE)
            }
          }
          title(format: RENDERED)
          externalLinks
        }
      }
    `
  });

  return {
    id: id,
    contentHtml: data.albumBy.content,
    date: data.albumBy.date,
    title: data.albumBy.title,
    cover: data.albumBy.featuredImage.node,
    links: JSON.parse(data.albumBy.externalLinks),
  }
}
