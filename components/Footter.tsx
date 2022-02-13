import React from "react";
import { AiOutlineInstagram, AiOutlineGithub } from "react-icons/ai";

const Footter: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center border-t py-4 cursor-default flex-col dark:border-zinc-800">
      <div className="flex">
        <a href="https://www.instagram.com/sowoon_1221/?hl=ko" target="blank">
          <AiOutlineInstagram className="mx-2" />
        </a>
        <a href="https://github.com/so-woon-1221" target="blank">
          <AiOutlineGithub />
        </a>
      </div>
      <div>
        <span>@ sowoon</span>
      </div>
    </div>
  );
};

export default Footter;
