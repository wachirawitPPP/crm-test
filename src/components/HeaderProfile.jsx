"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderTap from "./HeaderTap";
import femaleNullImg from "../assets/images/avatar/male_null_avatar.png";
import maleNullImg from "../assets/images/avatar/female_null_avartar.png";
import nullImg from "../assets/images/avatar/null_user.png";


export default function HeaderProfile() {
  const [userData, setUserData] = useState(null);
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    // Access localStorage only on the client side
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      const parsedData = JSON.parse(storedData); // Parse the data here
      setUserData(parsedData);
      setBirthDate(formatBirthdate(parsedData)); // Pass the parsed object to formatBirthdate
    }
  }, []);

  const formatBirthdate = (userData) => {
    // Check if `ctm_birthdate` exists
    const birthdate = userData?.customer?.ctm_birthdate;

    if (!birthdate) {
      console.error("Birthdate not found!");
      return null;
    }

    // Convert birthdate to a formatted string
    const date = new Date(birthdate);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const year = date.getFullYear(); // 4-digit year

    return `${day} / ${month} / ${year}`;
  };

  return (
    <>
      <div className="relative">
        <header className="bg-gradient-to-b from-[#01B5BF] to-[#00ad98] shadow-md">
          <div className="container">
            <HeaderTap />
            <hr className="border border-white opacity-100 mt-[10px]" />
            <div className="relative">
              <div className="row mb-3 relative" style={{}}>
                <div className="col-5 p-3">
                  <div className="text-end">
                    <Image
                      className="mx-auto"
                      src={
                        userData?.customer?.ctm_gender  === "หญิง"  && !userData?.customer?.ctm_image 
                          ? maleNullImg
                          : userData?.customer?.ctm_gender === "ชาย"  && !userData?.customer?.ctm_image 
                          ? femaleNullImg
                          : userData?.customer?.ctm_image 
                          ? userData?.customer?.ctm_image 
                          : nullImg
                      }
                      alt="ctm_image"
                      width={130}
                      height={151}
                      style={{
                        width: "130px",
                        height: "151px",
                        border: "2px solid white",
                        borderRadius: "10%",
                      }}
                    />
                  </div>
                </div>
                <div className="col-7 p-3">
                  <div>
                    <label className="form-label text-white text-opacity-50 mb-0 text-xs">
                      ชื่อ - นามสกุล
                    </label>
                    <p className="text-white m-0 text-sm">
                      {userData?.customer?.ctm_fname}{" "}
                      {userData?.customer?.ctm_lname}
                    </p>
                  </div>
                  <div>
                    <label className="form-label text-white text-opacity-50 mb-0 text-xs">
                      วัน/เดือน/ปี เกิด :
                    </label>
                    <p className="text-white m-0 text-sm">{birthDate ?? "-"}</p>
                  </div>
                  <div>
                    <label className="form-label text-white text-opacity-50 mb-0 text-xs">
                      เบอร์โทรศัพท์ :
                    </label>
                    <p className="text-white m-0 text-sm">
                      {userData?.customer?.ctm_tel ?? "-"}
                    </p>
                  </div>
                  <div>
                    <label className="form-label text-white text-opacity-50 mb-0 text-xs">
                      อีเมล์ :
                    </label>
                    <p className="text-white m-0 text-sm">
                      {userData?.customer?.ctm_email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 flex justify-between gap-2">
                <div className="w-1/2 p-2">
                  <div className="p-3 w-[170px] bg-white rounded-lg shadow-md">
                    <div className="flex items-center gap-2">
                      <svg
                        className="me-2"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.5316 1.5848C3.94197 0.528266 4.14716 0 4.5 0C4.85284 0 5.05803 0.528266 5.4684 1.5848L5.48751 1.634C5.71935 2.23089 5.83528 2.52933 6.07153 2.71073C6.30778 2.89213 6.61791 2.92081 7.23818 2.97818L7.35031 2.98855C8.36545 3.08244 8.87302 3.12938 8.98163 3.46287C9.09023 3.79636 8.71329 4.15052 7.95941 4.85884L7.7078 5.09524C7.32617 5.4538 7.13535 5.63308 7.04642 5.86806C7.02983 5.91189 7.01603 5.9568 7.00513 6.00249C6.94667 6.24745 7.00255 6.50753 7.1143 7.0277L7.14909 7.18961C7.35447 8.14558 7.45716 8.62356 7.27786 8.82973C7.21086 8.90677 7.12378 8.96224 7.02705 8.98949C6.76818 9.06244 6.40065 8.75316 5.66559 8.1346C5.18293 7.72843 4.94159 7.52534 4.66452 7.47966C4.55553 7.46168 4.44447 7.46168 4.33548 7.47966C4.0584 7.52534 3.81707 7.72843 3.33441 8.1346C2.59935 8.75316 2.23182 9.06244 1.97295 8.98949C1.87622 8.96224 1.78914 8.90677 1.72214 8.82973C1.54284 8.62356 1.64553 8.14558 1.85092 7.18961L1.8857 7.0277C1.99745 6.50753 2.05333 6.24745 1.99487 6.00249C1.98397 5.9568 1.97017 5.91189 1.95358 5.86806C1.86465 5.63308 1.67383 5.4538 1.2922 5.09524L1.04059 4.85884C0.28671 4.15052 -0.0902328 3.79636 0.0183748 3.46287C0.126982 3.12938 0.634552 3.08244 1.64969 2.98855L1.76182 2.97818C2.38209 2.92081 2.69222 2.89213 2.92847 2.71073C3.16472 2.52933 3.28065 2.23089 3.51249 1.634L3.5316 1.5848Z"
                          fill="#FD7972"
                        />
                      </svg>
                      <span className="text-red-400">แต้มสะสม :</span>
                    </div>
                    <div className="text-end">
                      <span className="text-red-400 text-lg font-bold">
                        {userData?.customer?.ctm_point}{" "}
                        <span className="text-xs font-normal">แต้ม</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="p-3 w-[170px] bg-white rounded-lg shadow-md">
                    <div className="text-start">
                      <span className="text-red-400">฿ วงเงินคงเหลือ :</span>
                    </div>
                    <div className="text-end">
                      <span className="text-red-400 text-lg font-bold">
                        {userData?.customer?.ctm_coin}{" "}
                        <span className="text-xs font-normal">บาท</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
