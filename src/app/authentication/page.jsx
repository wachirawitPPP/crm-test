"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../assets/images/apsth/logo.png";
import Image from "next/image";
import axios from "axios";

export default function Authentication() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const getCookie = (name) => {
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleConfirmOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert("กรุณากรอกรหัส OTP ให้ครบถ้วน");
      return;
    }

    const data = {
      line_id: getCookie("lineId"),
      tel: localStorage.getItem("phoneNumber"),
      otp: otp,
    };


    try {
      const fetchOtp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/otp`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PUBLIC}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!fetchOtp || !fetchOtp.data.status) {
        alert("รหัส OTP ไม่ถูกต้อง");
        return;
      }
      document.cookie = `token=${fetchOtp.data.access_token}; path=/`;
      localStorage.setItem("token", fetchOtp.data.access_token);
      router.push("/checkAuth");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("เกิดข้อผิดพลาดในการยืนยัน OTP");
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        background: "linear-gradient(180deg, #00AD98 0%, #00D4C0 100%)",
      }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="mb-2">
          <Image
            src={Logo}
            alt="Logo"
            width={120}
            height={120}
            className=""
            // style={{ maxWidth: "120px", maxHeight: "120px" }}
          />
        </div>
        <h2
          className="fw-bold text-white mb-1"
          style={{ color: "#F73394", fontSize: "36px" }}
        >
          Line - CRM
        </h2>
        <span className="text-white" style={{ fontSize: "14px" }}>
          ศูนย์รวมโปรโมชั่นและข้อมูลคลินิก
        </span>
        <div
          className="container-fluid px-5 my-3"
          style={{ paddingLeft: "4.30rem", paddingRight: "4.30rem" }}
        >
          <div className="text-white text-center">
            <p style={{ fontSize: "20px" }}>
              กรุณาระบุรหัสผ่านแบบใช้ครั้งเดียว [OTP]
              ที่ส่งไปยังหมายเลขโทรศัพท์ที่ลงทะเบียนไว้โดยรหัสผ่านจะหมดอายุภายใน
              5 นาที
            </p>
          </div>
          <div className="custom-login-form">
            <form>
              <div className="text-center my-4">
                <input
                  type="text"
                  className="form-control text-center"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    width: "300px",
                    height: "60px",
                    borderRadius: "10px",
                    background: "#fff",
                    fontSize: "20px",
                    margin: "0 auto",
                  }}
                  placeholder="กรอก OTP"
                />
              </div>
              <div className="login-btm custom-login-button justify-content-center d-flex mt-5">
                <button
                  onClick={handleConfirmOTP}
                  type="button"
                  className="btn mb-3 btn-success border-2 border-white d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "300px",
                    height: "45px",
                    background: "#FFF",
                    border: "2px solid #FFFFFF",
                    boxShadow:
                      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                  }}
                >
                  <span
                    className="text-center"
                    style={{ fontSize: "20px", color: "#00AD98" }}
                  >
                    ยืนยัน OTP
                  </span>
                </button>
              </div>
              <div className="text-white text-center mt-5">
                <span style={{ fontSize: "20px" }}>ขอรหัส OTP ใหม่</span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="footer text-center py-2">
        <div className="text-white">
          <span style={{ fontSize: "10px" }}>
            Copyright © 2024 By APSX Platform | <strong>apsth.com</strong>
          </span>
        </div>
      </footer>
    </div>
  );
}
