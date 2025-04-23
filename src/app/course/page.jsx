"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../../components/MainLayout";
import course from "../../assets/images/icons/course.png";
import Image from "next/image";
import CourseModal from "../../components/modal/CourseModal";
import NoDataIllustration from "../../components/NoData";
import ComponentLoading from "../../components/ComponentLoad";
import Pagination from "../../components/table/Pagination";

const Course = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [allItems, setAllItems] = useState([]); // For full list of items
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const itemsPerPage = 4; // Number of items per page

  const paginateItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setItems(allItems.slice(startIndex, endIndex));
  };
  const fetchCourseData = (token) => {
    setLoading(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}service/search`,
        {
          search: "",
          active_page: 1,
          per_page: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const filterData = res.data.data.result_data
          .map((item) => item.shop_id)
          .filter((value, index, self) => self.indexOf(value) === index);
        if (res.data.status === false) {
          setItems([]);
          setLoading(false);
          setTotalItems(0);
        } else {
          setItems(res.data.data.result_data);
          setAllItems(res.data.data.result_data);
          setTotalItems(res.data.data.result_data.length);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCourseData(token);
    }
  }, []);

  const handleOpenModal = (id) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    paginateItems(currentPage); // Paginate items whenever the current page changes
  }, [currentPage, allItems]); // Recalculate items when page or allItems change

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
  };
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-2 border-b border-gray-300">
          <h5 className="text-[#00AD98] font-semibold text-sm">
            คอร์สคงเหลือของคุณ
          </h5>
          <h5 className="text-[#00AD98] font-semibold text-sm">
            {allItems.length.toLocaleString()} รายการ
          </h5>
        </div>
        <div
          className={`pt-2 ${
            items.length > 4 ? "overflow-auto" : ""
          } max-h-[600px]`}
        >
          {loading ? (
            <ComponentLoading />
          ) : items.length > 0 ? (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border bg-white shadow-sm"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex justify-between items-start">
                    <h5 className="text-[#00AD98] font-bold text-base">
                      {item.ser_name}
                    </h5>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>
                        วันหมดอายุ:{" "}
                        <span>
                          {" "}
                          {item.ser_exp_date === ""
                            ? "-"
                            : new Date(item.ser_exp_date).toLocaleDateString(
                                "th-TH"
                              )}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#00AD98]">
                        จำนวนการใช้: {item.ser_use} ครั้ง
                      </span>
                      {item.ser_lock_drug === 1 ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-[#00AD98]">ยาคงเหลือ</span>
                          <a
                            onClick={() => handleOpenModal(item.id)}
                            className="cursor-pointer"
                          >
                            <Image
                              src={course}
                              alt="Course Icon"
                              width={28}
                              height={28}
                              className="shadow-md"
                            />
                          </a>
                        </div>
                      ) : (
                        <span className="text-[#00AD98]">
                          คงเหลือคอร์ส: {item.ser_amount} ครั้ง
                        </span>
                      )}
                    </div>
                  </div>
                  {item.ser_lock_drug !== 1 && (
                    <div className="mt-2">
                      <div className="bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-[#00AD98] h-full rounded-full"
                          style={{
                            width: `${(item.ser_use / item.ser_qty) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <NoDataIllustration />
          )}
        </div>
      </div>
      <CourseModal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        courseId={selectedItemId}
      />
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

export default Course;
