"use client";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../assets/images/apsth/logo.png";
import Loading from "../../components/Loading";
import "./localStyle.module.css";

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_KEY;
    if (!liffId) {
      console.error(
        "LIFF ID is not defined. Please set NEXT_PUBLIC_LIFF_KEY in your environment variables."
      );
      return;
    }

    liff
      .init({ liffId })
      .then(() => {
        console.log("LIFF initialized successfully.");
      })
      .catch((err) => {
        console.error("Error initializing LIFF:", err);
      });
  }, []);

  const handleLoginLine = async () => {
    try {
      const liffId = process.env.NEXT_PUBLIC_LIFF_KEY;
      if (!liffId) {
        throw new Error(
          "LIFF ID is not defined. Please set NEXT_PUBLIC_LIFF_KEY in your environment variables."
        );
      }
      liff.login();
      const token = "user_token_from_server"; // Replace with actual server token
      document.cookie = `token=${token}; path=/; Secure; HttpOnly; SameSite=Strict;`;
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="d-flex flex-column vh-100 bg-login">
          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
            <div className="mb-2">
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <h2 className="fw-bold text-white mb-1 text-[36px]">Line - CRM</h2>
            <span className="text-white text-[14px]">
              ศูนย์รวมโปรโมชั่นและข้อมูลคลินิก
            </span>
            <button
              onClick={handleLoginLine}
              className="btn mb-3 mt-4 btn-success border-2 border-white d-flex align-items-center justify-content-center shadow line-login-btn"
            >
              {/* SVG Icon */}
              <span className="text-center text-white text">
                เข้าสู่ระบบด้วยLine
              </span>
            </button>
          </div>
          <footer className="footer text-center py-2">
            <div className="text-white">
              <span className="text-[10px]">
                Copyright © 2024 By APSX Platform | <strong>apsth.com</strong>
              </span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Login;
