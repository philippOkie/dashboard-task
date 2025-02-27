import StatCard from "./StatCard";

function StatsOverview({ statistics }) {
  if (!statistics) {
    return <div>Loading...</div>;
  }

  const {
    total_generations,
    success_rate,
    average_duration,
    generations_last_24h,
    generations_last_30d,
    generations_last_7d,
    total_deployments,
    error_rate,
  } = statistics;

  const parsedAverageDuration = parseFloat(average_duration);
  const formattedAverageDuration = !isNaN(parsedAverageDuration)
    ? parsedAverageDuration.toFixed(4)
    : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Generations"
        value={total_generations}
        className="text-gray-900"
      />
      <StatCard
        title="Success Rate"
        value={`${success_rate}%`}
        className="text-green-600"
      />
      <StatCard
        title="Error Rate"
        value={`${error_rate}%`}
        className="text-red-600"
      />
      <StatCard
        title="Average Generation Time"
        value={`${formattedAverageDuration}s`}
        className="text-gray-900"
      />
      <StatCard
        title="Generations for Last 24 Hours"
        value={generations_last_24h}
        className="text-blue-600"
      />
      <StatCard
        title="Generations for Last 30 Days"
        value={generations_last_30d}
        className="text-blue-600"
      />
      <StatCard
        title="Generations for Last 7 Days"
        value={generations_last_7d}
        className="text-blue-600"
      />
      <StatCard
        title="Total Deployments"
        value={total_deployments}
        className="text-gray-900"
      />
    </div>
  );
}

export default StatsOverview;
