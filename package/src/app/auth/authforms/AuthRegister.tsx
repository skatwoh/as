"use client";

import {Button, Label, TextInput} from "flowbite-react";
import React, {useRef, useState} from "react";
import userService from '../../../api/userService';
import {Toast} from "primereact/toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {useRouter} from "next/navigation";


const AuthRegister = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const handleSignUp = React.useCallback(async () => {
        try {
            const item: any = await userService.signUp(name, password, email);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: item?.response?.data?.message });
            setTimeout(() => {
                router.push('/auth/login');
            }, 500)
        } catch (error: any) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: error?.response?.data?.message });
        }
    }, [name, password, email, router]);

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSignUp();
            }}>
                <div className="mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name"/>
                    </div>
                    <TextInput
                        id="name"
                        type="text"
                        sizing="md"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email"/>
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        sizing="md"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <div className="mb-2 block">
                        <Label htmlFor="userpwd" value="Password"/>
                    </div>
                    <TextInput
                        id="userpwd"
                        type="password"
                        sizing="md"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" color={'primary'} className="w-full">Sign Up</Button>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}/>
                </div>
            </form>
        </>
    )
}

export default AuthRegister;