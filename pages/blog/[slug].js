/* eslint-disable @next/next/no-img-element */
import { client } from "../../utils/client";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { getClient } from "../../lib/sanity.server";
import { urlFor } from "../../lib/sanity";
import moment from "moment";
import { PortableTextComponents } from "../../utils/portableText";

import Link from "next/link";
import Card from "../../components/Card";

export default function BlogPost({ post, relatedPosts }) {
  console.log(post.body[0].children);
  return (
    <div className="mx-4 lg:mx-48 mt-10">
      <div className="justify-items-center rounded-lg">
        <div className="bg-white p-5 rounded">
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
            <PortableText value={post.body} components={PortableTextComponents}/>
          </div>
          <div className="flex justify-center lg:justify-start">
            <img
              src={urlFor(post.author.authorImage).url()}
              alt={post.author.name}
              className="rounded-full w-10 h-10"
            />
            <p className="text-lg font-semibold ml-2">{post.author.name}</p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <p className="text-lg font-semibold ml-2">
              {moment(post.publishedAt).format("M/D/YY")}
            </p>
          </div>
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
      "authorImage": image.asset->url
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
