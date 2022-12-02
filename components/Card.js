/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import { urlFor } from "../lib/sanity";

export default function Card({ post }) {
  return (
    <div className="bg-white rounded overflow-hidden">
      <img
        src={urlFor(post.mainImage).auto("format").width(500).url()}
        width="100%"
        alt={post.title + " image"}
      />
      <div className="mx-5 py-5">
        <h3 className="text-lg font-bold mb-3">{post.title}</h3>
        <hr />
        <div className="flex justify-between items-center mt-3">
          <div className="flex justify-content-center items-center">
            <img
              src={urlFor(post.author.authorImage).auto("format").width(500).height(500).url()}
              className="rounded-full w-8 h-8 mr-2"
              alt={post.author.name + " image"}
            />
            <p>{post.author.name}</p>
          </div>
          <p className="text-xs">
            {moment(new Date(post.publishedAt)).format("M/D/YY")}
          </p>
        </div>
      </div>
    </div>
  );
}
