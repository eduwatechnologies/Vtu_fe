export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Privacy Policy
        </h1>
        <p className="mb-6">
          <strong>Effective Date:</strong> January 1, 2025
        </p>

        <section className="space-y-4">
          <p>
            Welcome to <strong>PayOnce</strong>. Your privacy is very important
            to us. This Privacy Policy explains how we collect, use, and protect
            your information when you use our website and services.
          </p>

          <h2 className="text-xl font-semibold text-purple-600 mt-6">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6">
            <li>Personal info (name, email, phone, password)</li>
            <li>Transaction and wallet data</li>
            <li>Device & usage information</li>
          </ul>

          <h2 className="text-xl font-semibold text-purple-600 mt-6">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6">
            <li>To provide and improve VTU services</li>
            <li>To process transactions and payments</li>
            <li>To detect fraud and ensure security</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-xl font-semibold text-purple-600 mt-6">
            3. Data Security
          </h2>
          <p>
            We use SSL encryption and secure servers to protect your data.
            However, you are responsible for keeping your login credentials
            safe.
          </p>

          <h2 className="text-xl font-semibold text-purple-600 mt-6">
            4. Your Rights
          </h2>
          <p>
            You may request account deletion or data access at{" "}
            <a
              href="mailto:support@payonce.com"
              className="text-purple-600 underline"
            >
              support@payonce.com
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold text-purple-600 mt-6">
            5. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Please review this
            page for updates.
          </p>
        </section>
      </div>
    </div>
  );
}
