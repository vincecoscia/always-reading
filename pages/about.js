import { PortableText } from "@portabletext/react";
import groq from "groq";
import { getClient } from "../lib/sanity.server";

export default function about({author}) {
  console.log(author);
  return (
    <div className="mx-4 lg:mx-48 mt-10">

<PortableText value={author.bio} />

    </div>
  )
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