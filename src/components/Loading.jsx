'use client';

import React from 'react';
import Image from "next/image";
import Logo from '../assets/images/apsth/logo.png'

const Loading = () => {
    return (
        <>
            <div
                className="d-flex flex-column vh-100 bg-login"
            >
                <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                    <div className="mb-2">
                        <Image src={Logo} alt="Logo" width={120} height={120} className="img-fluid" />
                    </div>
                    <h2
                        className="fw-bold text-white mb-1 text-[36px]"
                    >
                        Line - CRM
                    </h2>
                    <span className="text-white text-[14px]">
                        ศูนย์รวมโปรโมชั่นและข้อมูลคลินิก
                    </span>
                </div>
                <footer className="footer text-center py-2">
                    <div className="text-white">
                        <span className="text-[10px]">
                            Copyright © 2024 By APSX Platform | <strong>apsth.com</strong>
                        </span>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Loading;
