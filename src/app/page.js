"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../components/MainLayout";
import Loading from "../components/Loading";

import axios from "axios";
import TabSlideEffect from "../components/TabSlideEffect";
import { banner, banner02, banner03, banner04, user } from "../helper/img";
import Link from "next/link";
import Image from "next/image";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  let promotionList = [
    { id: "1", url: "", img: banner },
    { id: "2", url: "", img: banner02 },
    { id: "3", url: "", img: banner03 },
    { id: "4", url: "", img: banner04 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}customer`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Correct header format
              },
            }
          );

          if (!response.data.status) {
            localStorage.removeItem("token");
            localStorage.removeItem("userDetails");
            router.push("/login");
            return;
          }
 

          setUserData(response.data.data); // Update state with user data
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.data) // Store user details in localStorage
          );
        } catch (error) {
          console.error(
            "Error fetching customer data:",
            error.response?.data || error.message
          );
          setUserData(null); // Clear user data on error
        }
      } else {
        setUserData(null); // Clear user data if no token
      }

      setLoading(false); // Stop loading
    };

    fetchUserData();
  }, []);

  

  if (loading) {
    return <Loading />;
  }

 

  return (
    <MainLayout>
      {/* <TabSlideEffect /> */}
      <div className="row mt-[160px] container justify-content-center">
        {promotionList.map((item, index) => {
          return (
            <div
              key={item.id}
              className="m-b10 flex items-center justify-center"
              style={{
                borderRadius: "15px",
                boxShadow: "#01afa317 3px 4px 20px 6px",
              }}
            >
              <Link href={item.url}>
                <Image
                  src={item.img}
                  alt="image"
                  height={0}
                  width={330}
                  style={{ height: "120px", width: "auto" }}
                  className="border border-4 border-white rounded"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
