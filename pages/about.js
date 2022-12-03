/* eslint-disable @next/next/no-img-element */
import { PortableText } from "@portabletext/react";
import groq from "groq";
import { getClient } from "../lib/sanity.server";
import { urlFor } from "../lib/sanity";

export default function about({ author }) {
  return (
    <div className="mx-4 lg:mx-48 mt-10">
      <div className="grid lg:grid-cols-4 bg-white p-5 rounded">
        <div className='mb-8'>
          <img
            src={urlFor(author.image).width(500).height(500).url()}
            alt={author.name}
            className="rounded w-full h-full lg:w-60 lg:h-60"
          />
        </div>
        <div className='text-xl lg:col-span-3'>
          <h2 className='text-3xl font-bold mb-10 text-slate-900'>{author.name}</h2>
          <h4 className='font-semibold text-xl mb-3 text-slate-900'>Biography</h4>
          <hr className='mb-3'/>
          <PortableText value={author.bio}/>
        </div>
      </div>
    </div>
  );
}

// Get author data from Sanity
export async function getStaticProps({ preview = false }) {
  const author = await getClient(preview).fetch(groq`*[_type == "author"] {
    _id,
    name,
    image,
    bio,
  } [0]`);
  return {
    props: {
      author,
    },
  };
}
