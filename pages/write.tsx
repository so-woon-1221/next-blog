import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/Editor"));

const write: React.FC = () => {
  const isSSR = typeof window === "undefined";
  return (
    <div className="w-full h-full">
      <h1>글쓰기</h1>
      {!isSSR && (
        <React.Suspense fallback={() => <div>a</div>}>
          <Editor />
        </React.Suspense>
      )}
    </div>
  );
};

export default write;
