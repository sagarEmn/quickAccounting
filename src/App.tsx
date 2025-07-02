import React from "react";

import { ChartsOfAccountPage } from "./pages/ChartsOfAccountPage";
import { Routes, Route } from "react-router";
import { JournalVoucherPage } from "./pages/JournalVoucherPage";

import { Sidebar } from "./components/Sidebar";
import { Loader } from "./components/Loader";
import { PageNotFound } from "./pages/PageNotFound";
import { PaymentVoucherPage } from "./pages/PaymentVoucherPage";
import { TrialBalancePage } from "./pages/TrialBalancePage";
import { LedgerPage } from "./pages/LedgerPage";
import { BalanceSheetPage } from "./pages/BalanceSheetPage";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ContentWrapper } from "./components/ContentWrapper";

function App() {
  const [progress, setProgress] = React.useState(0); // progress bar
  const [isLoaded, setIsLoaded] = React.useState(false); // show the loader component

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader value={progress} />
      </div>
    );
  }
  return (
    <LoadingProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <ContentWrapper>
          <main className="flex-1 p-6 overflow-y-auto h-full">
            <Routes>
              <Route path="/" element={<ChartsOfAccountPage />} />
              <Route
                path="/charts-of-accountant"
                element={<ChartsOfAccountPage />}
              />
              <Route path="/journal-voucher" element={<JournalVoucherPage />} />
              <Route path="/payment-voucher" element={<PaymentVoucherPage />} />
              <Route path="/reports/ledger" element={<LedgerPage />} />
              <Route path="/reports/trial-balance" element={<TrialBalancePage />} />
              <Route path="/reports/balance-sheet" element={<BalanceSheetPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </ContentWrapper>
      </div>
    </LoadingProvider>
  );
}

export default App;
