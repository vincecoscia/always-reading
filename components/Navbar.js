import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="lg:px-48 px-4 py-3 text-slate-900">
      <div className="container mx-auto grid grid-cols-3">
        <div className="">
          <Link href="/">
            <h1 className="font-bold text-xl uppercase ">#AlwaysReading</h1>
          </Link>
        </div>
        <div className="justify-self-center">
          <div className="hidden lg:block">
            <Link
              href="/"
              className={router.pathname == "/" ? "mr-5 font-semibold" : "mr-5"}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={
                router.pathname == "/blog" ? "mr-5 font-semibold" : "mr-5"
              }
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={router.pathname == "/about" ? "font-semibold" : ""}
            >
              About
            </Link>
          </div>
        </div>
        <div className="justify-self-end">
          <div className="lg:hidden block">
            <button onClick={() => handleOpen()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="menu-button"
                className="h-7 w-7 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          isOpen
            ? "fixed top-0 right-0 bottom-0 translate-x-0 opacity-100 overflow-scroll z-50 lg:hidden"
            : "fixed top-0 right-0 bottom-0 translate-x-full opacity-100 z-50 lg:hidden"
        }
      >
        <div className="flex lg:hidden p-5 bg-slate-100 w-screen overflow-hidden h-screen z-50 justify-between">
          <div className="flex flex-col w-full text-3xl items-center mt-10">
            <Link
              href="/"
              className={router.pathname == "/" ? "mb-4 font-semibold" : "mb-4"}
              onClick={() => handleOpen()}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={
                router.pathname == "/blog" ? "mb-4 font-semibold" : "mb-4"
              }
              onClick={() => handleOpen()}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={router.pathname == "/about" ? "font-semibold" : ""}
              onClick={() => handleOpen()}
            >
              About
            </Link>
          </div>
          <div>
            <button onClick={() => handleOpen()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
