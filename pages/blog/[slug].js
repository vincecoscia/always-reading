import { client } from "../../utils/client";

export default function BlogPost( props ) {
  console.log(props)
  return (
    <div>{props.title}</div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const blogSlug = pageContext.query.slug;
  
  if (!blogSlug) {
    return {
      notFound: true,
    }
  }

  const query = encodeURIComponent(`*[ _type == "post" && slug.current == "${blogSlug}"]`);
  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/qa?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      title: result.result[0].title,
      mainImage: result.result[0].mainImage,
      body: result.result[0].body,
    },
  };
}