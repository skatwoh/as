"use client";

import {useRouter, usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";
import {deleteCookie, getCookie} from "cookies-next";
import {Inter} from "next/font/google";
import "simplebar-react/dist/simplebar.min.css";
import "./css/globals.css";
import {Flowbite, ThemeModeScript} from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";
import {jwtDecode} from "jwt-decode";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const token = getCookie("token"); // Lấy token từ cookie
        const publicRoutes = ["/auth/login", "/auth/register"];
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                const currentTime = Math.floor(Date.now() / 1000);
                // @ts-ignore
                if (currentTime >= decoded.exp) {
                    deleteCookie("token");
                    router.replace("/auth/login");
                    setIsAuthChecked(true);
                } else {
                    setIsAuthChecked(true);
                }
            }
        } else if (!token && !publicRoutes.includes(pathname)) {
            router.replace("/auth/login");
            setIsAuthChecked(true);
        }
    }, [pathname, router]);

    if (!isAuthChecked) {
        return (
            <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
                <ThemeModeScript/>
            </head>
            <body className={`${inter.className}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
                        <p className="text-white mt-4 text-lg">Loading...</p>
                    </div>
                </div>
            </div>
            </body>
            </html>
        );
    }

    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/noun-cloud-5430924.svg" type="image/svg+xml"/>
            <ThemeModeScript/>
        </head>
        <body className={`${inter.className}`}>
        <Flowbite theme={{theme: customTheme}}>{children}</Flowbite>
        </body>
        </html>
    );
}
