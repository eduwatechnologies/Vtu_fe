"use client";

import { useState } from "react";
import { User, X } from "lucide-react";
import { useBeneficiaries } from "@/hooks/useBenefitiaries";

// -----------------------------
// TYPES
// -----------------------------
export interface Beneficiary {
  id: number;
  name?: string;
  phone: string;
}

interface BeneficiarySelectorProps {
  onSelect: (phone: string) => void;
}

export default function BeneficiarySelector({
  onSelect,
}: BeneficiarySelectorProps) {
  const { beneficiaries, removeBeneficiary } = useBeneficiaries();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {/* Button to Open */}
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 rounded-lg border text-left px-3 text-gray-700 flex justify-between items-center"
      >
        Choose Beneficiary
        <User size={18} className="text-gray-500" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end p-4 z-50">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[70vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Saved Beneficiaries</h2>
              <button onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {beneficiaries.length === 0 && (
              <p className="text-gray-400 text-sm">
                No beneficiaries saved yet.
              </p>
            )}

            {/* Beneficiary Grid */}
            <div className="grid grid-cols-3 gap-3">
              {beneficiaries.map((b: Beneficiary) => (
                <div
                  key={b.id}
                  className="p-3 border rounded-xl flex flex-col items-center bg-gray-50 relative"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => removeBeneficiary(b.id)}
                    className="absolute top-1 right-1 text-red-500"
                  >
                    <X size={16} />
                  </button>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                    {b.name?.charAt(0)?.toUpperCase() || b.phone.slice(-2)}
                  </div>

                  <p className="font-medium text-sm mt-1">
                    {b.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">{b.phone}</p>

                  <button
                    onClick={() => {
                      onSelect(b.phone);
                      setOpen(false);
                    }}
                    className="mt-2 w-full bg-green-500 text-white text-xs rounded-lg py-1"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
