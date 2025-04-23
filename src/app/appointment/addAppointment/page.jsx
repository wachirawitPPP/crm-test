"use client";
import { useState } from "react";

import "../../../assets/css/form.css";
import MainLayout from "../../../components/MainLayout";
import Body from "./addAppointment.body";
import StepAppointment from "./addAppointment.Step";

const AddAppointment = () => {
  //appointment state เอาไว้เชื่อมกับ Step เเละ Body นะน้องงห้ามลบนะะะะ
  const [sectionIndex, SetSectionIndex] = useState(0);
  const [stepProgress, SetStepProgress] = useState(1);

  return (
    <MainLayout>
      <div className="dz-tab style-1 tab-fixed">
        {/* <TabSlideEffect /> */}
      </div>
      <StepAppointment sectionIndex={sectionIndex} SetSectionIndex={SetSectionIndex} stepProgress={stepProgress} SetStepProgress={SetStepProgress} />
      <Body sectionIndex={sectionIndex} SetSectionIndex={SetSectionIndex} stepProgress={stepProgress} SetStepProgress={SetStepProgress} />
      {/* <ListAppointment /> */}
    </MainLayout>
  );
};

export default AddAppointment;
