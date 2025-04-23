import React from "react";

export default function contentPage({ indexPaper, list }) {
  const colHeaderBorder =
    "h-[24px] w-full bg-[#017d89] flex items-center justify-center border-r-2 border-l-1 border-t-1 border-b-1 border-[#e5e7eb]";
  const colTitle =
    "h-[24px] w-full bg-[#017d89] flex items-center justify-center";
  const colRowLeft = "h-[24px] flex items-center justify-start";
  const colRowCenter = "h-[24px] flex items-center justify-center";
  const colRowRight = "h-[24px] flex items-center justify-end";
  const colBorderStart =
    "w-full border-l-2 border-r-2 border-b-2 border-[#e5e7eb]";
  const colBorder = "w-full  border-r-2 border-b-2 border-[#e5e7eb]";
  const textNormal = 'text-[#334155] text-[9px] leading-[18px]'

  const obj = {
    id: "",
    chk_name: "",
    chk_value: "",
    chk_direction_detail: "",
    chk_flag: "",
    chk_old: "",
  };

  const itemInPaper = 25;

  let newList = [];

  let dataList = list;
  let indexNumber = "";

  dataList.forEach((element) => {
    newList.push(element);
  });
  // console.log(newList.length);
  if (newList.length < itemInPaper) {
    let num = itemInPaper - newList.length;
    for (let i = 0; i < num; i++) {
      // console.log(i);
      newList.push(obj);
    }
  }

  dataList = newList;

  // console.log(" newList", newList);

  return (
    <>
      <div className={`w-full mb-4 ${textNormal}`}>
        <table className="w-full">
          <thead>
            <tr className="w-full grid grid-cols-10 bg-[#017d89] text-[#ffffff]">
              <th className={`col-span-5 ${colHeaderBorder}`}>
                <div>รายการตรวจ</div>
              </th>
              <th className={`col-span-1 ${colHeaderBorder}`}>
                <div>ค่าที่ตรวจ</div>
              </th>
              <th className={`col-span-1 ${colHeaderBorder}`}>
                <div> ค่าอ้างอิง</div>
              </th>
              <th className={`${colHeaderBorder}`}>
                <div>Flag</div>
              </th>
              <th className={`col-span-2 ${colTitle}`}>
                <div> ผลตรวจก่อนหน้า</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => {
              if (item.id != "") {
                indexNumber = `${
                  index + 1 + ((indexPaper + 1) * itemInPaper - itemInPaper)
                })`;
              } else {
                indexNumber = "";
              }

              return (
                <tr key={index + 1} className={`w-full grid grid-cols-10 `}>
                  <td className={`col-span-5 ${colRowLeft} ${colBorderStart}`}>
                    <div className="w-full pl-2">
                      {indexNumber} {item.chk_name}
                    </div>
                  </td>
                  <td className={`col-span-1 ${colRowCenter} ${colBorder}`}>
                    <div>{item.chk_value}</div>
                  </td>
                  <td className={`col-span-1 ${colRowCenter} ${colBorder}`}>
                    <div>{item.chk_direction_detail}</div>
                  </td>
                  <td className={` ${colRowRight} ${colBorder}`}>
                    <div className="pr-2">{item.chk_flag}</div>
                  </td>
                  <td className={`col-span-2 ${colRowLeft} ${colBorder}`}>
                    <div className="pl-2">{item.chk_old}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
