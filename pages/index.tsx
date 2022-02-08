import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";
import Link from "next/link";

const index = ({ posts }: { posts: any }) => {
  console.log(posts);

  return (
    <div className="space-y-16">
      {posts.map(
        (
          d: {
            name: string;
            data: {
              content: string;
              data: any;
              excerpt: string;
              isEmpty: boolean;
              orig: any;
            };
          },
          i: number
        ) => {
          return (
            <div key={`post-${i}`} className="cursor-pointer space-y-2">
              <Link href={`/post/${d.name}`} passHref>
                <div className="flex">
                  <h2 className="font-bold flex-grow text-lg">
                    {d.data?.data?.title}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {d.data?.data?.date?.substr(0, 10)}
                  </div>
                </div>
              </Link>
              <div className="flex space-x-2">
                {d.data?.data?.category
                  .split(",")
                  .map((d: string, i: number) => {
                    return (
                      <div
                        key={`post-${i}-category-${i}`}
                        className="bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-lg"
                      >
                        # {d}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("http://localhost:3000/api/posts");

  const posts = response.data;

  return {
    props: {
      posts: posts.data,
    },
  };
};

export default index;
