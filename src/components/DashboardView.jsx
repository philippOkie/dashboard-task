import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header.jsx";
import StatsOverview from "./StatsOverview.jsx";
import TimeLineChart from "./TimeLineChart.jsx";
import BarChartComp from "./BarChartComp.jsx";
import CreditManagement from "./CreditManagement.jsx";
import TransactionsHistory from "./TransactionsHistory.jsx";
import CreditManagementChart from "./CreditManagementChart.jsx";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getOrganizationStatistics = async () => {
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

const getOrganizationProjectsCredits = async () => {
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

const DashboardView = () => {
  const [statistics, setStatistics] = useState(null);
  const [credits, setCredits] = useState(null);
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creditAmount, setCreditAmount] = useState(50);
  const [communityId, setCommunityId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCredits = async () => {
    if (!communityId) {
      alert("Community ID is required to check a balance.");
      return;
    }

    try {
      const response = await apiClient.get(
        `/v1/credits/deployment/${communityId}`
      );
      setCredits(response.data);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsData = await getOrganizationStatistics();
        const creditData = await getOrganizationProjectsCredits();

        const data = statsData?.statistics;
        setStatistics(data);
        setCredits(creditData);
        setProjects(creditData.projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

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
          <TimeLineChart statistics={statistics} />

          <BarChartComp credits={credits} />
        </div>

        <CreditManagementChart projects={projects} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CreditManagement
            creditAmount={creditAmount}
            communityId={communityId}
            credits={credits}
            setCreditAmount={setCreditAmount}
            setCommunityId={setCommunityId}
            onFetchCredits={fetchCredits}
            refreshData={refreshData}
          />

          <TransactionsHistory
            statistics={statistics}
            credits={credits}
            projects={projects}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
