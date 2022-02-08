import React from "react";
import axios from "axios";

const Tag: React.FC = ({ data }: any) => {
  console.log(data);

  return <div></div>;
};

export const getStaticProps = async () => {
  const response = await axios.get(encodeURI(`http://localhost:3000/api/tags`));

  const posts = response.data;
  return { props: { data: posts.data } };
};

export default Tag;
