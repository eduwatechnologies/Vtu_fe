"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/images/logo.png";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" text-white px-6 md:px-20 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image src={logo} alt="Payonce" width={40} height={30} />
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 text-black">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-300">
          Contact Us
        </Link>
        <Link href="/auth/signup" className="hover:text-gray-300">
          Create Account
        </Link>
        <Link href="/terms" className="hover:text-gray-300">
          Terms of Service
        </Link>
        <Link href="/privacypolicy" className="hover:text-gray-300">
          Privacy Policy
        </Link>
      </nav>

      {/* Login Button (desktop) */}
      <Link
        href="/auth/signin"
        className="hidden md:inline-block bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
      >
        Login
      </Link>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-md bg-purple-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-purple-600 flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
          <Link
            href="/"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/auth/signup"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Create Account
          </Link>
          <Link
            href="/terms"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Terms of Service
          </Link>
          <Link
            href="/privacypolicy"
            className="w-full hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Privacy Policy
          </Link>
          <Link
            href="/auth/signin"
            className="w-full bg-white text-purple-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
