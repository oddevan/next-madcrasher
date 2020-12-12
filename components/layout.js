import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'madcrasher'

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <meta name="description" content="Synthpop musical artist in South Carolina" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </Head>
      <div className="container">
        <header>
          {home ? (
            <h1><img src="/img/mclogo.gif" alt="madcrasher" /></h1>
          ) : (
            <Link href="/">
              <a>
                <img src="/img/mclogo.gif" alt="madcrasher" />
              </a>
            </Link>
          )}
        </header>
      </div>
      {children}
      <div className="container">
        <footer>
          <h2>Find madcrasher on</h2>
          <div className="centerblock">
            <ul>
              <li><a href="https://twitter.com/madcrasher"><img src="/img/twitter.svg" alt="Twitter" /></a></li>
              <li><a href="https://www.youtube.com/madcrasher"><img src="/img/youtube.svg" alt="YouTube" /></a></li>
              <li><a href="https://www.facebook.com/madcrasher"><img src="/img/facebook.svg" alt="Facebook" /></a></li>
              <li><a href="https://madcrasher.tumblr.com/"><img src="/img/tumblr.svg" alt="Tumblr" /></a></li>
              <li><a href="https://music.madcrasher.com/"><img src="/img/bandcamp.svg" alt="Bandcamp" /></a></li>
              <li><a href="https://play.spotify.com/artist/7HYyHQv7wvfByF2692MujM"><img src="/img/spotify.svg" alt="Spotify" /></a></li>
              <li><a href="https://itunes.apple.com/us/artist/madcrasher/id302831428"><img src="/img/apple.svg" alt="iTunes/Apple Music" /></a></li>
            </ul>
          </div>
          
          <form action="https://gumroad.com/follow_from_embed_form" className="form gumroad-follow-form-embed" method="post">
            <input name="seller_id" type="hidden" value="7262063972674" />
            <input name="email" placeholder="Your email address" type="email" />
            <button data-custom-highlight-color="" type="submit">Subscribe</button>
          </form>
          
          <p>madcrasher is a project by <a rel="me" href="https://www.oddevan.com/">Evan Hildreth</a> who thanks you for listening.</p>
        </footer>
      </div>
    </>
  )
}