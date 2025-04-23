"use client";
import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";

const userNavigation = [
  { name: "โปรโมชั่นคอร์ส", href: "/" },
  { name: "ผลิตภัณฑ์", href: "/products" },
  { name: "บัตรสมาชิก", href: "#" },
];


export default function TabSlideEffect() {
  const tabButton =
    " relative w-full h-full gap-x-1.5 rounded-md bg-neutral-300 ";
  const tabButtonDis =
    " relative w-full h-full gap-x-1.5 rounded-md bg-[#01b1b0] ";
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const pathname = window.location.pathname;
    // console.log(pathname);
    if (pathname == "/") {
      setActiveTab(0);
    } else if (pathname == "/products") {
      setActiveTab(1);
    } else if (pathname == "#") {
      setActiveTab(2);
    }
  }, []);
  return (
    <Disclosure as="nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex h-16 justify-between">
          <div className="flex items-center justify-around w-full overflow-x-scroll">
            {userNavigation.map((item, index) => {
              return (
                <div key={index} className="w-36 h-10 mx-1">
                  <a href={item.href}>
                    <button
                      type="button"
                      className={`${
                        activeTab != index ? tabButton : tabButtonDis
                      } title font-16 text-white fw-light`}
                      onClick={() => setActiveTab(index)}
                    >
                      {item.name}
                    </button>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
