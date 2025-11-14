import { Header } from "../home/header";

export default function TermsAndConditions() {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">
            Terms & Conditions
          </h1>
          <p className="mb-6">
            <strong>Effective Date:</strong> November 14, 2025
          </p>

          <section className="space-y-4">
            <p>
              Welcome to <strong>PayOnce</strong>. By using our VTU services,
              you agree to the following terms and conditions.
            </p>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              1. Account Registration
            </h2>
            <p>
              You must provide accurate information and keep your login details
              secure. You are responsible for all activities under your account.
            </p>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              2. Wallet & Payments
            </h2>
            <ul className="list-disc ml-6">
              <li>All transactions are final once processed.</li>
              <li>Refunds are only issued for verified failed transactions.</li>
              <li>Wallet balances do not accrue interest.</li>
            </ul>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              3. Prohibited Use
            </h2>
            <p>
              You may not use PayOnce for any illegal or fraudulent activity or
              to interfere with our platform or services.
            </p>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              4. Limitation of Liability
            </h2>
            <p>
              PayOnce is not liable for delays, network issues, or losses caused
              by third-party providers or telecom networks.
            </p>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              5. Account Termination
            </h2>
            <p>
              We may suspend or terminate accounts involved in fraud or
              violation of these terms.
            </p>

            <h2 className="text-xl font-semibold text-purple-600 mt-6">
              6. Contact Us
            </h2>
            <p>
              For questions, contact us at{" "}
              <a
                href="mailto:support@payonce.com"
                className="text-purple-600 underline"
              >
                support@payonce.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
