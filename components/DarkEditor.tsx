import React from "react";
import { Editor as MarkdownEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import Prism from "prismjs";
import "prismjs/themes/prism-funky.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import _ from "lodash";
import axios from "axios";

interface Props {
  setMarkdown: any;
  markdown: string;
  editorRef: any;
  title: string;
}

const DarkEditor: React.FC<Props> = ({
  setMarkdown,
  markdown,
  editorRef,
  title,
}) => {
  return (
    <div className="w-full h-full space-y-4">
      <MarkdownEditor
        previewStyle="vertical"
        theme="dark"
        height="70vh"
        initialValue={markdown}
        ref={editorRef}
        onChange={_.debounce(() => {
          const editor = editorRef.current.getInstance();
          setMarkdown(editor.getMarkdown());
        }, 500)}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <button
        className="dark:bg-zinc-900 px-4 py-2 rounded float-right"
        onClick={async () => {
          const editor = editorRef.current.getInstance();
          const post = editor.getMarkdown();

          if (title !== "" && post !== "") {
            const response = await axios.post("/api/write", { title, post });
            window.alert(response.data);
          } else {
            window.alert("제목과 내용을 입력하세요");
          }
        }}
      >
        작성
      </button>
    </div>
  );
};

export default DarkEditor;
