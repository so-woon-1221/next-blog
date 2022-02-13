import fs from "fs";
import { join } from "path";
// import matter from "gray-matter";

const writePost = (req, res) => {
  const { title, post } = req.body;
  const path = join(process.cwd(), "posts");
  const file = fs.writeFileSync(
    join(__dirname, "posts", `${title.replace(/ /g, "")}.md`),
    post
  );

  return res.json("저장완료");
};

export default writePost;
