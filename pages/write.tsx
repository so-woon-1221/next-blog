import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { themeState } from "../atom/theme";
import Head from "next/head";

const DarkEditor = dynamic(() => import("../components/DarkEditor"), {
  ssr: false,
});
const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

const Write: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>(`\
---

title: '새로운 글'
category: 'test'
date: 2021-01-02

---
  `);
  const theme = useRecoilValue(themeState);
  const editorRef = useRef<any>(null);

  return (
    <div className="w-full h-full space-y-4">
      <Head>
        <title>글쓰기 - sowoon</title>
      </Head>
      <h1 className="text-lg font-bold">글쓰기</h1>
      <input
        placeholder="제목"
        className="text-lg w-full bg-transparent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {theme !== "dark" ? (
        <Editor
          setMarkdown={setMarkdown}
          markdown={markdown}
          editorRef={editorRef}
          title={title}
        />
      ) : (
        <DarkEditor
          setMarkdown={setMarkdown}
          markdown={markdown}
          editorRef={editorRef}
          title={title}
        />
      )}
    </div>
  );
};

export default Write;
