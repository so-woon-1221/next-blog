import axios from "axios";
import React from "react";
import PostBlock from "../../components/PostBlock";

const development = process.env.NODE_ENV !== "production";

const Tag: React.FC = ({ data }: any) => {
  console.log(data);

  return (
    <div className="w-full py-8">
      <h1 className="text-2xl font-bold cursor-default px-4"># {data.tag}</h1>
      <div className="divide-y">
        {data.posts.map((d: any, i: number) => {
          return <PostBlock data={d.data} key={`${data.tag}-post-${i}`} />;
          //   return <div key={`${data.tag}-post-${i}`}>a</div>;
        })}
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const response = await axios.get(
    `${
      development ? "http://localhost:3000" : "https://sowoon-1221.vercel.app"
    }/api/tags`
  );
  const tags = response.data;

  const paths = tags.data.map((d: any) => ({
    params: {
      tag: d.category,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const response = await axios.get(
    encodeURI(
      `${
        development ? "http://localhost:3000" : "https://sowoon-1221.vercel.app"
      }/api/tag?tag=${params.tag}`
    )
  );

  const posts = response.data;
  return { props: { data: posts } };
};

export default Tag;
