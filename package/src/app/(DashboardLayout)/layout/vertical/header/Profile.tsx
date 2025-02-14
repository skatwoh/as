import {Button, Dropdown} from "flowbite-react";
import React, {useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import {Icon} from "@iconify/react";
import {getCookie} from "cookies-next";

var jwt = require('jsonwebtoken');

interface ProfileProps {
    handleLogout?: () => void
}

const Profile = ({handleLogout}: ProfileProps) => {
    const [user, setUser] = React.useState("");

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
        </div>
    );
};

export default Profile;
