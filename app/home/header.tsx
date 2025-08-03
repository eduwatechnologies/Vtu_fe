import React from 'react';
import { Phone } from 'lucide-react';
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Almaleek TopUp</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">Services</a>
            <a href="#pricing" className="text-gray-700 hover:text-green-600 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </nav>
         <div className="flex space-x-3">
  <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-100">
    <Link href="/auth/signin">
    Sign In

    </Link>
  </button>
  <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
    <Link href="/auth/signup">

    Sign Up
    </Link>

  </button>
</div>

        </div>
      </div>
    </header>
  );
}