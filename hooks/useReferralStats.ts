"use client";

import { useEffect, useState } from "react";
import { fetchReferralStats } from "../services/referralService";

interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  totalBonus: number;
  currentBonusBalance: number;
}

export const useReferralStats = () => {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchReferralStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch referral stats");
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  return { stats, loading, error };
};
