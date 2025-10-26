"use client";

import {
  Phone,
  Wifi,
  Bolt,
  TrendingUp,
  Grid,
  GraduationCap,
  Tv2,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  Receipt,
  Gift,
  Copy 
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import ApHomeHeader from "../../components/homeHeader";
import { useEffect, useState } from "react";
import { fetchUserTransactions } from "@/redux/features/transaction/transactionSlice";
import { NotificationModal } from "@/components/modal/notificationModal";
import { currentUser } from "@/redux/features/user/userThunk";
import TopSheetModal from "@/components/modal/topsheetModal";
import { getLatestNotification } from "@/redux/features/notifications/notificationSlice";

export const HomeDashboard = () => {
   const [copied, setCopied] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { notification } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const { transactions, loading } = useSelector(
    (state: RootState) => state.transactions
  );

  const [showBalance, setShowBalance] = useState(true);
  const toggleBalance = () => setShowBalance((prev) => !prev);

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getLatestNotification());
    dispatch(fetchUserTransactions());
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "failed":
        return <XCircle className="text-red-500 w-5 h-5" />;
      default:
        return <Clock className="text-yellow-500 w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "text-green-500 bg-green-100";
      case "failed":
        return "text-red-500 bg-red-100";
      default:
        return "text-yellow-500 bg-yellow-100";
    }
  };

  return (
    <div >
      <ApHomeHeader />
  <div
  className="
    relative overflow-hidden rounded-2xl p-6 mb-6
    text-white shadow-xl
    bg-purple-900
    bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950
    ring-1 ring-white/10
    transition-transform duration-200 ease-out hover:scale-[1.02]"
>
  {/* Soft glowing background (Safari-friendly) */}
  <div className="absolute inset-0 -z-10">
    {/* Base gradient layer */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 opacity-90" />
    {/* Glow effect */}
    <div className="absolute w-2/3 h-2/3 bg-purple-500/20 blur-3xl top-0 right-0 rounded-full" />
  </div>

  {/* Wallet header */}
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-sm font-semibold tracking-wide text-purple-300">
      Wallet Balance
    </h2>
    <button
      onClick={toggleBalance}
      className="p-1 rounded-lg hover:bg-white/10 transition"
    >
      {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {/* Balance display */}
  <p className="text-5xl font-extrabold tracking-tight text-purple-300 drop-shadow-sm">
    {showBalance
      ? `₦${Number(user?.balance ?? 0).toLocaleString()}`
      : "••••••"}
  </p>

  {/* Bonus and claim */}
  <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
    <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2 backdrop-blur-md">
      <TrendingUp size={14} className="text-emerald-400" />
      <span>Bonus: ₦{user?.bonus ?? "0.00"}</span>
    </div>
    <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2 backdrop-blur-md">
      <Gift size={14} className="text-pink-400" />
      <span>Claim: ₦0.00</span>
    </div>
  </div>

  {/* Account details */}
 <div className="mt-5 bg-white/10 rounded-lg p-3 backdrop-blur-md text-sm">
      <p className="font-semibold text-purple-300">
        {user?.account?.bankName}
      </p>

      <div className="mt-1 space-y-1 opacity-90">
        <div className="flex items-center justify-between">
          <p>
            <span className="font-bold text-white">Acc No:</span>{" "}
            {user?.account?.accountNumber}
          </p>

          <button
            onClick={() => handleCopy(user?.account?.accountNumber)}
            className="text-purple-300 hover:text-purple-400"
          >
            <Copy size={16} />
          </button>
        </div>

        <p>
          <span className="font-bold text-white">Acc Name:</span>{" "}
          {user?.account?.accountName}
        </p>

        {copied && (
          <p className="text-xs text-green-400 mt-1">Copied ✅</p>
        )}
      </div>
    </div>
</div>


      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {
            id: 1,
            icon: <Phone size={24} className="text-blue-500" />,
            label: "Airtime",
            link: "/dashboard/buyAirtime",
          },
          {
            id: 2,
            icon: <Wifi size={24} className="text-green-500" />,
            label: "Data",
            link: "/dashboard/buyData",
          },
          {
            id: 3,
            icon: <Bolt size={24} className="text-yellow-500" />,
            label: "Electricity",
            link: "/dashboard/buyElectricity",
          },
          {
            id: 4,
            icon: <Grid size={24} className="text-gray-600" />,
            label: "More",
            action: () => setIsOpen(true),
          },
        ].map((action) => (
          <Link
            key={action.id}
            href={action.action ? "#" : action.link}
            onClick={action.action}
            className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
          >
            {action.icon}
            <span className="mt-2 text-sm text-gray-700 font-medium">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-md font-semibold text-gray-700 ">Transactions</h2>

          <Link
            href="/dashboard/history"
            className="text-xs text-white block bg-purple-600 p-1 rounded-lg text-center "
          >
            See all
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <ul className="space-y-4">
              {transactions
                .slice(-2)
                .reverse()
                .map((tx: any, index: number) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">
                          {getStatusIcon(tx?.status)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {tx?.product_name}
                        </p>
                        <p className="text-sm font-semibold">
                          {tx?.service.charAt(0).toUpperCase() +
                            tx?.service.slice(1).toLowerCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(tx?.transaction_date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-right font-bold">₦{tx?.amount}</p>
                      <p
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-right ${getStatusColor(
                          tx?.status
                        )}`}
                      >
                        {tx?.status}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="w-16 h-10 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No Transactions Found
            </p>
            <p className="text-muted-foreground/70 text-xs mt-1">
              Your transaction history will appear here
            </p>
          </div>
        )}
      </div>

      <TopSheetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="More"
      >
        <div className="grid grid-cols-4 gap-4">
          {[
            {
              id: 1,
              icon: <GraduationCap size={24} />,
              label: "Exam",
              link: "/dashboard/buyExam",
            },
            {
              id: 2,
              icon: <Tv2 size={24} />,
              label: "TV",
              link: "/dashboard/buyCableTv",
            },
          ].map((item) => (
            <Link
              key={item.id}
              href={item?.link}
              className="flex flex-col items-center"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </TopSheetModal>

      <NotificationModal notification={notification} />
    </div>
  );
};
