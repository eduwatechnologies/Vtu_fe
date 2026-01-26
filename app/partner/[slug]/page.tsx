import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch partner data server-side
async function getPartner(slug: string) {
  try {
    // Assuming backend is running locally on port 5000
    const res = await axios.get(`http://localhost:5000/api/partners/${slug}`);
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function PartnerLandingPage({ params }: { params: { slug: string } }) {
  const partner = await getPartner(params.slug);

  if (!partner) {
    notFound();
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        "--theme-color": partner.themeColor || "#7e22ce",
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <header className="bg-[var(--theme-color)] text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {partner.logoUrl && (
            <img
              src={partner.logoUrl}
              alt={partner.name}
              className="h-20 mx-auto mb-6 bg-white rounded-lg p-2"
            />
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to {partner.name}
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {partner.description ||
              `We have partnered with PayOnce to bring you seamless VTU services. 
               Join us today and enjoy reliable airtime, data, and bill payments.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/auth/signup?ref=${partner.slug}`}
              className="bg-white text-[var(--theme-color)] px-8 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🚀
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Transactions</h3>
            <p className="text-gray-600">
              Experience lightning-fast processing for all your recharge and bill payment needs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🔒
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Your security is our priority. All transactions are encrypted and safe.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              💬
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated support team is always available to assist you with any issues.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>
          Powered by <span className="text-white font-bold">PayOnce</span> &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
