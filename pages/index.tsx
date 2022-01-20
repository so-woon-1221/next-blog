import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";

const index = ({ posts }: { posts: any }) => {
  console.log(posts);

  return <div className="font-bold">teset</div>;
};
export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("http://localhost:3000/api/posts");

  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
};

export default index;
