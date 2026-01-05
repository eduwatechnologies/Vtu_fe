"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApHomeHeader from "@/components/homeHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { generateApiKey, getApiKey } from "@/redux/features/user/userThunk";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { apiKey, loading } = useSelector((state: RootState) => state.auth);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    dispatch(getApiKey());
  }, [dispatch]);

  const handleGenerateKey = async () => {
    const res = await dispatch(generateApiKey());
    if (generateApiKey.fulfilled.match(res)) {
      toast.success("API Key Generated Successfully");
    } else {
      toast.error("Failed to generate API Key");
    }
  };

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("API Key copied to clipboard");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("userToken");
    router.push("/auth/signin");
  };

  const menuItems = [
    {
      id: "1",
      icon: "🔒", // Lock for password
      label: "Password Update",
      href: "/dashboard/password",
    },
    {
      id: "2",
      icon: "🔢", // Keypad for PIN
      label: "Pin Update",
      href: "/dashboard/updatePin",
    },
    {
      id: "3",
      icon: "📇", // Rolodex/Contacts
      label: "Contacts",
      href: "/dashboard/contact",
    },
    {
      id: "4",
      icon: "🚪", // Door for logout
      label: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <div className="">
      <ApHomeHeader />

      {/* API Key Section */}
      <div className="bg-white shadow-lg rounded-xl p-4 mb-4 w-full max-w-md">
        <h3 className="text-lg font-bold mb-2 text-center">
          Developer API Key
        </h3>
        {apiKey ? (
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-mono break-all">
                {showKey ? apiKey : "sk_live_************************"}
              </span>
              <button
                onClick={() => setShowKey(!showKey)}
                className="text-blue-500 text-xs ml-2"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyKey}
                className="flex-1 bg-blue-500 text-white text-sm py-2 rounded hover:bg-blue-600 transition"
              >
                Copy Key
              </button>
              <button
                onClick={handleGenerateKey}
                className="flex-1 bg-gray-200 text-gray-700 text-sm py-2 rounded hover:bg-gray-300 transition"
              >
                Regenerate
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGenerateKey}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {loading ? "Generating..." : "Generate API Key"}
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="bg-white shadow-lg rounded-xl p-4 pt-0 w-full max-w-md">
        {menuItems.map((item) =>
          item.action ? (
            <div
              key={item.id}
              className="flex items-center py-3 border-b last:border-none cursor-pointer"
              onClick={item.action}
            >
              <span className="text-xl">{item.icon}</span>
              <p className="ml-4 text-lg"> {item.label} </p>
            </div>
          ) : (
            // Handle Normal Navigation
            <Link
              key={item.id}
              href={item.href!}
              className="flex items-center py-3 border-b last:border-none"
            >
              <span className="text-xl">{item.icon}</span>
              <p className="ml-4 text-lg">{item.label}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
