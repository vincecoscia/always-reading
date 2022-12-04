import Head from "next/head";
import Image from "next/image";
import groq from "groq";
import { getClient } from "../lib/sanity.server";

import Card from "../components/Card";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="mx-4 lg:mx-48 mt-10">
      <div className="flex justify-center items-center flex-col lg:flex-row mb-10">
        <div className="lg:mb-24 mb-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-center lg:text-left">
            Your journey to Always Reading begins here!
          </h1>
        </div>
        <div className="video-div">
          <iframe
            src="https://streamable.com/e/2rote6?loop=0"
            frameBorder="0"
            width="100%"
            height="100%"
            allowFullScreen
            className="video"
          ></iframe>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="mb-8">
        <h3 className="font-semibold text-xl">
          Latest Posts
        </h3>
      </div>
      <div className="grid lg:grid-cols-3 gap-5 justify-items-center mb-24">
        {/* limit posts to most recent 3 */}
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}>
            <Card post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const posts = await // Get most recent 3 posts
  getClient(preview)
    .fetch(groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    author -> {
      name,
      avatar,
      "authorImage": image.asset->url
    },
    "categories": categories[]->{id, title},
    mainImage,
    body,
    publishedAt,
  }`);
  return {
    props: {
      posts,
    },
  };
}
