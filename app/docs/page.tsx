"use client";
import React, { useState } from "react";
import ApHomeHeader from "@/components/homeHeader";
import Link from "next/link";

const endpoints = [
  { id: "auth", title: "Authentication" },
  { id: "plans", title: "Get Plans" },
  { id: "categories", title: "Get Categories" },
  { id: "airtime", title: "Purchase Airtime" },
  { id: "data", title: "Purchase Data" },
  { id: "cable-verify", title: "Verify Cable TV" },
  { id: "cable", title: "Purchase Cable TV" },
  { id: "electricity-verify", title: "Verify Electricity" },
  { id: "electricity", title: "Purchase Electricity" },
  { id: "exam", title: "Purchase Exam Pin" },
];

export default function ApiDocs() {
  const [activeSection, setActiveSection] = useState("auth");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ApHomeHeader />
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-800">API Reference</h3>
            <ul className="space-y-2">
              {endpoints.map((endpoint) => (
                <li key={endpoint.id}>
                  <button
                    onClick={() => scrollToSection(endpoint.id)}
                    className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeSection === endpoint.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {endpoint.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-12 pb-20">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
            <p className="text-gray-600 text-lg">
              Welcome to the Developer API. You can use our API to integrate VTU services directly into your application.
              <br />
              Base URL: <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">https://api.payonce.com.ng/api/v1</code>
            </p>
          </div>

          {/* Authentication */}
          <section id="auth" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
            <p className="text-gray-600 mb-6">
              All API requests must be authenticated using your API Key. Include the key in the request header.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-100 font-mono text-sm">
                x-api-key: YOUR_API_KEY_HERE
              </pre>
            </div>
          </section>

          {/* Get Plans */}
          <section id="plans" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">GET</span>
              <h2 className="text-2xl font-bold text-gray-900">Get Plans</h2>
            </div>
            <p className="text-gray-600 mb-4">Fetch available service plans based on network and category.</p>
            
            <h3 className="font-semibold text-gray-800 mb-2">Parameters</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li><code className="text-sm bg-gray-100 px-1 rounded">network</code> (string): mtn, airtel, glo, 9mobile</li>
              <li><code className="text-sm bg-gray-100 px-1 rounded">category</code> (string): data, airtime, cable, electricity</li>
            </ul>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-blue-400 font-mono text-sm">
{`GET /plans?network=mtn&category=data`}
              </pre>
            </div>
          </section>

          {/* Get Categories */}
          <section id="categories" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
             <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">GET</span>
              <h2 className="text-2xl font-bold text-gray-900">Get Categories</h2>
            </div>
            <p className="text-gray-600 mb-4">Fetch available categories for a specific network.</p>

            <h3 className="font-semibold text-gray-800 mb-2">Parameters</h3>
             <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li><code className="text-sm bg-gray-100 px-1 rounded">network</code> (string): mtn, airtel, glo, 9mobile</li>
              <li><code className="text-sm bg-gray-100 px-1 rounded">serviceType</code> (string): data, airtime, etc.</li>
            </ul>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-blue-400 font-mono text-sm">
{`GET /categories?network=mtn&serviceType=data`}
              </pre>
            </div>
          </section>

          {/* Purchase Airtime */}
          <section id="airtime" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Airtime</h2>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-2">Body Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-sm font-semibold text-gray-700">Field</th>
                    <th className="py-2 text-sm font-semibold text-gray-700">Type</th>
                    <th className="py-2 text-sm font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">networkId</td>
                    <td className="py-2">string</td>
                    <td className="py-2">mtn, airtel, glo, 9mobile</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">phone</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Recipient phone number</td>
                  </tr>
                   <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">amount</td>
                    <td className="py-2">number</td>
                    <td className="py-2">Amount to purchase</td>
                  </tr>
                   <tr>
                    <td className="py-2 font-mono">airtimeType</td>
                    <td className="py-2">string</td>
                    <td className="py-2">VTU (optional, default: VTU)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "networkId": "mtn",
  "phone": "08012345678",
  "amount": 100,
  "airtimeType": "VTU"
}`}
              </pre>
            </div>
          </section>

          {/* Purchase Data */}
          <section id="data" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Data</h2>
            </div>

             <h3 className="font-semibold text-gray-800 mb-2">Body Parameters</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-sm font-semibold text-gray-700">Field</th>
                    <th className="py-2 text-sm font-semibold text-gray-700">Type</th>
                    <th className="py-2 text-sm font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                   <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">networkId</td>
                    <td className="py-2">string</td>
                    <td className="py-2">mtn, airtel, glo, 9mobile</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">planId</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Plan ID from "Get Plans" endpoint</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-mono">phone</td>
                    <td className="py-2">string</td>
                    <td className="py-2">Recipient phone number</td>
                  </tr>
                   <tr>
                    <td className="py-2 font-mono">amount</td>
                    <td className="py-2">number</td>
                    <td className="py-2">Plan price</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "networkId": "mtn",
  "planId": "65f2...",
  "phone": "08012345678",
  "amount": 500
}`}
              </pre>
            </div>
          </section>

          {/* Verify Cable TV */}
           <section id="cable-verify" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Verify Cable TV</h2>
            </div>
            <p className="text-gray-600 mb-4">Verify smartcard number before purchase.</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "cableType": "dstv", // dstv, gotv, startimes
  "smartCardNo": "1234567890"
}`}
              </pre>
            </div>
          </section>

           {/* Purchase Cable TV */}
           <section id="cable" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Cable TV</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "provider": "dstv",
  "planId": "65f...",
  "smartCardNo": "1234567890",
  "customerName": "John Doe",
  "phone": "08012345678",
  "amount": 2500
}`}
              </pre>
            </div>
          </section>

           {/* Verify Electricity */}
           <section id="electricity-verify" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Verify Electricity</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "company": "ikejaelectric",
  "metertype": "prepaid", // prepaid or postpaid
  "meterno": "1234567890",
  "amount": 1000 // optional, for validation
}`}
              </pre>
            </div>
          </section>

           {/* Purchase Electricity */}
           <section id="electricity" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Electricity</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "company": "ikejaelectric",
  "type": "prepaid",
  "meter_no": "1234567890",
  "amount": 1000,
  "planId": "65f...",
  "phone": "08012345678"
}`}
              </pre>
            </div>
          </section>
          
           {/* Purchase Exam Pin */}
           <section id="exam" className="bg-white rounded-xl shadow-sm p-8 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">POST</span>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Exam Pin</h2>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
               <pre className="text-blue-400 font-mono text-sm">
{`// Request Body
{
  "planId": "65f...",
  "noOfPin": 1
}`}
              </pre>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
