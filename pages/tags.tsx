import React from "react";
import axios from "axios";

interface Props {
  data: { category: string; data: any[] }[];
}

const Tag: React.FC<Props> = ({ data }) => {
  console.log(data);

  return (
    <div className="w-full h-full space-y-16">
      {data.map((d, i) => {
        return (
          <div key={`tag-${i}`} className="space-y-4">
            <h2 className="text-xl font-bold"># {d.category}</h2>
            <div className="space-y-2">
              {d.data.map((a, j) => {
                return <div key={`tag-${d.category}-${j}`}>{a.data.name}</div>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await axios.get(encodeURI(`http://localhost:3000/api/tags`));

  const posts = response.data;
  return { props: { data: posts.data } };
};

export default Tag;
