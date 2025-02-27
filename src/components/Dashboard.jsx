import { useState, useEffect } from "react";

import Header from "./Header.jsx";
import StatsOverview from "./StatsOverview.jsx";
import GenerationPerMonthChart from "./GenerationPerMonthChart.jsx";
import GenerationTypesChart from "./GenerationTypesChart.jsx";
import CreditManagementComponent from "./CreditManagementComponent.jsx";
import RecentActivityComponent from "./RecentActivityComponent.jsx";

const getStatisticsData = () => {
  return {
    totalGenerations: 1254,
    successRate: 97.3,
    failureRate: 2.7,
    averageGenerationTime: 5.2,
    monthlyStats: [
      { month: "Jan", generations: 210, credits: 840 },
      { month: "Feb", generations: 175, credits: 700 },
      { month: "Mar", generations: 195, credits: 780 },
      { month: "Apr", generations: 240, credits: 960 },
      { month: "May", generations: 230, credits: 920 },
      { month: "Jun", generations: 204, credits: 816 },
    ],
    generationTypes: [
      { type: "Realistic", count: 423 },
      { type: "Abstract", count: 352 },
      { type: "Cartoon", count: 247 },
      { type: "Landscape", count: 172 },
      { type: "Portrait", count: 60 },
    ],
    recentActivity: [
      { date: "2025-02-27", type: "Realistic", status: "Success", credits: 4 },
      { date: "2025-02-27", type: "Portrait", status: "Success", credits: 4 },
      { date: "2025-02-26", type: "Abstract", status: "Failed", credits: 0 },
      { date: "2025-02-26", type: "Landscape", status: "Success", credits: 4 },
      { date: "2025-02-25", type: "Cartoon", status: "Success", credits: 4 },
    ],
  };
};

const getCreditData = () => {
  return {
    currentCredits: 430,
    totalPurchased: 5000,
    totalUsed: 4570,
    transactionHistory: [
      { date: "2025-02-25", type: "Purchase", amount: 100, balance: 430 },
      { date: "2025-02-20", type: "Usage", amount: -50, balance: 330 },
      { date: "2025-02-15", type: "Purchase", amount: 200, balance: 380 },
      { date: "2025-02-10", type: "Usage", amount: -120, balance: 180 },
      { date: "2025-02-01", type: "Purchase", amount: 300, balance: 300 },
    ],
  };
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creditAmount, setCreditAmount] = useState(100);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, these would be API calls
        const statsData = getStatisticsData();
        const creditData = getCreditData();

        setStatistics(statsData);
        setCredits(creditData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleTopUp = () => {
    setCredits({
      ...credits,
      currentCredits: credits.currentCredits + creditAmount,
      totalPurchased: credits.totalPurchased + creditAmount,
      transactionHistory: [
        {
          date: new Date().toISOString().split("T")[0],
          type: "Purchase",
          amount: creditAmount,
          balance: credits.currentCredits + creditAmount,
        },
        ...credits.transactionHistory,
      ],
    });

    // Show success alert (in a real app would use a proper toast/notification)
    alert(`Successfully added ${creditAmount} credits`);
  };

  const refreshData = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header refreshData={refreshData} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <StatsOverview statistics={statistics} credits={credits} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GenerationPerMonthChart statistics={statistics} />

          <GenerationTypesChart statistics={statistics} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CreditManagementComponent
            credits={credits}
            creditAmount={creditAmount}
            handleTopUp={handleTopUp}
            setCreditAmount={setCreditAmount}
          />

          <RecentActivityComponent statistics={statistics} credits={credits} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
