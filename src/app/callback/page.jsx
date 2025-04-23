"use client";
import liff from "@line/liff";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Lottie from "lottie-react";
import loading from "../../../public/images/loading.json";
import complete from "../../../public/images/check-animation.json";

export default function Callback() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(true);
  const checkLineId = async (id) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/checklineid`,
        {
          line_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PUBLIC}`, // Correct header format
          },
        }
      );
     
      return response.data; // Return the response data
    } catch (error) {
      console.error(
        "Error checking line ID:",
        error.response?.data || error.message
      );
      throw error; // Rethrow the error if needed
    }
  };

  useEffect(() => {
    liff.init({ liffId: `${process.env.NEXT_PUBLIC_LIFF_KEY}` }, async () => {
      if (liff.isLoggedIn()) {
        const userProfile = await liff.getProfile();
        const lineId = userProfile.userId;
        const lineName = userProfile.displayName;

        const idtoken = liff.getIDToken();
        const lineEmail = liff.getDecodedIDToken(idtoken).email;

        try {
          document.cookie = `lineId=${lineId}; path=/; SameSite=Strict`;
        } catch (error) {
          console.error("Error setting cookie:", error);
        }

        const checkedId = await checkLineId(lineId);

        if (checkedId.status === false) {
          router.push("/login");
        }

        


        const someData = {
          lineId: lineId,
          lineName: lineName,
          lineEmail: lineEmail,
        };
       
        localStorage.setItem("someData", JSON.stringify(someData));
        localStorage.setItem("lineId", lineId);

        // Store someData in cookies
        document.cookie = `lineId=${lineId}; path=/; Secure; HttpOnly; SameSite=Strict`;
        document.cookie = `lineName=${lineName}; path=/; Secure; SameSite=Strict`;
        document.cookie = `lineEmail=${lineEmail}; path=/; Secure; SameSite=Strict`;

        //check line id

        // Optionally, store a token or user identifier
        // document.cookie = `authToken=${idtoken}; path=/; Secure; HttpOnly; SameSite=Strict`;

        // Redirect to another page
        if (checkedId.data?.access_token) {
          try {
            const getShop = await axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}shop/getshop`, {
                headers: {
                  Authorization: `Bearer ${checkedId.data.access_token}`, // Correct header format
                },
              })
              .then((shop) => {
                const userDetails = axios.get(
                  `${process.env.NEXT_PUBLIC_API_URL}customer`,
                  {
                    headers: {
                      Authorization: `Bearer ${checkedId.data.access_token}`, // Correct header format
                    },
                  }
                ).then((detail)=>{
                 if(detail.data.status){
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
                          Authorization: `Bearer ${checkedId.data.access_token}`, // Correct header format
                        },
                      }
                    )
                    .then((auth) => {
                      localStorage.setItem(`shop_list`, JSON.stringify(shop.data.data)),
                      localStorage.setItem(
                        "shop",
                        JSON.stringify(shop.data.data[0])
                      );
                      localStorage.setItem(
                        "token",
                        auth.data.data.access_token
                      );
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

          // localStorage.setItem("token", checkedId.data.access_token);
          // const token = checkedId.data.access_token;
          // const decoded = jwtDecode(token);
          // console.log(decoded.exp);

          // // Calculate expiration time for the cookie
          // const expires = new Date(decoded.exp * 1000); // Convert `exp` from seconds to milliseconds

          // // Set the token in a cookie with the calculated expiration
          // document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/`;
          // // if (!decodedToken || !decodedToken.exp) {
          // //     console.error("Invalid token format or missing 'exp' claim.");
          // //     return;
          // //   }
          // router.push("/")
        } else {
          setLoadingState(false);
          router.push("/condition");
        }
      } else {
        setLoadingState(false);
        liff.login();
      }
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* <img src="/images/no-data.gif"
   
    
    /> */}
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
  ); // Render nothing
}
