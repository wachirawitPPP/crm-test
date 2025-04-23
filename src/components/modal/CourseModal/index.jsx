"use client";

import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

const CourseModal = ({ open, closeModal, courseId }) => {
  const modalRef = useRef(null);
  const [drugItem, setDrugItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDrugItem = async (token, id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}service/id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.data.status) {
        setDrugItem([]);
      } else {
        setDrugItem(res.data.data.products);
      }
    } catch (error) {
      console.error("Error fetching drug items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && courseId) {
      getDrugItem(token, courseId);
    }
  }, [courseId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, closeModal]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[60vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h5 className="text-lg font-semibold text-teal-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-capsule-pill"
              viewBox="0 0 23 23"
            >
              <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
            </svg>
            ยาคงเหลือ
          </h5>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-2">
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-6 w-6 text-teal-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <p className="ml-2 text-teal-600">Loading...</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left border-collapse border-t border-b border-gray-200">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200 text-teal-600">
                    รายการ
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-teal-600 text-center whitespace-nowrap">
                    คงเหลือ
                  </th>
                  <th className="px-4 py-2 border-b border-gray-200 text-teal-600 text-center">
                    หน่วย
                  </th>
                </tr>
              </thead>
              <tbody>
                {drugItem.length > 0 ? (
                  drugItem.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-t border-b border-gray-200 text-teal-600">
                        {item.serp_name}
                      </td>
                      <td className="px-4 py-2 border-t border-b border-gray-200 text-center text-teal-600">
                        {item.serp_balance.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-t border-b border-gray-200 text-center text-teal-600">
                        {item.serp_unit}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-2 border-t border-b border-gray-200 text-gray-500 text-center"
                    >
                      ไม่มีข้อมูลสินค้า
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
