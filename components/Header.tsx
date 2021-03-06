import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { themeState } from "../atom/theme";

const Header: React.FC = () => {
  const [darkMode, setDarkmMode] = useState<boolean>(false);
  const [theme, setTheme] = useRecoilState(themeState);

  const changeDarkMode = () => {
    setDarkmMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [darkMode, setTheme]);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-300 to-indigo-300 flex items-center p-4 sticky top-0 z-10 flex-wrap space-y-2 md:space-y-0 dark:from-zinc-800 dark:to-zinc-800 shadow-lg">
      <div className="md:flex-grow flex flex-grow-0 w-full md:w-auto">
        <div className="flex-grow flex">
          <Link href="/" passHref>
            <h1 className="font-bold text-xl cursor-pointer">Sowoon</h1>
          </Link>
        </div>
        <div className="flex items-center cursor-pointer">
          {darkMode ? (
            <FaMoon className="text-xl mr-3" onClick={changeDarkMode} />
          ) : (
            <FaSun className="text-xl mr-3" onClick={changeDarkMode} />
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/tags" passHref>
          <span className="cursor-pointer">TAGS</span>
        </Link>
        <Link href="/info" passHref>
          <span className="cursor-pointer">INFO</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
