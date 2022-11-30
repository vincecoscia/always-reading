import Head from 'next/head'
import Image from 'next/image'
import { client } from '../utils/client'

import Navbar from '../components/Navbar'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      HOME
    </div>
  )
}

export async function getStaticProps() {
  const res = await client.fetch(`*[_type == "post"]{title, slug, mainImage, excerpt}`);
  return {
    props: {
      posts: res,
    },
  };
}