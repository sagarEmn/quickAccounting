import React from "react";

import { ChartsOfAccountPage } from "./pages/ChartsOfAccountPage";
import { Routes, Route } from "react-router";
import { JournalVoucherPage } from "./pages/JournalVoucherPage";

import { Sidebar } from "./components/Sidebar";
import { Loader } from "./components/Loader";
import { PageNotFound } from "./pages/PageNotFound";
import { PaymentVoucherPage } from "./pages/PaymentVoucherPage";
import { TrialBalancePage } from "./pages/TrialBalancePage";

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
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader value={progress} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6">        <Routes>
          <Route path="/" element={<ChartsOfAccountPage />} />
          <Route
            path="/charts-of-accountant"
            element={<ChartsOfAccountPage />}
          />          <Route path="/journal-voucher" element={<JournalVoucherPage />} />
          <Route path="/payment-voucher" element={<PaymentVoucherPage />} />
          <Route path="/reports/trial-balance" element={<TrialBalancePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
