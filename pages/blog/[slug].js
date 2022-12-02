/* eslint-disable @next/next/no-img-element */
import { client } from "../../utils/client";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { getClient } from "../../lib/sanity.server";
import { urlFor } from "../../lib/sanity";
import moment from "moment";

import Link from "next/link";
import Card from "../../components/Card";

export default function BlogPost({ post, relatedPosts }) {
  console.log(post.author);
  return (
    <div className="mx-4 lg:mx-48 mt-10">
      <div className="justify-items-center rounded-lg">
        <img
          src
          ={urlFor(post.mainImage).width(1000).height(200).fit("scale")}
          className="w-full lg:h-36 h-24"
          alt={post.title + " image"}
        />
        <div className="bg-white p-5 lg:p-24 rounded relative">
          <div className="absolute lg:top-24 lg:left-[-3rem] top-[-3rem] left-[-2rem] p-1 rounded-full bg-white shadow-xl">
            <div className="flex flex-col justify-center items-center bg-slate-600 py-3 lg:px-8 px-7 rounded-full">
              <p className="text-white font-bold uppercase lg:text-base text-xs">
                {moment(new Date(post.publishedAt)).format("MMM")}
              </p>
              <p className="text-white font-bold uppercase lg:text-3xl text-xl">
                {moment(new Date(post.publishedAt)).format("D")}
              </p>
              <p className="text-white font-bold uppercase lg:text-base text-xs">
                {" "}
                {moment(new Date(post.publishedAt)).format("YYYY")}
              </p>
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-center lg:text-left">
            {post.title}
          </h1>
          <div className="flex justify-center lg:justify-start mt-4">
            {post.categories.map((category) => (
              <button
                key={category.title}
                className="py-1 px-4 rounded-full bg-slate-400 text-white"
              >
                <p className="text-xs font-semibold">{category.title}</p>
              </button>
            ))}
          </div>
          <div className="blog mt-10">
            <PortableText value={post.body} />
          </div>
        </div>
      </div>
      <div className="mt-10 p-5 bg-white rounded text-center w-fit mx-auto">
        <div className="flex flex-col justify-center items-center">
          <img
            src={urlFor(post.author.authorImage)
              .width(200)
              .height(200)
              .url()}
            alt={post.author.name}
            className="rounded-full w-20 h-20"
          />
          <div>
            <p className="text-lg font-semibold mb-2">{post.author.name}</p>
            
          </div>
          <hr className='w-3/5'/>
          <div className="justify-center mt-2">
            <PortableText value={post.author.bio} />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="font-bold text-xl mb-2">Related Posts</h3>
        <hr />
        <div className="mt-5 grid lg:grid-cols-3 gap-5">
          {/* show related posts in a column */}
          {relatedPosts.map((post) => (
            <div key={post._id} className="mb-4">
              <Link href={`/blog/${post.slug.current}`}>
                <Card post={post} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  author -> {
      name,
      avatar,
      bio,
      "authorImage": image.asset->url,
      "focalPoint": image.asset->hotspot,
    },
  "categories": categories[]->{title},
  mainImage,
  body,
  publishedAt,
}`;

// Query that fetches other posts with the same category as the current post but not the current post
const relatedPostsQuery = groq`*[_type == "post" && slug.current != $slug]{
  _id,
  title,
  author -> {
    name,
    avatar,
    bio,
    "authorImage": image.asset->url
  },
  slug,
  mainImage,
  publishedAt,
}`;

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(query, { slug: params.slug });
  const relatedPosts = await getClient(preview).fetch(relatedPostsQuery, {
    slug: params.slug,
    categories: post.categories.map((category) => category._ref),
  });

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}

// export const getServerSideProps = async (pageContext) => {
//   const blogSlug = pageContext.query.slug;

//   if (!blogSlug) {
//     return {
//       notFound: true,
//     }
//   }

//   const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${blogSlug}"]`);
//   const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/qa?query=${query}`;
//   const result = await fetch(url).then((res) => res.json());

//   if (!result.result[0]) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       title: result.result[0].title,
//       mainImage: result.result[0].mainImage,
//       body: result.result[0].body,
//       author: result.result[0].author,
//     },
//   };
// }
