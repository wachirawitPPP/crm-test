"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import LabXrayTable from "../../components/table/LabXrayTemplate";
import Pagination from "../../components/table/Pagination";
import ComponentLoading from "../../components/ComponentLoad";
import NoDataIllustration from "../../components/NoData";

const Lab = () => {
  const [allItems, setAllItems] = useState([]); // For full list of items
  const [items, setItems] = useState([]); // Items for the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const itemsPerPage = 10; // Number of items per page

  const testFetch = async () => {
    const token = localStorage.getItem("token");
    const shop_id = JSON.parse(localStorage.getItem("shop")).id;
    console.log(shop_id)
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}customer/history/lab`,
        {
          search_date: "",
          search_text: "",
          current_page: 1,
          per_page: 3000,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === false) {
        setAllItems([]);
        setTotalItems(0);
      } else {
        const { items, count_all } = response.data.data;
        const filteredItems = items.filter((item) => item.que_code !== "" && shop_id === item.shop_id);
        setAllItems(filteredItems);
        setTotalItems(filteredItems.length);
      }
    } catch (error) {
      console.error("Error fetching data with testFetch:", error);
    }
  };

  const paginateItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(allItems.slice(startIndex, endIndex));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await testFetch();
      setLoading(false);
    };
    fetchData();
  }, []); // Initial fetch on component mount

  useEffect(() => {
    paginateItems(currentPage); // Paginate items whenever the current page changes
  }, [currentPage, allItems]); // Recalculate items when page or allItems change

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  return (
    <MainLayout>
      <div className="container position-relative">
        <div
          className="card-header d-flex justify-content-start p-1"
          style={{ borderBottom: "1px solid #D9D9D9" }}
        >
          <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5193 8.56128V16.1796C22.5193 16.377 22.5778 16.5701 22.6873 16.7343L33.8046 33.4103C34.2477 34.0749 33.7713 34.965 32.9726 34.965H3.26488C2.46618 34.965 1.98979 34.0749 2.43283 33.4103L13.5502 16.7343C13.6597 16.5701 13.7181 16.377 13.7181 16.1796V8.56128"
              stroke="#00AD98"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M24.2796 1.99414H24.5504C26.3452 1.99414 27.8001 3.44908 27.8001 5.24383V5.24383C27.8001 7.03858 26.3452 8.49352 24.5504 8.49352H11.6871C9.89231 8.49352 8.43738 7.03858 8.43738 5.24383V5.24383C8.43738 3.44908 9.89231 1.99414 11.6871 1.99414H17.2386"
              stroke="#00AD98"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.5193 3.61899C22.5193 4.51636 21.7312 5.24383 20.7591 5.24383C19.7869 5.24383 18.9988 4.51636 18.9988 3.61899C18.9988 2.72161 19.7869 1.99414 20.7591 1.99414C21.7312 1.99414 22.5193 2.72161 22.5193 3.61899Z"
              fill="#3F434A"
            />
            <path
              d="M26.0398 29.6165L22.4393 24.7419H13.7981L10.1976 29.6165H26.0398Z"
              fill="#3F434A"
            />
          </svg>
          <h5 className="card-title mb-0 ms-2 font-14 text-[#00AD98]">ผลแลป</h5>
        </div>
        <div
          className="mt-2  p-3 border-0 section"
          style={{
            boxShadow: "3px 3px 15px #e6e6e6",
            borderRadius: "8px",
            maxHeight: "100vh",
          }}
        >
          <div
            className="table-container"
            style={{
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <ComponentLoading />
            ) : items.length === 0 ? (
              <NoDataIllustration />
            ) : (
              <LabXrayTable items={items} pathToPrint={"lab-page"} />
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
  );
};

export default Lab;
