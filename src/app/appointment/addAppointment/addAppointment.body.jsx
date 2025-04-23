"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import moment from "moment";
import { useRouter } from "next/navigation";

const Body = ({
  sectionIndex,
  SetSectionIndex,
  stepProgress,
  SetStepProgress,
}) => {
  const router = useRouter();

  const [hasCall, setCall] = useState(false);

  // สำหรับแพทย์
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [isDoctorDropdownOpen, setDoctorDropdownOpen] = useState(false);

  // สำหรับหัวข้อ
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isTopicDropdownOpen, setTopicDropdownOpen] = useState(false);

  // สำหรับเวลา
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimeDropdownOpen, setTimeDropdownOpen] = useState(false);

  // สำหรับวันที่
  const [rangeDate, setRangeDate] = useState(""); // เก็บวันที่นัดหมาย

  // Loading และ Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNextStep = (e) => {
    e.preventDefault();

    if (sectionIndex === 0) {
      if (!selectedTopics.length || !selectedDoctors.length || !selectedTime) {
        return alert("กรุณากรอกข้อมูลให้ครบ");
      }
    }

    if (sectionIndex < 1) {
      SetSectionIndex(sectionIndex + 1);
      SetStepProgress(stepProgress + 1);
    }
  };

  // ฟังก์ชันโหลดข้อมูลแพทย์
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/doctor`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data?.data || [];
      setDoctors(
        data.map((item) => ({ id: item.id, fullname: item.user_fullname }))
      );
    } catch (err) {
      setError(err.message || "Failed to fetch doctor data.");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันโหลดข้อมูลหัวข้อ
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/topic`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data?.data || [];
      setTopics(data.map((item) => ({ id: item.id, topic_th: item.topic_th })));
    } catch (err) {
      setError(err.message || "Failed to fetch topic data.");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันโหลดข้อมูลเวลา
  const fetchTimes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/time`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data?.data || [];
      setTimes(
        data.map((item, index) => ({
          value: item.TimeData,
          label: formatTimeRange(item.TimeData, data[index + 1]?.TimeData),
          available: item.day_datas === null,
        }))
      );
    } catch (err) {
      setError(err.message || "Failed to fetch time data.");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันแปลงรูปแบบเวลา
  const formatTimeRange = (start, end) => {
    if (!start || !end) return "เวลายังไม่ได้ระบุ";
    const [startHour, startMinute] = start.split(":");
    const [endHour, endMinute] = end.split(":");
    return `${parseInt(startHour, 10)}.${startMinute} - ${parseInt(
      endHour,
      10
    )}.${endMinute} น.`;
  };

  useEffect(() => {
    fetchDoctors();
    fetchTopics();
    fetchTimes();
  }, []);

  // ฟังก์ชันจัดการการเลือก Checkbox
  const toggleSelection = (id, setSelected, selected) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    // if (sectionIndex === 1) {
    //   addAppointment();
    // }
    console.log(sectionIndex)
    console.log(stepProgress)
  }, [sectionIndex]);

  const addAppointment = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing.");

      if (selectedDoctors.length === 0) {
        throw new Error("โปรดเลือกหมอ");
      }

      const doctorId = selectedDoctors[0];
      const appointmentTopic =
        selectedTopics.length > 0
          ? topics.find((topic) => topic.id === selectedTopics[0])?.topic_th
          : "หัวข้อนัดหมาย";

      const appointmentDateTime = moment(
        `${rangeDate} ${selectedTime}`,
        "DD/MM/YYYY HH:mm"
      ).format("YYYY-MM-DD HH:mm:ss");

      const payload = {
        user_id: doctorId,
        ap_topic: appointmentTopic,
        ap_datetime: appointmentDateTime,
      };

    

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}appointment/add`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === true ) {
        alert("เพิ่มการนัดหมายสำเร็จ");
        // router.push("/appointment");
        SetStepProgress(2)
        SetSectionIndex(1)
      } else {
        alert(response.data.message);
        SetStepProgress(1)
        SetSectionIndex(0)
      }
    } catch (err) {
      console.error("Error in addAppointment:", err.message);
      setError(err.message || "Failed to add appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg">
      {sectionIndex === 0 && (
        <>
          {/* เลือกชื่อแพทย์ */}
          <>
            {/* เลือกชื่อแพทย์ */}
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-[#00AD98] mb-2"
            >
              เลือกชื่อแพทย์
            </label>
            <select
              id="doctor"
              className="w-full border rounded-md p-2 bg-white text-gray-700"
              style={{ boxShadow: "3px 3px 15px #e6e6e6" }}
              value={selectedDoctors[0] || ""} // Set the first selected doctor or default
              onChange={(event) =>
                setSelectedDoctors([parseInt(event.target.value)])
              } // Convert to array
            >
              <option value="" disabled>
                เลือกชื่อแพทย์
              </option>
              {loading ? (
                <option disabled>กำลังโหลด...</option>
              ) : error ? (
                <option disabled>{error}</option>
              ) : (
                doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullname}
                  </option>
                ))
              )}
            </select>
          </>

          {/* เลือกหัวข้อ */}
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-[#00AD98] mt-4"
          >
            เลือกหัวข้อ
          </label>
          <select
            id="topic"
            className="w-full border rounded-md p-2 bg-white text-gray-700"
            style={{ boxShadow: "3px 3px 15px #e6e6e6" }}
            value={selectedTopics[0] || ""} // Set the first selected topic or default
            onChange={(event) =>
              setSelectedTopics([parseInt(event.target.value)])
            } // Convert to array
          >
            <option value="" disabled>
              เลือกหัวข้อ
            </option>
            {loading ? (
              <option disabled>กำลังโหลด...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : (
              topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.topic_th}
                </option>
              ))
            )}
          </select>

          {/* เลือกวันที่นัดหมาย */}
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#00AD98] mt-4"
          >
            เลือกวันที่นัดหมาย
          </label>
          <div
            className="relative border rounded-md p-2 bg-white"
            style={{ boxShadow: "3px 3px 15px #e6e6e6" }}
          >
            <DatePicker
              value={rangeDate}
              onChange={setRangeDate}
              format="DD/MM/YYYY"
              placeholder="เลือกวันนัดหมาย"
              locale="th"
              inputClass="w-full border-none focus:ring-0"
            />
          </div>

          {/* เลือกเวลานัด */}
          {/* เลือกเวลานัด */}
          <label
            htmlFor="time"
            className="block text-sm font-medium text-[#00AD98] mt-4"
          >
            เลือกเวลานัด
          </label>
          <select
            id="time"
            className="w-full border rounded-md p-2 bg-white text-gray-700"
            style={{ boxShadow: "3px 3px 15px #e6e6e6" }}
            value={selectedTime || ""} // Set the selected time or default
            onChange={(event) => setSelectedTime(event.target.value)} // Update selected time
          >
            <option value="" disabled>
              เลือกเวลา
            </option>
            {loading ? (
              <option disabled>กำลังโหลด...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : (
              times.map((time, index) => (
                <option
                  key={index}
                  value={time.label}
                  disabled={!time.available} // Disable unavailable times
                >
                  {time.label} 
                </option>
              ))
            )}
          </select>
        </>
      )}

      {sectionIndex === 1 && (
       <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
       <div className="text-center mb-6">
         <h2 className="text-xl font-semibold text-[#00AD98]">
           ยืนยันการนัดหมายสำเร็จ
         </h2>
        
       </div>
       <div className="space-y-4">
         <div className="flex flex-row gap-2 items-center">
           <label
             htmlFor="time"
             className="block text-sm font-medium text-gray-700"
           >
             <span className="text-[#00AD98] font-bold">แพทย์:</span>
           </label>
           <p className="text-gray-900 font-medium">
             {selectedDoctors.length > 0
               ? doctors
                   .filter((doctor) => selectedDoctors.includes(doctor.id))
                   .map((doctor) => doctor.fullname)
                   .join(", ")
               : "ยังไม่ได้เลือก"}
           </p>
         </div>
         <div className="flex flex-row gap-2 items-center">
           <label
             htmlFor="time"
             className="block text-sm font-medium text-gray-700"
           >
             <span className="text-[#00AD98] font-bold">หัวข้อ:</span>
           </label>
           <p className="text-gray-900 font-medium">
             {selectedTopics.length > 0
               ? topics
                   .filter((topic) => selectedTopics.includes(topic.id))
                   .map((topic) => topic.topic_th)
                   .join(", ")
               : "ยังไม่ได้เลือก"}
           </p>
         </div>
         <div className="flex flex-row gap-2 items-center">
           <label
             htmlFor="time"
             className="block text-sm font-medium text-gray-700"
           >
             <span className="text-[#00AD98] font-bold">เวลา:</span>
           </label>
           <p className="text-gray-900 font-medium">
             {selectedTime ? selectedTime : "ยังไม่ได้เลือก"}
           </p>
         </div>
         <div className="flex flex-row gap-2 items-center">
           <label
             htmlFor="time"
             className="block text-sm font-medium text-gray-700"
           >
             <span className="text-[#00AD98] font-bold">วันที่:</span>
           </label>
           <p className="text-gray-900 font-medium">
             {rangeDate
               ? new Date(rangeDate).toLocaleDateString("th-TH")
               : "ยังไม่ได้เลือก"}
           </p>
         </div>
       </div>
     
       <div className="flex justify-center mt-8">
         <button
           className="px-6 py-2 rounded-lg text-white bg-[#00AD98] hover:bg-[#007F74] shadow-md transition transform hover:scale-105"
           onClick={() => {
             router.push("/appointment");
           }}
         >
           กลับสู่หน้าหลัก
         </button>
       </div>
     </div>
     
      )}

      {sectionIndex === 2 && (
        <div>
          <h2>ตรวจสุขภาพ</h2>
          <p>ทำการตรวจสุขภาพตามขั้นตอน</p>
        </div>
      )}

      {sectionIndex === 3 && (
        <div>
          <h2>บันทึกข้อมูล</h2>
          <p>บันทึกข้อมูลนัดหมายให้สมบูรณ์</p>
        </div>
      )}

      {stepProgress === 1 && (
        <div className="flex justify-center space-x-3 mt-3 mb-3">
          <button
            className="border-2 border-[#00AD98] text-[#00AD98] px-4 py-2 rounded-sm hover:bg-[#00AD98] hover:text-white transition"
            onClick={()=>{
              addAppointment();
            }}
          >
            ยืนยัน
          </button>
          <a href="/appointment">
            <button className="border-2 border-[#ff2222] text-[#ff2222] px-4 py-2 rounded-sm hover:bg-[#ff2222] hover:text-white transition">
              ยกเลิก
            </button>{" "}
          </a>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Body;
