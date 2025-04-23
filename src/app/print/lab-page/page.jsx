"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ComponentToPrint from "./componentToPrint";
import axios from "axios";
import ComponentLoading from "../../../components/ComponentLoad";

function MainPage() {
  const [labData, setLabData] = useState();
  const queue_id = useSearchParams().get("queue_id");

  const getLabData = async (id, token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}queue/check/lab/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error("Error fetching lab result", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
      const data = await getLabData(queue_id, token);
      setLabData(data);
    };

    if (queue_id) {
      fetchData();
    }
  }, [queue_id]);

  if (!labData) {
    return (
      <>
        <div className={`w-full flex items-center justify-center py-24`}>
          <ComponentLoading />
        </div>
      </>
    );
  }

  const dataList = labData.checks;

  const itemInPaper = 25;

  let paperNum = dataList.length / itemInPaper;
  let paperPage = parseInt(paperNum.toString());
  if (paperNum % itemInPaper != 0) {
    paperPage++;
  }
  let itemStart = 0;
  let paperList = [];
  for (let i = 0; paperPage > i; i++) {
    let cList = [];
    for (let j = 0; itemInPaper > j; j++) {
      if (itemStart + j < dataList.length) {
        cList.push(dataList[itemStart + j]);
      }
    }
    let paper = { index: i + 1, list: cList };
    paperList.push(paper);
    itemStart += itemInPaper;
  }

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "#D9D9D9",
        height: `${paperList.length * 1200}px`,
      }}
    >
      <ComponentToPrint labData={labData} />
    </div>
  );
}

export default function Wrapper() {
  return (
    <Suspense fallback={<ComponentLoading />}>
      <MainPage />
    </Suspense>
  );
}
