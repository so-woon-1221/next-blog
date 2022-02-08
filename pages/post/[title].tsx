import axios from "axios";
import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const Viewer = dynamic(() => import("../../components/Viewer"), { ssr: false });

const Title = ({ params, data }: any) => {
  return (
    <div className="prose">
      <Head>
        <title>{params.title}</title>
      </Head>
      <Viewer content={data.content} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const response = await axios.get("http://localhost:3000/api/posts");
  const posts = response.data;

  const paths = posts.data.map((d: any) => ({
    params: {
      title: d.name,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const response = await axios.get(
    encodeURI(`http://localhost:3000/api/post?title=${params.title}`)
  );

  const post = response.data;
  return { props: { params, data: post.data } };
};

export default Title;
