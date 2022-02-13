import Link from "next/link";
import React from "react";

interface Props {
  data: any;
}

const PostBlock: React.FC<Props> = ({ data }) => {
  return (
    <Link href={`/post/${data.name}`} passHref>
      <div className="cursor-pointer space-y-2 py-8 rounded px-4">
        <div className="flex">
          <h2 className="font-bold flex-grow text-xl">{data?.data?.title}</h2>
          <div className="text-sm text-gray-500">
            {data?.data?.date?.substr(0, 10)}
          </div>
        </div>

        <div className="flex space-x-2">
          {data?.data?.category.map((d: string, i: number) => {
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
};

export default PostBlock;
