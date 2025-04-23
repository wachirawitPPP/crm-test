"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear() + 543;
  return `${day} ${month} ${year}`;
};

const formatTime = (datetimeString) => {
  if (!datetimeString) return "ไม่ระบุเวลา";
  const [date, time] = datetimeString.split("T");
  const [hours, minutes] = time.split(":");
  return `${parseInt(hours, 10)}:${minutes}`;
};

const ListAppointment = ({ appointment }) => (
  <div
    className="card bg-00ad98 text-white mb-3 opacity-70"
    style={{
      maxWidth: "auto",
      borderRadius: "15px",
      boxShadow: "#4cc5b7 4px 7px 15px 0px",
    }}
  >
    <div className="card-body d-flex align-items-start p-2">
      <svg
        width="14"
        height="90"
        viewBox="0 0 14 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_665_383)">
          <path d="M5 5H9V85H5V5Z" fill="white" />
        </g>
        <defs>
          <filter
            id="filter0_d_665_383"
            x="0"
            y="0"
            width="14"
            height="90"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_665_383"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_665_383"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <div>
        <div className="d-flex align-items-center mb-2">
          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.56266 0C6.08043 0 6.50016 0.419631 6.50016 0.937271V1.567H9.75098H10.3736C10.5903 1.567 10.4471 1.567 10.9649 1.567C11.4827 1.567 11.3028 1.567 11.3028 1.567H11.626H14.751V0.937271C14.751 0.419631 15.1707 0 15.6885 0C16.2062 0 16.626 0.419631 16.626 0.937271V1.567H17.251C19.1495 1.567 20.6885 3.10564 20.6885 5.00366V8.86991C20.6885 9.38755 20.2687 9.80718 19.751 9.80718C19.2332 9.80718 18.8135 9.38755 18.8135 8.86991V5.00366C18.8135 4.14093 18.1139 3.44154 17.251 3.44154H16.626V4.06325C16.626 4.58089 16.2062 5.00052 15.6885 5.00052C15.1707 5.00052 14.751 4.58089 14.751 4.06325V3.44154H11.626H11.1885C11.1885 3.44154 11.2062 3.44154 10.6885 3.44154C10.4385 3.44154 10.044 3.44154 9.98096 3.44154H9.75098H6.50016V4.06325C6.50016 4.58089 6.08043 5.00052 5.56266 5.00052C5.04489 5.00052 4.62516 4.58089 4.62516 4.06325V3.44154H4.12598C3.26303 3.44154 2.56348 4.14093 2.56348 5.00366V16.5633C2.56348 17.4261 3.26303 18.1255 4.12598 18.1255H9.55566C10.0734 18.1255 10.4932 18.5451 10.4932 19.0627C10.4932 19.5804 10.0734 20 9.55566 20H4.12598C2.2275 20 0.688477 18.4614 0.688477 16.5633V5.00366C0.688477 3.10565 2.2275 1.567 4.12598 1.567H4.62516V0.937271C4.62516 0.419631 5.04489 0 5.56266 0Z"
              fill="white"
            />
            <path d="M2.68848 8H18.6885" stroke="white" strokeWidth="2" />
            <path
              d="M10.6885 15.5333L13.1885 19L16.9385 15L20.6885 11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ms-2">{appointment.title}</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "-2px" }}
          >
            <path
              d="M16.6885 3L16.6885 6M8.68848 3L8.68848 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.6885 4H10.6885L10.6885 6C10.6885 7.10457 9.79305 8 8.68848 8C7.58391 8 6.68848 7.10457 6.68848 6L6.68848 4.07612C5.71339 4.17203 5.05704 4.38879 4.56716 4.87868C3.68848 5.75736 3.68848 7.17157 3.68848 10V15C3.68848 17.8284 3.68848 19.2426 4.56716 20.1213C5.44584 21 6.86005 21 9.68848 21H15.6885C18.5169 21 19.9311 21 20.8098 20.1213C21.6885 19.2426 21.6885 17.8284 21.6885 15V10C21.6885 7.17157 21.6885 5.75736 20.8098 4.87868C20.3199 4.38879 19.6636 4.17203 18.6885 4.07612L18.6885 6C18.6885 7.10457 17.793 8 16.6885 8C15.5839 8 14.6885 7.10457 14.6885 6L14.6885 4ZM7.68848 12C7.68848 11.4477 8.13619 11 8.68848 11L16.6885 11C17.2408 11 17.6885 11.4477 17.6885 12C17.6885 12.5523 17.2408 13 16.6885 13L8.68848 13C8.13619 13 7.68848 12.5523 7.68848 12ZM8.68848 15C8.13619 15 7.68848 15.4477 7.68848 16C7.68848 16.5523 8.13619 17 8.68848 17L16.6885 17C17.2408 17 17.6885 16.5523 17.6885 16C17.6885 15.4477 17.2408 15 16.6885 15L8.68848 15Z"
              fill="white"
            />
          </svg>

          <span className="ms-2">วันที่ {formatDate(appointment.start)}</span>
        </div>
        <div className="d-flex align-items-center">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.37598 9C2.37598 4.96142 5.64989 1.6875 9.68848 1.6875C13.7271 1.6875 17.001 4.96142 17.001 9C17.001 13.0386 13.7271 16.3125 9.68848 16.3125C5.64989 16.3125 2.37598 13.0386 2.37598 9ZM9.68848 0C4.71791 0 0.688477 4.02944 0.688477 9C0.688477 13.9706 4.71791 18 9.68848 18C14.659 18 18.6885 13.9706 18.6885 9C18.6885 4.02944 14.659 0 9.68848 0ZM10.5322 4.10638C10.5322 3.64039 10.1545 3.26263 9.68848 3.26263C9.22249 3.26263 8.84473 3.64039 8.84473 4.10638V9.00013C8.84473 9.31972 9.02529 9.61188 9.31114 9.7548L12.5736 11.3861C12.9904 11.5944 13.4973 11.4255 13.7056 11.0087C13.914 10.5919 13.7451 10.0851 13.3283 9.87671C11.6147 9.01989 10.5322 7.26844 10.5322 5.35254V4.10638Z"
              fill="white"
            />
          </svg>

          <span className="ms-[12px]">{formatTime(appointment.start)} น.</span>
        </div>
      </div>
    </div>
  </div>
);

const AppointmentCard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing.");
      }

      const payload = {
        date_start: "2023-11-01",
        date_end: "2024-12-01",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/calendar`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data?.data || [];
      const formattedAppointments = data.map((item) => ({
        id: item.id,
        title: item.title,
        start: item.start,
        end: item.end,
        backgroundColor: item.backgroundColor,
        color: "white", 
      }));
      setAppointments(formattedAppointments);
    } catch (err) {
      setError(err.message || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container py-4">
      <h4 style={{ color: "#00AD98", marginBottom: "20px" }}>รายการนัดหมาย</h4>

      {loading ? (
        <p>กำลังโหลด...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : appointments.length === 0 ? (
        <p>ไม่มีนัดหมายในระบบ</p>
      ) : (
        appointments.map((appointment) => (
          <ListAppointment key={appointment.id} appointment={appointment} />
        ))
      )}
    </div>
  );
};

export default AppointmentCard;
