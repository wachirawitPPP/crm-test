"use client";

import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Thai } from "flatpickr/dist/l10n/th.js";
import "../../assets/css/apppointments.css";
import MainLayout from "../../components/MainLayout";
import addcalendar from "../../assets/images/icons/add-calendar.png";
import calendar from "../../assets/images/icons/calendar.png";
import axios from "axios";
import Image from "next/image";
import NoDataIllustration from "../../components/NoData";

const formatDate = (dateString) => {
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
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatTime = (datetimeString) => {
  try {
    const date = new Date(datetimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Invalid datetime format:", datetimeString);
    return "ไม่ระบุเวลา";
  }
};

const DatePickerComponent = ({
  appointments,
  handleMonthChange,
  dateHilights,
}) => {
  const calendarRef = useRef(null);
  const flatpickrInstance = useRef(null);

  const highlightDates = () => {
    if (!flatpickrInstance.current) return;

    try {
      const instance = flatpickrInstance.current;

      // Check if calendarContainer is available
      if (instance.calendarContainer) {
        const days =
          instance.calendarContainer.querySelectorAll(".flatpickr-day");

        days.forEach((dayElem) => {
          const dayDate = dayElem.dateObj;
          dayElem.style.backgroundColor = ""; // Reset previous styles
          dayElem.style.color = "";
          dayElem.style.borderRadius = "";

          appointments.forEach((event) => {
            const eventDate = new Date(event.start);
            if (dayDate.toDateString() === eventDate.toDateString()) {
              dayElem.style.backgroundColor =
                event.backgroundColor || "#00ad98";
              dayElem.style.color = "white";
              dayElem.style.borderRadius = "10px";
            }
          });

          dateHilights?.forEach((highlight) => {
            const highlightDate = new Date(highlight.date);
            if (dayDate.toDateString() === highlightDate.toDateString()) {
              dayElem.style.backgroundColor =
                highlight.backgroundColor || "#FFD700";
              dayElem.style.color = highlight.color || "black";
              dayElem.style.borderRadius = "10px";
            }
          });
        });
      }
    } catch (error) {
      console.error("Error in highlightDates:", error);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      flatpickrInstance.current = flatpickr(calendarRef.current, {
        inline: true,
        dateFormat: "Y-m-d",
        locale: Thai,
        defaultDate: new Date(),
        clickOpens: false,
        onReady: (_, __, instance) => {
          highlightDates();
        },
        onMonthChange: (_, __, instance) => {
          const currentMonth = instance.currentMonth + 1; // flatpickr months are zero-indexed
          const currentYear = instance.currentYear;
          const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
          const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
          handleMonthChange(firstDayOfMonth, lastDayOfMonth);
          highlightDates();
        },
      });
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    // Update highlights whenever `appointments` or `dateHilights` change
    highlightDates();
  }, [appointments, dateHilights]);

  return <div ref={calendarRef} className="datepicker-container" />;
};

const AppointmentCard = ({ appointment }) => (
  <div
    className="mb-3 text-white opacity-70"
    style={{
      maxWidth: "auto",
      borderRadius: "15px",

      background:
        "linear-gradient(180deg, #01B5BF 0%, hsl(173, 99%, 34%) 100%)",
    }}
  >
    <div className="card-body d-flex align-items-start p-2">

      <div className="border-l-4 mx-2 px-2 border-white">
        <div className="d-flex  align-items-center mb-2">
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
          <span className="ms-2 text-lg">{appointment.title}</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="ms-2 text-lg">
            แพทย์: {appointment.user_fullname}
          </span>
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
          <span className="ms-2 text-lg">
            วันที่ {formatDate(appointment.start)} เวลา{" "}
            {formatTime(appointment.start)} น.
          </span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="ms-2 text-lg">
            หมายเหตุ: {appointment.ap_note || "-"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Appointment = () => {
  const [dateHilights, setDateHilights] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(1);

  const fetchAppointments = async (dateStart, dateEnd) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing.");
      }

      const payload = {
        date_start: dateStart,
        date_end: dateEnd,
      };

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/list`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data?.data || [];
      const formattedAppointments = data.map((item) => ({
        id: item.id,
        title: item.ap_topic,
        start: item.ap_datetime,
        end: item.ap_datetime,
        backgroundColor: item.ap_color,
        color: item.ap_color,
        user_fullname: item.user_fullname,
        ap_status_id: item.ap_status_id,
        ap_note: item.ap_note,
      }));
      setDateHilights(formattedAppointments);
      setAppointments(formattedAppointments);
      setFilteredAppointments(handleDropdownStatus(1)); // Initial filter with all appointments
    } catch (err) {
      setError(err.message || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownStatus = (status) => {
    const filtered = appointments.filter((app) => app.ap_status_id === status);
    return filtered;
  };

  useEffect(() => {
    setFilteredAppointments(handleDropdownStatus(appointmentStatus));
  }, [appointmentStatus, appointments]);

  useEffect(() => {
    const initialStartDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const initialEndDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    fetchAppointments(initialStartDate, initialEndDate);
  }, []);

  const handleMonthChange = (startOfMonth, endOfMonth) => {
    const dateStart = startOfMonth.toISOString().split("T")[0];
    const dateEnd = endOfMonth.toISOString().split("T")[0];
    fetchAppointments(dateStart, dateEnd);
  };

  return (
    <MainLayout>
      <div className="container ">
        <div
          className="py-3 flex justify-between  "
          style={{
            borderTop: "1px solid rgb(226 232 240)",
            borderBottom: "1px solid rgb(226 232 240)",
          }}
        >
          <div className="flex">
            <div>
              <Image
                src={calendar}
                alt="Calendar"
                style={{ width: "32px", height: "32px", marginTop: "-6px" }}
              />
            </div>
            <div className="calendar-detail pl-2">
              <span
                className="name mb-2 text-[14px]"
                style={{ color: "#00AD98" }}
              >
                ตารางนัดหมาย
              </span>
            </div>
          </div>
          <a href="appointment/addAppointment">
            <div className="flex">
              <div className="calendar-detail pr-2 ">
                <span
                  className="name mb-2 text-[14px]"
                  style={{ color: "#00AD98" }}
                >
                  เพิ่มนัดหมาย
                </span>
              </div>
              <div>
                <Image
                  src={addcalendar}
                  alt="Add Calendar"
                  style={{ width: "28px", height: "28px", marginTop: "-6px" }}
                />
              </div>
            </div>
          </a>
        </div>
        <select
          className="w-full border rounded-md p-2 bg-white text-gray-700 my-4"
          onChange={(event) =>
            setAppointmentStatus(parseInt(event.target.value))
          }
          defaultValue={1} // Default value set to 1
        >
          <option value={1}>รอดำเนินการ</option>
          <option value={2}>รอยืนยัน</option>
          <option value={3}>เสร็จสิ้น</option>
          {/* Add more options as needed */}
        </select>

        <div className="calendar-wrapper d-flex justify-content-center mt-2">
          <DatePickerComponent
            appointments={filteredAppointments}
            handleMonthChange={handleMonthChange}
            dateHilights={dateHilights}
          />
        </div>
        <div
          className="appointments-list mt-3 pt-2 drop-shadow-md"
          style={{ borderTop: "1px solid rgb(226 232 240)" }}
        >
          <span className="ms-2 text-lg">
            รายการนัดหมายทั้งหมด ({filteredAppointments.length}) :{" "}
          </span>
          {loading ? (
            <p>กำลังโหลด...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : filteredAppointments.length === 0 ? (
            <NoDataIllustration />
          ) : (
            filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Appointment;
