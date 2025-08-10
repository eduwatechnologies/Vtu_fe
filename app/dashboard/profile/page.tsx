"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ApHomeHeader from "@/components/homeHeader";

export default function Profile() {
  const router = useRouter();

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
