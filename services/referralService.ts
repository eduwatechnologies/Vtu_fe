import axiosInstance from "../redux/apis/common/aixosInstance";

interface ReferralStats {
  referralCode: string;
  totalReferrals: number;
  totalBonus: number;
  currentBonusBalance: number;
}

export const fetchReferralStats = async (): Promise<ReferralStats> => {
  const response = await axiosInstance.get("/referrals/stats");
  return response.data.data;
};
