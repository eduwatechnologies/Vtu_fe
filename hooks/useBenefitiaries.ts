"use client";

import { useEffect, useState } from "react";

export interface Beneficiary {
  id: number;
  name: string;
  phone: string;
}

export function useBeneficiaries(storageKey: string = "beneficiaries") {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) {
        setBeneficiaries(saved);
      }
    } catch {
      setBeneficiaries([]);
    }
  }, [storageKey]);

  // Add new beneficiary (prevent duplicates)
  const addBeneficiary = (item: Beneficiary) => {
    const exists = beneficiaries.some(
      (b) =>
        b.phone.trim() === item.phone.trim() &&
        b.name.trim().toLowerCase() === item.name.trim().toLowerCase()
    );

    if (exists) return false;

    const updated = [...beneficiaries, item];
    setBeneficiaries(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    return true;
  };

  // Remove beneficiary by ID
  const removeBeneficiary = (id: number) => {
    const updated = beneficiaries.filter((b) => b.id !== id);
    setBeneficiaries(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return {
    beneficiaries,
    addBeneficiary,
    removeBeneficiary,
  };
}
