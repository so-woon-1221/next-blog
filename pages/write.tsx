import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

const write: React.FC = () => {
  return (
    <div className="w-full h-full">
      <h1>글쓰기</h1>

      <Editor />y
    </div>
  );
};

export default write;
