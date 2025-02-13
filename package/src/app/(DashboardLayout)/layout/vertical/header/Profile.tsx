import {Button, Dropdown} from "flowbite-react";
import React, {useEffect, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {useRouter} from "next/navigation";
import {Toast} from "primereact/toast";
import {deleteCookie, getCookie} from "cookies-next";

var jwt = require('jsonwebtoken');

const Profile = () => {
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const [user, setUser] = React.useState("");

    const handleLogout = () => {
        // ✅ Xóa token khỏi cookies
        deleteCookie("token");

        // ✅ Hiển thị thông báo
        toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Đăng xuất thành công!",
        });

        // ✅ Chuyển hướng về trang đăng nhập sau 0.5s
        setTimeout(() => {
            router.push("/auth/login");
        }, 500);
    };

    useEffect(() => {
        const token: any = getCookie("token")
        try {
            const decoded = jwt.decode(token);
            setUser(decoded?.sub || "No username found");
        } catch (error) {
            console.error("Invalid token", error);
        }
    }, []);


    return (
        <div className="relative group/menu">
            <Dropdown
                label=""
                className="rounded-sm w-44"
                dismissOnClick={false}
                renderTrigger={() => (
                        <span
                            className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:text-primary"
                        >
                            <span style={{marginRight: "10px"}}>{user}</span>
                            <Image
                                src="/images/profile/user-1.jpg"
                                alt="logo"
                                height="35"
                                width="35"
                                className="rounded-full"
                            />
                        </span>
                )}
            >

                <Dropdown.Item
                    as={Link}
                    href="#"
                    className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
                >
                    <Icon icon="solar:user-circle-outline" height={20}/>
                    My Profile
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    href="#"
                    className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
                >
                    <Icon icon="solar:letter-linear" height={20}/>
                    My Account
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    href="#"
                    className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
                >
                    <Icon icon="solar:checklist-linear" height={20}/>
                    My Task
                </Dropdown.Item>
                <div className="p-3 pt-0">
                    <Button size={'sm'} onClick={handleLogout}
                            className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none">Logout</Button>
                </div>
            </Dropdown>
            <Toast ref={toast} position="bottom-left"/>
        </div>
    );
};

export default Profile;
