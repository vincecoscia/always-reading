import Link from "next/link";
import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";
import Card from "../../components/Card";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function Blog({ posts }) {
  return (
    <div className="mx-4 lg:mx-48 mt-10 mb-24">
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
            <Masonry>
        {/* limit posts to most recent 3 */}
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`} className='m-2'>
            <Card post={post} />
          </Link>
        ))}
        </Masonry>
        </ResponsiveMasonry>
    </div>
  );
}

// Get all posts and paginate them 10 per page
export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview)
    .fetch(groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
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
