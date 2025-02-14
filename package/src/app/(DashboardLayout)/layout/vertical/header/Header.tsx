"use client";
import React, {useState, useEffect, useRef} from "react";
import { Badge, Button, Navbar } from "flowbite-react";
import { Icon } from "@iconify/react";
import Profile from "./Profile";
import FullLogo from "../../shared/logo/FullLogo";
import { Drawer } from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import Link from "next/link";
import {deleteCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {Toast} from "primereact/toast";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const handleLogout = () => {
    try {
      setLoading(true);
      // ✅ Xóa token khỏi cookies
      deleteCookie("token");

      // ✅ Hiển thị thông báo
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Đăng xuất thành công!",
      });
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Lỗi đăng xuất!",
      });
    } finally {
      router.push("/auth/login");
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
              <p className="text-white mt-4 text-lg">Đang đăng nhập...</p>
            </div>
          </div>
      )}
      <header
        className={`sticky top-0 z-[5] ${
          isSticky
            ? "bg-lightgray dark:bg-dark shadow-md fixed w-full"
            : "bg-transparent"
        }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
        >
          {/* Mobile Toggle Icon */}

          <div className="flex gap-3 items-center justify-between w-full ">
            <div className="flex gap-2 items-center">
              <span
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21} />
              </span>
              <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer relative">
                <Icon icon="solar:bell-linear" height={20} />
                <Badge className="h-2 w-2 rounded-full absolute end-2 top-1 bg-primary p-0"></Badge>
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {/*<Button as={Link} href="https://www.wrappixel.com/templates/materialm-next-js-tailwind-dashboard-template/?ref=33" target="_blank" size={'sm'} color={"primary"}>*/}
              {/*  Upgrade To Pro */}
              {/*</Button>*/}
              <Profile handleLogout={handleLogout}/>
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>
      <Toast ref={toast} position="bottom-left"/>
    </>
  );
};

export default Header;
