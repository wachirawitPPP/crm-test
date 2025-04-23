'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Logo from '../../assets/images/apsth/logo.png';
import TermOfUse from "../../components/TermOfUse"

export default function Condition() {
    const [isAccepted, setIsAccepted] = useState(false);
    const router = useRouter();

    function handleCheckboxChange(e) {
        setIsAccepted(e.target.checked); // Update checkbox state
    }

    function handleSubmit() {
        if (isAccepted) {
            router.push('/verify');
        }
    }

    return (
        <div className="min-h-screen bg-[#00ae99] flex flex-col">
            {/* Header */}
            <header className="mt-20">
                <div className="flex justify-center">
                    <Image src={Logo} alt="Logo" width={80} height={80} />
                </div>
                <h2 className="text-center text-white text-sm font-medium mt-2">Line - CRM</h2>
            </header>

            {/* Main Content */}
            <div className="flex-1 bg-gradient-to-b from-[#00AD98] to-[#00D4C0] ">
                <div className="container flex flex-col w-ful justify-center items-center mx-auto px-4">
                    <h2 className="text-white text-xl font-normal mb-2">เริ่มต้นการใช้งาน</h2>
                    <h2 className="text-white text-sm font-normal mb-4">ข้อกำหนดและเงื่อนไข</h2>
                </div>
                <div className="px-2 mb-40">

                      <TermOfUse/>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-4 px-6 z-50">
    <div className="flex items-center mb-4">
        <input
            type="checkbox"
            id="Checked-1"
            className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-[#00AD98] focus:outline-none"
            onChange={handleCheckboxChange}
        />
        <label
            htmlFor="Checked-1"
            className="ml-3 text-[#00AD98] text-sm"
        >
            ข้าพเจ้าตกลงและยอมรับข้อกำหนดและเงื่อนไข
        </label>
    </div>
    <div className="flex justify-between">
        {/* Reject Button */}
        <div className="flex items-center">
    <button
        type="button"
        className="w-12 h-12 bg-[#ff8080] rounded-full flex justify-center items-center text-white"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6" // Icon size
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" // Creates the X shape
            />
        </svg>
    </button>
    <span className="ml-3 text-sm">ไม่ยอมรับ</span>
</div>

        {/* Accept Button */}
        <div className="flex items-center">
    <span className="mr-3 text-sm">ยอมรับ</span>
    <button
        type="button"
        className={`w-12 h-12 rounded-full flex justify-center items-center ${
            isAccepted ? "bg-[#00AD98] text-white cursor-pointer" : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!isAccepted}
        onClick={handleSubmit}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${
                isAccepted ? "text-white" : "text-gray-500"
            }`} // Dynamically change icon color
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    </button>
</div>

    </div>
</div>

        </div>
    );
}
