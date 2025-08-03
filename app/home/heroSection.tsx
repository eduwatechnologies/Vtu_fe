"use client";

import React from 'react';
import { Phone, Wifi, CheckCircle, Shield, Headphones } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import HeroImage from "../../public/images/HeroImage1.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-sm font-medium px-3 py-1 border rounded-full bg-green-100 text-green-800 border-green-200 mb-4">
              Nigeria's #1 VTU Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Instant <span className="text-green-600">Airtime</span> &{' '}
              <span className="text-blue-600">Data</span> Top-up
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Recharge airtime, buy data bundles, pay electricity bills, and subscribe to cable TV 
              instantly. Fast, secure, and reliable VTU services for all Nigerians.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth/signin">
                <button className="bg_custom hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Recharge Now
                </button>
              </Link>
              <Link href="/auth/signin">
                <button className="border border-blue-600 text-blue-600 text-lg px-8 py-3 rounded-md flex items-center hover:bg-blue-50">
                  <Wifi className="w-5 h-5 mr-2" />
                  Buy Data
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <Image 
              src={HeroImage} 
              alt="Hero" 
              className="w-[300px] md:w-[400px] lg:w-[500px] h-auto"
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
