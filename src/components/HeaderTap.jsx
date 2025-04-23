"use client";

import { Logonbg } from "../helper/img";
import HeaderModal from "./modal/HeaderModal";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeaderTap() {
  const [shop, setShop] = useState({});
  useEffect(() => {
    const storedShop = localStorage.getItem("shop");
    if (storedShop) {
      setShop(JSON.parse(storedShop)); // Parse the stored shop data
    }
  }, []); // Only run once when the component mounts

  return (
    <>
      <div className="flex justify-between items-center mt-2 bg-transparent">
        {/* Left Content */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image
              src={shop.image || Logonbg}
              width={130}
              height={151}
              alt=""
              className="img-fluid bg-white rounded"
              style={{
                maxWidth: "60px",
                maxHeight: "60px",
                boxShadow: "1px 5px 8.3px 0px #00000040",
                border: "2px solid #00AD98",
              }}
            />
          </div>
          <div className="flex-grow-1 ms-2">
                <span className="title font-16 text-white fw-light">
                  {shop.name}
                </span>
                <br />
                <span className="title font-14 text-white fw-light">
                  {shop.province}
                </span>
              </div>
        </div>

        {/* Middle Content */}
        <div className="header-logo"></div>

        {/* Right Content */}
        <div className="">
          <HeaderModal />
        </div>
      </div>
    </>
  );
}
