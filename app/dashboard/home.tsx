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
  Copy,
  Smartphone,
  LucideLogOut,
  LogOut,
  Wallet,
  LucideFlaskRound,
  Plus,
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
import GlobalModal from "@/components/modal/globalModal";
import CenteredModal from "@/components/modal/centeredModal";
import { getLatestNotification } from "@/redux/features/notifications/notificationSlice";
import { AdsCarousel } from "../../components/ads/adsCarousel";
import { motion } from "framer-motion";

export const HomeDashboard = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { notification } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);

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
    <div>
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

        {/* Bonus and Fund */}
        <div className="flex gap-3 mt-4">
          <div className="bg-white/20 rounded-lg py-2 px-3 flex items-center flex-1">
            <Wallet size={18} className="text-purple-300 mr-2" />
            <div>
              <p className="text-xs text-purple-200">Earnings</p>
              <p className="font-bold text-sm">
                ₦{user?.bonus ?? "0.00"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsFundModalOpen(true)}
            className="bg-white/20 rounded-lg py-2 px-3 flex items-center flex-1 hover:bg-white/30 transition"
          >
            <Plus size={18} className="text-purple-300 mr-2" />
            <span className="font-semibold text-sm">Fund Wallet</span>
          </button>
        </div>

        
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          {
            id: 1,
            icon: <Phone size={24} className="text-purple-600" />,
            label: "Airtime",
            link: "/dashboard/buyAirtime",
          },
          {
            id: 2,
            icon: <Wifi size={24} className="text-purple-600" />,
            label: "Data",
            link: "/dashboard/buyData",
          },
          {
            id: 3,
            icon: <Bolt size={24} className="text-purple-600" />,
            label: "Bill",
            link: "/dashboard/buyElectricity",
          },

          {
            id: 4,
            icon: <Smartphone size={24} className="text-purple-600" />,
            label: "AirtimeFlip",
            link: "/dashboard/airtime2cash",
          },
          {
            id: 5,
            icon: <GraduationCap size={24} className="text-purple-600" />,
            label: "Exam",
            link: "/dashboard/buyExam",
          },
          {
            id: 6,
            icon: <Tv2 size={24} className="text-purple-600" />,
            label: "TV",
            link: "/dashboard/buyCableTv",
          },
          {
            id: 7,
            icon: <Gift size={24} className="text-purple-600" />,
            label: "Tasks",
            link: "/dashboard/tasks",
          },
          {
            id: 8,
            icon: <Grid size={24} className="text-purple-600" />,
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

      {/* Ads Carousel */}
      <AdsCarousel />

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

      <CenteredModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="All Services"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              id: 1,
              icon: <Phone size={24} className="text-purple-600" />,
              label: "Airtime",
              link: "/dashboard/buyAirtime",
            },
            {
              id: 2,
              icon: <Wifi size={24} className="text-purple-600" />,
              label: "Data",
              link: "/dashboard/buyData",
            },
            {
              id: 3,
              icon: <Bolt size={24} className="text-purple-600" />,
              label: "Electricity",
              link: "/dashboard/buyElectricity",
            },
            {
              id: 4,
              icon: <Smartphone size={24} className="text-purple-600" />,
              label: "AirtimeFlip",
              link: "/dashboard/airtime2cash",
            },
            {
              id: 5,
              icon: <GraduationCap size={24} className="text-purple-600" />,
              label: "Exam",
              link: "/dashboard/buyExam",
            },
            {
              id: 6,
              icon: <Tv2 size={24} className="text-purple-600" />,
              label: "TV",
              link: "/dashboard/buyCableTv",
            },
            {
              id: 7,
              icon: <Gift size={24} className="text-purple-600" />,
              label: "Tasks",
              link: "/dashboard/tasks",
            },
          ].map((item) => (
            <Link
              key={item.id}
              href={item?.link}
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition border border-gray-100 bg-white shadow-sm"
            >
              {item.icon}
              <span className="text-xs font-medium mt-2 text-gray-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </CenteredModal>

      <GlobalModal
        title="Fund Wallet"
        isOpen={isFundModalOpen}
        onClose={() => setIsFundModalOpen(false)}
      >
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Bank Name</p>
            <p className="font-semibold text-gray-800 text-lg">
              {user?.account?.bankName || "N/A"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Number</p>
              <p className="font-semibold text-gray-800 text-2xl tracking-widest">
                {user?.account?.accountNumber || "N/A"}
              </p>
            </div>
            <button
              onClick={() => handleCopy(user?.account?.accountNumber || "")}
              className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition"
            >
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Account Name</p>
            <p className="font-semibold text-gray-800 text-lg">
              {user?.account?.accountName || "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <div className="bg-blue-100 p-1 rounded-full">
              <Receipt className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Transfer to the account above to fund your wallet instantly.
            </p>
          </div>
        </div>
      </GlobalModal>

      <NotificationModal notification={notification} />
    </div>
  );
};
