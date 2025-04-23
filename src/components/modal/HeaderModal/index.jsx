"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ComponentLoading from "./../../ComponentLoad";

const HeaderModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);

  const router = useRouter();

  const fetchShopData = (token) => {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}shop/getshop`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === false) {
          setItems([]);
        } else {
          setItems(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const shopDetails = JSON.parse(localStorage.getItem("shop")) || {}; // Ensure parsing

    if (shopDetails && shopDetails.id) {
      setSelectedShopId(shopDetails.id); // Safely access id
      // console.log("Selected Shop ID from Local Storage:", shopDetails.id);
    }

    if (token && isModalOpen == true) {
      fetchShopData(token);
    }
  }, [isModalOpen]);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleRowClick = async (item) => {
   
    setSelectedShopId(item.id);
    localStorage.setItem("shop", JSON.stringify(item));
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}shop/oauth`,
        { shop_id: item.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        const userDetails = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}customer`,
          {
            headers: {
              Authorization: `Bearer ${response.data.data.access_token}`, // Correct header format
            },
          }
        );
        if (userDetails.data.status) {
          localStorage.setItem("token", response.data.data.access_token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(userDetails.data.data) // Store user details in localStorage
          );
          window.location.reload();
          setModalOpen(false);
        }
      } else {
        console.error("Error authenticating shop:", response.data.message);
      }
    } catch (error) {
      console.error("Error posting to API:", error);
    }
  };

  return (
    <>
      <a onClick={openModal} style={{ cursor: "pointer" }}>
        <svg
          width="26"
          height="28"
          viewBox="0 0 26 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            width="26"
            height="28"
            viewBox="0 0 26 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.4285 26.0004V19.2861C16.4285 18.7338 15.9808 18.2861 15.4285 18.2861H10.5714C10.0191 18.2861 9.57135 18.7338 9.57135 19.2861V26.0004"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokellinejoin="round"
            />
            <path
              d="M3.57135 13.1426V21.9997C3.57135 23.8853 3.57135 24.8281 4.15714 25.4139C4.74292 25.9997 5.68573 25.9997 7.57135 25.9997H18.4285C20.3141 25.9997 21.2569 25.9997 21.8427 25.4139C22.4285 24.8281 22.4285 23.8853 22.4285 21.9997V13.1426"
              stroke="white"
              strokeWidth="2.5"
            />
            <path
              d="M3.29943 3.53451C3.47568 2.79805 3.56381 2.42981 3.83621 2.21491C4.10862 2 4.48725 2 5.24451 2H20.7555C21.5128 2 21.8914 2 22.1638 2.21491C22.4362 2.42981 22.5243 2.79805 22.7006 3.53451L24.4709 10.932C24.685 11.8268 24.7921 12.2742 24.6188 12.6059C24.561 12.7164 24.4831 12.8152 24.3891 12.897C24.1068 13.1429 23.6468 13.1429 22.7267 13.1429V13.1429C21.4404 13.1429 20.7973 13.1429 20.3098 12.8369C20.1448 12.7334 19.9957 12.6062 19.8675 12.4596C19.4885 12.0263 19.3859 11.3829 19.1806 10.0962V10.0962C19.1192 9.71158 19.0885 9.51929 19.026 9.50244C19.009 9.49785 18.991 9.49785 18.974 9.50244C18.9115 9.51929 18.8813 9.70849 18.8209 10.0869L18.701 10.8387C18.6077 11.4234 18.561 11.7158 18.4551 11.9544C18.2093 12.508 17.7259 12.9204 17.1405 13.0758C16.8882 13.1429 16.5921 13.1429 16 13.1429V13.1429C15.4079 13.1429 15.1118 13.1429 14.8595 13.0758C14.2741 12.9204 13.7907 12.508 13.5449 11.9544C13.439 11.7158 13.3923 11.4234 13.299 10.8387L13.1791 10.0869C13.1187 9.70849 13.0885 9.51929 13.026 9.50244C13.009 9.49785 12.991 9.49785 12.974 9.50244C12.9115 9.51929 12.8813 9.70849 12.8209 10.0869L12.701 10.8387C12.6077 11.4234 12.561 11.7158 12.4551 11.9544C12.2093 12.508 11.7259 12.9204 11.1405 13.0758C10.8882 13.1429 10.5921 13.1429 10 13.1429V13.1429C9.40787 13.1429 9.1118 13.1429 8.85948 13.0758C8.27408 12.9204 7.79068 12.508 7.54492 11.9544C7.43898 11.7158 7.39234 11.4234 7.29905 10.8387L7.17911 10.0869C7.11873 9.70849 7.08855 9.51929 7.02601 9.50244C7.00897 9.49785 6.99103 9.49785 6.97399 9.50244C6.91145 9.51929 6.88077 9.71158 6.81942 10.0962V10.0962C6.61412 11.3829 6.51147 12.0263 6.13255 12.4596C6.00427 12.6062 5.85525 12.7334 5.69021 12.8369C5.20269 13.1429 4.55956 13.1429 3.27331 13.1429V13.1429C2.35325 13.1429 1.89322 13.1429 1.6109 12.897C1.51687 12.8152 1.43898 12.7164 1.38124 12.6059C1.20789 12.2742 1.31496 11.8268 1.5291 10.932L3.29943 3.53451Z"
              stroke="white"
              strokeWidth="2.5"
            />
          </svg>
        </svg>
      </a>

      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-[93%] max-w-md"
          >
            <div className="p-4">
              <h5 className="text-lg font-semibold text-teal-600 mb-2">
                เลือกร้านค้าเพื่อดูข้อมูล
              </h5>
              <div className="">
                {loading ? (
                  <ComponentLoading />
                ) : Array.isArray(items) && items.length > 0 ? (
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="cursor-pointer hover:bg-gray-100  p-2 border-b-2 border-t-2 "
                        onClick={() => handleRowClick(item)}
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded"
                            />
                          </div>
                          <div className="flex-grow ml-2">
                          
                            <span className="text-base font-bold text-gray-700">
                              {item.name}
                            </span>
                            <div className="text-sm text-gray-500">
                              {item.nature_type} จ.{item.province}
                            </div>
                          </div>
                          <div className="ml-auto">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <div
                                className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
                                  selectedShopId === item.id
                                    ? "bg-teal-500 border-teal-500"
                                    : "bg-white border-gray-300"
                                }`}
                              >
                                {selectedShopId === item.id && (
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                )}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedShopId === item.id}
                                readOnly
                              />
                            </label>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500">ไม่พบรายการ</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderModal;
