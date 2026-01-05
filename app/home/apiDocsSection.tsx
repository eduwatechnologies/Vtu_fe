import React from "react";
import Link from "next/link";

export const ApiDocsSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="developer-api">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Developer API
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Integrate our VTU services directly into your application with our
            easy-to-use API.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Get Started
              </h3>
              <p className="text-gray-600 mb-4">
                1. Create an account and verify your email.
                <br />
                2. Navigate to your Profile Dashboard.
                <br />
                3. Generate your unique <code>Live Secret Key</code>.
                <br />
                4. Start making requests!
              </p>
              <Link
                href="/auth/signup"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Get API Key
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Authentication
              </h3>
              <p className="text-gray-600 mb-2">
                Authenticate your requests by including your secret key in the
                request header:
              </p>
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                x-api-key: YOUR_API_KEY_HERE
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400 font-mono">
                POST /api/v1/airtime
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-blue-400">
                <code>
                  {`// Example Request
const response = await fetch('https://api.payonce.com.ng/api/v1/airtime', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE'
  },
  body: JSON.stringify({
    networkId: 'mtn',
    phone: '08012345678',
    amount: 100
  })
});

const data = await response.json();`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/docs"
            className="text-blue-600 font-semibold hover:underline text-lg"
          >
            View Full Documentation &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
