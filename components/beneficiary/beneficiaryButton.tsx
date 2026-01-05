"use client";

import { useState } from "react";
import { useBeneficiaries } from "@/hooks/useBenefitiaries";
import { CheckCircle, Save } from "lucide-react";

export default function SaveBeneficiaryButton({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) {
  const { addBeneficiary, beneficiaries } = useBeneficiaries();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const exists = beneficiaries.some(
      (b: any) =>
        b.phone.trim() === phone.trim() && b.name.trim() === name.trim()
    );

    if (exists) {
      setSaved(true);
      return;
    }

    addBeneficiary({
      id: Date.now(),
      name,
      phone,
    });

    setSaved(true);
  };

  return (
    <button
      onClick={handleSave}
      className={`w-full py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition ${
        saved ? "bg-green-600" : "bg-blue-600"
      } text-white`}
    >
      {saved ? (
        <>
          <CheckCircle className="w-5 h-5" /> Saved
        </>
      ) : (
        <>
          <Save className="w-5 h-5" /> Save as Beneficiary
        </>
      )}
    </button>
  );
}
