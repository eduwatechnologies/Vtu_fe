"use client";
import React from "react";
import { Header } from "./home/header";
import { Footer } from "./home/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
