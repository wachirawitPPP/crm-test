"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../assets/css/lab.css";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import NoData from "../../components/NoData";
import ComponentLoading from "../../components/ComponentLoad";
import pdf from "../../assets/images/icons/svg/pdf.svg";
import Image from "next/image";
import Pagination from "../../components/table/Pagination";

const Lab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState([]); // For full list of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const itemsPerPage = 10; // Number of items per page

  const paginateItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(allItems.slice(startIndex, endIndex));
  };

  const fetchLabData = (token) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}customer/history/document`,
        {
          search_date: "",
          search_text: "",
          current_page: 1,
          per_page: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === false) {
          setItems([]);
          setLoading(false);
          setTotalItems(0);
        } else {
          let list = res.data.data.items.filter(
            (e) => e.medical_cert_type_id == 1 || e.medical_cert_type_id == 7
          );
          setAllItems(list);
          setTotalItems(list.length);
          setItems(list); // change to res.data.data.items to use api data (now it use mock data for testing)
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchLabData(token);
  }, []);

  useEffect(() => {
    paginateItems(currentPage); // Paginate items whenever the current page changes
  }, [currentPage, allItems]); // Recalculate items when page or allItems change

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  const setUrlPath = (item) => {
    let url = "#";
    switch (item.medical_cert_type_id) {
      case 1:
        url = `/print/certifycate-general-page?opd_id=${item.id}`;
        break;
      case 7:
        url = `/print/certificate-page?opd_id=${item.id}`;
        break;

      default:
        url = "#";
        break;
    }

    return url;
  };
  return (
    <>
      <MainLayout>
        <div className=" container position-relative">
          <div
            className="card-header d-flex justify-content-start p-1"
            style={{ borderBottom: "1px solid #D9D9D9" }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5415 7.91663C26.7652 7.91663 27.8771 7.91663 28.6758 8.45031C29.0216 8.68134 29.3185 8.97822 29.5495 9.32399C30.0832 10.1227 30.0832 11.2346 30.0832 13.4583V28.5C30.0832 31.4855 30.0832 32.9783 29.1557 33.9058C28.2282 34.8333 26.7354 34.8333 23.7498 34.8333H14.2498C11.2643 34.8333 9.77149 34.8333 8.844 33.9058C7.9165 32.9783 7.9165 31.4855 7.9165 28.5V13.4583C7.9165 11.2346 7.9165 10.1227 8.45018 9.32399C8.68122 8.97822 8.9781 8.68134 9.32386 8.45031C10.1226 7.91663 11.2344 7.91663 13.4582 7.91663"
                stroke="#00AD98"
                strokeWidth="3"
              />
              <path
                d="M14.25 7.91667C14.25 6.16776 15.6678 4.75 17.4167 4.75H20.5833C22.3322 4.75 23.75 6.16776 23.75 7.91667C23.75 9.66557 22.3322 11.0833 20.5833 11.0833H17.4167C15.6678 11.0833 14.25 9.66557 14.25 7.91667Z"
                stroke="#00AD98"
                strokeWidth="3"
              />
              <path
                d="M14.25 19L23.75 19"
                stroke="#3F434A"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M14.25 25.3334L20.5833 25.3334"
                stroke="#3F434A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <h5 className="card-title mb-0 ms-2 font-14 text-00AD98">
              ใบรับรองแพทย์
            </h5>
          </div>
          <div
            className={`mt-2 p-3 border-0 .overflow-auto section`}
            style={{
              boxShadow: "3px 3px 15px #e6e6e6",
              borderRadius: "8px",
              maxHeight: "600px",
            }}
          >
            <div
              className="table-container"
              style={{
                maxHeight: "400px", // Adjust the height to your preference
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              {loading ? (
                <ComponentLoading />
              ) : items.length === 0 ? (
                <NoData noDataText="ไม่พบใบรับรองแพทย์" />
              ) : (
                <div
                  style={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    borderRadius: "10px",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th className="font-14 font-light text-00AD98 p-2 border-b">
                          เลขที่
                        </th>

                        <th className="font-14 font-light text-00AD98 p-2 border-b">
                          สร้างเมื่อ
                        </th>
                        <th className="whitespace-nowrap font-14 font-light text-00AD98 p-2 border-b">
                          ตัวเลือก
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr
                          key={index}
                          className="text-center align-middle hover:bg-gray-100"
                        >
                          <td className="font-10 text-00AD98 p-3 border-b whitespace-nowrap">
                            {item.mdc_code}
                          </td>

                          <td className=" font-10 text-00AD98 p-3 border-b whitespace-nowrap">
                            {new Date(item.mdc_create).toLocaleString("th-TH")}
                          </td>
                          <td className="text-center border-b  ">
                            <Link
                              className="flex justify-center"
                              href={setUrlPath(item)}
                            >
                              <Image
                                alt="pdf"
                                src={pdf}
                                width={26}
                                height={26}
                              />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </MainLayout>
    </>
  );
};

export default Lab;
