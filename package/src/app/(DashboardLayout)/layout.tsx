"use client";
import React from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { Provider } from 'react-redux'
import store from "../Redux/store";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
            <Header />
            {/* Body Content  */}
            <div
              className={`container mx-auto  py-30`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </Provider>

  );
}
