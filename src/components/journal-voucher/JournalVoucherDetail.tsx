import React from "react";
import { useParams, useNavigate } from "react-router";

import { JournalVoucherDetailView } from "@/components/journal-voucher/JournalVoucherDetailView";

export const JournalVoucherDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/accounting/journal-voucher");
  };

  return (
    <JournalVoucherDetailView
      voucherId={id || "JV0004/82-82"}
      onBack={handleBack}
    />
  );
};

