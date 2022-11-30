import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>#AlwaysReading</title>
        <meta name="description" content="A blog explaining how to be always reading" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar/>
        
      </main>

      <footer>
      </footer>
    </div>
  )
}
