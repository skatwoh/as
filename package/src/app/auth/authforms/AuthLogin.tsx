"use client";

import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import Link from "next/link";
import React, {useRef, useState} from "react";
import userService from "@/api/userService";
import { setCookie } from "cookies-next";
import {Toast} from "primereact/toast";
import {useRouter} from "next/navigation";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const AuthLogin = () => {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<any>({
    username: '',
    password: ''
  });

  const handleLogin = React.useCallback(async () => {
    try {
      setLoading(true);
      const item: any = await userService.signIn(formData.username, formData.password);
      const token = item?.data?.data;

      if (token) {
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 7);
        setCookie("token", token, {expires: expiresDate, path: "/"});
        toast.current?.show({ severity: 'success', summary: 'Success', detail: "Đăng nhập thành công" });
        router.push("/");
      }
    } catch (error: any) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }

  },[formData.username, formData.password, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

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
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="Username" value="Username"/>
            </div>
            <TextInput
                id="username"
                type="text"
                sizing="md"
                className="form-control"
                value={formData.username}
                onChange={(e) => handleChange(e, "username")}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="userpwd" value="Password"/>
            </div>
            <TextInput
                id="userpwd"
                type="password"
                sizing="md"
                className="form-control"
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <div className="flex justify-between my-5">
            <div className="flex items-center gap-2">
              <Checkbox id="accept" className="checkbox"/>
              <Label
                  htmlFor="accept"
                  className="opacity-90 font-normal cursor-pointer"
              >
                Remeber this Device
              </Label>
            </div>
            <Link href={"/"} className="text-primary text-sm font-medium">
              Forgot Password ?
            </Link>
          </div>
          <Button color={"primary"} className="w-full" type={"submit"}>
            Sign in
          </Button>
        </form>
        <div className="card flex justify-content-center">
          <Toast ref={toast}/>
        </div>
      </>
  );
};

export default AuthLogin;
