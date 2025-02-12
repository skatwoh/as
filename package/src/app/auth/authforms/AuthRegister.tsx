"use client";

import {Alert, Button, Label, TextInput} from "flowbite-react";
import React, {useState} from "react";
import userService from '../../../api/userService';
import {HiInformationCircle} from "react-icons/hi"; // Adjust the import path as needed

const AuthRegister = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = React.useCallback(async () => {
        try {
            const response = await userService.signUp(name, password, email);
            console.log('User registered successfully:', response);
        } catch (error: any) {
            <Alert
                color="error"
                icon={HiInformationCircle}
                className="rounded-md"
            >
                <span className="font-medium">Danger</span> - A simple Danger
                alert
            </Alert>
            console.error('Error registering user:', error?.response?.data?.message);
        }
    }, [name, password, email]);

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
            </form>
        </>
    )
}

export default AuthRegister;