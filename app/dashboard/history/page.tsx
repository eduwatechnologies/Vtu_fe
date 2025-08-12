"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "@/redux/features/transaction/transactionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import ApHomeHeader from "@/components/homeHeader";
import ApLoader from "@/components/loader";
import { EmptyTransaction } from "@/components/empty";


export default function HistoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchUserTransactions());
  }, [dispatch]);

  const reversedTransactions = transactions?.slice().reverse();
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "text-green-500 bg-green-100";
      case "failed":
        return "text-red-500 bg-red-100";
      default:
        return "text-yellow-500 bg-yellow-100"; // Pending or unknown status
    }
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

  if (loading) {
    return <ApLoader />;
  }

  return (
    <div>
      <ApHomeHeader />
      <div className="min-h-screen bg-gray-100 ">
        {reversedTransactions?.length > 0 ? (
          <div className="grid  gap-4 mb-20">
            {reversedTransactions.map((trans: any) => {
              const status = trans?.status || "Pending";
              return (
                <Link
                  href={`/dashboard/transaction?request_id=${trans?._id}`}
                  key={trans?._id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm font-bold">
                      Transaction Status
                    </p>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    <strong className=" font-bold">Product:</strong>
                    {trans?.network ||
                      trans?.response_data?.data?.type ||
                      "N/A"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Amount:</span> ₦
                    {trans?.amount || "N/A"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(trans?.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          !loading && (
            <EmptyTransaction/>
          )
        )}
      </div>
    </div>
  );
}
