"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import ApHomeHeader from "@/components/homeHeader";
import { useReferralStats } from "@/hooks/useReferralStats";
import { Copy, Share2, Users, Coins, Wallet } from "lucide-react";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { stats, loading } = useReferralStats();

  const referralCode = stats?.referralCode || user?.referralCode || "LOADING...";
  const referralLink = `https://www.payonce.com.ng/auth/signup?ref=${referralCode}`;
  const router = useRouter();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join PayOnce',
          text: `Use my referral code ${referralCode} to sign up on PayOnce and enjoy seamless bill payments!`,
          url: referralLink,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyToClipboard(referralLink);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ApHomeHeader />

      <div className="max-w-md mx-auto px-4 mt-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Refer & Earn</h2>
          <p className="text-purple-100 text-sm mb-6">
            Invite friends and earn ₦100 on their first transaction + ₦5 on every subsequent transaction!
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-purple-200" />
                <span className="text-xs text-purple-200">Total Earned</span>
              </div>
              <p className="text-2xl font-bold">₦{stats?.totalBonus?.toLocaleString() ?? "0"}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-200" />
                <span className="text-xs text-purple-200">Total Referrals</span>
              </div>
              <p className="text-2xl font-bold">{stats?.totalReferrals ?? "0"}</p>
            </div>
          </div>
        </div>

        {/* Current Balance Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Bonus Balance</p>
              <h3 className="text-3xl font-bold text-gray-800">
                ₦{stats?.currentBonusBalance?.toLocaleString() ?? "0.00"}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Coins className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <button 
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition active:scale-[0.98]"
            onClick={() => alert("Withdrawal feature coming soon!")}
          >
            Withdraw to Wallet
          </button>
        </div>

        {/* Referral Tools */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Your Referral Tools</h3>
          
          {/* Referral Code */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1.5 block">Referral Code</label>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="font-mono font-semibold text-gray-800 flex-1 tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={() => copyToClipboard(referralCode)}
                className="p-2 hover:bg-white rounded-lg transition text-gray-500 hover:text-purple-600 hover:shadow-sm"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="mb-6">
            <label className="text-xs text-gray-500 mb-1.5 block">Referral Link</label>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="text-sm text-gray-600 flex-1 truncate">
                {referralLink}
              </span>
              <button
                onClick={() => copyToClipboard(referralLink)}
                className="p-2 hover:bg-white rounded-lg transition text-gray-500 hover:text-purple-600 hover:shadow-sm"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-3 border-2 border-purple-100 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Share2 size={18} />
            Share Invite Link
          </button>
        </div>
      </div>
    </div>
  );
}
