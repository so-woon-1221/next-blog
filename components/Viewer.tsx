import React from "react";
import { Viewer as MarkdownViewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
// import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

interface Props {
  content: string;
}

const Viewer: React.FC<Props> = ({ content }) => {
  return <MarkdownViewer initialValue={content} />;
};

export default Viewer;
