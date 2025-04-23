"use client";

import Image from "next/image";
import HeaderModal from "./modal/HeaderModal";
import { apsx, Logo } from "../helper/img";
import { useEffect, useState } from "react";

export default function Header(props) {
  const [shop, setShop] = useState({});

  useEffect(() => {
    const storedShop = localStorage.getItem("shop");
    if (storedShop) {
      setShop(JSON.parse(storedShop)); // Parse the JSON data if stored as a string
    }
  }, []);

  return (
    <>
      <header className="header header-fixed">
        <div className="container">
          <div className="header-content mt-[10px] mb-[10px] d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <Image
                  src={shop.image || apsx}
                  alt="Logo apsth"
                  className="img-fluid bg-white rounded"
                  width={60}
                  height={60}
                  style={{
                    maxWidth: "60px",
                    maxHeight: "60px",
                    boxShadow: "1px 5px 8.3px 0px #00000040",
                    border: "2px solid #00AD98",
                  }}
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <span
                  className="title font-16 text-white fw-light"
                  style={{
                   
                    wordBreak: "break-word", // Prevent overflow
                    whiteSpace: "normal", // Allow text wrapping
                  }}
                >
                  {shop.name}
                </span>
                <br />
                <span className="title font-14 text-white fw-light">
                  {shop.province}
                </span>
              </div>
            </div>
            <div className="flex items-center .space-x-4 me-2">
              <HeaderModal />
            </div>
          </div>
        </div>
        <div
          className="fixed w-full z-50  bg-white"
          style={{ boxShadow: "5px 2px 15px #e6e6e6" }}
        >
          {/* <TabSlideEffect /> */}
        </div>
      </header>
    </>
  );
}
