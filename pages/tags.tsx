import React from "react";
import axios from "axios";
import Link from "next/link";

const development = process.env.NODE_ENV !== "production";

interface Props {
  data: { category: string; data: any[] }[];
}

const Tag: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full divide-y">
      {data.map((d, i) => {
        return (
          <div key={`tag-${i}`} className="space-y-4 py-8 px-4">
            <h2 className="text-2xl font-bold cursor-default">
              # {d.category}
            </h2>
            <div className="space-y-3">
              {d.data
                .sort(
                  (a, b) =>
                    new Date(b.data.data.date).getDate() -
                    new Date(a.data.data.date).getDate()
                )
                .map((a, j) => {
                  return (
                    <Link
                      key={`tag-${d.category}-${j}`}
                      href={`/post/${a.data.name}`}
                      passHref
                    >
                      <div
                        key={`tag-${d.category}-${j}`}
                        className="flex cursor-pointer"
                      >
                        <span className="flex-grow">{a.data.name}</span>
                        <span>{a.data.data.date.substr(0, 10)}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await axios.get(
    encodeURI(
      `${
        development ? "http://localhost:8080" : "https://sowoon-back.vercel.app"
      }/tags`
    )
  );

  const posts = response.data;
  return { props: { data: posts.data } };
};

export default Tag;
