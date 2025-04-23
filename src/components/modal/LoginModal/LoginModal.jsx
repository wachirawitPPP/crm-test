"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AlertComponent from "../../AlertComponent";


function LoginModal() {
  const router = useRouter();

  const [showModal, setShowModal] = useState(true);
  const [cardNumberInput, setCardNumberInput] = useState("");
  const [telNumberInput, setTelNumberInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [telNumberError, setTelNumberError] = useState(false);

  const handleLogin = async () => {
    let isValid = true;

    // Validate cardNumberInput for 13 characters
    if (cardNumberInput.length !== 13) {
      setCardNumberError(true);
      isValid = false;
    } else {
      setCardNumberError(false);
    }

    // Validate telNumberInput for 10 characters
    if (telNumberInput.length !== 10) {
      setTelNumberError(true);
      isValid = false;
    } else {
      setTelNumberError(false);
    }

    if (!isValid) return;

    const data = {
      line_id: getCookie("lineId"),
      line_name: getCookie("lineName"),
      line_email: getCookie("lineEmail"),
      citizen_id: cardNumberInput,
      tel: telNumberInput,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_PUBLIC}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.status) {
        alert("รหัสบัตรประชาชนหรือเบอร์โทรศัพท์ไม่ถูกต้อง");
        console.log(response.data)
        return;
      }

      if (response.data.data.access_token) {
        setIsModalOpen(true);
        localStorage.removeItem("someData");
        localStorage.setItem("token", response.data.data.access_token);
        return;
      }

      localStorage.removeItem("someData");
      document.cookie = `phoneNumber=${telNumberInput}; path=/; Secure; HttpOnly; SameSite=Strict`;
      localStorage.setItem("phoneNumber", telNumberInput);

      return router.push("/authentication");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const getCookie = (name) => {
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h5 className="text-lg font-medium text-teal-600 mb-4">
                ยืนยันการเข้าร่วมต่อข้อมูล
              </h5>
              <hr className="border-gray-300 mb-6" />
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="recipient-name"
                    className="block text-sm font-medium text-teal-600 mb-2"
                  >
                    เลขบัตรประชาชน <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="recipient-name"
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      cardNumberError ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={(e) => setCardNumberInput(e.target.value)}
                    value={cardNumberInput}
                  />
                  {cardNumberError && (
                    <p className="text-red-500 text-sm mt-1">
                      กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message-text"
                    className="block text-sm font-medium text-teal-600 mb-2"
                  >
                    หมายเลขโทรศัพท์มือถือ{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="message-text"
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      telNumberError ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={(e) => setTelNumberInput(e.target.value)}
                    value={telNumberInput}
                  />
                  {telNumberError && (
                    <p className="text-red-500 text-sm mt-1">
                      กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก
                    </p>
                  )}
                </div>
              </form>
              <div className="flex justify-center mt-6">
                <button
                  disabled={
                    cardNumberError ||
                    telNumberError ||
                    cardNumberInput === "" ||
                    telNumberInput === ""
                  }
                  type="button"
                  className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                    cardNumberError ||
                    telNumberError ||
                    cardNumberInput === "" ||
                    telNumberInput === ""
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                      : "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500"
                  }`}
                  onClick={handleLogin}
                >
                  ยืนยัน
                </button>

                <button
                  type="button"
                  className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => {
                    setShowModal(false);
                    router.push("/login");
                  }}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
            <div className="text-center mt-4 mb-3">
              <span className="text-xs text-teal-600">
                ข้อกำหนดการให้บริการ <strong>.</strong> นโยบายความเป็นส่วนตัว
              </span>
            </div>
          </div>
        </div>
      )}
      <AlertComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="เข้าสู่ระบบสำเร็จ"
      />
    </>
  );
}

export default LoginModal;
