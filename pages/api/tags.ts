import matter from "gray-matter";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { rollups } from "d3";

const getTagPost = (req: NextApiRequest, res: NextApiResponse) => {
  const fileList = fs.readdirSync("posts");

  let posts = [];

  for (let file of fileList) {
    posts.push({
      name: file.split(".")[0],
      data: matter(fs.readFileSync(`posts/${file}`)),
    });
  }

  posts = posts.map((d) => {
    return {
      ...d,
      data: { ...d.data.data, category: d.data.data.category.split(",") },

      // data: d.data.data.category.split(","),
    };
  });

  posts = posts.map((d) => {
    return { category: d.data.category, data: d };
  });

  const returnData: { category: string; data: any }[] = [];

  posts.forEach((d) => {
    d.category.forEach((a: string) => {
      returnData.push({ category: a.trim(), data: d.data });
    });
  });

  return res.json({
    data: rollups(
      returnData,
      (g) => g,
      (d) => d.category
    ).map((d) => {
      return { category: d[0], data: d[1] };
    }),
  });
};

export default getTagPost;
