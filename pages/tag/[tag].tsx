import { axios } from "@lib/axios";
import React from "react";
import PostBlock from "../../components/PostBlock";

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
  const response = await axios.get("/api/tags");
  const tags = response.data;

  const paths = tags.data.map((d: any) => ({
    params: {
      tag: d.category,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const response = await axios.get(encodeURI(`/api/tag?tag=${params.tag}`));

  const posts = response.data;
  return { props: { data: posts } };
};

export default Tag;