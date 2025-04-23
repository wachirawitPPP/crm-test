"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serialize } from "cookie"; // Correct named import
import Lottie from "lottie-react";
import loading from "../../../public/images/loading.json";
import complete from "../../../public/images/check-animation.json";
import { jwtDecode } from "jwt-decode";

const Page = () => {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(true); // Manage loading state

  const checkLineId = async (id) => {
    try {
      setLoadingState(true); // Start loading
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/checklineid`,
        {
          line_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PUBLIC}`,
          },
        }
      );

      if (!response.data.status) {
        router.push("/login");
        return;
      }

      // Serialize and set the cookie
      const serializedToken = serialize(
        "token",
        response.data.data.access_token,
        {
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 1 day expiration
        }
      );
      localStorage.setItem("token", response.data.data.access_token);
      document.cookie = serializedToken;
      if (response.data.data.access_token) {
        try {
          const getShop = await axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}shop/getshop`, {
              headers: {
                Authorization: `Bearer ${response.data.data.access_token}`, // Correct header format
              },
            })
            .then((shop) => {
              const userDetails = axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}customer`, {
                  headers: {
                    Authorization: `Bearer ${response.data.data.access_token}`, // Correct header format
                  },
                })
                .then((detail) => {
                  if (detail.data.status) {
                    localStorage.setItem(
                      "userDetails",
                      JSON.stringify(detail.data.data) // Store user details in localStorage
                    );
                  }
                });

              try {
                const authShop = axios
                  .post(
                    `${process.env.NEXT_PUBLIC_API_URL}shop/oauth`,
                    {
                      shop_id: shop.data.data[0].id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${response.data.data.access_token}`, // Correct header format
                      },
                    }
                  )
                  .then((auth) => {
                    localStorage.setItem(
                      `shop_list`,
                      JSON.stringify(shop.data.data)
                    ),
                      localStorage.setItem(
                        "shop",
                        JSON.stringify(shop.data.data[0])
                      );
                    localStorage.setItem("token", auth.data.data.access_token);
                    const token = auth.data.data.access_token;
                    const decoded = jwtDecode(token);

                    // Calculate expiration time for the cookie
                    const expires = new Date(decoded.exp * 1000); // Convert `exp` from seconds to milliseconds

                    // Set the token in a cookie with the calculated expiration
                    document.cookie = `token=${token}; path=/`;
                    if (!decoded || !decoded.exp) {
                      console.error(
                        "Invalid token format or missing 'exp' claim."
                      );
                      return;
                    }
                    setLoadingState(false);
                    setTimeout(() => {
                      router.push("/");
                    }, 2000); // 1000ms = 1 second delay
                  });
              } catch (error) {
                console.log(error);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      router.push("/login");
      console.error(
        "Error checking line ID:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const lineId = localStorage.getItem("lineId");
    if (lineId) {
      checkLineId(lineId);
    } else {
      setLoadingState(false); // End loading if no lineId
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {loadingState ? (
        <>
          <Lottie
            style={{
              width: "300px", // Adjust width
              height: "300px", // Adjust height
              margin: "0 auto", // Center it horizontally
            }}
            loop={true}
            animationData={loading}
          />
          <p style={{ marginTop: "10px", color: "#555", fontSize: "25px" }}>
            กำลังตรวจสอบข้อมูล...
          </p>
        </>
      ) : (
        <>
          <Lottie
            style={{
              width: "300px", // Adjust width
              height: "300px", // Adjust height
              margin: "0 auto", // Center it horizontally
            }}
            loop={false}
            animationData={complete}
          />
          <p style={{ marginTop: "10px", color: "#555", fontSize: "25px" }}>
            เข้าสู่ระบบสำเร็จ
          </p>
        </>
      )}
    </div>
  );
};

export default Page;
