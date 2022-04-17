import axios from "axios";
import React from "react";
import Head from "next/head";
import { marked } from "marked";

const development = process.env.NODE_ENV !== "production";

const Title = ({ params, data }: any) => {
  // 그 h 태그 따라서 가는 거 만들어야함
  // 클릭 네비게이터
  return (
    <div className="prose prose-slate px-4">
      <Head>
        <title>{params.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: marked(data.content) }}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const response = await axios.get(
    `${
      development ? "http://localhost:8080" : "https://sowoon-back.vercel.app"
    }/posts`
  );
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
    encodeURI(
      `${
        development ? "http://localhost:8080" : "https://sowoon-back.vercel.app"
      }/post?title=${params.title}`
    )
  );

  const post = response.data;
  return { props: { params, data: post.data } };
};

export default Title;
