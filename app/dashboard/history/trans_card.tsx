import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "success":
      return "bg-emerald-100/10 text-emerald-400 border border-emerald-400/20";
    case "failed":
      return "bg-rose-100/10 text-rose-400 border border-rose-400/20";
    default:
      return "bg-yellow-100/10 text-yellow-400 border border-yellow-400/20";
  }
};

const getStatusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "success":
      return <CheckCircle className="w-4 h-4" />;
    case "failed":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function TransactionCard({ trans }: { trans: any }) {
  const status = trans?.status || "Pending";
  const transactionType = trans?.transaction_type || "debit";
  const isCredit = transactionType?.toLowerCase() === "credit";

  return (
    <Link
      href={`/dashboard/transaction?request_id=${trans?._id}`}
      className="
        relative overflow-hidden rounded-2xl p-5 mb-4
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        text-white shadow-md
        border border-slate-700/60 hover:border-purple-500/40
        transition-all duration-300 hover:scale-[1.01]
      "
    >
      {/* Accent Glow */}
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.25),transparent_60%)]" />

      {/* 1️⃣ Service + Date */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-sm text-gray-100">
          {trans?.service || "Unknown Service"}
        </p>
        <p className="text-[11px] text-gray-400">
          {new Date(trans?.createdAt).toLocaleDateString("en-GB")}
        </p>
      </div>

      {/* 2️⃣ Amount + Type */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-2xl font-bold">
          {isCredit ? (
            <ArrowDownRight className="w-5 h-5 text-emerald-400" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-rose-400" />
          )}
          <span>{`₦${Number(trans?.amount ?? 0).toLocaleString()}`}</span>
        </div>

        <div
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isCredit
              ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
              : "bg-rose-400/10 text-rose-400 border border-rose-400/20"
          }`}
        >
          {isCredit ? "Credit" : "Debit"}
        </div>
      </div>

      {/* 3️⃣ Status + Reference */}
      <div className="flex justify-between items-center mb-3">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
            status
          )}`}
        >
          {getStatusIcon(status)}
          <span className="capitalize">{status}</span>
        </div>
        <p className="truncate text-[11px] text-gray-400">
          Ref: {trans?.reference_no || "N/A"}
        </p>
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      {/* 4️⃣ Balances + Note */}
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <div>
          <p className="text-[11px]">Prev Balance</p>
          <p className="text-white font-semibold">
            ₦{Number(trans?.previous_balance ?? 0).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px]">New Balance</p>
          <p className="text-white font-semibold">
            ₦{Number(trans?.new_balance ?? 0).toLocaleString()}
          </p>
        </div>
      </div>

      {trans?.note && (
        <p className="text-gray-500 text-[11px] mt-2 italic">“{trans?.note}”</p>
      )}
    </Link>
  );
}
