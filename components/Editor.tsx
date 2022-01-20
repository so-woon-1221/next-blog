import React from "react";
import { Editor as MarkdownEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
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

const Editor: React.FC<Props> = ({
  setMarkdown,
  markdown,
  editorRef,
  title,
}) => {
  const sendImage = async (img: Blob | File) => {
    const formData = new FormData();
    formData.append("image", img);
    const result = await axios.post("/api/image", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });

    return result.data;
  };
  
  return (
    <div className="w-full h-full space-y-4">
      <MarkdownEditor
        previewStyle="vertical"
        theme="light"
        height="70vh"
        initialValue={markdown}
        ref={editorRef}
        onChange={_.debounce(() => {
          const editor = editorRef.current.getInstance();
          setMarkdown(editor.getMarkdown());
        }, 500)}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            if (blob.size > 5 * 1024 * 1024) {
              alert("용량 초과");
            } else {
              const upload = await sendImage(blob);

              callback(upload.data, "alt text");
            }
            return false;
          },
        }}
      />
      <button
        className="bg-zinc-200 px-4 py-2 rounded float-right"
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

export default Editor;
