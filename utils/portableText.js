/* eslint-disable @next/next/no-img-element */
import { urlFor } from "../lib/sanity";

export const PortableTextComponents = {
  types: {
    h1: ({value}) => <h1 className="text-3xl font-bold">{value.text}</h1>,
    h2: ({value}) => <h2 className="text-2xl font-bold">{value.text}</h2>,
    h3: ({value}) => <h3 className="text-xl font-bold">{value.text}</h3>,
    h4: ({value}) => <h4 className="text-lg font-bold">{value.text}</h4>,
    h5: ({value}) => <h5 className="text-base font-bold">{value.text}</h5>,
    h6: ({value}) => <h6 className="text-sm font-bold">{value.text}</h6>,
    blockquote: ({value}) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic">
        {value.text}
      </blockquote>
    ),
    image: ({value}) => (
      <img
        src=
        {urlFor(value.imageUrl).url()}
        alt={value.node.alt}
        className="w-full"
      />
    ),
    link: ({value}) => (
      <a
        href={{value}.mark.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {value.text}
      </a>
    ),
  },
};