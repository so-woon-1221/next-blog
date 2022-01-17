import React from "react";
import { Editor as MarkdownEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const Editor = () => {
  return (
    <div className="w-full h-full">
      <MarkdownEditor previewStyle="vertical" />
    </div>
  );
};

export default Editor;
