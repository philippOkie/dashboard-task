import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header.jsx";
import StatsOverview from "./StatsOverview.jsx";
import GenerationPerMonthChart from "./GenerationPerMonthChart.jsx";
import GenerationTypesChart from "./GenerationTypesChart.jsx";
import CreditManagementComponent from "./CreditManagementComponent.jsx";
import RecentActivityComponent from "./RecentActivityComponent.jsx";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getOrganizationStatistics = async () => {
  try {
    const response = await apiClient.get("/v1/statistics/organization");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching organization statistics:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getOrganizationProjectsCredits = async () => {
  try {
    const response = await apiClient.get("/v1/credits/organization/projects");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching organization projects credits:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [credits, setCredits] = useState(null);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creditAmount, setCreditAmount] = useState(100);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsData = await getOrganizationStatistics();
        const creditData = await getOrganizationProjectsCredits();

        setStatistics(statsData);
        console.log("Im stats data: ", statsData);
        setCredits(creditData);
        setProjects(creditData.projects);
        console.log("Im credit data: ", creditData);
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

          <RecentActivityComponent
            statistics={statistics}
            credits={credits}
            projects={projects}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
