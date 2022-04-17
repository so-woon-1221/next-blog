import axios from "axios";
import { GetStaticProps } from "next";
import React from "react";
import Link from "next/link";

const development = process.env.NODE_ENV !== "production";

const index = ({ posts }: { posts: any }) => {
  console.log(posts);

  return (
    <div className="divide-y">
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
            <Link href={`/post/${d.name}`} passHref key={`post-${i}`}>
              <div className="cursor-pointer space-y-2 px-4 py-8 rounded">
                <div className="flex">
                  <h2 className="font-bold flex-grow text-xl">
                    {d.data?.data?.title}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {d.data?.data?.date?.substr(0, 10)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {d.data?.data?.category
                    .split(",")
                    .map((d: string, i: number) => {
                      return (
                        <Link
                          href={`/tag/${d.trim()}`}
                          passHref
                          key={`post-${i}-category-${i}`}
                        >
                          <div className="bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700">
                            # {d.trim()}
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get(
    `${
      development
        ? "http://localhost:8080"
        : "https://next-blog-back-so-woon-1221.vercel.app"
    }/posts`
  );

  const posts = response.data;

  return {
    props: {
      posts: posts.data,
    },
  };
};

export default index;
