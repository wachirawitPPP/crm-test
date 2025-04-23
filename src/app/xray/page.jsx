"use client";

import React, { useState, useEffect } from "react";
import "../../assets/css/lab.css";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import NoDataIllustration from "../../components/NoData";
import ComponentLoading from "../../components/ComponentLoad";
import LabXrayTable from "../../components/table/LabXrayTemplate";
import Pagination from "../../components/table/Pagination";

const Xray = () => {
  const [allItems, setAllItems] = useState([]); // All items fetched from API
  const [items, setItems] = useState([]); // Items for the current page
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items from API
  const itemsPerPage = 10; // Number of items per page

  const fetchAllXrayData = async () => {
    const token = localStorage.getItem("token");
    const shop_id = JSON.parse(localStorage.getItem("shop")).id;
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}customer/history/xray`,
        {
          search_date: "",
          search_text: "",
          current_page: 1,
          per_page: 3000, // Fetch all items at once
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
        const { items } = response.data.data;
        const filteredItems = items.filter((item) => item.que_code !== "" && shop_id === item.shop_id);
        setAllItems(filteredItems);
        setTotalItems(filteredItems.length);
      }
    } catch (error) {
      console.error("Error fetching X-ray data:", error);
    } finally {
      setLoading(false);
    }
  };

  const paginateItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(allItems.slice(startIndex, endIndex));
  };

  useEffect(() => {
    fetchAllXrayData(); // Fetch all data on initial load
  }, []);

  useEffect(() => {
    paginateItems(currentPage); // Update paginated items when page or data changes
  }, [currentPage, allItems]);

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
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4002 8.01661C14.8701 8.01661 13.8099 7.65651 13.8099 6.2161C13.8099 4.77569 16.4604 5.61593 17.7857 6.2161C18.8459 5.61593 21.1254 4.77569 21.7615 6.2161C22.3976 7.65651 20.4362 8.01667 19.376 8.0167M12.2196 7.11645C11.1593 8.31679 10.3112 10.7175 15.4002 10.7175M10.6293 10.7175C10.3642 11.9178 10.9473 14.1384 15.4002 13.4182M9.83411 14.3185C9.83411 15.5188 11.1064 17.5594 16.1954 16.119M9.83411 17.9195C10.0992 19.1199 11.5835 20.9804 15.4002 18.8198M17.7857 17.9195C16.9905 20.3202 14.9231 24.9415 13.0148 24.2213C11.1064 23.5011 10.6293 22.1207 10.6293 21.5205M17.7857 16.119C16.9905 13.7183 15.8773 8.91696 17.7857 8.91696C19.6941 8.91696 18.5809 13.7183 17.7857 16.119Z"
              stroke="#3F434A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.4925 6.36047C24.5638 7.61361 25.4208 10.1199 20.2788 10.1199M25.0994 10.1199C25.3672 11.373 24.7781 13.6914 20.2788 12.9395M25.9028 13.8793C25.9028 15.1325 24.6173 17.2628 19.4753 15.759M25.9028 17.6387C25.635 18.8919 24.1353 20.8343 20.2787 18.5786M17.8684 17.6387C18.6719 20.145 20.7608 24.9696 22.6891 24.2177C24.6173 23.4659 25.0994 22.0247 25.0994 21.3982"
              stroke="#3F434A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="1.51434"
              y="1.52771"
              width="32.7085"
              height="32.954"
              rx="3.5"
              stroke="#00AD98"
              strokeWidth="3"
            />
            <path
              d="M8.19954 28.659L6.18354 25.907H7.11954L8.67154 28.019L10.2235 25.907H11.1595L9.13554 28.659L11.2315 31.499H10.2955L8.67154 29.291L7.04754 31.499H6.11154L8.19954 28.659ZM11.9629 28.787H14.5149V29.451H11.9629V28.787ZM15.3963 25.907H17.6443C18.2417 25.907 18.7003 26.051 19.0203 26.339C19.3403 26.627 19.5003 27.0484 19.5003 27.603C19.5003 28.0137 19.391 28.363 19.1723 28.651C18.9537 28.9337 18.6443 29.1257 18.2443 29.227L19.4763 31.499H18.6283L17.4363 29.291H16.2123V31.499H15.3963V25.907ZM17.5083 28.603C17.8657 28.603 18.1483 28.5204 18.3563 28.355C18.5697 28.1844 18.6763 27.9337 18.6763 27.603C18.6763 27.2404 18.5723 26.9817 18.3643 26.827C18.1617 26.6724 17.8763 26.595 17.5083 26.595H16.2123V28.603H17.5083ZM22.0933 25.907H22.8773L25.1093 31.499H24.2773L23.7173 30.107H21.2453L20.7013 31.499H19.8613L22.0933 25.907ZM23.4933 29.427L22.4853 26.811L21.4773 29.427H23.4933ZM26.784 29.379L24.752 25.907H25.624L27.184 28.603L28.768 25.907H29.632L27.576 29.379V31.499H26.784V29.379Z"
              fill="#00AD98"
            />
          </svg>
          <h5 className="card-title mb-0 ms-2 font-14 text-[#00AD98]">
            ผลเอกซเรย์
          </h5>
        </div>
        <div
          className="mt-2 p-3 border-0 section"
          style={{
            boxShadow: "3px 3px 15px #e6e6e6",
            borderRadius: "8px",
            maxHeight: "600px",
          }}
        >
          <div
            className="table-container"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <ComponentLoading />
            ) : items.length === 0 ? (
              <NoDataIllustration />
            ) : (
              <LabXrayTable items={items} pathToPrint={"xray-page"} />
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

export default Xray;
