"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  IconActiveLab,
  IconActiveProfile,
  IconActiveXray,
  IconLab,
  IconProfile,
  IconXray,
} from "../helper/icon";
import Link from "next/link";
import calendarWhite from "../assets/images/icons/svg/calendar_white.svg";
import calendarBule from "../assets/images/icons/svg/calendar_blue.svg";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(""); // State for active route
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    setActiveItem(pathname); // Update state when pathname changes
  }, [pathname]);

  return (
    <div className="fixed bottom-0 w-full h-[90px] bg-gradient-to-b from-[#01B5BF] to-[#01AE9A] shadow-lg z-50">
      <div className="flex justify-around items-center h-full">
        {/* Navigation Links */}
        {[
          {
            href: "/appointment",
            label: "Home",
            icon: calendarWhite,
            activeIcon: calendarBule,
          },
          {
            href: "/lab",
            label: "Lab",
            icon: IconLab,
            activeIcon: IconActiveLab,
          },
          {
            href: "/xray",
            label: "X-Ray",
            icon: IconXray,
            activeIcon: IconActiveXray,
          },
          {
            href: "/profile",
            label: "Profile",
            icon: IconProfile,
            activeIcon: IconActiveProfile,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-[80px] h-[70px] ${
              activeItem === item.href
                ? "bg-white text-[#00AD98] rounded-[15px] shadow-md"
                : "text-white"
            } group transition-all duration-400`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src={activeItem === item.href ? item.activeIcon : item.icon}
                alt={item.label}
                width={30}
                height={30}
                className="transition-transform duration-400 group-hover:scale-105"
              />
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                activeItem === item.href
                  ? "text-[#00AD98]"
                  : "group-hover:text-[#00AD98] text-white"
              } transition-all duration-400`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
