"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../assets/css/lab.css";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import NoDataIllustration from "../../components/NoData";
import ComponentLoading from "../../components/ComponentLoad";
import pdf from "../../assets/images/icons/svg/pdf.svg";
import Image from "next/image";
import Pagination from "../../components/table/Pagination";

const HistoryReceipt = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allItems, setAllItems] = useState([]); // For full list of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const itemsPerPage = 10; // Number of items per page
  const [shop_id, setShopId] = useState();

  const paginateItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(allItems.slice(startIndex, endIndex));
  };

  const fetchData = (token) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}customer/receipt/pagination`,
        {
          search: "",
          rec_is_active: "",
          active_page: 1,
          per_page: 400,
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
          setItems(res.data.data.result_data); // change to res.data.data.items to use api data (now it use mock data for testing)
          setLoading(false);
          setAllItems(res.data.data.result_data);
          setTotalItems(res.data.data.result_data.length);
        }
      });
  };
  const priceFormatted = (price) => {
    return Intl.NumberFormat("th", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setShopId(JSON.parse(localStorage.getItem('shop')).id);

    fetchData(token);
  }, []);

  useEffect(() => {
    paginateItems(currentPage); // Paginate items whenever the current page changes
  }, [currentPage, allItems]); // Recalculate items when page or allItems change

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages
  return (
    <>
      <MainLayout>
        {/* ////mt-[9rem] */}
        <div className=" container position-relative">
          <div
            className="card-header d-flex justify-content-start p-1"
            style={{ borderBottom: "1px solid #D9D9D9" }}
          >
            <svg
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.625 6.875C9.625 6.59886 9.84886 6.375 10.125 6.375H18V14.25C18 16.183 19.567 17.75 21.5 17.75H29.375V32.125C29.375 32.4011 29.1511 32.625 28.875 32.625H10.125C9.84886 32.625 9.625 32.4011 9.625 32.125V6.875Z"
                stroke="#00AD98"
                strokeWidth="3"
              />
              <path
                d="M21.125 13.625V5.47855C21.125 5.25583 21.3943 5.14429 21.5518 5.30178L30.4482 14.1982C30.6057 14.3557 30.4942 14.625 30.2714 14.625H22.125C21.5727 14.625 21.125 14.1773 21.125 13.625Z"
                fill="#00AD98"
              />
              <path
                d="M13.8125 21.9375L23.5625 21.9375"
                stroke="#3F434A"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M13.8125 26.8125L21.9375 26.8125"
                stroke="#3F434A"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <h5 className="card-title mb-0 ms-2 font-14 text-00AD98">
              ประวัติใบเสร็จ
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
                <NoDataIllustration />
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
                          เลขที่ใบเสร็จ
                        </th>
                        <th className="font-14 font-light text-00AD98 p-2 border-b">
                          จุดบริการ
                        </th>
                        <th className="font-14 font-light text-00AD98 p-2 border-b">
                          ราคา
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
                          <td className="font-10 text-00AD98 p-3 border-b">
                            <div className="flex flex-col">
                              {item.rec_code || "-"}
                            </div>
                            <div className="flex flex-col">
                              {new Date(item.rec_create).toLocaleDateString(
                                "th-TH"
                              )}
                            </div>
                          </td>
                          <td className="w-96 font-10 text-00AD98 p-3 border-b whitespace-nowrap ">
                            {item.shop_name}
                          </td>
                          <td className="w-96 font-10 text-00AD98 p-3 border-b">
                            {priceFormatted(item.rec_total_price)}
                          </td>

                          <td className="text-center border-b ">
                            {shop_id === item.shop_id ? (
                              <Link
                                className="flex justify-center"
                                href={`/print/receipt-page?id=${item.id}`}
                              >
                                <Image
                                  alt="pdf"
                                  src={pdf}
                                  width={26}
                                  height={26}
                                />
                              </Link>
                            ) : (
                              "-"
                            )}
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

export default HistoryReceipt;
