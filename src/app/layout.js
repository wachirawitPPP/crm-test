import localFont from "next/font/local";
import "./globals.css";
import '../assets/css/style.css';
import MainLayout from "../components/MainLayout";
import ProfileLayout from "../components/ProfileLayout";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LINE CRM - APS_X Platform",
  description: "LINE CRM - APS_X Platform created by APSTH",
  keyword: "LINE CRM, APS_X Platform, โปรแกรม คลินิก, โปรแกรมคลินิก,ระบบ คลินิก, โปรแกรม clinic, ราคา, โปรแกรมคลินิก ราคา, ระบบคลินิก, hospital, spa, wellness, ศุนย์ดูแลผู้สูงอาย, คลินิกความงาม, คลินิกเฉพาะทาง, คลินิกเวชกรรม, คลินิกทั่วไป, คลินิกพยาบาลผดุงครรภ์, คลินิกกายภาพบำบัด, คลินิกแพทย์แผนไทย-จีน, คลินิกอายุรกรรม, คลินิกสุขภาพจิต, คลินิกแม่และเด็ก, คลินิกบําบัดยาเสพติด, คลินิกตา, ใบเสร็จรับยา, opd card, pos คลินิก, APSX, APS, apsth, Prasan Srisopa, 0981816769, 043002488"
};

export default function RootLayout({ children, userData }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {userData ? (
          <MainLayout>
            {children}
          </MainLayout>
        ) : (
          <>{children}</> 
        )}
      </body>
    </html>
  );
}
