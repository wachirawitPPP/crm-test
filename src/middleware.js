import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const cookies = request.cookies;

  // Retrieve authentication-related cookies
  const lineId = cookies.get("lineId");
  const lineName = cookies.get("lineName");
  const lineEmail = cookies.get("lineEmail");
  const token = cookies.get("token");

  let isExpire = false;

  // Token expiration check
  if (token) {
    try {
      const deCodedToken = jwtDecode(token.value);
      const currentTime = Math.floor(Date.now() / 1000);
      isExpire = deCodedToken.exp < currentTime;
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  }

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isCheckAuthPage = request.nextUrl.pathname === "/checkAuth";
  const isProtectedRoute = [
    "/",
    "/profile",
    "/dashboard",
    "/xray",
    "/lab",
    "/medcf",
    "/historyreceipt",
    "/appointment",
    "/appointment/addAppointment",
    "/print/xray-page",
    "/print/lab-page",
    "/print/certifycate-general-page",
    "/print/receipt-page",
  ].includes(request.nextUrl.pathname);



  

  // Skip checks for the /login route
  if (isLoginPage || isCheckAuthPage) {
    return NextResponse.next();
  }
  if(request.nextUrl.pathname ==="/"){
    return NextResponse.redirect(new URL("/appointment", request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute) {
    if (isExpire) {
      console.log("Token expired");
      return NextResponse.redirect(new URL("/checkAuth", request.url));
    }
    if (!lineId || !lineName || !lineEmail || !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
