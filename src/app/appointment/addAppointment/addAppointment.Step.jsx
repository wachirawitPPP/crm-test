"use client";
import React, { useState } from "react";
const steps = [
  {
    label: "ลงนัดหมาย",
    icon: (
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5592 0.74707H8.70376L8.70376 3.2107C8.70376 4.31526 7.80833 5.2107 6.70376 5.21069C5.59919 5.21069 4.70376 4.31526 4.70376 3.21069L4.70376 0.803483C3.24162 0.898099 2.30455 1.1514 1.62642 1.82954C0.543945 2.91201 0.543945 4.65422 0.543945 8.13864V14.2983C0.543945 17.7827 0.543945 19.5249 1.62642 20.6074C2.70888 21.6898 4.45109 21.6898 7.93551 21.6898H15.3271C18.8115 21.6898 20.5537 21.6898 21.6362 20.6074C22.7186 19.5249 22.7186 17.7827 22.7186 14.2983V8.13864C22.7186 4.65422 22.7186 2.91201 21.6362 1.82954C20.9581 1.15146 20.0211 0.89814 18.5592 0.803506V3.21069C18.5592 4.31526 17.6637 5.21069 16.5592 5.21069C15.4546 5.21069 14.5592 4.31526 14.5592 3.21069L14.5592 0.74707ZM5.70388 10.6023C5.70388 10.05 6.15159 9.60229 6.70388 9.60229L16.5593 9.60229C17.1116 9.60229 17.5593 10.05 17.5593 10.6023C17.5593 11.1546 17.1116 11.6023 16.5593 11.6023L6.70388 11.6023C6.15159 11.6023 5.70388 11.1546 5.70388 10.6023ZM6.70388 14.5301C6.15159 14.5301 5.70388 14.9778 5.70388 15.5301C5.70388 16.0824 6.15159 16.5301 6.70388 16.5301L16.5593 16.5301C17.1116 16.5301 17.5593 16.0824 17.5593 15.5301C17.5593 14.9778 17.1116 14.5301 16.5593 14.5301L6.70388 14.5301Z"
          fill="white"
        />
      </svg>
    ),
  },
 
  {
    label: "นัดหมายสำเร็จ",
    icon: (
      <svg
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.89014 10.588L6.50987 16.9941L13.4395 9.6025L20.3691 2.21094"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const StepAppointment = ({ sectionIndex, SetSectionIndex, stepProgress, SetStepProgress }) => {

  const handleSetStepProgress = (newStep) => {
    if (stepProgress >= newStep) {
      SetSectionIndex(newStep - 1);
    }
  };

  return (
    <div className="container py-4">
      <div className="step-progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${
            stepProgress >= index + 1 ? "active" : ""
          }`}
          onClick={() => handleSetStepProgress(index + 1)}
        >
          <div className="step-icon">{step.icon}</div>
          <div className="step-label mt-0">
            <span className="font-12">{step.label}</span>
          </div>
        </div>
      ))}
      <div className="line-connect-step"></div>
    </div>
    </div>
  );
};

export default StepAppointment;
